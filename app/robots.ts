import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { publishedPaths } from "@/content/data/publication";
import { routes } from "@/content/data/navigation";
import { finishes } from "@/content/data/finishes";
export default function robots(): MetadataRoute.Robots {
  // Known legacy URLs must be crawlable so crawlers can observe their 404s
  // or permanent redirects. Rendering remains gated by publication.ts.
  const crawlablePaths = [...publishedPaths, ...routes.map(route => route.path), ...finishes.map(finish => `/finishes/${finish.code.toLowerCase()}`)];
  return {
    // Keep faceted query URLs and unregistered paths blocked. Per-page
    // noindex still applies to the reviewed request and comparison workflows.
    rules: [{ userAgent: "*", allow: [...new Set(crawlablePaths)].map(path => `${path}$`).concat(["/_next/", "/images/", "/documents/", "/sitemap.xml", "/llms.txt", "/opengraph-image", "/icon.svg"]), disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
