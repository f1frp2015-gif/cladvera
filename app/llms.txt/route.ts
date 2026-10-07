import { routes } from "@/content/data/navigation";
import { materials } from "@/content/data/materials";
import { site } from "@/content/data/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${site.brand}`);
  lines.push("");
  lines.push(`> ${site.tagline}. ${site.origin}`);
  lines.push("");
  lines.push("## Facts");
  for (const c of site.commitments) lines.push(`- ${c}`);
  lines.push("");
  lines.push("## What is not claimed");
  for (const n of site.notClaimed) lines.push(`- ${n}`);
  lines.push("");
  lines.push("## Materials");
  for (const m of materials) {
    lines.push(`- [${m.name}](${absoluteUrl(`/materials/${m.slug}`)}): ${m.definition}`);
  }
  lines.push("");
  lines.push("## Pages");
  for (const r of routes.filter((r) => r.index && !r.path.startsWith("/materials/"))) {
    lines.push(`- [${r.title}](${absoluteUrl(r.path)})`);
  }
  lines.push("");
  lines.push(`Status: ${site.stage === "draft" ? "pre-launch draft; specifications and compliance statuses are placeholders" : "live"}.`);
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
