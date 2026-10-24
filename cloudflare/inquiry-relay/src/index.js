// Cloudflare Worker `cladvera-inquiry-relay`, bound to the inquiry@cladvera.com Email Routing rule and
// serving the website's project request form (components/catalog/ProjectRequest.tsx).
//
// Plain forwarding keeps the customer's From header while Cloudflare's servers send the message, which
// Alibaba Mail (f1composite.com) scores as spoofing and files as spam. So each message is re-sent as a new
// email From inquiry@cladvera.com (SPF/DKIM/DMARC aligned for cladvera.com), with Reply-To set to the
// customer, the original text/HTML, every attachment and (when small) the original .eml.
// If parsing or the re-send fails, that recipient falls back to a plain forward, so no inquiry is lost.
//
// Website form: GET /token returns a signed timestamp; POST /inquiry takes the multipart form with its
// files straight from the browser (so Vercel's 4.5 MB request limit does not apply) and emails it to the
// same inboxes with Reply-To set to the buyer.
import PostalMime from 'postal-mime'
import { EmailMessage } from 'cloudflare:email'

const RELAY_FROM = 'inquiry@cladvera.com'
const RECIPIENTS = ['doris.li@f1composite.com', 'ori@f1composite.com']
const ATTACH_ORIGINAL_MAX = 5 * 1024 * 1024
const RELAY_MAX = 24 * 1024 * 1024

const ALLOWED_ORIGINS = ['https://cladvera.com', 'https://www.cladvera.com']
const PREVIEW_ORIGIN = /^https:\/\/cladvera-[a-z0-9-]+-ori-project-workspace\.vercel\.app$/
const DEV_ORIGIN = /^http:\/\/localhost:\d+$/

const MAX_FILES = 10
const MAX_FILES_BYTES = 15 * 1024 * 1024
const FILE_EXTENSIONS = ['pdf', 'dwg', 'dxf', 'xlsx', 'xls', 'csv', 'doc', 'docx', 'zip', 'png', 'jpg', 'jpeg', 'webp', 'heic', 'rvt', 'skp', 'ifc', 'step', 'stp']
const TOKEN_MIN_AGE = 3_000
const TOKEN_MAX_AGE = 12 * 60 * 60 * 1000
const KINDS = { quote: 'Project quote request', sample: 'Sample request', documents: 'Technical document request' }

const relayWorker = {
  async fetch(request, env) {
    const url = new URL(request.url)
    const origin = request.headers.get('origin') ?? ''
    const cors = allowedOrigin(origin) ? { 'access-control-allow-origin': origin, vary: 'Origin' } : null

    if (request.method === 'OPTIONS' && cors) {
      return new Response(null, { status: 204, headers: { ...cors, 'access-control-allow-methods': 'GET, POST', 'access-control-max-age': '86400' } })
    }
    if (url.pathname === '/token' && request.method === 'GET') {
      if (!cors) return new Response('Forbidden', { status: 403 })
      return Response.json({ token: await signToken(env, Date.now()) }, { headers: { ...cors, 'cache-control': 'no-store' } })
    }
    if (url.pathname === '/inquiry' && request.method === 'POST') {
      if (!cors) return new Response('Forbidden', { status: 403 })
      const { status, body } = await handleInquiry(request, env)
      return Response.json(body, { status, headers: cors })
    }
    return new Response('Not found', { status: 404 })
  },

  async email(message, env) {
    if (isAutoReplyFromRecipient(message)) {
      console.log(JSON.stringify({ event: 'inquiry-skip-autoreply', sender: message.from }))
      return
    }

    let raw
    let parsed
    try {
      raw = new Uint8Array(await new Response(message.raw).arrayBuffer())
      parsed = await PostalMime.parse(raw)
    } catch (err) {
      console.log(JSON.stringify({ event: 'inquiry-parse-failed', error: String(err?.message ?? err) }))
    }

    const results = await Promise.all(
      RECIPIENTS.map(async (to) => {
        if (parsed) {
          try {
            const mime = buildRelay(parsed, raw, to, message.from)
            if (mime.length > RELAY_MAX) throw new Error(`relay too large (${mime.length} bytes)`)
            await env.SEB.send(new EmailMessage(RELAY_FROM, to, mime))
            return { to, via: 'relay' }
          } catch (err) {
            console.log(JSON.stringify({ event: 'inquiry-relay-failed', to, error: String(err?.message ?? err) }))
          }
        }
        try {
          await message.forward(to)
          return { to, via: 'forward' }
        } catch (err) {
          return { to, via: 'failed', error: String(err?.message ?? err) }
        }
      }),
    )

    console.log(
      JSON.stringify({
        event: 'inquiry-delivery',
        senderDomain: message.from.split('@').pop(),
        size: message.rawSize,
        attachments: parsed?.attachments?.length ?? null,
        results,
      }),
    )
    // Bounce only when nobody got it, so the sender learns the message was not delivered.
    if (results.every((r) => r.via === 'failed')) {
      message.setReject('Delivery to the inquiry inbox failed; please retry later.')
    }
  },
}

