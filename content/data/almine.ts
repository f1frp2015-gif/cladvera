/**
 * ALMINE manufacturer information. The linked catalogue is the source of the
 * product names and the attributed descriptions below. A named product is not
 * a verified Cladvera SKU or a North American wall-assembly approval.
 */

export type AlmineProductSlug = "a2-fireproof" | "tunnel-traffic" | "medical-antibacterial";

export interface AlmineProduct {
  slug: AlmineProductSlug;
  name: string;
  category: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  manufacturerFacts: Array<{ label: string; value: string }>;
  confirm: string[];
  sourceUrl: string;
  visual: "a2" | "tunnel" | "medical";
}

export const almineSourceUrl = "https://www.alminecn.com/En/Products/?id=3";
export const almineTechnicalSources = [
  { name: "Installation systems", url: "https://www.alminecn.com/En/PageTech/?id=24", note: "Manufacturer system concepts; verify product-specific engineering details." },
  { name: "Testing data", url: "https://www.alminecn.com/En/PageTech/?id=25", note: "Request readable reports with test method, lab, number and panel build-up." },
  { name: "Decorative color card", url: "https://www.alminecn.com/En/PageTech/?id=26", note: "Use physical samples and a current finish schedule for approval." },
] as const;

export const almineProducts: AlmineProduct[] = [
  {
    slug: "a2-fireproof",
    name: "A2 Fireproof Metal Composite Panel",
    category: "Architectural metal composite panel",
    summary:
      "ALMINE describes a panel with an inorganic core between two metal faces for exterior and interior architectural surfaces. Its published product name uses A2; the classification report for the ordered construction must be checked.",
    metaTitle: "ALMINE A2 Metal Composite Panels | Cladvera",
    metaDescription:
      "Review ALMINE A2 fireproof metal composite panels, their manufacturer-described construction and uses, and the project documents needed before specification.",
    manufacturerFacts: [
      { label: "Core", value: "Inorganic material, described by ALMINE as noncombustible" },
      { label: "Faces", value: "Two metal skins; metal type and gauge are not stated on the public page" },
      { label: "Published uses", value: "Exterior and interior wall decoration, commercial and residential settings" },
    ],
    confirm: [
      "Exact face metal, gauge, core formulation, sheet thickness and available formats",
      "Fire classification report for the actual panel construction and target jurisdiction",
      "Coating, finish sample, attachment system and project-specific wall-assembly evidence",
    ],
    sourceUrl: almineSourceUrl,
    visual: "a2",
  },
  {
    slug: "tunnel-traffic",
    name: "Tunnel Traffic Dedicated Panel",
    category: "Transit metal composite panel",
    summary:
      "ALMINE presents this A2-core panel for rail and tunnel environments and describes a washable, wear-resistant face. Cleaning and durability requirements should be matched to the project and test evidence.",
    metaTitle: "ALMINE Tunnel Traffic Panels | Cladvera",
    metaDescription:
      "Explore ALMINE's tunnel and rail traffic metal composite panel, its manufacturer-described surface, and the evidence to request for transit specifications.",
    manufacturerFacts: [
      { label: "Core", value: "A2-grade inorganic core, as described by ALMINE" },
      { label: "Published use", value: "Rail and tunnel traffic settings" },
      { label: "Surface", value: "ALMINE describes it as washable and resistant to scratches and wear" },
    ],
    confirm: [
      "Face metal, panel size, surface finish and cleaning method for the offered construction",
      "Fire, smoke, impact, abrasion and cleaning reports required by the transit authority",
      "Fixing details and substrate compatibility for the project environment",
    ],
    sourceUrl: almineSourceUrl,
    visual: "tunnel",
  },
  {
    slug: "medical-antibacterial",
    name: "Medical Antibacterial Special Panel",
    category: "Healthcare metal composite panel",
    summary:
      "ALMINE markets a medical panel with antibacterial and mildew-resistant properties for healthcare interiors. Those performance claims require current test methods and reports for the specified finish.",
    metaTitle: "ALMINE Medical Antibacterial Panels | Cladvera",
    metaDescription:
      "Explore ALMINE's medical antibacterial metal composite panel for healthcare interiors, with manufacturer-source links and test evidence to verify before use.",
    manufacturerFacts: [
      { label: "Published use", value: "Medical and healthcare spaces" },
      { label: "Described properties", value: "ALMINE lists antibacterial, mildew-resistant and chemical-resistant performance" },
      { label: "Construction", value: "Listed within ALMINE's A-grade fireproof metal composite panel range" },
    ],
    confirm: [
      "Panel and coating construction, available formats, colors and cleanability",
      "Antibacterial test method, organisms, reduction values and report validity",
      "Applicable fire and interior finish reports for the project jurisdiction",
    ],
    sourceUrl: almineSourceUrl,
    visual: "medical",
  },
];

export function findAlmineProduct(slug: AlmineProductSlug) {
  return almineProducts.find((product) => product.slug === slug)!;
}
