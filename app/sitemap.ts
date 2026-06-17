import type { MetadataRoute } from "next";
import { getServiceSlugs } from "@/lib/services";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { buildSitemapEntries } from "@/lib/utils/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceSlugs = await getServiceSlugs();
  return buildSitemapEntries(getSiteUrl(), serviceSlugs);
}
