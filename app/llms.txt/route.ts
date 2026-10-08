import { routes } from "@/content/data/navigation";
import { catalogProducts } from "@/content/data/catalog";
import { isPublishedPath } from "@/content/data/publication";
import { absoluteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export function GET() {
  const lines = ["# Cladvera", "", "> Architectural material selection and project supply.", "", "Cladvera is a supplier. Product descriptions are attributed to named manufacturer sources; approval, availability, price, stock and delivery are confirmed for a specific offered construction and project.", "", "## Products", ...catalogProducts.map(p => `- [${p.manufacturer} — ${p.name}](${absoluteUrl(p.path)}): ${p.summary}`), "", "## Design and procurement", ...routes.filter(r => r.index && isPublishedPath(r.path) && !catalogProducts.some(p => p.path === r.path)).map(r => `- [${r.title}](${absoluteUrl(r.path)})`), "", "Project requests: sales@cladvera.com. Product shortlists can be carried into samples, document requests and quote briefs.", "Only the routes listed here are reviewed public content. Other legacy draft pages are excluded."];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
