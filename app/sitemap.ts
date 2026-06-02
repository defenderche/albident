import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { buildSitemapEntries } from "@/lib/utils/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(getSiteUrl());
}
