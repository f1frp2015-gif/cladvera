import type { MetadataRoute } from "next";
import { site } from "@/content/data/site";
import { absoluteUrl } from "@/lib/seo";
import { publishedPaths } from "@/content/data/publication";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: site.stage === "draft" ? [...publishedPaths.map(path => `${path}$`), "/_next/", "/images/", "/documents/", "/sitemap.xml", "/llms.txt", "/opengraph-image"] : "/", disallow: site.stage === "draft" ? "/" : "/api/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
