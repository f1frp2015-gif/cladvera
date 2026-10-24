# inquiry@cladvera.com relay Worker

Cloudflare Worker `cladvera-inquiry-relay` (account `b4e274e2b213010c589899324e3734af`). It does two jobs:

1. **Email Routing** for `inquiry@cladvera.com` (rule action "Send to a Worker").
2. **Website form** at `https://relay.cladvera.com` (Workers custom domain) for `/request-quote`
   (`components/catalog/ProjectRequest.tsx`).

## Why it re-sends instead of forwarding

A plain Email Routing forward keeps the customer's `From` while Cloudflare's servers send the message.
Alibaba Mail (the `f1composite.com` inboxes) scores that as spoofing and files it as spam.
The worker therefore sends a new message `From: inquiry@cladvera.com` (SPF/DKIM/DMARC aligned) with
`Reply-To` set to the customer, the original text/HTML, every attachment and, up to 5 MB, the original `.eml`.
If parsing or the re-send fails, that recipient falls back to a plain `message.forward()`; when every
recipient fails the message is rejected so the sender gets a bounce. Out-of-office replies from the two
inboxes are dropped to prevent loops.

## Website form

- `GET /token` returns a timestamp signed with `FORM_SECRET`. The form fetches it when it loads.
- `POST /inquiry` takes the multipart form straight from the browser, files included, so Vercel's 4.5 MB
  request limit does not apply. Limits: 10 files, 15 MB in total, extensions in `FILE_EXTENSIONS`.
- Only `https://cladvera.com`, `https://www.cladvera.com`, Vercel previews of the `cladvera` project and
  `http://localhost:*` may call it (CORS plus an origin check).
- Spam guards: honeypot field `company_website`, a token at least 3 seconds and at most 12 hours old, and the
  `RL` rate limit (5 posts per minute per IP). Dropped posts get a normal-looking success reply.
- The lead is emailed from `inquiry@cladvera.com` to `RECIPIENTS` with `Reply-To` set to the buyer.
  It answers 200 when at least one inbox got it and 502 when none did; the form then shows an error
  with the email address.

## Requirements

- Recipients must be verified Email Routing destination addresses and listed in the `SEB` binding's
  `allowed_destination_addresses`. Adding a recipient means updating `RECIPIENTS` in `src/index.js` and the binding.
- In Alibaba Mail, whitelist `cladvera.com` so relayed inquiries land in the inbox.

## Build and deploy

```bash
npm install --registry https://registry.npmjs.org/
npm run build   # dist/index.js
```

Upload `dist/index.js` with the Cloudflare API (`PUT /accounts/<account>/workers/scripts/cladvera-inquiry-relay`,
multipart: `metadata` + `index.js`). Metadata:

```json
{"main_module":"index.js","compatibility_date":"2025-05-23","observability":{"enabled":true,"head_sampling_rate":1},
 "keep_bindings":["secret_text"],
 "bindings":[{"type":"send_email","name":"SEB","allowed_destination_addresses":["doris.li@f1composite.com","ori@f1composite.com"]},
             {"type":"ratelimit","name":"RL","namespace_id":"1101","simple":{"limit":5,"period":60}}]}
```

`FORM_SECRET` is a `secret_text` binding (`PUT .../scripts/cladvera-inquiry-relay/secrets`), kept across uploads
by `keep_bindings`. Delivery results are logged as `inquiry-delivery` and `lead-delivery` events
(Workers → Observability).
