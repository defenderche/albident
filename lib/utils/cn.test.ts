import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("комбинирует классы через clsx", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("разрешает конфликт Tailwind-классов через twMerge", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("игнорирует falsy-значения", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});
