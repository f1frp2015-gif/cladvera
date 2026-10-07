import type { MetadataRoute } from "next";
import { site } from "@/content/data/site";
import { absoluteUrl } from "@/lib/seo";

const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  if (site.stage === "draft") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: ["/", "/llms.txt"], disallow: ["/api/"] })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
