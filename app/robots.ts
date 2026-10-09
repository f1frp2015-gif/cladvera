import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { publishedPaths } from "@/content/data/publication";
export default function robots(): MetadataRoute.Robots {
  return {
    // Keep exact reviewed paths crawlable without opening legacy drafts or
    // every faceted query URL. Per-page noindex still applies to request forms.
    rules: [{ userAgent: "*", allow: [...new Set(publishedPaths)].map(path => `${path}$`).concat(["/_next/", "/images/", "/documents/", "/sitemap.xml", "/llms.txt", "/opengraph-image", "/icon.svg"]), disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
