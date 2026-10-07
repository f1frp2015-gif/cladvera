import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { escapeHtml, notifyTeam, type Attachment } from "@/lib/notify";

export const runtime = "nodejs";

const MAX_TEXT = 4000;
const MAX_FILES = 3;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["pdf", "dwg", "dxf", "xlsx", "xls", "csv", "zip", "png", "jpg", "jpeg", "rvt", "skp"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const KINDS = { sample: "Sample request", quote: "Project quote request", contact: "Contact message" } as const;
type Kind = keyof typeof KINDS;

function text(form: FormData, key: string, max = MAX_TEXT) {
  const value = form.get(key);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function list(form: FormData, key: string) {
  return form
    .getAll(key)
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim().slice(0, 200))
    .filter(Boolean);
}

export async function POST(req: Request) {
  const limited = rateLimit(req, "inquiries", { limit: 5, windowMs: 10 * 60 * 1000 });
  if (limited) return limited;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  // Spam guards: hidden field and a minimum time on the form.
  if (text(form, "company_website")) {
    return NextResponse.json({ ok: true, delivered: false });
  }
  const elapsed = Number(text(form, "form_elapsed_ms", 20));
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 800) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const kindRaw = text(form, "kind", 20);
  const kind: Kind = kindRaw in KINDS ? (kindRaw as Kind) : "contact";
  const name = text(form, "name", 200);
  const email = text(form, "email", 200);
  const company = text(form, "company", 200);
  const role = text(form, "role", 100);
  const country = text(form, "country", 100);

  if (!name || !EMAIL.test(email) || !role || !country) {
    return NextResponse.json(
      { ok: false, error: "Name, a valid email, your role and the country are required." },
      { status: 400 },
    );
  }

  const fields: Array<[string, string]> = [];
  for (const [key, value] of form.entries()) {
    if (typeof value !== "string") continue;
    if (["company_website", "form_elapsed_ms", "kind"].includes(key)) continue;
    const clean = value.trim().slice(0, MAX_TEXT);
    if (clean) fields.push([key, clean]);
  }
  const materials = list(form, "materials");
  const finishes = list(form, "finishes");

  const attachments: Attachment[] = [];
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ ok: false, error: `Attach at most ${MAX_FILES} files.` }, { status: 400 });
  }
  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ ok: false, error: `File type .${ext} is not accepted.` }, { status: 400 });
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: `${file.name} is larger than 10 MB.` }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name.slice(0, 120), content: buffer.toString("base64") });
  }

  const rows = fields
    .map(([key, value]) => `<tr><td style="padding:4px 8px;color:#555">${escapeHtml(key)}</td><td style="padding:4px 8px">${escapeHtml(value)}</td></tr>`)
    .join("");
  const html = `
    <h2 style="font-family:sans-serif">${KINDS[kind]}</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}
      ${materials.length ? `<tr><td style="padding:4px 8px;color:#555">materials</td><td style="padding:4px 8px">${escapeHtml(materials.join(", "))}</td></tr>` : ""}
      ${finishes.length ? `<tr><td style="padding:4px 8px;color:#555">finishes</td><td style="padding:4px 8px">${escapeHtml(finishes.join(", "))}</td></tr>` : ""}
    </table>
    <p style="font-family:sans-serif;font-size:12px;color:#777">Files attached: ${attachments.length}. Submitted ${new Date().toISOString()}.</p>`;

  const result = await notifyTeam({
    subject: `[${KINDS[kind]}] ${company || name} (${country})`,
    html,
    replyTo: email,
    attachments,
  });

  const reference = `${kind.toUpperCase().slice(0, 2)}-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, delivered: result.delivered, reference });
}
