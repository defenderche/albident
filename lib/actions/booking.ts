"use server";

import { getServiceRoleClient } from "@/lib/db/supabase";
import { sendBookingNotification } from "@/lib/email/send-booking-notification";
import { bookingSchema } from "@/lib/validation/booking";

export type BookingResult = { success: true } | { error: string };

export async function submitBooking(input: unknown): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "validation" };
  }

  const data = parsed.data;

  try {
    const supabase = getServiceRoleClient();
    const { error } = await supabase.from("bookings").insert({
      name: data.name,
      phone: data.phone,
      city: emptyToNull(data.city),
      service: emptyToNull(data.service),
      preferred_time: emptyToNull(data.preferredTime),
      comment: emptyToNull(data.comment),
      consent: data.consent,
      locale: data.locale,
    });

    if (error) {
      console.error("Booking insert failed", error);
      return { error: "database" };
    }

    const emailResult = await sendBookingNotification({
      name: data.name,
      phone: data.phone,
      city: emptyToNull(data.city),
      service: emptyToNull(data.service),
      preferredTime: emptyToNull(data.preferredTime),
      comment: emptyToNull(data.comment),
      locale: data.locale,
      submittedAt: new Date(),
    });
    if (!emailResult.ok) {
      console.error("Booking email notification failed", emailResult.error);
    }

    return { success: true };
  } catch (error) {
    console.error("Booking submission failed", error);
    return { error: "database" };
  }
}

function emptyToNull(value: string | undefined): string | null {
  if (value === undefined || value === "") return null;
  return value;
}
