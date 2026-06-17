import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

/** Locale-agnostic paths (no leading slash). Empty string = home. */
const STATIC_PATHS = ["", "services", "about", "contacts", "booking", "privacy"];

/** Build a localized absolute URL: baseUrl + /locale [+ /path]. */
function localizedUrl(baseUrl: string, locale: string, path: string): string {
  return path ? `${baseUrl}/${locale}/${path}` : `${baseUrl}/${locale}`;
}

/**
 * Build sitemap entries for every page on every locale, each annotated with
 * hreflang alternates (one per locale + x-default → defaultLocale).
 */
export function buildSitemapEntries(
  baseUrl: string,
  serviceSlugs: string[],
): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...serviceSlugs.map((slug) => `services/${slug}`),
  ];

  return paths.flatMap((path) => {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = localizedUrl(baseUrl, locale, path);
    }
    languages["x-default"] = localizedUrl(baseUrl, routing.defaultLocale, path);

    return routing.locales.map((locale) => ({
      url: localizedUrl(baseUrl, locale, path),
      alternates: { languages },
    }));
  });
}
