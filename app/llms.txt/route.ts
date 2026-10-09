import { routes } from "@/content/data/navigation";
import { catalogProducts } from "@/content/data/catalog";
import { isPublishedPath } from "@/content/data/publication";
import { site } from "@/content/data/site";
import { absoluteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export function GET() {
  const products = catalogProducts.filter(product => isPublishedPath(product.path) && routes.some(route => route.path === product.path && route.index));
  const lines = [
    `# ${site.brand}`, "", `> ${site.tagline}`, "", site.description, "",
    `${site.brand} is a supplier, not the manufacturer of the listed products. China export sourcing and the TAKTL manufacturer collection are distinct. Manufacturing origin is confirmed for the exact offered product.`, "",
    "Product descriptions are attributed to named manufacturer sources. Approval, availability, price, stock and delivery are confirmed for a specific offered construction and project.", "",
    "## Products", ...products.map(product => `- [${product.manufacturer} — ${product.name}](${absoluteUrl(product.path)}): ${product.summary}`), "",
    "## Design and procurement", ...routes.filter(route => route.index && isPublishedPath(route.path) && !products.some(product => product.path === route.path)).map(route => `- [${route.title}](${absoluteUrl(route.path)})`), "",
    `Project requests: ${site.contact.email}. Product shortlists can be carried into samples, document requests and quote briefs.`,
    "This index lists reviewed content pages. Request forms and comparison tools are available through the website; unreviewed legacy drafts are excluded.",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
