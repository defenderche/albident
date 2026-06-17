import { z } from "zod";

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
  // Услуги динамические: схема принимает свободную строку (slug услуги или
  // "other"); фактическое членство проверяет Server Action по актуальной БД.
  service: z.string().trim().max(120).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(120).optional().or(z.literal("")),
  comment: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, { message: "consentRequired" }),
  locale: z.enum(["ru", "en", "tr"]),
});

export type BookingInput = z.infer<typeof bookingSchema>;
