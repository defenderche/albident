import { describe, expect, it } from "vitest";
import { parseBookingMarker } from "./parseBookingMarker";

const SLUGS = new Set(["implants", "therapy", "hygiene"]);

describe("parseBookingMarker", () => {
  it("без маркера возвращает текст как есть и slug = null", () => {
    const result = parseBookingMarker("Часы работы пн-сб 10-20.", SLUGS);
    expect(result.cleanedText).toBe("Часы работы пн-сб 10-20.");
    expect(result.slug).toBeNull();
  });

  it("извлекает валидный slug и вырезает маркер", () => {
    const result = parseBookingMarker(
      "Имплантация стоит от $1500. [BOOK:implants]",
      SLUGS,
    );
    expect(result.cleanedText).toBe("Имплантация стоит от $1500.");
    expect(result.slug).toBe("implants");
  });

  it("вырезает невалидный маркер, но не возвращает slug", () => {
    const result = parseBookingMarker(
      "Виниры — это эстетическая стоматология. [BOOK:veneers]",
      SLUGS,
    );
    expect(result.cleanedText).toBe("Виниры — это эстетическая стоматология.");
    expect(result.slug).toBeNull();
  });

  it("при нескольких маркерах берёт первый валидный и вырезает все", () => {
    const result = parseBookingMarker(
      "Скажу про имплантацию [BOOK:implants] и про виниры [BOOK:veneers].",
      SLUGS,
    );
    expect(result.cleanedText).toBe("Скажу про имплантацию и про виниры.");
    expect(result.slug).toBe("implants");
  });

  it("маркер в середине текста корректно убирается", () => {
    const result = parseBookingMarker("У нас [BOOK:therapy] есть терапия.", SLUGS);
    expect(result.cleanedText).toBe("У нас есть терапия.");
    expect(result.slug).toBe("therapy");
  });

  it("не падает на тексте только из маркера", () => {
    const result = parseBookingMarker("[BOOK:hygiene]", SLUGS);
    expect(result.cleanedText).toBe("");
    expect(result.slug).toBe("hygiene");
  });

  it("игнорирует маркер с пустым slug", () => {
    const result = parseBookingMarker("Ответ. [BOOK:]", SLUGS);
    expect(result.cleanedText).toBe("Ответ. [BOOK:]");
    expect(result.slug).toBeNull();
  });
});
