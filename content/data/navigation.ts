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

export const mainNav: NavGroup[] = [
  {
    label: "Materials",
    href: "/materials",
    links: [
      {
        label: "Exterior Phenolic (HPL) Panels",
        href: "/materials/exterior-hpl-panels",
        description: "Compact laminate for facades, soffits and cladding",
      },
      {
        label: "UHPC Facade Panels",
        href: "/materials/uhpc-panels",
        description: "Thin ultra high performance concrete, with an engineering partner",
      },
      {
        label: "TAKTL product reference",
        href: "/suppliers/taktl",
        description: "Attributed manufacturer catalogue; Cladvera sourcing to confirm",
      },
      {
        label: "Aluminum Composite (ACM) Panels",
        href: "/materials/acm-panels",
        description: "FR core for interiors and low-rise exteriors",
      },
      {
        label: "Wood Veneer Panels",
        href: "/materials/wood-veneer-panels",
        description: "Real veneer on a thermoset core; classification pending for the US",
      },
      {
        label: "Interior HPL Panels",
        href: "/materials/interior-hpl-panels",
        description: "Decorative laminate panels for commercial interiors",
      },
      {
        label: "Compare ACM, HPL and UHPC",
        href: "/resources/acm-vs-hpl-vs-uhpc",
        description: "Thickness, weight, fire tests and cost bands side by side",
      },
      {
        label: "Commercial Interior Wall Panels",
        href: "/applications/interior-wall-panels",
        description: "Materials by interior use",
      },
    ],
  },
  {
    label: "Finishes",
    href: "/finishes",
    links: [
      { label: "All finishes", href: "/finishes", description: "Filter by material and interior or exterior use" },
      { label: "Wood-grain finishes", href: "/finishes/wood-grain", description: "Real veneer, printed decor and wood-grain ACM compared" },
      { label: "Concrete textures", href: "/finishes/textured-concrete", description: "Smooth, sandblasted, ribbed and board-formed UHPC" },
    ],
  },
  {
    label: "Technical",
    links: [
      { label: "Technical resources", href: "/technical-resources", description: "Data sheets, CSI sections, CAD and BIM" },
      { label: "Compliance", href: "/compliance", description: "Test status by product, country and assembly" },
      { label: "Systems", href: "/systems", description: "Compatible attachment systems and design responsibility" },
      { label: "Fabrication", href: "/fabrication", description: "Routing, folding, CNC and protective film" },
      { label: "Color variation", href: "/resources/panel-color-variation", description: "Batch matching, range samples and ΔE tolerances" },
    ],
  },
  {
    label: "Supply",
    links: [
      { label: "Stock and lead times", href: "/stock-and-lead-times", description: "What is held, MOQ and transit by port" },
      { label: "Supply and delivery", href: "/supply-and-delivery", description: "Incoterms, importer of record, documents" },
      { label: "Warranty", href: "/warranty", description: "Coating, material and maintenance terms" },
      { label: "Pricing guide", href: "/pricing-guide", description: "What moves a quote, without fixed prices" },
      { label: "Canada", href: "/canada", description: "Surtax, CAN/ULC S134 and GST notes" },
    ],
  },
  { label: "Projects", href: "/projects", links: [] },
  { label: "Architects", href: "/architects", links: [] },
  { label: "Fabricators & Distributors", href: "/for-contractors", links: [] },
];

export const ctaNav: NavLink[] = [
  { label: "Samples", href: "/samples" },
  { label: "Request a Quote", href: "/request-quote" },
];

