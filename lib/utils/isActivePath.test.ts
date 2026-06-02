import { describe, expect, it } from "vitest";
import { isActivePath } from "./isActivePath";

describe("isActivePath", () => {
  it("home is active only on the exact root path", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/services", "/")).toBe(false);
    expect(isActivePath("/about", "/")).toBe(false);
  });

  it("matches a section on its own path", () => {
    expect(isActivePath("/services", "/services")).toBe(true);
    expect(isActivePath("/about", "/about")).toBe(true);
  });

  it("matches a section on its descendant pages", () => {
    expect(isActivePath("/services/implants", "/services")).toBe(true);
  });

  it("does not match unrelated paths that share a prefix string", () => {
    expect(isActivePath("/services-extra", "/services")).toBe(false);
    expect(isActivePath("/contacts", "/services")).toBe(false);
  });
});