export default relayWorker

function allowedOrigin(origin) {
  return ALLOWED_ORIGINS.includes(origin) || PREVIEW_ORIGIN.test(origin) || DEV_ORIGIN.test(origin)
}

// ------------------------------------------------------------------ website form

async function handleInquiry(request, env) {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
  if (env.RL && !(await env.RL.limit({ key: ip })).success) {
    return { status: 429, body: { ok: false, error: 'Too many requests. Please try again in a minute.' } }
  }
  if (Number(request.headers.get('content-length') ?? 0) > MAX_FILES_BYTES + 512 * 1024) {
    return { status: 413, body: { ok: false, error: 'Files are larger than 15 MB in total.' } }
  }

  let form
  try {
    form = await request.formData()
  } catch {
    return { status: 400, body: { ok: false, error: 'Invalid form submission.' } }
  }

  const ref = `RQ-${Date.now().toString(36).toUpperCase()}`
  // Honeypot and form timing: answer as if accepted so bots get no signal.
  const age = await tokenAge(env, field(form, 'token', 200))
  if (field(form, 'company_website') || age === null || age < TOKEN_MIN_AGE || age > TOKEN_MAX_AGE) {
    console.log(JSON.stringify({ event: 'lead-dropped', ref, reason: age === null ? 'token' : field(form, 'company_website') ? 'honeypot' : 'timing' }))
    return { status: 200, body: { ok: true, ref } }
  }

  const kind = field(form, 'kind', 20) in KINDS ? field(form, 'kind', 20) : 'quote'
  const name = field(form, 'name', 200)
  const email = field(form, 'email', 200)
  const company = field(form, 'company', 200)
  const location = field(form, 'location', 200)
  const message = String(form.get('message') ?? '').trim().slice(0, 8000)
  const products = form.getAll('products').map((p) => (typeof p === 'string' ? clean(p).slice(0, 300) : '')).filter(Boolean).slice(0, 10)
  const page = field(form, 'page', 300)

  if (!name || !ADDRESS_RE.test(email)) {
    return { status: 400, body: { ok: false, error: 'Please enter your name and a valid email address.' } }
  }

  const files = form.getAll('files').filter((f) => typeof f === 'object' && f && f.size > 0)
  if (!message && files.length === 0) {
    return { status: 400, body: { ok: false, error: 'Please describe your project or attach a file.' } }
  }
  if (files.length > MAX_FILES) return { status: 400, body: { ok: false, error: `Attach at most ${MAX_FILES} files.` } }
  let total = 0
  const attachments = []
  for (const file of files) {
    const filename = clean(file.name).replace(/["\\]/g, '').slice(0, 150) || 'attachment'
    const ext = filename.split('.').pop()?.toLowerCase() ?? ''
    if (!FILE_EXTENSIONS.includes(ext)) return { status: 400, body: { ok: false, error: `File type .${ext} is not accepted.` } }
    total += file.size
    if (total > MAX_FILES_BYTES) return { status: 413, body: { ok: false, error: 'Files are larger than 15 MB in total.' } }
    attachments.push({ filename, mimeType: file.type, content: new Uint8Array(await file.arrayBuffer()) })
  }

  const subject = `[cladvera.com] ${KINDS[kind]}: ${company || name}${location ? ` (${location})` : ''}`
  const text = [
    `${KINDS[kind]} from the cladvera.com project request form. Reply to this email to answer the buyer directly. / 直接回复即可回复客户。`,
    '',
    `Reference: ${ref}`,
    `Name: ${name}`,
    `Email: ${email}`,
    ...(company ? [`Company: ${company}`] : []),
    ...(location ? [`Project location: ${location}`] : []),
    ...(page ? [`Page: ${page}`] : []),
    '',
    'PRODUCTS',
    ...(products.length ? products.map((p) => `- ${p}`) : ['- Not selected']),
    '',
    'PROJECT DETAILS',
    message || '(see attached files)',
    '',
    `Files attached: ${attachments.length ? attachments.map((a) => `${a.filename} (${Math.ceil(a.content.byteLength / 1024)} KB)`).join(', ') : 'none'}`,
  ].join('\n')

  const results = await Promise.all(
    RECIPIENTS.map(async (to) => {
      try {
        await env.SEB.send(new EmailMessage(RELAY_FROM, to, buildLead({ subject, text, replyTo: { name, address: email }, ref, to, attachments })))
        return { to, ok: true }
      } catch (err) {
        return { to, ok: false, error: String(err?.message ?? err) }
      }
    }),
  )
  console.log(JSON.stringify({ event: 'lead-delivery', ref, kind, files: attachments.length, bytes: total, emailDomain: email.split('@')[1], results }))
  if (!results.some((r) => r.ok)) {
    return { status: 502, body: { ok: false, error: 'The request could not be sent. Please try again or email us.' } }
  }
  return { status: 200, body: { ok: true, ref } }
}

function field(form, key, max = 500) {
  const value = form.get(key)
  return typeof value === 'string' ? clean(value).slice(0, max) : ''
}

async function hmac(env, data) {
  if (!env.FORM_SECRET) throw new Error('FORM_SECRET is not set')
  const key = await crypto.subtle.importKey('raw', utf8(env.FORM_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return base64(new Uint8Array(await crypto.subtle.sign('HMAC', key, utf8(data))), false).replace(/[+/=]/g, '')
}

async function signToken(env, ts) {
  return `${ts}.${await hmac(env, String(ts))}`
}

/** Milliseconds since the token was issued, or null when it is missing or forged. */
async function tokenAge(env, token) {
  const [ts, sig] = token.split('.')
  if (!/^\d{13}$/.test(ts ?? '') || !sig) return null
  if (!(await safeEqual(sig, await hmac(env, ts)))) return null
  return Date.now() - Number(ts)
}

// ------------------------------------------------------------------ mail building

// Out-of-office replies from our own inboxes go back to inquiry@ and would otherwise loop.
function isAutoReplyFromRecipient(message) {
  if (!RECIPIENTS.includes(message.from.toLowerCase())) return false
  const h = message.headers
  const auto = (h.get('auto-submitted') ?? 'no').toLowerCase()
  const precedence = (h.get('precedence') ?? '').toLowerCase()
  return auto !== 'no' || h.has('x-autoreply') || h.has('x-autorespond') || ['auto_reply', 'bulk', 'junk'].includes(precedence)
}

function buildRelay(email, raw, to, envelopeFrom) {
  const sender = pickAddress(email.replyTo?.[0]) ?? pickAddress(email.from) ?? { address: envelopeFrom }
  const subject = clean(email.subject) || '(no subject)'
  const outer = boundary()
  const alt = boundary()

  const summary = [
    ['From', formatPlain(email.from) || envelopeFrom],
    ['To', (email.to ?? []).map(formatPlain).join(', ')],
    ['Cc', (email.cc ?? []).map(formatPlain).join(', ')],
    ['Date', clean(email.date)],
    ['Subject', subject],
    ['Attachments', String(email.attachments?.length ?? 0)],
  ].filter(([, v]) => v)

  const intro = 'Relayed from inquiry@cladvera.com. Reply to this email to answer the sender directly. / 直接回复即可回复客户。'
  const text = [intro, '', ...summary.map(([k, v]) => `${k}: ${v}`), '-'.repeat(60), '', email.text || htmlToText(email.html) || '(no text body)'].join('\n')
  const headerHtml = `<div style="font:13px/1.5 sans-serif;color:#555;border-left:3px solid #ccc;padding:6px 10px;margin:0 0 12px">${escapeHtml(intro)}<br>${summary
    .map(([k, v]) => `<b>${escapeHtml(k)}:</b> ${escapeHtml(v)}`)
    .join('<br>')}</div><hr>`
  const html = headerHtml + (email.html || `<pre style="white-space:pre-wrap">${escapeHtml(email.text || '')}</pre>`)

  const headers = [
    `From: "Cladvera Inquiry" <${RELAY_FROM}>`,
    `To: <${to}>`,
    `Reply-To: ${formatHeaderAddress(sender)}`,
    `Subject: ${encodeHeader(`[cladvera.com] ${subject}`)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@cladvera.com>`,
    ...(email.messageId ? [`References: ${clean(email.messageId)}`] : []),
    'X-Cladvera-Relay: 1',
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${outer}"`,
  ]

  const parts = [
    [
      `Content-Type: multipart/alternative; boundary="${alt}"`,
      '',
      `--${alt}`,
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      base64(utf8(text)),
      `--${alt}`,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      base64(utf8(html)),
      `--${alt}--`,
    ].join('\r\n'),
    ...(email.attachments ?? []).map(attachmentPart),
  ]

  if (raw && raw.byteLength <= ATTACH_ORIGINAL_MAX) {
    parts.push(
      [
        'Content-Type: message/rfc822; name="original.eml"',
        'Content-Disposition: attachment; filename="original.eml"',
        'Content-Transfer-Encoding: base64',
        '',
        base64(raw),
      ].join('\r\n'),
    )
  }

  return [...headers, '', ...parts.map((p) => `--${outer}\r\n${p}`), `--${outer}--`, ''].join('\r\n')
}

function buildLead({ subject, text, replyTo, ref, to, attachments }) {
  const outer = boundary()
  const headers = [
    `From: "Cladvera Website" <${RELAY_FROM}>`,
    `To: <${to}>`,
    `Reply-To: ${formatHeaderAddress(replyTo)}`,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <lead-${ref}-${crypto.randomUUID()}@cladvera.com>`,
    'X-Cladvera-Relay: lead',
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${outer}"`,
  ]
  const parts = [
    ['Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', base64(utf8(text))].join('\r\n'),
    ...attachments.map(attachmentPart),
  ]
  return [...headers, '', ...parts.map((p) => `--${outer}\r\n${p}`), `--${outer}--`, ''].join('\r\n')
}

function attachmentPart(att) {
  const name = encodeHeader(clean(att.filename) || 'attachment')
  const type = /^[\w.+-]+\/[\w.+-]+$/.test(att.mimeType ?? '') ? att.mimeType : 'application/octet-stream'
  const content = typeof att.content === 'string' ? utf8(att.content) : new Uint8Array(att.content)
  return [
    `Content-Type: ${type}; name="${name}"`,
    `Content-Disposition: ${att.disposition === 'inline' ? 'inline' : 'attachment'}; filename="${name}"`,
    ...(att.contentId ? [`Content-ID: ${clean(att.contentId)}`] : []),
    'Content-Transfer-Encoding: base64',
    '',
    base64(content),
  ].join('\r\n')
}

// Compares SHA-256 digests byte by byte, so neither the length nor the content leaks through timing.
async function safeEqual(a, b) {
  const [x, y] = await Promise.all([a, b].map(async (s) => new Uint8Array(await crypto.subtle.digest('SHA-256', utf8(s)))))
  let diff = 0
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i]
  return diff === 0
}

const ADDRESS_RE = /^[^\s<>@",;]+@[^\s<>@",;]+\.[^\s<>@",;]+$/

function pickAddress(a) {
  const address = clean(a?.address)
  return ADDRESS_RE.test(address) ? { name: clean(a?.name), address } : null
}

function formatPlain(a) {
  const address = clean(a?.address)
  const name = clean(a?.name)
  return name && address ? `${name} <${address}>` : address || name
}

function formatHeaderAddress({ name, address }) {
  if (!name) return `<${address}>`
  const display = /^[\x20-\x7e]*$/.test(name) ? `"${name.replace(/["\\]/g, '')}"` : encodeHeader(name)
  return `${display} <${address}>`
}

// Header values come from the sender: strip CR/LF so they cannot inject headers.
function clean(s) {
  return String(s ?? '').replace(/[\r\n\t]+/g, ' ').trim()
}

// RFC 2047 encoded words (UTF-8, base64), each under 75 chars, folded onto continuation lines.
function encodeHeader(s) {
  if (/^[\x20-\x7e]*$/.test(s) && s.length < 900) return s
  const words = []
  let chunk = ''
  for (const ch of s) {
    if (utf8(chunk + ch).length > 45) {
      words.push(chunk)
      chunk = ''
    }
    chunk += ch
  }
  if (chunk) words.push(chunk)
  return words.map((w) => `=?UTF-8?B?${base64(utf8(w), false)}?=`).join('\r\n ')
}

function utf8(s) {
  return new TextEncoder().encode(s)
}

function base64(bytes, wrap = true) {
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  const b64 = btoa(bin)
  return wrap ? b64.replace(/.{76}/g, '$&\r\n') : b64
}

function boundary() {
  return `=_cv_${crypto.randomUUID().replace(/-/g, '')}`
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}

function htmlToText(html) {
  if (!html) return ''
  return html
    .replace(/<(style|script)[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>|<\/(p|div|tr|li|h\d)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
