import { describe, expect, it } from "vitest";
import { chatRequestSchema } from "./chat";

const validBody = {
  messages: [{ role: "user", content: "Сколько стоит имплантация?" }],
  locale: "ru",
};

describe("chatRequestSchema", () => {
  it("принимает валидное тело запроса", () => {
    expect(chatRequestSchema.safeParse(validBody).success).toBe(true);
  });

  it("отклоняет пустой массив сообщений", () => {
    expect(
      chatRequestSchema.safeParse({ ...validBody, messages: [] }).success,
    ).toBe(false);
  });

  it("отклоняет неподдерживаемую локаль", () => {
    expect(
      chatRequestSchema.safeParse({ ...validBody, locale: "de" }).success,
    ).toBe(false);
  });

  it("отклоняет недопустимую роль", () => {
    expect(
      chatRequestSchema.safeParse({
        ...validBody,
        messages: [{ role: "system", content: "x" }],
      }).success,
    ).toBe(false);
  });

  it("отклоняет пустое содержимое сообщения", () => {
    expect(
      chatRequestSchema.safeParse({
        ...validBody,
        messages: [{ role: "user", content: "" }],
      }).success,
    ).toBe(false);
  });

  it("отклоняет слишком длинное сообщение", () => {
    expect(
      chatRequestSchema.safeParse({
        ...validBody,
        messages: [{ role: "user", content: "x".repeat(4001) }],
      }).success,
    ).toBe(false);
  });

  it("отклоняет более 40 сообщений в истории", () => {
    const messages = Array.from({ length: 41 }, () => ({
      role: "user" as const,
      content: "hi",
    }));
    expect(
      chatRequestSchema.safeParse({ ...validBody, messages }).success,
    ).toBe(false);
  });

  it("принимает чередующуюся историю user/assistant", () => {
    const messages = [
      { role: "user", content: "Привет" },
      { role: "assistant", content: "Здравствуйте!" },
      { role: "user", content: "Цены на виниры?" },
    ];
    expect(chatRequestSchema.safeParse({ ...validBody, messages }).success).toBe(
      true,
    );
  });
});
