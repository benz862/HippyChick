import { DEFAULT_NOTIFY_EMAIL } from "@/lib/constants";

type SendEmailArgs = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  to?: string;
};

/**
 * Send a transactional email via Resend. Silent no-op if `RESEND_API_KEY` isn't set,
 * so local/dev environments aren't broken. Returns `{ ok, skipped?, error? }`.
 *
 * Env:
 *   RESEND_API_KEY   - required to actually send
 *   NOTIFY_EMAIL     - default destination (fallback: info@hippychicklife.com)
 *   NOTIFY_FROM      - verified `from` address (fallback: onboarding@resend.dev)
 */
export async function sendNotificationEmail({
  subject,
  text,
  html,
  replyTo,
  to,
}: SendEmailArgs): Promise<{
  ok: boolean;
  skipped?: boolean;
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: true, skipped: true };

  const destination = to || process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
  const from =
    process.env.NOTIFY_FROM || "Hippy Chick Life <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [destination],
        subject,
        text,
        ...(html ? { html } : {}),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderContactEmail(input: {
  name: string;
  email: string;
  company?: string;
  project_type?: string;
  budget_range?: string;
  message: string;
}): { subject: string; text: string; html: string } {
  const subject = `New contact inquiry — ${input.name}`;
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company ? `Company: ${input.company}` : null,
    input.project_type ? `Project type: ${input.project_type}` : null,
    input.budget_range ? `Budget: ${input.budget_range}` : null,
    "",
    "Message:",
    input.message,
  ].filter(Boolean) as string[];
  const text = lines.join("\n");

  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "—"],
    ["Project", input.project_type || "—"],
    ["Budget", input.budget_range || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6b5a52;font:500 13px system-ui">${k}</td><td style="padding:6px 0;color:#2a1a1a;font:400 14px system-ui">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font:14px system-ui,sans-serif;color:#2a1a1a;max-width:560px">
      <h2 style="font:600 18px 'Fraunces',serif;color:#5b2c4a;margin:0 0 12px">New contact inquiry</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">${rows}</table>
      <div style="white-space:pre-wrap;padding:14px 16px;background:#fdf7f1;border-radius:10px;border:1px solid #eadfd4">${escapeHtml(input.message)}</div>
    </div>
  `;

  return { subject, text, html };
}
