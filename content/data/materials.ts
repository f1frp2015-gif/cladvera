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

export type DocumentStatus = "available" | "in-progress" | "planned";

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
    name: "Exterior Phenolic (HPL / Compact Laminate) Panels",
    shortName: "Phenolic HPL",
    metaTitle: "Exterior Phenolic HPL Panels | Compact Laminate Cladding",
    metaDescription:
      "Exterior phenolic (HPL) compact laminate panels, 6 to 12 mm, for rainscreen cladding and soffits, supplied to US and Canadian fabricators.",
    definition:
      "Exterior phenolic panels are compact high-pressure laminates (HPL): layers of kraft paper saturated with phenolic resin and a decorative face, pressed into a dense, self-supporting sheet for rainscreen cladding and soffits.",
    use: ["exterior", "interior"],
    rank: { US: 1, CA: 1 },
    intro: [
      "Phenolic compact laminate is the lowest-friction panel line for import into the United States and Canada: no Section 232 aluminum duty, no antidumping order and no wood-product rules apply to a kraft-core panel.",
      "Panels are sold as full sheets or cut to size for fabricators and installers working with concealed or exposed-fastener rainscreen systems. Decors are matched to range samples before production.",
    ],
    supply: {
      US: {
        scenarios: [
          "Exterior cladding on Type V buildings and on Type I to IV buildings below 40 ft, on material-level test data.",
          "Soffits and canopy linings.",
          "Interior wall panels where an interior finish class is required.",
          "Exterior walls above 40 ft on Type I to IV buildings only after an NFPA 285 assembly listing is published on /compliance/.",
        ],
        dutyNote:
          "General rate plus Section 301 duties; no Section 232 or AD/CVD layer. Classification under heading 3921 is supported by prior CBP rulings for compact HPL, but the importer's broker confirms it for each shipment.",
        tariffReference: ["3921.90.50 (plastics, laminated, other)"],
      },
      CA: {
        scenarios: [
          "Exterior cladding on combustible construction and Part 9 buildings.",
          "Noncombustible construction only after a CAN/ULC S134 assembly test.",
          "Interior wall panels with a CAN/ULC S102 flame-spread rating.",
        ],
        dutyNote: "MFN rate plus GST. The China Surtax Order (2024) does not cover heading 3921.",
        tariffReference: ["3921.90 (Canadian tariff)"],
      },
    },
    specs: [
      { label: "Thickness", value: "6, 8, 10 and 12 mm (1/4, 5/16, 3/8 and 1/2 in nominal)", confirmed: false },
      { label: "Construction", value: "EN 438-6 type EDF exterior-grade compact laminate; phenolic kraft core, decorative face, UV-cured acrylic-polyurethane overlay", confirmed: false },
      { label: "Sheet sizes", value: "1,220 × 2,440 mm; 1,300 × 3,050 mm; 1,530 × 3,050 mm (48 × 96 in; 51 × 120 in; 60 × 120 in nominal)", confirmed: false },
      { label: "Density", value: "1.35 to 1.45 g/cm³", confirmed: false },
      { label: "Weight", value: "Approx. 11.5 kg/m² at 8 mm (2.4 lb/ft²)", confirmed: false },
      { label: "Faces", value: "Single or double decorative face; balanced construction for exterior use", confirmed: false },
      { label: "Thickness tolerance", value: "±0.4 mm at 8 mm; trimmed sheets ±5 mm in length and width", confirmed: false },
      { label: "Edge finish", value: "Sealed by the resin; exposed edges may be chamfered and do not need edge banding", confirmed: false },
      { label: "Fire performance", value: "Standard and fire-retardant grades; see /compliance/ for test status", confirmed: true },
    ],
    finishFamilies: ["wood-grain", "solid", "stone-look"],
    systems: [
      "Exposed-fastener rainscreen on aluminum or timber battens with colour-matched rivets or screws.",
      "Concealed undercut-anchor systems on aluminum sub-frames (8 mm and above).",
      "Soffit and canopy linings on hat channels.",
    ],
    fabrication: [
      "Cut with carbide or diamond-tipped saw blades; CNC routing for cut-outs and chamfers.",
      "Pre-drilled fixing holes with sliding-point clearance; hole sizes stated per system on /fabrication/.",
      "Protective film on the decorative face; remove within the period stated on the data sheet after installation.",
    ],
    stock: {
      note: "Stock programme planned for 8 mm in a short list of decors; other decors and thicknesses are made to order.",
      moq: "150 m² per decor and thickness (TBC); mixed decors can share a container.",
      leadTime: "Made to order: production 4 to 6 weeks plus ocean transit (TBC); see /stock-and-lead-times/.",
      perCrate: "Crate weight and sheet count per thickness published on /stock-and-lead-times/ (TBC).",
    },
    documents: [
      { name: "Technical data sheet (per thickness)", status: "in-progress" },
      { name: "CSI three-part specification, 07 42 43 / 07 46 xx", status: "planned" },
      { name: "CAD details for exposed and concealed fixing", status: "planned" },
      { name: "Fabrication guide", status: "in-progress" },
      { name: "Test reports", status: "in-progress", note: "Published with report numbers on /compliance/." },
      { name: "Safety data sheet", status: "planned" },
    ],
    faq: [
      {
        q: "What is compact laminate (HPL) and what is it used for?",
        a: "Compact laminate is a high-pressure laminate at least 2 mm thick that supports itself without a substrate (EN 438-4; exterior grade EDF under EN 438-6). In 6 to 12 mm it is used for rainscreen cladding, soffits, balcony panels and interior wall panels.",
      },
      {
        q: "Is phenolic cladding the same as HPL?",
        a: "Yes. North American manufacturers call exterior compact laminate \"phenolic panels\" or \"phenolic cladding\" because the core resin is phenolic. HPL, compact laminate and phenolic panel describe the same product; thin decorative HPL glued to a substrate is a different product used indoors.",
      },
      {
        q: "Does exterior HPL need an NFPA 285 test?",
        a: "On Type I to IV buildings above 40 ft the International Building Code treats it as a combustible exterior wall covering, so the complete wall assembly needs NFPA 285 evidence. Below 40 ft and on Type V buildings the panel is specified on material-level data. The status of our assembly test is on /compliance/.",
      },
      {
        q: "What sizes and thicknesses are available?",
        a: "The planned range is 6, 8, 10 and 12 mm in sheets up to 1,530 × 3,050 mm. The exact sizes offered are confirmed on the data sheet for each decor before an order is accepted.",
      },
      {
        q: "How much do exterior HPL panels cost per square foot?",
        a: "Quotes depend on thickness, decor, single or double face, cut-to-size work, quantity and the delivery term. Published North American distributor prices for comparable 8 mm panels are a useful reference point; our pricing guide explains what moves a quote, and a drawings-based quote is returned within two business days.",
      },
    ],
    masterformat: ["07 42 43 Composite Wall Panels", "07 46 00 Siding (phenolic panel siding)", "09 78 23 Phenolic Interior Wall Paneling"],
    keywords: {
      primary: ["exterior phenolic panels", "exterior HPL panels"],
      secondary: ["compact laminate exterior cladding", "HPL facade panels", "phenolic rainscreen panels", "phenolic facade panels", "exterior HPL panel sizes", "HPL cladding supplier", "exterior HPL panels cost per square foot"],
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
    name: "Aluminum Composite (ACM) Panels",
    shortName: "ACM",
    metaTitle: "Aluminum Composite (ACM) Panels | FR Core, 4 mm",
    metaDescription:
      "Aluminum composite panels with FR core, 4 mm, PVDF coated, for commercial interiors and low-rise exteriors, for US and Canadian fabricators.",
    definition:
      "Aluminum composite material (ACM) panels are two aluminum skins bonded to a polyethylene or mineral-filled fire-retardant core, routed and folded by fabricators into wall panel systems; the International Building Code groups them under metal composite material (MCM).",
    use: ["interior", "exterior"],
    rank: { US: 3, CA: 2 },
    intro: [
      "ACM is the panel most fabricators already run, which makes it the easiest to qualify and the hardest to land: China-origin ACM entering the United States carries Section 232 aluminum duty on the full customs value on top of Section 301, so the US offer is limited to interiors, exterior walls below 40 ft, and private-label supply to distributors who import on their own account.",
      "In Canada the surtax is 25 percent and Canadian fabricator-installers already run imported private-label ACM, so the Canadian offer covers the full range once a CAN/ULC S134 assembly test is published.",
    ],
    supply: {
      US: {
        scenarios: [
          "Interior wall panels, column covers and ceilings (standard or FR core).",
          "Exterior walls below 40 ft on Type I to IV buildings and on Type V buildings (FR core).",
          "Private-label full sheets for stocking fabricator-distributors who import on their own account.",
          "Exterior walls above 40 ft only after an NFPA 285 assembly listing is published on /compliance/.",
        ],
        dutyNote:
          "General rate plus Section 301 duties plus Section 232 aluminum duties assessed on the full customs value (ACM with skins over 0.2 mm is classified under heading 7606). Landed cost is quoted against the current rates and is only competitive for interiors and private-label volumes.",
        tariffReference: ["7606.12.30 (aluminum alloy plates, sheets and strip, over 0.2 mm, clad)", "7607.20 for foil-skinned signage grades, which we do not offer"],
      },
      CA: {
        scenarios: [
          "Interior wall panels and ceilings.",
          "Exterior cladding on combustible construction and Part 9 buildings (FR core).",
          "Noncombustible construction after a CAN/ULC S134 assembly test.",
          "Private-label supply to fabricator-installers.",
        ],
        dutyNote:
          "MFN Free plus the 25 percent surtax under the China Surtax Order (2024), plus GST. Aluminum smelted or cast in China is traced regardless of where the panel is laminated.",
        tariffReference: ["7606.12.00 (Canadian tariff; listed in the China Surtax Order)"],
      },
    },
    specs: [
      { label: "Total thickness", value: "4 mm standard; 3 mm interior and 6 mm on request", confirmed: false },
      { label: "Aluminum skins", value: "0.50 mm / 0.50 mm, alloy 3003 H16 or 3105 H16; 0.30 mm interior grade on request", confirmed: false },
      { label: "Core", value: "FR mineral-filled polyethylene; standard PE core for interior use only", confirmed: false },
      { label: "Sheet width", value: "1,220 and 1,500 mm (48 and 59 in); 1,575 mm (62 in) on request", confirmed: false },
      { label: "Sheet length", value: "Up to 5,000 mm (197 in); cut to length", confirmed: false },
      { label: "Coating", value: "PVDF (70 percent resin) two or three coat to AAMA 2605; FEVE for high-gloss colours", confirmed: false },
      { label: "Weight", value: "Approx. 5.5 kg/m² (PE core) to 7.6 kg/m² (FR core) at 4 mm (1.1 to 1.6 lb/ft²)", confirmed: false },
      { label: "Tolerances", value: "Thickness ±0.2 mm; width ±2 mm; length ±3 mm", confirmed: false },
      { label: "Protective film", value: "Peelable film with direction arrows on the decorative face", confirmed: true },
    ],
    finishFamilies: ["solid", "metallic", "wood-grain", "stone-look"],
    systems: [
      "Route-and-return dry joint rainscreen (fabricator's extrusion system).",
      "Wet-seal route-and-return with sealant joints.",
      "Interior clip systems for wall panels and column covers.",
    ],
    fabrication: [
      "V-groove routing to a 0.3 to 0.5 mm remaining skin, then fold; radius and groove data on /fabrication/.",
      "Rivet or screw to returns; stiffeners bonded with structural tape or adhesive per the system.",
      "Install metallic and brushed finishes in one direction per elevation; arrows are printed on the film.",
    ],
    stock: {
      note: "No North American stock. Standard white and charcoal in 4 mm FR are planned for a stock programme once a third-party warehouse is confirmed.",
      moq: "180 m² per finish (TBC); a 40 ft container holds roughly 1,100 to 1,300 m² of 4 mm sheets depending on width (TBC).",
      leadTime: "Production 3 to 5 weeks for standard colours, 5 to 7 weeks for custom colours, plus ocean transit (TBC).",
      perCrate: "Sheet count per crate by width and length on /stock-and-lead-times/ (TBC).",
    },
    documents: [
      { name: "Technical data sheet (FR and PE core)", status: "in-progress" },
      { name: "CSI 07 42 43 Composite Wall Panels specification", status: "planned" },
      { name: "Fabrication manual (routing, folding, film)", status: "in-progress" },
      { name: "Test reports", status: "in-progress", note: "Published with report numbers on /compliance/." },
      { name: "Coating warranty document", status: "planned" },
    ],
    faq: [
      {
        q: "What is ACM? Is ACM the same as ACP or MCM?",
        a: "ACM (aluminum composite material) is two aluminum skins bonded to a polyethylene or mineral-filled core. ACP is the same product under the name used in the UK, India and by exporters. MCM (metal composite material) is the International Building Code's wider term that also covers copper, zinc and stainless-steel skins; ACM is the aluminum-skinned subset.",
      },
      {
        q: "Is ACM fire rated? Does it meet NFPA 285?",
        a: "A panel is not fire rated on its own. The FR core version is tested at material level (ASTM E84, ASTM E136 for the core) and the complete wall assembly is tested to NFPA 285 for use above 40 ft on Type I to IV buildings. Our material tests are in progress and the assembly test is scheduled; the status is on /compliance/, and until it is published we sell for interiors and walls below 40 ft.",
      },
      {
        q: "4 mm vs 6 mm ACM: which should I specify?",
        a: "4 mm is the standard for wall panels up to typical rainscreen module sizes. 6 mm is specified for larger panel spans, flatter appearance on large metallic surfaces or higher wind loads. The fabricator's system data decides; we supply both.",
      },
      {
        q: "What are the sheet sizes?",
        a: "Planned widths are 1,220 and 1,500 mm (48 and 59 in) with lengths cut to order up to 5,000 mm. Width availability per finish is confirmed on the data sheet.",
      },
      {
        q: "How much does ACM cost per square foot?",
        a: "Material cost depends on core, coating, colour, width and quantity; fabricated and installed costs depend on the system and the project. For imports into the United States the duty stack is the largest single item, so we quote landed cost rather than FOB. The pricing guide lists the factors.",
      },
    ],
    masterformat: ["07 42 43 Composite Wall Panels", "07 42 13.23 Metal Composite Material Wall Panels"],
    keywords: {
      primary: ["aluminum composite panels", "ACM panels"],
      secondary: ["aluminum composite material", "ACM cladding", "fire retardant ACM panels", "4mm ACM panels", "ACM panel specifications", "aluminum composite panel price", "ACM panel cost per square foot", "ACM panel system", "acp sheet"],
    },
    caveat:
      "In the United States the offer is limited to interiors, exterior walls below 40 ft and private-label volumes until the NFPA 285 assembly listing is published and the duty position is confirmed per order.",
  },
  {
    slug: "wood-veneer-panels",
    priority: "P0",
    name: "Wood Veneer Panels",
    shortName: "Wood veneer",
    metaTitle: "Wood Veneer Panels for Interior and Exterior Walls",
    metaDescription:
      "Real wood veneer panels on a high-pressure core for interior and exterior walls, approved on range samples, with Lacey Act data per shipment.",
    definition:
      "Wood veneer panels are real wood veneers impregnated with resin and pressed onto a high-pressure thermoset core (exterior and interior) or, for Canada only, onto an MDF or plywood core (interior), with an electron-beam-cured surface, and approved on range samples because every sheet differs.",
    use: ["interior", "exterior"],
    rank: { US: 4, CA: 2 },
    intro: [
      "Real veneer gives a facade or lobby wall natural variation that printed decors cannot. The trade-off is documentation: species and country of harvest are declared for every shipment, and the core material decides which duty and emission rules apply.",
      "For the United States only the phenolic-core construction is offered, and its tariff classification is being confirmed by ruling before prices are published. Veneer on MDF or plywood cores is within the scope of the 2026 hardwood and decorative plywood antidumping and countervailing duty orders and is not shipped to the United States.",
      "On the current mill line the natural veneer is impregnated with a weather-resistant resin and a polymer resin, and the face is cured by electron beam (EB) rather than UV lamps. The mill also makes interior fire-retardant and acoustic versions of the panel. Grades, thicknesses and species are being confirmed against the mill data sheet before they are listed.",
    ],
    supply: {
      US: {
        scenarios: [
          "Phenolic-core panels for interior walls and, below 40 ft, exterior cladding, once the classification ruling is published.",
          "Not offered: veneer on MDF or plywood cores (AD/CVD scope).",
        ],
        dutyNote:
          "Veneer panels on a high-pressure thermoset core may classify under heading 3921 (laminated plastics), 4411 (fibreboard) or 4412 (veneered panels), depending on whether the core is kraft paper or wood fibre. A wood-fibre core raises the risk of falling within the hardwood and decorative plywood orders, which name MDF cores. A CBP binding ruling and, if needed, a Commerce scope ruling are being sought; until they are published no US price or MOQ is quoted for this line.",
        tariffReference: ["3921.90.50, 4411 or 4412.99 (pending ruling)"],
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
      { label: "Core (exterior and interior)", value: "High-pressure thermoset core; the mill describes it as heat-cured wood-fibre board. Kraft-paper or wood-fibre composition being confirmed. 6, 8 and 10 mm", confirmed: false },
      { label: "Core (interior, Canada only)", value: "MDF or plywood, 16 and 18 mm, certified under SOR/2021-148", confirmed: false },
      { label: "Surface", value: "Veneer impregnated with a weather-resistant resin and a polymer resin; electron-beam (EB) cured face; matte", confirmed: false },
      { label: "Sheet size", value: "Up to 1,220 × 2,440 mm (48 × 96 in); larger formats on request", confirmed: false },
      { label: "Cuts", value: "Rift, quarter and crown cut; sequence-matched sets on request", confirmed: false },
      { label: "Grades on the mill line", value: "Exterior cladding and landscape panels; interior fire-retardant panels; interior acoustic panels", confirmed: false },
      { label: "Variation", value: "Natural; approved on a signed master plus a range set of at least five pieces", confirmed: true },
      { label: "Declarations", value: "Species (scientific name) and country of harvest per shipment for the Lacey Act", confirmed: true },
    ],
    finishFamilies: ["natural-veneer"],
    systems: [
      "Exposed-fastener rainscreen with sliding-point fixings (thermoset core).",
      "Concealed undercut anchors on 8 and 10 mm thermoset core (TBC per mill data).",
      "Interior Z-clip and French cleat systems (all cores).",
    ],
    fabrication: [
      "Cut face-up with a scoring blade; CNC routing for cut-outs.",
      "Keep the grain direction consistent per elevation; sheets are numbered to the layout drawing.",
      "Exterior edges sealed per the mill data sheet (TBC); interior MDF-core edges banded or sealed.",
    ],
    stock: {
      note: "No stock. Veneer is sourced per order so that species, cut and range can be approved first.",
      moq: "120 m² per species and cut (TBC).",
      leadTime: "Range samples 3 to 4 weeks; production 6 to 8 weeks plus ocean transit (TBC).",
      perCrate: "Sheets crated face to face with interleaving; counts per crate on /stock-and-lead-times/ (TBC).",
    },
    documents: [
      { name: "Technical data sheet", status: "in-progress" },
      { name: "Mill product catalogue, English edition", status: "in-progress" },
      { name: "Species and range-sample guide", status: "in-progress" },
      { name: "Lacey Act declaration template", status: "in-progress" },
      { name: "Formaldehyde emission test (ASTM E1333 / D6007)", status: "planned" },
      { name: "CSI 06 42 00 wood paneling specification", status: "planned" },
    ],
    faq: [
      {
        q: "Can wood veneer be used outside?",
        a: "Yes, when the veneer is resin-impregnated, pressed onto a high-pressure thermoset core and finished with an exterior-grade cured face, and the wall assembly follows the combustible exterior wall covering rules of the building code. Veneer on MDF or plywood is for interiors only.",
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
        q: "Why is the US version limited to the high-pressure thermoset core?",
        a: "Veneered panels on MDF, particleboard or plywood cores are within the scope of the 2026 antidumping and countervailing duty orders on hardwood and decorative plywood from China. A high-pressure thermoset core is a different product, but if that core is mainly wood fibre the scope question is closer, so its classification is being confirmed by ruling before it is priced for the United States.",
      },
      {
        q: "What is an electron-beam-cured veneer surface?",
        a: "Electron-beam (EB) curing hardens the resin on the face with a beam of electrons instead of UV light or heat. The surface performance it gives this panel, such as abrasion, stain and weathering results, is published on the data sheet once confirmed.",
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
    name: "Interior HPL Panels",
    shortName: "Interior HPL",
    metaTitle: "Interior HPL Panels | Decorative Laminate Wall Panels",
    metaDescription:
      "Interior HPL and compact laminate wall panels for commercial spaces: decors, gloss levels, substrates and flame-spread data for millwork shops.",
    definition:
      "Interior HPL panels are decorative high-pressure laminates, either thin HPL bonded to a substrate by the millwork shop or self-supporting compact laminate from 3 mm, used for commercial wall panels, feature walls and wet areas.",
    use: ["interior"],
    rank: { US: 5, CA: 5 },
    intro: [
      "The interior line separates two products that are often confused: thin decorative HPL (0.7 to 1.0 mm) for lamination onto a substrate, and interior compact laminate (3 to 6 mm) that is fixed directly to a frame. Both share the decor library with the exterior line.",
      "Substrate choice decides the documentation. Phenolic compact panels carry no formaldehyde rules; panels pre-laminated on MDF or particleboard are certified under TSCA Title VI and SOR/2021-148 before they are offered.",
    ],
    supply: {
      US: {
        scenarios: ["Commercial interior wall panels, feature walls, corridors and washrooms.", "Thin HPL sheets for millwork fabricators."],
        dutyNote: "General rate plus Section 301 duties for laminate sheets under heading 3921; pre-laminated wood-core panels are not offered in the United States.",
        tariffReference: ["3921.90.50"],
      },
      CA: {
        scenarios: ["Commercial interior wall panels and millwork laminate.", "Pre-laminated MDF panels certified under SOR/2021-148."],
        dutyNote: "MFN rate plus GST.",
        tariffReference: ["3921.90", "4411 for pre-laminated MDF panels"],
      },
    },
    specs: [
      { label: "Thin HPL", value: "0.7, 0.8 and 1.0 mm; EN 438-3 HGS/HGP grades", confirmed: false },
      { label: "Interior compact", value: "3, 4 and 6 mm; EN 438-4 CGS grade", confirmed: false },
      { label: "Sheet sizes", value: "1,220 × 2,440 mm and 1,300 × 3,050 mm", confirmed: false },
      { label: "Surfaces", value: "Matte, textured and high gloss; anti-fingerprint matte on request", confirmed: false },
      { label: "Fire performance", value: "Interior finish class per ASTM E84 and CAN/ULC S102; see /compliance/", confirmed: true },
    ],
    finishFamilies: ["wood-grain", "solid", "stone-look"],
    systems: ["Z-clip and French cleat for compact panels.", "Adhesive lamination to MDF or plywood for thin HPL, by the millwork shop."],
    fabrication: ["Thin HPL: balanced construction with a backer on the substrate.", "Compact: CNC routing, chamfered edges, no edge banding needed."],
    stock: {
      note: "No stock; decors shared with the exterior stock programme where thicknesses overlap.",
      moq: "100 m² per decor (TBC).",
      leadTime: "Production 3 to 5 weeks plus ocean transit (TBC).",
      perCrate: "Published on /stock-and-lead-times/ (TBC).",
    },
    documents: [
      { name: "Technical data sheet", status: "planned" },
      { name: "CSI 09 78 23 Phenolic Interior Wall Paneling specification", status: "planned" },
      { name: "Flame-spread test reports", status: "in-progress" },
    ],
    faq: [
      {
        q: "What wall panels are used in commercial interiors?",
        a: "Compact laminate, veneer and laminated panels, metal and ACM panels, and concrete-look panels, chosen by flame-spread class, cleanability and impact resistance. The commercial interior wall panels page lists our materials by use.",
      },
      {
        q: "Does interior HPL need a formaldehyde certificate?",
        a: "Thin HPL and compact laminate with a phenolic core do not fall under TSCA Title VI or SOR/2021-148. Panels pre-laminated onto MDF or particleboard do, and those are certified and labelled before they are offered in Canada; they are not offered in the United States.",
      },
    ],
    masterformat: ["09 78 23 Phenolic Interior Wall Paneling", "06 42 19 Plastic-Laminate-Clad Wood Paneling"],
    keywords: {
      primary: ["interior HPL wall panels"],
      secondary: ["decorative HPL wall panels", "HPL wall panels", "commercial interior wall panels", "laminate wall panels"],
    },
  },
];

export function findMaterial(slug: string) {
  return materials.find((m) => m.slug === slug);
}

export function materialsForRegion(region: Region) {
  return [...materials].sort((a, b) => a.rank[region] - b.rank[region]);
}

export const materialSlugs = materials.map((m) => m.slug);
