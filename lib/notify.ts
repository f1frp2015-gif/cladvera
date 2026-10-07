import { site } from "@/content/data/site";

/**
 * Team notification through Resend. When RESEND_API_KEY or
 * INQUIRY_NOTIFY_EMAILS is missing the message is logged instead, so the
 * forms keep working on previews without secrets.
 */

export interface Attachment {
  filename: string;
  content: string; // base64
}

export const INQUIRY_FROM = process.env.INQUIRY_FROM ?? `${site.brand} <onboarding@resend.dev>`;

export function notifyRecipients(): string[] {
  return (process.env.INQUIRY_NOTIFY_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function notifyTeam({
  subject,
  html,
  replyTo,
  attachments = [],
}: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<{ delivered: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = notifyRecipients();
  if (!apiKey || to.length === 0) {
    console.info(`[notify] not configured; would send "${subject}" to ${to.join(", ") || "(no recipients)"}`);
    return { delivered: false, reason: "not-configured" };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: INQUIRY_FROM,
    to,
    subject,
    html,
    ...(replyTo && { replyTo }),
    ...(attachments.length > 0 && {
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })),
    }),
  });
  if (error) {
    console.error("[notify] resend error", error);
    return { delivered: false, reason: error.message };
  }
  return { delivered: true };
}
