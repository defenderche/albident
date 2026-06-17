const MARKER_PATTERN = /\[BOOK:([a-z0-9-]+)\]/g;

export type BookingMarkerResult = {
  cleanedText: string;
  slug: string | null;
};

// validSlugs — актуальный набор slug'ов услуг (из БД, передаётся вызывающим),
// чтобы не действовать по выдуманному ботом slug.
export function parseBookingMarker(
  text: string,
  validSlugs: ReadonlySet<string>,
): BookingMarkerResult {
  let firstValidSlug: string | null = null;

  const cleanedText = text
    .replace(MARKER_PATTERN, (_match, rawSlug: string) => {
      if (firstValidSlug === null && validSlugs.has(rawSlug)) {
        firstValidSlug = rawSlug;
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
