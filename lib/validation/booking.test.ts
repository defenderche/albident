import { describe, expect, it } from "vitest";
import { bookingSchema } from "./booking";

const valid = {
  name: "Иван Иванов",
  phone: "+90 555 123 45 67",
  city: "Стамбул",
  service: "implants",
  preferredTime: "после 18:00",
  comment: "",
  consent: true,
  locale: "ru",
} as const;

describe("bookingSchema", () => {
  it("принимает полностью заполненную валидную форму", () => {
    expect(bookingSchema.safeParse(valid).success).toBe(true);
  });

  it("принимает только обязательные поля", () => {
    const minimal = {
      name: "Иван",
      phone: "+905551234567",
      consent: true,
      locale: "ru",
    };
    expect(bookingSchema.safeParse(minimal).success).toBe(true);
  });

  it("разрешает пустые строки в опциональных полях", () => {
    const result = bookingSchema.safeParse({
      ...valid,
      city: "",
      service: "",
      preferredTime: "",
      comment: "",
    });
    expect(result.success).toBe(true);
  });

  it("отклоняет имя короче 2 символов", () => {
    const result = bookingSchema.safeParse({ ...valid, name: "И" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("nameTooShort");
    }
  });

  it("отклоняет имя из пробелов", () => {
    const result = bookingSchema.safeParse({ ...valid, name: "  " });
    expect(result.success).toBe(false);
  });

  it("отклоняет пустой телефон", () => {
    const result = bookingSchema.safeParse({ ...valid, phone: "" });
    expect(result.success).toBe(false);
  });

  it("отклоняет телефон с буквами", () => {
    const result = bookingSchema.safeParse({ ...valid, phone: "+90 555 abc" });
    expect(result.success).toBe(false);
  });

  it("отклоняет телефон менее 10 цифр", () => {
    const result = bookingSchema.safeParse({ ...valid, phone: "+1 234 567" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "phoneTooShort")).toBe(true);
    }
  });

  it("принимает телефон без +, с дефисами и скобками", () => {
    const result = bookingSchema.safeParse({ ...valid, phone: "(905) 551-234-567" });
    expect(result.success).toBe(true);
  });

  it("отклоняет consent=false", () => {
    const result = bookingSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "consentRequired")).toBe(true);
    }
  });

  it("отклоняет service вне списка", () => {
    const result = bookingSchema.safeParse({ ...valid, service: "magic" });
    expect(result.success).toBe(false);
  });

  it("принимает service='other'", () => {
    const result = bookingSchema.safeParse({ ...valid, service: "other" });
    expect(result.success).toBe(true);
  });

  it("отклоняет неизвестную локаль", () => {
    const result = bookingSchema.safeParse({ ...valid, locale: "de" });
    expect(result.success).toBe(false);
  });
});
