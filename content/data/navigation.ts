import { catalogCategories } from "./catalog";

/**
 * Navigation and the route registry.
 *
 * `routes` is the single list of public pages. The sitemap, llms.txt and
 * scripts/check-sitemap-routes.mjs all read it, so a new page is added here
 * once and is then checked at build time.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  /** Group heading link, when the group has its own hub page. */
  href?: string;
  links: NavLink[];
}

export const productNavLinks: NavLink[] = [
  { label: "All products", href: "/products", description: "Browse and compare the complete product library" },
  ...catalogCategories.map(category => ({
    label: category.label,
    href: category.path,
    description: category.description,
  })),
];

export const mainNav: NavGroup[] = [
  { label: "Products", href: "/products", links: productNavLinks },
  { label: "Applications", href: "/applications", links: [] },
  { label: "Architects", href: "/architects", links: [] },
  { label: "Procurement", href: "/procurement", links: [] },
  { label: "Technical resources", href: "/technical-resources", links: [] },
];
export const ctaNav: NavLink[] = [
  { label: "Samples", href: "/samples" },
  { label: "Request a quote", href: "/request-quote" },
];
export const footerNav: Array<{ heading: string; links: NavLink[] }> = [
  { heading: "Products", links: [
    { label: "All products", href: "/products" },
    { label: "TAKTL UHPC facade panels", href: "/suppliers/taktl" },
    { label: "ALMINE metal composite", href: "/materials/acm-panels" },
    { label: "Exterior HPL facade panels", href: "/materials/exterior-hpl-panels" },
    { label: "Compactwood interior boards", href: "/materials/interior-hpl-panels" },
    { label: "Custom GFRP elements", href: "/materials/gfrp-custom-elements" },
    { label: "TAKTL attachment components", href: "/suppliers/taktl/hardware" },
  ] },
  { heading: "Design & selection", links: [
    { label: "Facade & interior applications", href: "/applications" },
    { label: "Panel specification for architects", href: "/architects" },
    { label: "Compare shortlist", href: "/compare" },
    { label: "Technical resources", href: "/technical-resources" },
    { label: "Request samples", href: "/samples" },
  ] },
  { heading: "Project procurement", links: [
    { label: "Procurement process", href: "/procurement" },
    { label: "Request a quote", href: "/request-quote" },
    { label: "Request documents", href: "/request-quote?intent=documents" },
  ] },
];

export type RoutePriority = "P0" | "P1" | "P2";

export interface RouteEntry {
  path: string;
  title: string;
  priority: RoutePriority;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** false keeps the page out of the sitemap (forms, privacy). */
  index: boolean;
}

export const routes: RouteEntry[] = [
  { path: "/products", title: "Product Finder", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/applications", title: "Applications", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/procurement", title: "Procurement", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/compare", title: "Compare Products", priority: "P1", changeFrequency: "monthly", index: false },
  { path: "/materials/gfrp-custom-elements", title: "Custom GFRP Architectural Elements", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/", title: "Home", priority: "P0", changeFrequency: "weekly", index: true },
  { path: "/materials", title: "Materials", priority: "P0", changeFrequency: "monthly", index: false },
  { path: "/materials/exterior-hpl-panels", title: "Compactwood Exterior HPL Panels", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/materials/exterior-hpl-panels/wood-fiber-facade", title: "Compactwood Wood-Fiber HPL Facade Board", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/materials/uhpc-panels", title: "UHPC Facade Panels", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/suppliers/taktl", title: "TAKTL Architectural UHPC", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/suppliers/taktl/facade-elements", title: "TAKTL A|UHPC Facade Elements", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/suppliers/taktl/korsa-aggregate", title: "TAKTL KORSA Aggregate Panels", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/suppliers/taktl/sola", title: "TAKTL SOLA Self-Cleaning Panels", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/suppliers/taktl/custom-elements", title: "TAKTL Custom Elements", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/suppliers/taktl/hardware", title: "TAKTL Hardware", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/materials/acm-panels", title: "ALMINE Metal Composite (ACM / MCM)", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/materials/acm-panels/a2-fireproof", title: "ALMINE A2 Metal Composite Panels", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/materials/acm-panels/tunnel-traffic", title: "ALMINE Tunnel Traffic Panels", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/materials/acm-panels/medical-antibacterial", title: "ALMINE Medical Antibacterial Panels", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/materials/wood-veneer-panels", title: "Wood Veneer Panels", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/materials/interior-hpl-panels", title: "Compactwood Interior Decorative Boards", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/materials/interior-hpl-panels/paste-special-board", title: "Compactwood Paste Special Board", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/finishes", title: "Finishes", priority: "P0", changeFrequency: "weekly", index: true },
  { path: "/finishes/wood-grain", title: "Wood-Grain Finishes", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/finishes/textured-concrete", title: "Concrete Textures", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/architects", title: "For Architects and Designers", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/for-contractors", title: "For Fabricators, Distributors and Contractors", priority: "P0", changeFrequency: "monthly", index: false },
  { path: "/technical-resources", title: "Technical Resources", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/compliance", title: "Compliance", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/systems", title: "Systems", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/fabrication", title: "Fabrication", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/stock-and-lead-times", title: "Stock and Lead Times", priority: "P0", changeFrequency: "weekly", index: true },
  { path: "/supply-and-delivery", title: "Supply and Delivery", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/warranty", title: "Warranty", priority: "P0", changeFrequency: "yearly", index: true },
  { path: "/pricing-guide", title: "Pricing Guide", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/canada", title: "Canada", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/samples", title: "Samples", priority: "P0", changeFrequency: "monthly", index: false },
  { path: "/request-quote", title: "Request a Quote", priority: "P0", changeFrequency: "yearly", index: false },
  { path: "/about", title: "About", priority: "P0", changeFrequency: "yearly", index: true },
  { path: "/contact", title: "Contact", priority: "P0", changeFrequency: "yearly", index: true },
  { path: "/projects", title: "Projects", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/applications/interior-wall-panels", title: "Commercial Interior Wall Panels", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/resources/panel-color-variation", title: "Panel Color Variation", priority: "P0", changeFrequency: "yearly", index: true },
  { path: "/resources/acm-vs-hpl-vs-uhpc", title: "ACM vs HPL vs UHPC", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/resources/uhpc-vs-gfrc", title: "UHPC vs GFRC", priority: "P0", changeFrequency: "yearly", index: true },
  { path: "/privacy", title: "Privacy", priority: "P2", changeFrequency: "yearly", index: false },
];

export function routeTitle(path: string) {
  return routes.find((r) => r.path === path)?.title ?? path;
}
