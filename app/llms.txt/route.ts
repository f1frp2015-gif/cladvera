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
    `${site.brand} is a supplier, not the manufacturer of the listed products. UHPC entries are generic material inquiries with manufacturer, origin and specifications to be confirmed. Manufacturing origin is confirmed for each exact offered product.`, "",
    "Named product references are attributed to their sources. Generic UHPC entries do not establish brand affiliation, product equivalence or performance. Approval, availability, price, stock and delivery are confirmed for a specific offered construction and project.", "",
    "## Products", ...products.map(product => `- [${product.manufacturer} — ${product.name}](${absoluteUrl(product.path)}): ${product.summary}`), "",
    "## Design and procurement", ...routes.filter(route => route.index && isPublishedPath(route.path) && !products.some(product => product.path === route.path)).map(route => `- [${route.title}](${absoluteUrl(route.path)})`), "",
    `Project requests: ${site.contact.email}. Product shortlists can be carried into samples, document requests and quote requests, sent with drawings attached.`,
    "This index lists reviewed content pages. Request forms and comparison tools are available through the website; unreviewed legacy drafts are excluded.",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
