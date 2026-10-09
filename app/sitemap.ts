import type { MetadataRoute } from "next";
import { routes } from "@/content/data/navigation";
import { absoluteUrl } from "@/lib/seo";
import { isPublishedPath } from "@/content/data/publication";

// Add lastModified only when a reliable content-change date exists per route.
const priorityValue = { P0: 0.8, P1: 0.6, P2: 0.4 } as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((r) => r.index && isPublishedPath(r.path))
    .map((r) => ({
      url: absoluteUrl(r.path),
      changeFrequency: r.changeFrequency,
      priority: r.path === "/" ? 1 : priorityValue[r.priority],
    }));
}
