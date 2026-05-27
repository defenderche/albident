import { Resend } from "resend";

export type EmailConfig = {
  client: Resend;
  fromEmail: string;
  clinicEmail: string;
};

let cached: EmailConfig | null = null;

export function getEmailConfig(): EmailConfig | null {
  if (cached) return cached;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const clinicEmail = process.env.CLINIC_EMAIL;

  if (!apiKey || !fromEmail || !clinicEmail) {
    return null;
  }

  cached = {
    client: new Resend(apiKey),
    fromEmail,
    clinicEmail,
  };
  return cached;
}
