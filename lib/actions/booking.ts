"use server";

import { bookingSchema } from "@/lib/validation/booking";

export type BookingResult = { success: true } | { error: string };

export async function submitBooking(input: unknown): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "validation" };
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  return { success: true };
}
