/**
 * TAKTL-branded products offered for project inquiries through Cladvera.
 * Manufacturer specifications remain distinct from Cladvera's core ranges.
 * Product text is original; photos link to TAKTL-hosted assets.
 */

export type TaktlProductSlug =
  | "facade-elements"
  | "korsa-aggregate"
  | "sola"
  | "custom-elements"
  | "hardware";

export interface TaktlProduct {
  slug: TaktlProductSlug;
  name: string;
  type: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  facts: Array<{ label: string; value: string }>;
  applications: string[];
  options: string[];
  reviewGuidance: { title: string; items: Array<{ title: string; body: string }> };
  sourceUrl: string;
  documentUrl?: string;
  documentLabel?: string;
  imageUrl: string;
  imageAlt: string;
  visual: "ribs" | "aggregate" | "light" | "form" | "hardware";
}

export const taktlProducts: TaktlProduct[] = [
  {
    slug: "facade-elements",
    name: "A|UHPC® Facade Elements",
    type: "Architectural UHPC panels",
    summary:
      "TAKTL's core architectural concrete panel system for exterior envelopes and selected interior spaces. Project layouts, texture, color and attachment are coordinated with the manufacturer.",
    metaTitle: "TAKTL A|UHPC Facade Elements | Cladvera",
    metaDescription:
      "Explore TAKTL A|UHPC facade panels, standard dimensions, colors, textures and attachment choices. Manufacturer facts are linked for project verification.",
    facts: [
      { label: "Standard thickness", value: "5/8 in (about 16 mm)" },
      { label: "Nominal formats", value: "48 × 120 in and 48 × 144 in" },
      // The current source page distinguishes standard/custom limits differently
      // across its prose and table. Confirm the current offered format directly.
      { label: "Standard and custom limits", value: "Format varies by construction; confirm current standard and custom limits with TAKTL" },
      { label: "Attachment", value: "Visible fasteners or concealed undercut anchors, subject to assembly design" },
    ],
    applications: ["Field-set rainscreens", "Prefabricated facade assemblies", "Interior public-space walls"],
    options: ["Nine standard colors", "Nine standard textures", "Cast or Mediablast surface", "Project-specific color and texture"],
    reviewGuidance: {
      "title": "Prepare the UHPC panel schedule",
      "items": [
        {
          "title": "Set out the facade",
          "body": "Share elevations with panel dimensions, quantities, joints and proposed returns. Identify field-set or prefabricated assembly zones. Ask TAKTL to confirm the current standard and custom format limits against this layout before fixing the panel schedule."
        },
        {
          "title": "Approve a surface combination",
          "body": "Identify the color, texture and proposed Cast or Mediablast finish together. Request a sample of that combination, and record its reference with the drawing revision so the appearance brief and panel schedule describe the same selection."
        },
        {
          "title": "Coordinate panel and attachment",
          "body": "State whether the design calls for visible fasteners or concealed undercut anchors. Provide the supporting wall information and request the corresponding TAKTL attachment details for review by the project engineer."
        }
      ]
    },
    sourceUrl: "https://www.taktl-llc.com/facade-elements/",
    documentUrl: "https://cdn.sanity.io/files/wn1bezw7/production/569e0de535607fb0c294b44de3f8120ba64b872f.pdf",
    documentLabel: "TAKTL product data sheet",
    imageUrl: "https://cdn.sanity.io/images/wn1bezw7/production/8958f593775c567c5f3e90571d26bc5daf8aaec9-2500x1406.jpg",
    imageAlt: "TAKTL architectural UHPC facade elements",
    visual: "ribs",
  },
  {
    slug: "korsa-aggregate",
    name: "KORSA™ Aggregate Panels",
    type: "Exposed aggregate UHPC",
    summary:
      "KORSA is TAKTL's decorative aggregate option. Mineral aggregate is incorporated into the panel face and revealed in the finish, adding depth and variation to the UHPC surface.",
    metaTitle: "TAKTL KORSA Aggregate Panels | Cladvera",
    metaDescription:
      "Review TAKTL KORSA exposed aggregate panel options, A01 through A05, and the manufacturer design guide. Confirm samples and availability with TAKTL.",
    facts: [
      { label: "Base material", value: "TAKTL A|UHPC architectural panel" },
      { label: "Standard designs", value: "A01, A02, A03, A04 and A05" },
      { label: "Surface", value: "Exposed decorative aggregate with Mediablast finish" },
      { label: "Design control", value: "Aggregate color, size and density are selected through manufacturer samples" },
    ],
    applications: ["Exterior feature facades", "Large-format textured elevations", "Custom aggregate concepts"],
    options: ["Five published aggregate designs", "Custom mineral mixes", "Standard or custom panel colors and textures"],
    reviewGuidance: {
      "title": "Develop the exposed aggregate brief",
      "items": [
        {
          "title": "Identify the aggregate design",
          "body": "Use A01 through A05 to identify a published design, or describe the proposed custom mineral mix. Include the intended aggregate color, size and density so the manufacturer can review the surface concept against its samples."
        },
        {
          "title": "Review the finished face",
          "body": "KORSA exposes decorative aggregate through a Mediablast finish. Request the proposed aggregate and panel-color combination as a physical sample, and agree the appearance reference before approving the elevation."
        },
        {
          "title": "Carry the finish into the panel schedule",
          "body": "Include panel dimensions, visible edges, joints and attachment intent with the aggregate selection. Confirm the available panel construction and finish combination with TAKTL; selecting an aggregate design does not complete the facade specification."
        }
      ]
    },
    sourceUrl: "https://www.taktl-llc.com/korsa-aggregate/",
    documentUrl: "https://cdn.sanity.io/files/wn1bezw7/production/58de072fee9a0a91ce563ebd38446d3ae5f02021.pdf",
    documentLabel: "KORSA panel design guide",
    imageUrl: "https://cdn.sanity.io/images/wn1bezw7/production/06c77f8c0648877936d98330688b04448e169f5b-1300x547.jpg",
    imageAlt: "TAKTL KORSA exposed aggregate panel surface",
    visual: "aggregate",
  },
  {
    slug: "sola",
    name: "SOLA™ Self-Cleaning Panels",
    type: "Specialty UHPC facade panels",
    summary:
      "SOLA is TAKTL's light-activated facade panel line using its proprietary SC+ technology. The manufacturer publishes two surface options and separate performance test information.",
    metaTitle: "TAKTL SOLA Self-Cleaning Panels | Cladvera",
    metaDescription:
      "See TAKTL SOLA S01 and S02 facade panel options, standard thickness and format, and links to the manufacturer's product data and test information.",
    facts: [
      { label: "Standard finishes", value: "S01 and S02" },
      { label: "Standard thickness", value: "5/8 in (about 16 mm)" },
      { label: "Standard panel format", value: "Up to 4 × 12 ft; custom formats by project" },
      { label: "Technology", value: "TAKTL SC+; performance claims apply only to TAKTL SOLA" },
    ],
    applications: ["Exterior facades", "Projects evaluating photocatalytic surface performance"],
    options: ["S01", "S02", "Project-specific sizes and profiles"],
    reviewGuidance: {
      "title": "Separate finish selection from performance review",
      "items": [
        {
          "title": "Specify S01 or S02",
          "body": "Identify the proposed SOLA surface option and provide the panel layout, sizes and any special profiles. Request the corresponding sample and confirm the offered format before completing the facade schedule."
        },
        {
          "title": "Define the evidence needed",
          "body": "State which SC+ performance claim the project is evaluating. Request the relevant manufacturer test information, including the tested product, method and conditions, so the design team can assess its relevance to the intended facade."
        },
        {
          "title": "Request care and project guidance",
          "body": "Ask TAKTL for the maintenance guidance and application conditions associated with the selected SOLA surface. Record these alongside the attachment and wall-assembly review, keeping SOLA-specific claims tied to this product line."
        }
      ]
    },
    sourceUrl: "https://www.taktl-llc.com/sola/",
    documentUrl: "https://cdn.sanity.io/files/wn1bezw7/production/69dd58abd7c75fc41b972fe8b11accf352c97cd6.pdf",
    documentLabel: "SOLA product data sheet",
    imageUrl: "https://cdn.sanity.io/images/wn1bezw7/production/36e5922ff5c9b3e15074cf96af193a5be3dadada-1500x750.jpg",
    imageAlt: "TAKTL SOLA self-cleaning architectural panels",
    visual: "light",
  },
  {
    slug: "custom-elements",
    name: "Custom Elements",
    type: "Project-developed UHPC forms",
    summary:
      "TAKTL develops custom textures and forms with design teams. A pattern or tool is translated into a production mold, then coordinated with panel geometry and project requirements.",
    metaTitle: "TAKTL Custom UHPC Elements | Cladvera",
    metaDescription:
      "Explore TAKTL's custom UHPC texture and form process, from original pattern to production mold. Each element is developed for a specific project.",
    facts: [
      { label: "Product format", value: "Project-specific; no fixed SKU" },
      { label: "Development", value: "Pattern or tool, mold fabrication and panel mock-up" },
      { label: "Geometry", value: "Confirmed with TAKTL for each project" },
    ],
    applications: ["Project-specific facade relief", "Special architectural elements", "Bespoke surface patterns"],
    options: ["Natural-material impressions", "Machined profiles", "Combined macro and micro textures"],
    reviewGuidance: {
      "title": "Brief a custom UHPC form or texture",
      "items": [
        {
          "title": "Describe the pattern or tool",
          "body": "Provide the source pattern, drawing or model and identify the intended relief and surface character. Distinguish natural-material impressions, machined profiles or combined textures when describing the design intent."
        },
        {
          "title": "Identify unique and repeated elements",
          "body": "Mark each geometry and its quantity on the panel schedule. Ask TAKTL to review how the pattern or tool will become a production mold, and confirm the development scope before approving tooling."
        },
        {
          "title": "Define the mock-up decision",
          "body": "Agree which geometry, surface and connection interfaces the panel mock-up needs to demonstrate. Confirm the accepted drawing and appearance reference before releasing the project-developed element; this family has no fixed SKU."
        }
      ]
    },
    sourceUrl: "https://www.taktl-llc.com/taktl-custom-elements/",
    imageUrl: "https://cdn.sanity.io/images/wn1bezw7/production/6056491d05f748886873cf2662546db22bfd4fc9-2400x1600.jpg",
    imageAlt: "Custom architectural elements by TAKTL",
    visual: "form",
  },
  {
    slug: "hardware",
    name: "TAKTL Hardware",
    type: "Panel attachment components",
    summary:
      "Manufacturer-specific rails, clips, anchors and visible fasteners support TAKTL panel installation. The attachment layout is selected for the panel and engineered wall assembly.",
    metaTitle: "TAKTL Panel Hardware | Cladvera",
    metaDescription:
      "Review TAKTL panel attachment components, including concealed rail and clip systems and visible fasteners. Final selection follows project engineering.",
    facts: [
      { label: "Concealed route", value: "Factory-drilled panels, mechanical undercut anchors, clips and rails" },
      { label: "Visible route", value: "Screws or rivets through prepared panel holes" },
      { label: "Design status", value: "Connection and substrate design must be verified for the project" },
    ],
    applications: ["Concealed rainscreen attachment", "Visible-fastener rainscreens", "Panel subframe coordination"],
    options: ["Concealed clips and rails", "Mechanical undercut anchors", "Visible fasteners"],
    reviewGuidance: {
      "title": "Coordinate the TAKTL attachment schedule",
      "items": [
        {
          "title": "Choose the attachment route",
          "body": "The concealed route uses factory-drilled panels, mechanical undercut anchors, clips and rails. The visible route uses screws or rivets through prepared holes. Identify the intended route with the panel layout so the manufacturer can review the component requirements."
        },
        {
          "title": "Provide the panel and substrate information",
          "body": "Include the selected TAKTL panel, dimensions, joint layout and supporting structure. Ask the project engineer to review the connections and substrate for the proposed assembly before a hardware quantity is finalized."
        },
        {
          "title": "Confirm the coordinated component list",
          "body": "Request a schedule that identifies the proposed rails, clips, anchors or visible fasteners and the associated panel preparation. These are TAKTL-specific components; compatibility with another panel family requires a separate technical review."
        }
      ]
    },
    sourceUrl: "https://www.taktl-llc.com/taktl-hardware/",
    imageUrl: "https://cdn.sanity.io/images/wn1bezw7/production/3ee7545c9f37cdafd44a97685ba09d604f52b018-2560x1440.jpg",
    imageAlt: "TAKTL facade panel attachment hardware",
    visual: "hardware",
  },
];

export const taktlColors = [
  ["WH87", "White"], ["PL75", "Platinum"], ["TI63", "Titanium"],
  ["GY52", "Grey"], ["GR40", "Graphite"], ["BO78", "Bone"],
  ["SA72", "Sand"], ["DU60", "Dune"], ["TE52", "Terracotta"],
] as const;

export const taktlTextures = [
  "Rough 1", "Rough 2", "Crinkle", "Reeds", "Itero",
  "Shadows", "Rio", "Arbos 1", "Arbos 2",
] as const;

export const taktlFinishes = ["Cast", "Mediablast", "ColorSeal/T™", "KORSA™ aggregate"] as const;

export const taktlSources = {
  colors: "https://www.taktl-llc.com/facade-elements-color/",
  textures: "https://www.taktl-llc.com/facade-elements-texture/",
  finishes: "https://www.taktl-llc.com/finish-and-sealer/",
};

export function findTaktlProduct(slug: TaktlProductSlug) {
  return taktlProducts.find((product) => product.slug === slug)!;
}
