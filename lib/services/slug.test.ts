import { describe, expect, it } from "vitest";
import { slugify, uniqueSlug } from "./slug";

describe("slugify", () => {
  it("приводит к нижнему регистру и дефисам", () => {
    expect(slugify("Dental Implants")).toBe("dental-implants");
  });

  it("убирает лишние символы и крайние дефисы", () => {
    expect(slugify("  Teeth & Gums!  ")).toBe("teeth-gums");
  });

  it("пустой результат для нелатиницы", () => {
    expect(slugify("Имплантация")).toBe("");
  });
});

describe("uniqueSlug", () => {
  it("возвращает базовый, если свободен", () => {
    expect(uniqueSlug("implants", new Set())).toBe("implants");
  });

  it("добавляет суффикс при коллизии", () => {
    expect(uniqueSlug("implants", new Set(["implants"]))).toBe("implants-2");
    expect(uniqueSlug("implants", new Set(["implants", "implants-2"]))).toBe(
      "implants-3",
    );
  });

  it("фолбэк 'service' для пустого базиса", () => {
    expect(uniqueSlug("", new Set())).toBe("service");
  });
});
