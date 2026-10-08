import type { MetadataRoute } from "next";
import { site } from "@/content/data/site";
import { absoluteUrl } from "@/lib/seo";
import { publishedCollectionPaths } from "@/content/data/publication";

const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  if (site.stage === "draft") {
    return {
      rules: [{
        userAgent: "*",
        allow: [...publishedCollectionPaths.flatMap((path) => [path, `${path}/`]), "/_next/", "/sitemap.xml"],
        disallow: "/",
      }],
      sitemap: absoluteUrl("/sitemap.xml"),
    };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: ["/", "/llms.txt"], disallow: ["/api/"] })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
