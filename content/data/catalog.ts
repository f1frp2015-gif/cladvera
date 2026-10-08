import { taktlProducts } from "./taktl";
import { almineProducts } from "./almine";
import { compactwoodSources, compactwoodImages, compactwoodExteriorProductPath, compactwoodInteriorProductPath } from "./compactwood";

export const catalogCategories = [
  { id: "uhpc", label: "Architectural UHPC", description: "Concrete panels, aggregate surfaces and custom cast forms." },
  { id: "mcm", label: "Metal composite (ACM / MCM)", description: "Architectural, transit and healthcare panel families." },
  { id: "hpl", label: "Exterior HPL", description: "Decorative wood-fiber laminate for facade cladding." },
  { id: "interior-board", label: "Interior decorative boards", description: "High-pressure-cured boards for interior surfaces." },
  { id: "gfrp", label: "Custom GFRP", description: "Molded glass-fiber reinforced polymer architectural elements." },
  { id: "hardware", label: "Attachment components", description: "Manufacturer-specific rails, clips, anchors and fasteners." },
] as const;
export const catalogApplications = [
  { id: "facade", label: "Exterior facades", description: "Panel geometry, weather exposure and complete wall assemblies." },
  { id: "interior", label: "Interior walls & ceilings", description: "Finish, joints, cleaning and interior performance requirements." },
  { id: "transit", label: "Transit & tunnels", description: "Authority-specific fire, durability and maintenance requirements." },
  { id: "healthcare", label: "Healthcare interiors", description: "Cleaning protocols, finish evidence and service conditions." },
  { id: "custom", label: "Custom architectural forms", description: "Project geometry, molds, mock-ups and connection coordination." },
] as const;
export interface CatalogProduct {
  id: string; name: string; manufacturer: string; path: string; collectionPath: string;
  category: string; applications: string[]; selectionType: string; summary: string;
  construction: string; documentation: string; confirm: string; sourceUrl: string;
  documentUrl?: string; documentLabel?: string; imageUrl?: string; imageAlt?: string;
}
const taktlIds: Record<string, string> = { "facade-elements": "taktl-facade", "korsa-aggregate": "taktl-korsa", sola: "taktl-sola", "custom-elements": "taktl-custom", hardware: "taktl-hardware" };
const almineIds: Record<string, string> = { "a2-fireproof": "almine-a2", "tunnel-traffic": "almine-tunnel", "medical-antibacterial": "almine-medical" };
export const catalogProducts: CatalogProduct[] = [
  ...taktlProducts.map(p => ({
    id: taktlIds[p.slug], name: p.name, manufacturer: "TAKTL", path: `/suppliers/taktl/${p.slug}`, collectionPath: "/suppliers/taktl",
    category: p.slug === "hardware" ? "hardware" : "uhpc",
    applications: p.slug === "custom-elements" ? ["facade", "custom"] : p.slug === "facade-elements" ? ["facade", "interior"] : ["facade"],
    selectionType: p.type, summary: p.summary,
    construction: p.slug === "hardware" ? "TAKTL-specific attachment components." : "TAKTL architectural ultra-high performance concrete; finish and geometry depend on the selected family.",
    documentation: p.documentLabel || "Manufacturer product page; project documents by request.",
    confirm: "Panel layout, finish sample, attachment engineering, current reports and production scope.",
    sourceUrl: p.sourceUrl, documentUrl: p.documentUrl, documentLabel: p.documentLabel, imageUrl: p.imageUrl, imageAlt: p.imageAlt,
  })),
  ...almineProducts.map(p => ({
    id: almineIds[p.slug], name: p.name, manufacturer: "ALMINE", path: `/materials/acm-panels/${p.slug}`, collectionPath: "/materials/acm-panels",
    category: "mcm", applications: p.slug === "a2-fireproof" ? ["facade", "interior"] : p.slug === "tunnel-traffic" ? ["transit"] : ["healthcare", "interior"],
    selectionType: p.category, summary: p.summary, construction: "Metal-faced composite panel; confirm face metal, gauge and core for the offered construction.",
    documentation: "Manufacturer catalogue; product-specific data sheets and reports by request.", confirm: p.confirm.join("; "), sourceUrl: p.sourceUrl,
  })),
  { id: "compactwood-exterior", name: "Wood-fiber HPL facade board", manufacturer: "Compactwood", path: compactwoodExteriorProductPath, collectionPath: "/materials/exterior-hpl-panels", category: "hpl", applications: ["facade"], selectionType: "Exterior laminate panel", summary: "Decorative high-pressure laminate board described by Compactwood for exterior facade cladding.", construction: "Thermoset resin-impregnated wood-fiber kraft core and decorative face, pressed under heat and pressure.", documentation: "Manufacturer product and installation pages; project-specific reports by request.", confirm: "Board grade, dimensions, finish, weathering and fire reports, fastening layout and wall assembly.", sourceUrl: compactwoodSources.exteriorProduct, imageUrl: compactwoodImages.exteriorStructure, imageAlt: "Compactwood exterior HPL construction diagram" },
  { id: "compactwood-interior", name: "Paste Special Board", manufacturer: "Compactwood", path: compactwoodInteriorProductPath, collectionPath: "/materials/interior-hpl-panels", category: "interior-board", applications: ["interior"], selectionType: "Interior decorative board", summary: "High-pressure-cured decorative board for interior walls and ceilings. Confirm the offered core and grade.", construction: "Manufacturer describes wood or glass fiber with thermoset resins; exact HPL classification is unconfirmed.", documentation: "Manufacturer product page; exact construction and performance documents by request.", confirm: "Core selection, interior finish requirements, thickness, adhesive or mechanical fixing and substrate.", sourceUrl: compactwoodSources.interiorProduct, imageUrl: compactwoodImages.interiorStructure, imageAlt: "Compactwood interior decorative board diagram" },
  { id: "gfrp-custom", name: "Custom GFRP architectural elements", manufacturer: "Shandong Jinguang Group (Kinflare)", path: "/materials/gfrp-custom-elements", collectionPath: "/materials/gfrp-custom-elements", category: "gfrp", applications: ["custom", "facade", "interior"], selectionType: "Custom molded architectural component", summary: "Glass-fiber reinforced polymer forms developed from project geometry, surface requirements and installation conditions.", construction: "Molded glass-fiber reinforced polymer; resin, laminate and connection design are project-specific.", documentation: "Supplier presentation and project-specific technical review.", confirm: "3D geometry, panelization, laminate schedule, finish, fire evidence, support loads, molds and mock-up approval.", sourceUrl: "/materials/gfrp-custom-elements#supplier-document", documentUrl: "/documents/gfrp/kinflare-frp-capabilities-excerpt-2023.pdf", documentLabel: "Kinflare capabilities excerpt (Chinese, 2023)", imageUrl: "/images/gfrp/supplier-installed-elements.jpg", imageAlt: "Installed architectural elements shown in the Kinflare supplier presentation" },
];
export const MAX_SELECTION = 4;
export function parseProductIds(value: string | null | undefined): string[] {
  const valid = new Set(catalogProducts.map(p => p.id));
  return [...new Set((typeof value === "string" ? value : "").split(",").filter(id => valid.has(id)))].slice(0, MAX_SELECTION);
}
export function findCatalogProduct(id: string) { return catalogProducts.find(p => p.id === id); }
export function productRequestHref(id: string, intent: "quote" | "sample" | "documents" = "quote") {
  return `${intent === "sample" ? "/samples" : "/request-quote"}?products=${encodeURIComponent(id)}&intent=${intent}`;
}
export function filterCatalog(filters: { q?: string; category?: string; application?: string; manufacturer?: string }) {
  const q = (filters.q || "").trim().toLowerCase();
  return catalogProducts.filter(p => (!filters.category || p.category === filters.category) && (!filters.application || p.applications.includes(filters.application)) && (!filters.manufacturer || p.manufacturer === filters.manufacturer) && (!q || `${p.name} ${p.manufacturer} ${p.summary} ${p.selectionType} ${p.category}`.toLowerCase().includes(q)));
}
