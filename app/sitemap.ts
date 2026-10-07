import type { MetadataRoute } from "next";
import { routes } from "@/content/data/navigation";
import { finishes } from "@/content/data/finishes";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date();

const priorityValue = { P0: 0.8, P1: 0.6, P2: 0.4 } as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes
    .filter((r) => r.index)
    .map((r) => ({
      url: absoluteUrl(r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.path === "/" ? 1 : priorityValue[r.priority],
    }));
  const finishPages = finishes.map((f) => ({
    url: absoluteUrl(`/finishes/${f.code.toLowerCase()}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...pages, ...finishPages];
}
