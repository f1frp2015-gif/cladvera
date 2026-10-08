import type { Region } from "./regions";
import type { FinishFamilySlug } from "./finishes";

/**
 * Material lines.
 *
 * Specification rows carry `confirmed: false` until the mill's data sheet
 * for the actual SKU has been checked; the page renders those rows with a
 * "to confirm" mark. Replace the placeholder values, never delete the flag.
 */

export type MaterialSlug =
  | "exterior-hpl-panels"
  | "uhpc-panels"
  | "acm-panels"
  | "wood-veneer-panels"
  | "interior-hpl-panels";

export type Use = "interior" | "exterior";

export interface SpecRow {
  label: string;
  value: string;
  confirmed: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export type DocumentStatus = "available" | "unverified" | "in-progress" | "planned";

export interface DocumentItem {
  name: string;
  status: DocumentStatus;
  note?: string;
}

export interface CountrySupply {
  /** Where the product can be sold today, before any assembly listing. */
  scenarios: string[];
  /** Duty position in one paragraph; rates are confirmed by the importer's broker. */
  dutyNote: string;
  /** Candidate tariff classifications, for orientation only. */
  tariffReference: string[];
}

export interface Material {
  slug: MaterialSlug;
  priority: "P0" | "P1";
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  definition: string;
  use: Use[];
  /** Display order per country (1 = first). */
  rank: Record<Region, number>;
  intro: string[];
  supply: Record<Region, CountrySupply>;
  specs: SpecRow[];
  finishFamilies: FinishFamilySlug[];
  systems: string[];
  fabrication: string[];
  stock: { note: string; moq: string; leadTime: string; perCrate: string };
  documents: DocumentItem[];
  faq: Faq[];
  masterformat: string[];
  keywords: { primary: string[]; secondary: string[] };
  /** Extra paragraph for lines that need a partner or ruling before sale. */
  caveat?: string;
}

export const materials: Material[] = [
  {
    slug: "exterior-hpl-panels",
    priority: "P0",
    name: "Compactwood Exterior Wood Fiber HPL Panels",
    shortName: "Compactwood HPL",
    metaTitle: "Compactwood Exterior HPL Panels | Cladvera",
    metaDescription:
      "Explore Compactwood's exterior wood fiber HPL panels for facade projects, with manufacturer construction notes and the documents to confirm for each order.",
    definition:
      "Compactwood describes its exterior wood fiberboard as a high-pressure laminate (HPL) for building facades, made with resin-impregnated wood fiber kraft paper and a decorative surface.",
    use: ["exterior"],
    rank: { US: 1, CA: 1 },
    intro: [
      "Compactwood lists this wood fiber HPL as an exterior facade product. Its public page describes a resin-impregnated core and decorative face; the ordered construction and current technical data sheet still need confirmation.",
      "The manufacturer discusses wood-look appearance, weathering, impact resistance and Chinese fire grades. Request the current finish card, product-specific reports and installation details before specifying a panel.",
    ],
    supply: {
      US: {
        scenarios: [
          "Review for exterior facade use after the exact panel, attachment design and project code path have been confirmed.",
          "Request product-specific material and complete wall-assembly fire evidence where the project requires it.",
        ],
        dutyNote:
          "The exact construction, origin, classification and current duty treatment require review by the importer's customs broker before quotation.",
        tariffReference: ["To confirm for the ordered construction"],
      },
      CA: {
        scenarios: [
          "Review exterior use against the project building type, applicable code and available test reports.",
          "Request the product-specific surface and wall-assembly evidence required by the project team.",
        ],
        dutyNote: "The importer's broker should confirm classification, origin, duties and taxes for the actual panel construction.",
        tariffReference: ["To confirm for the ordered construction"],
      },
    },
    specs: [
      { label: "Construction", value: "Manufacturer describes a thermosetting-resin-impregnated wood fiber kraft core and decorative face; confirm the ordered SKU", confirmed: false },
      { label: "Thickness and sheet size", value: "Request the current Compactwood data sheet for the selected panel", confirmed: false },
      { label: "Density and weight", value: "Request measured values for the selected thickness and construction", confirmed: false },
      { label: "Finish", value: "Confirm the current decorative surface, colour, texture and approval sample", confirmed: false },
      { label: "Fire performance", value: "Manufacturer cites Chinese GB 8624 B1/B2 grades; request the exact test report and any project-required North American evidence", confirmed: false },
    ],
    finishFamilies: [],
    systems: [
      "Compactwood describes a ventilated exterior rainscreen; obtain its current fixing and cavity details for the selected panel.",
      "The facade engineer should verify substrate, subframe, anchors and movement allowances for the project.",
    ],
    fabrication: [
      "Request Compactwood's current cutting, drilling, edge and handling instructions for the ordered construction.",
      "Confirm panel size, tolerances and fixing-hole details before preparing the cut list.",
    ],
    stock: {
      note: "Confirm availability for the selected Compactwood panel and finish.",
      moq: "Confirm by finish, construction and order.",
      leadTime: "Confirm production and shipping schedule for the project.",
      perCrate: "Request packing details for the ordered thickness and sheet size.",
    },
    documents: [
      { name: "Current product-specific data sheet", status: "unverified", note: "Request for the exact panel construction." },
      { name: "Current installation and fabrication guide", status: "unverified" },
      { name: "Fire and structural test reports", status: "unverified", note: "Match report to the ordered construction and project jurisdiction." },
    ],
    faq: [
      {
        q: "What Compactwood product is listed here?",
        a: "Compactwood calls its exterior wood fiberboard an HPL for building facades. The manufacturer describes a resin-impregnated wood fiber kraft core and decorative face. Confirm the exact offered construction before specification.",
      },
      {
        q: "Which thicknesses and finishes are available?",
        a: "The reviewed product page does not provide a confirmed size and finish schedule for the ordered SKU. Ask for the current data sheet, colour card and physical approval sample.",
      },
      {
        q: "Is Compactwood's Chinese fire grade a North American wall approval?",
        a: "No North American wall-assembly report or listing has been verified for this Compactwood panel. The project team should request the product-specific reports and assess the complete proposed wall assembly.",
      },
      {
        q: "How are stock, minimum order and lead time confirmed?",
        a: "Ask Cladvera to check the selected Compactwood panel, finish, quantity and destination. No fixed stock, minimum or production lead time is published for this range here.",
      },
    ],
    masterformat: ["07 42 43 Composite Wall Panels"],
    keywords: {
      primary: ["Compactwood exterior HPL panels", "exterior HPL panels"],
      secondary: ["wood fiber HPL facade panels", "high pressure laminate cladding", "Compactwood facade panels"],
    },
  },
  {
    slug: "uhpc-panels",
    priority: "P0",
    name: "UHPC Facade Panels",
    shortName: "UHPC",
    metaTitle: "UHPC Facade Panels | Thin Ultra High Performance Concrete",
    metaDescription:
      "Thin UHPC facade panels, 15 to 30 mm, smooth or textured, supplied to North American projects with a precaster or engineer for the anchors.",
    definition:
      "UHPC facade panels are thin cladding panels cast from ultra high performance concrete, a fibre-reinforced mix with compressive strength above 120 MPa that allows 15 to 30 mm panels without conventional reinforcement.",
    use: ["exterior", "interior"],
    rank: { US: 2, CA: 3 },
    intro: [
      "UHPC panels carry the lowest duty stack of our lines into the United States, but they are not sold as panels only. Anchors, connections and wind-load design belong to a North American precaster or professional engineer under delegated design, and the panel and anchor are tested together.",
      "The panel line therefore works in two modes: standard formats with cast-in inserts for a partner's system, or project-specific panels cast to the engineer's drawings.",
    ],
    supply: {
      US: {
        scenarios: [
          "Exterior cladding on any building type, as a noncombustible panel, when a precaster or engineer of record takes the connection design.",
          "Interior feature walls and lobbies on the same panel formats.",
          "Not offered where the project requires a generic listing we do not hold; see /compliance/.",
        ],
        dutyNote:
          "General rate plus Section 301 duties; no Section 232 or AD/CVD layer. The general rate differs between 6810 subheadings, so the broker confirms the classification before quoting landed cost.",
        tariffReference: ["6810.19 (articles of cement or concrete, tiles and flagstones)", "6810.99 (other articles)"],
      },
      CA: {
        scenarios: [
          "Exterior cladding on combustible and noncombustible construction, as a noncombustible panel, with the assembly behind it designed by the project team.",
          "Interior feature walls.",
        ],
        dutyNote: "MFN rate plus GST; no surtax applies to concrete articles.",
        tariffReference: ["6810.19 / 6810.99 (Canadian tariff)"],
      },
    },
    specs: [
      { label: "Thickness", value: "15, 20, 25 and 30 mm (5/8 to 1 1/4 in nominal)", confirmed: false },
      { label: "Panel size", value: "Standard formats up to 1,200 × 3,000 mm (47 × 118 in); project formats by mould", confirmed: false },
      { label: "Density", value: "2,400 to 2,500 kg/m³", confirmed: false },
      { label: "Weight", value: "Approx. 36 kg/m² at 15 mm to 72 kg/m² at 30 mm (7.4 to 14.7 lb/ft²)", confirmed: false },
      { label: "Compressive strength", value: "≥ 120 MPa (17,400 psi), tested to ASTM C1856", confirmed: false },
      { label: "Flexural strength", value: "≥ 15 MPa (2,200 psi), tested to ASTM C1609", confirmed: false },
      { label: "Reinforcement", value: "Steel or PVA micro-fibres; no conventional reinforcing bar", confirmed: false },
      { label: "Surfaces", value: "Smooth, sandblasted, ribbed, board-formed and custom moulds; relief depth stated per texture", confirmed: false },
      { label: "Fixing", value: "Cast-in inserts or undercut anchors, located to the engineer's drawings", confirmed: true },
      { label: "Sealer", value: "Breathable anti-graffiti sealer applied at the plant (optional)", confirmed: false },
    ],
    finishFamilies: ["textured-concrete"],
    systems: [
      "Aluminum sub-frame with undercut anchors (partner system).",
      "Cast-in inserts on steel or aluminum rails for project-specific panels.",
      "Interior hook-on rails for feature walls.",
    ],
    fabrication: [
      "Panels are cast to size; on-site cutting is limited to diamond blades with dust control and leaves an unsealed edge.",
      "Anchor positions are cast in; field drilling of undercut anchors follows the anchor manufacturer's procedure.",
      "Crated vertically on A-frames; each panel is numbered to the shop drawings.",
    ],
    stock: {
      note: "No stock. Every order is cast to the project schedule.",
      moq: "Per project; moulds are amortised over the order (TBC).",
      leadTime: "Mock-up panels 4 to 6 weeks; production 8 to 12 weeks plus ocean transit (TBC).",
      perCrate: "Weight governs: a 40 ft container carries roughly 500 to 600 m² of 20 mm panels (TBC).",
    },
    documents: [
      { name: "Mix and panel data sheet", status: "in-progress" },
      { name: "Standard panel formats and insert layouts", status: "planned" },
      { name: "CSI 03 45 00 guide specification", status: "planned" },
      { name: "Test reports (ASTM C1856, C1609, C666)", status: "planned", note: "Published on /compliance/." },
      { name: "Handling and installation guide", status: "planned" },
    ],
    faq: [
      {
        q: "Are UHPC and GFRC facade panels the same material?",
        a: "No. UHPC is a dense cementitious mix with micro-fibres and compressive strength above about 120 MPa, cast 15 to 30 mm thick. GFRC is a sprayed or premixed glass-fibre concrete, usually 12 to 25 mm thick with a lower-strength matrix and a different reinforcement principle. The comparison page sets out density, strength and thickness side by side.",
      },
      {
        q: "How much do UHPC panels cost per square foot?",
        a: "Cost is driven by texture (mould cost), panel size, thickness, the number of unique panels, the anchor system and freight weight. The only North American manufacturer that publishes a price lists a floor of about USD 20 per square foot for material with a minimum order of 5,000 square feet; our quotes are returned against drawings.",
      },
      {
        q: "Who designs the anchors?",
        a: "A North American precaster or professional engineer under delegated design. We supply panel data, insert positions and test data; the engineer of record stamps the connection design. We do not sell UHPC as panels only for exterior walls.",
      },
      {
        q: "What thickness do I need?",
        a: "Most rainscreen panels are 15 or 20 mm; larger panels or heavier textures go to 25 or 30 mm. Thickness is fixed by the engineer from span, wind load and the anchor type.",
      },
      {
        q: "How is colour variation handled?",
        a: "Pigmented mixes vary between casts and with curing. Colour and pinhole ranges are agreed on range samples, batches are recorded per panel, and weathering changes are explained on the colour variation guide.",
      },
    ],
    masterformat: ["03 45 00 Precast Architectural Concrete", "03 49 00 Glass-Fiber-Reinforced Concrete (comparison only)"],
    keywords: {
      primary: ["UHPC facade panels"],
      secondary: ["UHPC panels", "UHPC cladding panels", "ultra high performance concrete panels", "architectural UHPC", "UHPC panel thickness", "UHPC panel weight", "UHPC rainscreen panels", "UHPC panels cost per square foot"],
    },
    caveat:
      "Exterior UHPC is supplied with a North American precaster or professional engineer responsible for anchors and wind-load design. Quotes without a named engineering partner are budget ranges only.",
  },
  {
    slug: "acm-panels",
    priority: "P0",
    name: "ALMINE Metal Composite (ACM / MCM) Panels",
    shortName: "ACM / MCM",
    metaTitle: "ALMINE Metal Composite Panels | ACM / MCM",
    metaDescription:
      "ALMINE metal composite panels include A2 architectural, tunnel traffic and medical variants. Confirm the aluminum-face construction and test data for each project.",
    definition:
      "ALMINE publishes an A-grade fireproof metal composite panel range with an inorganic core and metal faces, plus tunnel and medical variants. ACM denotes an aluminum-faced construction; confirm the face metal for the ordered SKU.",
    use: ["interior", "exterior"],
    rank: { US: 3, CA: 2 },
    intro: [
      "ALMINE lists A2 fireproof, rail/tunnel and medical panels in its metal composite product category. The public catalogue describes the core and intended uses but does not provide a complete data sheet for each construction.",
      "Project selection starts with the actual face metal, panel build-up, finish, test reports and assembly details. Cladvera confirms sourcing, terms and applicable import treatment for the proposed SKU before quotation.",
    ],
    supply: {
      US: {
        scenarios: [
          "Discuss interior architectural applications after the panel's interior finish reports are reviewed.",
          "Exterior use requires project-specific review of the actual panel and complete proposed wall assembly.",
        ],
        dutyNote:
          "Tariff classification and current duty layers depend on the ordered face metal and panel construction. The importer's broker confirms them before a landed quote.",
        tariffReference: ["Product-specific classification pending"],
      },
      CA: {
        scenarios: [
          "Discuss interior applications after the product's fire and finish reports are reviewed.",
          "Exterior and noncombustible-construction applications require assembly evidence accepted by the project authority.",
        ],
        dutyNote:
          "The importer's broker confirms classification, surtax treatment and taxes for the actual construction and shipment.",
        tariffReference: ["Product-specific classification pending"],
      },
    },
    specs: [
      { label: "Core", value: "ALMINE describes an inorganic core for its A2 fireproof metal composite panel; exact formulation and report to confirm", confirmed: false },
      { label: "Face metal", value: "Two metal faces are described; confirm aluminum alloy, face thickness and back skin for the ordered SKU", confirmed: false },
      { label: "Total thickness and formats", value: "Request the product-specific data sheet and available size schedule", confirmed: false },
      { label: "Coating and colors", value: "Request the current color card, coating specification and physical approval samples", confirmed: false },
      { label: "Weight and tolerances", value: "Confirm from the ordered panel's data sheet", confirmed: false },
      { label: "Fire and assembly evidence", value: "Request classification and complete wall-assembly reports for the target jurisdiction", confirmed: false },
    ],
    finishFamilies: [],
    systems: [
      "Attachment system and fixing design must be selected for the actual ALMINE panel construction and project wall.",
    ],
    fabrication: [
      "Request product-specific cutting, routing, bending, handling and protective-film instructions before fabrication.",
    ],
    stock: {
      note: "Stock location and availability for the ALMINE range: to confirm by product and finish.",
      moq: "To confirm for the requested panel and finish.",
      leadTime: "To confirm after ALMINE checks the ordered construction and quantity.",
      perCrate: "Packing list and crate details to confirm with the order.",
    },
    documents: [
      { name: "Product-specific technical data sheet", status: "unverified" },
      { name: "Fire classification and application test reports", status: "unverified", note: "Report numbers and tested constructions to be verified." },
      { name: "Fabrication and installation guide", status: "unverified" },
      { name: "Finish samples and coating specification", status: "unverified" },
    ],
    faq: [
      {
        q: "Is every ALMINE metal composite panel an ACM panel?",
        a: "No. ALMINE describes a metal composite range with two metal faces. ACM specifically requires aluminum faces. Confirm the face metal and complete panel build-up on the data sheet for the ordered product.",
      },
      {
        q: "Does ALMINE's A2 product name establish North American approval?",
        a: "No. Request the classification report and the exact tested panel construction, then check the complete proposed wall assembly and local code requirements with the design team and authority having jurisdiction.",
      },
      {
        q: "Which ALMINE panel variants are listed here?",
        a: "The manufacturer's A-grade fireproof metal composite range lists an architectural A2 panel, a rail and tunnel traffic panel, and a medical antibacterial panel. Each needs a product-specific data sheet and applicable test reports.",
      },
      {
        q: "Are panel sizes, finishes and prices published?",
        a: "The public ALMINE category page does not provide a complete size and price schedule for these products. Share drawings and a target finish so the construction, availability and quote basis can be confirmed.",
      },
    ],
    masterformat: ["07 42 43 Composite Wall Panels", "07 42 13.23 Metal Composite Material Wall Panels"],
    keywords: {
      primary: ["aluminum composite panels", "ACM panels"],
      secondary: ["aluminum composite material", "ACM cladding", "fire retardant ACM panels", "4mm ACM panels", "ACM panel specifications", "aluminum composite panel price", "ACM panel cost per square foot", "ACM panel system", "acp sheet"],
    },
    caveat:
      "ALMINE's catalogue is a manufacturer source. Confirm the actual aluminum-face SKU, sourcing status, product reports and project wall-assembly evidence before treating it as an orderable ACM system.",
  },
  {
    slug: "wood-veneer-panels",
    priority: "P0",
    name: "Wood Veneer Panels",
    shortName: "Wood veneer",
    metaTitle: "Wood Veneer Panels for Interior and Exterior Walls",
    metaDescription:
      "Real wood veneer panels on a phenolic core for interior and exterior walls, approved on range samples, with Lacey Act data per shipment.",
    definition:
      "Wood veneer panels are real wood veneers bonded to a phenolic compact core (exterior and interior) or, for Canada only, to an MDF or plywood core (interior), protected by a UV-cured overlay and approved on range samples because every sheet differs.",
    use: ["interior", "exterior"],
    rank: { US: 4, CA: 2 },
    intro: [
      "Real veneer gives a facade or lobby wall natural variation that printed decors cannot. The trade-off is documentation: species and country of harvest are declared for every shipment, and the core material decides which duty and emission rules apply.",
      "For the United States only the phenolic-core construction is offered, and its tariff classification is being confirmed by ruling before prices are published. Veneer on MDF or plywood cores is within the scope of the 2026 hardwood and decorative plywood antidumping and countervailing duty orders and is not shipped to the United States.",
    ],
    supply: {
      US: {
        scenarios: [
          "Phenolic-core panels for interior walls and, below 40 ft, exterior cladding, once the classification ruling is published.",
          "Not offered: veneer on MDF or plywood cores (AD/CVD scope).",
        ],
        dutyNote:
          "Phenolic-core veneer panels may classify under heading 3921 (laminated plastics) or 4412 (veneered panels). A CBP binding ruling and, if needed, a Commerce scope ruling are being sought; until they are published no US price or MOQ is quoted for this line.",
        tariffReference: ["3921.90.50 or 4412.99 (pending ruling)"],
      },
      CA: {
        scenarios: [
          "Phenolic-core panels for interior and exterior walls (combustible construction; noncombustible after CAN/ULC S134).",
          "MDF or plywood-core panels for interiors, certified and labelled under SOR/2021-148.",
        ],
        dutyNote: "MFN rate plus GST; no surtax or SIMA measure applies to veneered panels.",
        tariffReference: ["3921.90 or 4412 (Canadian tariff)"],
      },
    },
    specs: [
      { label: "Face", value: "Natural wood veneer 0.5 to 0.6 mm; species list per data sheet", confirmed: false },
      { label: "Core (exterior and interior)", value: "Phenolic compact core, 6, 8 and 10 mm", confirmed: false },
      { label: "Core (interior, Canada only)", value: "MDF or plywood, 16 and 18 mm, certified under SOR/2021-148", confirmed: false },
      { label: "Protection", value: "UV-cured exterior-grade overlay; matte", confirmed: false },
      { label: "Sheet size", value: "Up to 1,220 × 2,440 mm (48 × 96 in); larger formats on request", confirmed: false },
      { label: "Cuts", value: "Rift, quarter and crown cut; sequence-matched sets on request", confirmed: false },
      { label: "Variation", value: "Natural; approved on a signed master plus a range set of at least five pieces", confirmed: true },
      { label: "Declarations", value: "Species (scientific name) and country of harvest per shipment for the Lacey Act", confirmed: true },
    ],
    finishFamilies: ["natural-veneer"],
    systems: [
      "Exposed-fastener rainscreen with sliding-point fixings (phenolic core).",
      "Concealed undercut anchors on 8 and 10 mm phenolic core.",
      "Interior Z-clip and French cleat systems (all cores).",
    ],
    fabrication: [
      "Cut face-up with a scoring blade; CNC routing for cut-outs.",
      "Keep the grain direction consistent per elevation; sheets are numbered to the layout drawing.",
      "Exterior edges sealed by the overlay system; interior MDF-core edges banded or sealed.",
    ],
    stock: {
      note: "No stock. Veneer is sourced per order so that species, cut and range can be approved first.",
      moq: "120 m² per species and cut (TBC).",
      leadTime: "Range samples 3 to 4 weeks; production 6 to 8 weeks plus ocean transit (TBC).",
      perCrate: "Sheets crated face to face with interleaving; counts per crate on /stock-and-lead-times/ (TBC).",
    },
    documents: [
      { name: "Technical data sheet", status: "in-progress" },
      { name: "Species and range-sample guide", status: "in-progress" },
      { name: "Lacey Act declaration template", status: "in-progress" },
      { name: "Formaldehyde emission test (ASTM E1333 / D6007)", status: "planned" },
      { name: "CSI 06 42 00 wood paneling specification", status: "planned" },
    ],
    faq: [
      {
        q: "Can wood veneer be used outside?",
        a: "Yes, when the veneer is bonded to a phenolic compact core and protected by an exterior-grade overlay, and the wall assembly follows the combustible exterior wall covering rules of the building code. Veneer on MDF or plywood is for interiors only.",
      },
      {
        q: "How much natural variation should I expect?",
        a: "Enough that a single chip cannot represent an order. Approval is on a signed master plus a range set of at least five pieces showing the lightest and darkest acceptable sheets; the colour variation guide describes the process.",
      },
      {
        q: "Wood veneer vs HPL for exterior cladding: how do they compare?",
        a: "Veneer is real wood with natural variation, and it needs an overlay, range samples and species declarations. Printed wood-grain HPL is uniform within a decor, has a stated repeat and needs none of the wood documentation. The comparison page sets out structure, variation, warranty and maintenance side by side.",
      },
      {
        q: "Why is the US version limited to the phenolic core?",
        a: "Veneered panels on MDF, particleboard or plywood cores are within the scope of the 2026 antidumping and countervailing duty orders on hardwood and decorative plywood from China. The phenolic-core construction is outside wood-core plywood as a product, but its classification is being confirmed by ruling before it is priced for the United States.",
      },
    ],
    masterformat: ["06 42 00 Wood Paneling", "06 42 16 Wood Veneer Paneling", "07 42 43 Composite Wall Panels (exterior)"],
    keywords: {
      primary: ["exterior wood veneer panels", "wood veneer cladding"],
      secondary: ["wood veneer facade panels", "natural wood facade panels", "wood veneer wall panels", "wood veneer interior wall panels", "wood veneer panel color variation", "wood veneer cladding supplier"],
    },
    caveat:
      "United States: no price or minimum order is published for this line until the tariff classification ruling for the phenolic-core construction is received.",
  },
  {
    slug: "interior-hpl-panels",
    priority: "P1",
    name: "Compactwood Interior Decorative Boards",
    shortName: "Compactwood interior",
    metaTitle: "Compactwood Interior Decorative Boards | Cladvera",
    metaDescription:
      "Explore Compactwood interior decorative boards for walls and ceilings. Confirm the selected core, HPL classification, dimensions and project test reports.",
    definition:
      "Compactwood describes its indoor paste special board as a decorative surface bonded under heat and pressure to a glass fiber or wood fiber core; its public page does not identify it as conventional HPL.",
    use: ["interior"],
    rank: { US: 5, CA: 5 },
    intro: [
      "Compactwood lists an indoor decorative board with a high-pressure heat-cured glass fiber or wood fiber core and decorative surface. Confirm which core and surface are offered for the actual order.",
      "This product sits beside the manufacturer's exterior wood fiber HPL range, but the reviewed indoor product page does not establish an EN 438 HPL grade, thin-laminate option or pre-laminated MDF construction.",
    ],
    supply: {
      US: {
        scenarios: ["Review the selected Compactwood board for interior wall or ceiling use after core, finish and project test requirements are confirmed."],
        dutyNote: "Customs classification and current duties depend on the actual core and decorative surface; the importer's broker should review the ordered construction.",
        tariffReference: ["To confirm for the ordered construction"],
      },
      CA: {
        scenarios: ["Review the selected Compactwood board for interior wall or ceiling use after core, finish and project test requirements are confirmed."],
        dutyNote: "The importer's broker should confirm classification, origin, duties and taxes for the actual board construction.",
        tariffReference: ["To confirm for the ordered construction"],
      },
    },
    specs: [
      { label: "Core", value: "Manufacturer describes glass fiber or wood fiber options; confirm which is offered for the selected SKU", confirmed: false },
      { label: "HPL classification", value: "Not established for the indoor paste special board on the reviewed product page", confirmed: false },
      { label: "Thickness and sheet size", value: "Request the current data sheet for the selected construction", confirmed: false },
      { label: "Surface", value: "Request the current decorative options and physical approval samples", confirmed: false },
      { label: "Fire performance", value: "Request product-specific reports for the ordered core, surface and project jurisdiction", confirmed: false },
    ],
    finishFamilies: [],
    systems: ["Request Compactwood's current interior attachment details for the selected board and substrate."],
    fabrication: ["Confirm cutting, edge treatment, adhesive compatibility and handling instructions for the selected core and surface."],
    stock: {
      note: "Confirm availability for the selected Compactwood board and finish.",
      moq: "Confirm by construction, finish and order.",
      leadTime: "Confirm production and shipping schedule for the project.",
      perCrate: "Request packing details for the ordered construction and sheet size.",
    },
    documents: [
      { name: "Current product-specific data sheet", status: "unverified", note: "Confirm core, dimensions and HPL designation." },
      { name: "Interior installation and fabrication guide", status: "unverified" },
      { name: "Product-specific fire and emissions test reports", status: "unverified" },
    ],
    faq: [
      {
        q: "Is Compactwood's indoor decorative board HPL?",
        a: "The reviewed manufacturer page does not identify the paste special board as conventional HPL or give an EN 438 grade. Ask for the exact SKU data sheet before specifying it as an HPL product.",
      },
      {
        q: "Which core and test documents should be requested?",
        a: "Compactwood describes glass fiber and wood fiber core options. Confirm the core in the ordered board, then request the relevant surface-burning, emissions and installation documents for the project.",
      },
    ],
    masterformat: [],
    keywords: {
      primary: ["Compactwood interior decorative panels"],
      secondary: ["interior decorative boards", "Compactwood paste special board", "wood fiber interior panels"],
    },
    caveat: "The reviewed indoor board is adjacent to Compactwood's HPL facade product but is not explicitly designated as HPL. Confirm the exact material classification before sale or specification.",
  },
];

export function findMaterial(slug: string) {
  return materials.find((m) => m.slug === slug);
}

export function materialsForRegion(region: Region) {
  return [...materials].sort((a, b) => a.rank[region] - b.rank[region]);
}

export const materialSlugs = materials.map((m) => m.slug);
