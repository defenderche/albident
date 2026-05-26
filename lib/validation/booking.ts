import { z } from "zod";

export const BOOKING_SERVICE_VALUES = [
  "therapy",
  "surgery",
  "implants",
  "prosthetics",
  "orthodontics",
  "aesthetics",
  "hygiene",
  "periodontology",
  "other",
] as const;

export type BookingService = (typeof BOOKING_SERVICE_VALUES)[number];

const phoneRegex = /^[+\d\s\-()]+$/;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, { message: "nameTooShort" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "phoneRequired" })
    .regex(phoneRegex, { message: "phoneInvalid" })
    .refine((v) => (v.match(/\d/g) ?? []).length >= 10, {
      message: "phoneTooShort",
    }),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.enum(BOOKING_SERVICE_VALUES).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(120).optional().or(z.literal("")),
  comment: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, { message: "consentRequired" }),
  locale: z.enum(["ru", "en", "tr"]),
});

export type BookingInput = z.infer<typeof bookingSchema>;
