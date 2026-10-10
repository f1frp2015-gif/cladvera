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
  reviewGuidance: { title: string; items: Array<{ title: string; body: string }> };
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
    reviewGuidance: {
      "title": "Define the metal composite construction.",
      "items": [
        {
          "title": "Identify the faces and core",
          "body": "Specify the required face metal, gauge, core, overall thickness and sheet dimensions. ALMINE describes metal skins; ask for the exact construction before accepting the product against an aluminum composite material specification."
        },
        {
          "title": "Match the finish and fabrication scope",
          "body": "Provide the coating and color reference, a finish sample requirement and the panel layout. State whether the inquiry concerns flat sheets or fabricated panels, then confirm the offered scope, attachment details and supporting substrate."
        },
        {
          "title": "Request the applicable fire evidence",
          "body": "Ask for the classification report identifying the tested panel construction, method and report number. Have the design team match that evidence to the intended interior use or complete exterior wall assembly before specification."
        }
      ]
    },
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
    reviewGuidance: {
      "title": "Prepare a transit panel submission.",
      "items": [
        {
          "title": "Define the installation environment",
          "body": "Identify the rail or tunnel location, panel dimensions, face metal, finish and substrate. Include the proposed fixing details and the transit authority requirements so the offered construction can be reviewed against the actual installation."
        },
        {
          "title": "Coordinate cleaning with the finish",
          "body": "Describe the planned cleaning method and products, then request guidance for the offered surface. ALMINE describes a washable, wear-resistant face; ask for the relevant cleaning, abrasion and impact evidence instead of relying on that description alone."
        },
        {
          "title": "Assemble the authority review package",
          "body": "List the required fire, smoke and durability reports with the panel and coating identification. Check that the submitted evidence corresponds to the construction on the quotation and the fixing details proposed for the transit project."
        }
      ]
    },
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
    reviewGuidance: {
      "title": "Review the healthcare interior finish.",
      "items": [
        {
          "title": "Define the room and cleaning requirements",
          "body": "Identify the healthcare interior area, panel sizes, finish and intended cleaning protocol. Request the manufacturer's guidance for the proposed coating and cleaning chemicals so the facility team can review their compatibility."
        },
        {
          "title": "Identify what the antibacterial report tests",
          "body": "Request the test method, organisms, reported reduction values and tested finish, together with the report date and identification. Match those details to the offered coating when reviewing ALMINE's published antibacterial and mildew-resistant claims."
        },
        {
          "title": "Review the complete interior construction",
          "body": "Confirm the face metal, core, coating and installation details alongside the applicable fire and interior-finish reports. Keep the approved sample and report references with the panel schedule so a finish change can be reviewed before ordering."
        }
      ]
    },
    sourceUrl: almineSourceUrl,
    visual: "medical",
  },
];

export function findAlmineProduct(slug: AlmineProductSlug) {
  return almineProducts.find((product) => product.slug === slug)!;
}
