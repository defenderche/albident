import { services } from "@/content/services";
import type { ServiceSlug } from "@/types/service";

const MARKER_PATTERN = /\[BOOK:([a-z0-9-]+)\]/g;

const VALID_SLUGS = new Set<string>(services.map((s) => s.slug));

export type BookingMarkerResult = {
  cleanedText: string;
  slug: ServiceSlug | null;
};

export function parseBookingMarker(text: string): BookingMarkerResult {
  let firstValidSlug: ServiceSlug | null = null;

  const cleanedText = text
    .replace(MARKER_PATTERN, (_match, rawSlug: string) => {
      if (firstValidSlug === null && VALID_SLUGS.has(rawSlug)) {
        firstValidSlug = rawSlug as ServiceSlug;
      }
      return "";
    })
    .replace(/[ \t]+([.,!?;:])/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { cleanedText, slug: firstValidSlug };
}
