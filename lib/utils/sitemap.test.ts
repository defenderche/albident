import { describe, expect, it } from "vitest";
import { buildSitemapEntries } from "./sitemap";
import { routing } from "@/i18n/routing";

const BASE = "https://albident.example";
const SERVICE_SLUGS = ["therapy", "implants", "hygiene"];

describe("buildSitemapEntries", () => {
  const entries = buildSitemapEntries(BASE, SERVICE_SLUGS);

  it("produces one entry per (page × locale)", () => {
    const staticPages = 6; // /, services, about, contacts, booking, privacy
    const pages = staticPages + SERVICE_SLUGS.length;
    expect(entries).toHaveLength(pages * routing.locales.length);
  });

  it("prefixes every locale, including the default one", () => {
    expect(entries.map((e) => e.url)).toContain(`${BASE}/ru`);
    expect(entries.map((e) => e.url)).toContain(`${BASE}/en`);
    expect(entries.map((e) => e.url)).toContain(`${BASE}/tr`);
  });

  it("includes every service slug on every locale", () => {
    const urls = new Set(entries.map((e) => e.url));
    for (const slug of SERVICE_SLUGS) {
      for (const locale of routing.locales) {
        expect(urls.has(`${BASE}/${locale}/services/${slug}`)).toBe(true);
      }
    }
  });

  it("annotates each entry with hreflang alternates + x-default", () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages ?? {};
      for (const locale of routing.locales) {
        expect(languages[locale]).toBeDefined();
      }
      expect(languages["x-default"]).toBe(languages[routing.defaultLocale]);
    }
  });

  it("never emits a trailing slash for the home page", () => {
    expect(entries.map((e) => e.url)).not.toContain(`${BASE}/ru/`);
  });
});