export const footerNav: Array<{ heading: string; links: NavLink[] }> = [
  {
    heading: "Materials",
    links: [
      { label: "Exterior phenolic (HPL) panels", href: "/materials/exterior-hpl-panels" },
      { label: "UHPC facade panels", href: "/materials/uhpc-panels" },
      { label: "TAKTL product reference", href: "/suppliers/taktl" },
      { label: "Aluminum composite (ACM) panels", href: "/materials/acm-panels" },
      { label: "Wood veneer panels", href: "/materials/wood-veneer-panels" },
      { label: "Interior HPL panels", href: "/materials/interior-hpl-panels" },
      { label: "Finishes", href: "/finishes" },
    ],
  },
  {
    heading: "Technical",
    links: [
      { label: "Technical resources", href: "/technical-resources" },
      { label: "Compliance", href: "/compliance" },
      { label: "Systems", href: "/systems" },
      { label: "Fabrication", href: "/fabrication" },
      { label: "ACM vs HPL vs UHPC", href: "/resources/acm-vs-hpl-vs-uhpc" },
      { label: "UHPC vs GFRC", href: "/resources/uhpc-vs-gfrc" },
    ],
  },
  {
    heading: "Supply",
    links: [
      { label: "Stock and lead times", href: "/stock-and-lead-times" },
      { label: "Supply and delivery", href: "/supply-and-delivery" },
      { label: "Warranty", href: "/warranty" },
      { label: "Pricing guide", href: "/pricing-guide" },
      { label: "Canada", href: "/canada" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Architects", href: "/architects" },
      { label: "Fabricators and distributors", href: "/for-contractors" },
      { label: "Projects", href: "/projects" },
      { label: "Samples", href: "/samples" },
      { label: "Request a quote", href: "/request-quote" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
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
  { path: "/", title: "Home", priority: "P0", changeFrequency: "weekly", index: true },
  { path: "/materials", title: "Materials", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/materials/exterior-hpl-panels", title: "Exterior Phenolic (HPL) Panels", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/materials/uhpc-panels", title: "UHPC Facade Panels", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/suppliers/taktl", title: "TAKTL Product Reference", priority: "P1", changeFrequency: "monthly", index: false },
  { path: "/suppliers/taktl/facade-elements", title: "TAKTL A|UHPC Facade Elements", priority: "P1", changeFrequency: "monthly", index: false },
  { path: "/suppliers/taktl/korsa-aggregate", title: "TAKTL KORSA Aggregate Panels", priority: "P1", changeFrequency: "monthly", index: false },
  { path: "/suppliers/taktl/sola", title: "TAKTL SOLA Self-Cleaning Panels", priority: "P1", changeFrequency: "monthly", index: false },
  { path: "/suppliers/taktl/custom-elements", title: "TAKTL Custom Elements", priority: "P1", changeFrequency: "monthly", index: false },
  { path: "/suppliers/taktl/hardware", title: "TAKTL Hardware", priority: "P1", changeFrequency: "monthly", index: false },
  { path: "/materials/acm-panels", title: "Aluminum Composite (ACM) Panels", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/materials/wood-veneer-panels", title: "Wood Veneer Panels", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/materials/interior-hpl-panels", title: "Interior HPL Panels", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/finishes", title: "Finishes", priority: "P0", changeFrequency: "weekly", index: true },
  { path: "/finishes/wood-grain", title: "Wood-Grain Finishes", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/finishes/textured-concrete", title: "Concrete Textures", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/architects", title: "For Architects and Designers", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/for-contractors", title: "For Fabricators, Distributors and Contractors", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/technical-resources", title: "Technical Resources", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/compliance", title: "Compliance", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/systems", title: "Systems", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/fabrication", title: "Fabrication", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/stock-and-lead-times", title: "Stock and Lead Times", priority: "P0", changeFrequency: "weekly", index: true },
  { path: "/supply-and-delivery", title: "Supply and Delivery", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/warranty", title: "Warranty", priority: "P0", changeFrequency: "yearly", index: true },
  { path: "/pricing-guide", title: "Pricing Guide", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/canada", title: "Canada", priority: "P1", changeFrequency: "monthly", index: true },
  { path: "/samples", title: "Samples", priority: "P0", changeFrequency: "monthly", index: true },
  { path: "/request-quote", title: "Request a Quote", priority: "P0", changeFrequency: "yearly", index: true },
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
