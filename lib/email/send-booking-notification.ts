import { getEmailConfig } from "@/lib/email/client";
import {
  BookingNotificationEmail,
  type BookingEmailData,
} from "@/lib/email/templates/booking-notification";

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendBookingNotification(
  data: BookingEmailData,
): Promise<SendResult> {
  const config = getEmailConfig();
  if (!config) {
    return { ok: false, error: "email_not_configured" };
  }

  try {
    const { error } = await config.client.emails.send({
      from: config.fromEmail,
      to: config.clinicEmail,
      subject: `Новая заявка с сайта — ${data.name}`,
      react: BookingNotificationEmail(data),
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
