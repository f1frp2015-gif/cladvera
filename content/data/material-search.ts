import type { Faq } from "@/content/data/materials";

export type MaterialQuestionKey = "mcm" | "hpl" | "interior-board" | "gfrp";

interface MaterialQuestionsContent {
  title: string;
  context: string;
  items: Faq[];
  references: Array<{ label: string; href: string }>;
}

/** Visible buyer answers also supply the FAQ schema; claims stay tied to the named range. */
export const materialQuestions: Record<MaterialQuestionKey, MaterialQuestionsContent> = {
  mcm: {
    title: "Metal composite panel sourcing questions",
    context: "Start with the face metal and core, then match the finish and evidence to the building application.",
    items: [
      {
        q: "Are MCM, ACM and ACP the same panel?",
        a: "MCM means metal composite material. ACM and ACP refer to aluminum composite material or panels, a subset with aluminum faces. ALMINE describes two metal skins without specifying the face metal and gauge for every construction. Confirm both before ordering this range against an ACM or ACP specification.",
      },
      {
        q: "Does ALMINE's A2 product name establish project fire approval?",
        a: "A2 is part of the manufacturer's published product name. Request the classification report, test method and exact tested construction, then have the project team review the proposed panel and wall assembly. The product name alone does not establish approval for a particular building or jurisdiction.",
      },
      {
        q: "What documents should tunnel and healthcare buyers request?",
        a: "For the Tunnel Traffic Dedicated Panel, request the fire, smoke, impact, abrasion and cleaning evidence required by the transit project. For the Medical Antibacterial Special Panel, request finish-specific antibacterial methods and results, chemical resistance, cleaning instructions and interior fire reports. Match each report to the offered panel and coating.",
      },
      {
        q: "What belongs in a metal composite panel export inquiry?",
        a: "Include the application, panel dimensions, quantities, face metal and gauge, core requirement, coating, finish sample and required reports. State whether the scope is flat sheets or fabricated panels, and identify the destination and packing needs. Cladvera confirms available construction, price and delivery scope with the inquiry.",
      },
    ],
    references: [
      { label: "ALMINE product descriptions", href: "https://www.alminecn.com/En/Products/?id=3" },
      { label: "MCA material terminology", href: "https://metalconstruction.org/view/download.php/online-education/education-materials/mcm-educational-downloads/environmental-product-declaration-for-metal-composite-material-panels" },
    ],
  },
  hpl: {
    title: "Exterior HPL procurement questions",
    context: "Review the exterior laminate grade, surface and supporting wall system as one specification.",
    items: [
      {
        q: "Is exterior HPL the same as compact laminate cladding?",
        a: "Exterior HPL cladding is often described as compact laminate. Compactwood identifies this product as high-pressure laminate wood-fiber board for building facades. Confirm the exterior grade, thickness, formats and supporting evidence for the offered board; a shared material name does not make different products interchangeable.",
      },
      {
        q: "Can these HPL facade panels be bonded directly to the wall?",
        a: "Compactwood's installation overview describes a ventilated rainscreen cavity and states that its paste installation is unsuitable for exterior walls. Request attachment details for the actual panel and substrate, including joints, movement allowances and cavity requirements, before the wall design is finalized.",
      },
      {
        q: "Does a wood-fiber HPL core mean a real wood veneer face?",
        a: "Wood-fiber describes the core and does not, by itself, identify the decorative face as real wood veneer. Request the exact surface build-up, finish code and physical sample. Agree grain direction and acceptable variation before approving a wood-look facade finish.",
      },
      {
        q: "What should an exterior HPL supplier quote include?",
        a: "Identify the exterior grade, thickness, sheet or cut-panel sizes, quantities, finish and grain direction. Include the project location, attachment concept and required reports. Ask the quote to state sample approval, fabrication scope, packing, delivery terms and lead time for the confirmed construction.",
      },
    ],
    references: [
      { label: "Compactwood exterior product", href: "https://www.compactwood.cn/cn/productsd2.php?pid=309" },
      { label: "Compactwood installation overview", href: "https://www.compactwood.cn/cn/fangan.php" },
    ],
  },
  "interior-board": {
    title: "Interior decorative board sourcing questions",
    context: "Specify the actual core and surface before comparing an interior board with an HPL schedule.",
    items: [
      {
        q: "Is Compactwood's Paste Special Board confirmed as interior HPL?",
        a: "The public product description identifies a high-pressure-cured decorative board, but does not confirm an HPL classification for this line. If a specification calls for interior HPL or compact laminate, request the exact grade and evidence before accepting the offered board as a substitute.",
      },
      {
        q: "Which core is offered for interior walls and ceilings?",
        a: "Compactwood describes wood-fiber and glass-fiber core versions. Confirm the core, thickness, dimensions and decorative face on the quotation and data sheet. The two descriptions should not be treated as one interchangeable construction or as evidence for the same performance rating.",
      },
      {
        q: "What needs review before specifying a decorative ceiling board?",
        a: "Request the offered board's weight, fixing method, substrate requirements and joint details for the overhead application. Review the applicable interior finish and fire reports, together with any moisture, emissions or cleaning requirements. Manufacturer claims need evidence tied to the actual board and finish.",
      },
      {
        q: "How do I request supply for an interior fit-out?",
        a: "Share the wall and ceiling schedule, panel sizes, quantities, core requirement, finish samples and installation concept. Identify the project location and required documents. Cladvera can coordinate a product inquiry with the manufacturer; packing, price and delivery scope are confirmed for the proposed order.",
      },
    ],
    references: [
      { label: "Compactwood Paste Special Board", href: "https://www.compactwood.cn/cn/productsd2.php?pid=289" },
      { label: "Compactwood manufacturer profile", href: "https://www.compactwood.cn/cn/about.php" },
    ],
  },
  gfrp: {
    title: "Custom GFRP and GRP supply questions",
    context: "A useful custom quote starts with geometry, repeat quantities and the interfaces with the building.",
    items: [
      {
        q: "What is the difference between GFRP, GRP and architectural fiberglass?",
        a: "GFRP means glass-fiber reinforced polymer. GRP, or glass-reinforced plastic, and architectural fiberglass commonly describe the same material family. FRP is broader and can use other reinforcing fibers. For this molded architectural range, confirm the resin, glass reinforcement, laminate and finish for the proposed component.",
      },
      {
        q: "Is molded GFRP the same as GFRC cladding?",
        a: "No. GFRP uses a polymer resin matrix, while GFRC means glass-fiber reinforced concrete and uses a cement-based matrix. Their design, connections and supporting evidence differ. This range concerns custom molded polymer components; a GFRC specification requires a separate product review.",
      },
      {
        q: "What does a custom GRP facade supplier need for pricing?",
        a: "Provide a 3D model or dimensioned drawings, unique shapes and repeat quantities, proposed joints, finish references and fixing zones. Include the destination and handling limits. Ask the quote to separate tooling, components, samples or mock-ups, testing, packing and delivery, with the drawing approval stage identified.",
      },
      {
        q: "Which reports are needed for a molded architectural fiberglass order?",
        a: "Request structural and connection information plus applicable fire, weathering and finish evidence for the proposed resin, reinforcement and thickness. The supplier presentation is a manufacturing reference. Historical examples or test references do not establish a performance classification for a new component or complete installed assembly.",
      },
    ],
    references: [
      { label: "Kinflare supplier presentation", href: "/documents/gfrp/kinflare-frp-capabilities-excerpt-2023.pdf" },
      { label: "ACMA resources for specifiers", href: "https://acmanet.org/education/ci-resources/" },
    ],
  },
};
