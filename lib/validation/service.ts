import { z } from "zod";

// Форма услуги: владелец заполняет русские тексты + числа/флаги/списки.
// EN/TR получаются авто-переводом на сервере и в форму не вводятся.

const ruText = z.string().trim().min(1, { message: "required" });

const tripFact = z.object({
  value: ruText,
  caption: ruText,
});

export const serviceFormSchema = z
  .object({
    name: ruText,
    shortDescription: ruText,
    fullDescription: ruText,
    priceFrom: z.number().int().nonnegative({ message: "priceInvalid" }),
    priceTo: z.number().int().nonnegative({ message: "priceInvalid" }),
    showOnHome: z.boolean(),
    trip: z.object({ visits: tripFact, days: tripFact }),
    stages: z.array(
      z.object({ title: ruText, description: ruText }),
    ),
    subProcedures: z.array(
      z
        .object({
          name: ruText,
          priceFrom: z.number().int().nonnegative(),
          priceTo: z.number().int().nonnegative(),
        })
        .refine((s) => s.priceTo >= s.priceFrom, {
          message: "priceRange",
          path: ["priceTo"],
        }),
    ),
    faq: z.array(z.object({ q: ruText, a: ruText })),
    relatedDoctors: z.array(z.string()),
  })
  .refine((d) => d.priceTo >= d.priceFrom, {
    message: "priceRange",
    path: ["priceTo"],
  });

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
