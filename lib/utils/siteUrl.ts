/**
 * Base URL for absolute links (sitemap, robots, metadata).
 * Falls back to localhost so dev builds work without env config;
 * production sets NEXT_PUBLIC_SITE_URL in the Vercel Dashboard.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}
