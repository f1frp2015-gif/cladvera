/**
 * Site identity and supply facts.
 *
 * Everything here is read by the layout, metadata, structured data, llms.txt
 * and the forms. Values marked TBC remain draft placeholders. Reviewed
 * public routes are controlled separately in publication.ts.
 */

export const site = {
  /** Working brand name. Pending USPTO and CIPO trademark clearance. */
  brand: "Cladvera",
  brandNote:
    "Cladvera is a working name pending trademark clearance. Change `site.brand` once the name is confirmed.",
  tagline:
    "Architectural panel sourcing and China export supply for design teams, buyers, fabricators and contractors",
  description:
    "Cladvera coordinates architectural panel sourcing and China export supply for North American projects. TAKTL is presented as a separate manufacturer collection.",
  /** Set NEXT_PUBLIC_SITE_URL on Vercel once a domain is attached. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://cladvera.vercel.app"),
  /**
   * Controls draft presentation only. Changing this flag never publishes
   * unreviewed routes; publication.ts remains the public-page allowlist.
   */
  stage: process.env.NEXT_PUBLIC_SITE_STAGE === "live" ? "live" : "draft",
  origin: "China-sourced ranges; TAKTL is a separate manufacturer collection. Manufacturing origin is confirmed for the offered product.",
  markets: ["United States", "Canada"] as const,
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sales@cladvera.com",
    /** E.164, or empty to hide the phone link. */
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
    /** Digits only, or empty to hide the WhatsApp link. */
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "",
    replyTime: "one business day",
    hours: "Monday to Friday, with a named contact for North American working hours (TBC)",
  },
  legal: {
    entity: "Legal entity for panel supply (TBC)",
    address: "Registered address (TBC)",
    /** Importer of record is the buyer or its broker unless a quote says otherwise. */
    importerOfRecord: "buyer",
  },
  /**
   * Public commitments the site makes. Keep these conservative: every line is
   * repeated on /supply-and-delivery/ and in llms.txt.
   */
  commitments: [
    "Project quote timing is confirmed after drawings, sourcing and the requested panel construction are reviewed.",
    "Sample availability and dispatch timing are confirmed for the requested product and finish.",
    "Shipment documents and available product test reports are confirmed for the ordered SKU and project requirements.",
    "Duties, taxes and brokerage are payable by the importer; quotes state the Incoterm and what it excludes.",
  ],
  /** Claims the site must not make. Rendered on /compliance/. */
  notClaimed: [
    "That duties or tariffs are included or absorbed, unless a quote is explicitly DDP.",
    "Compliance with Buy American (FAR 25), Build America, Buy America or Buy Canadian procurement rules.",
    "That any product is outside the scope of an antidumping or countervailing duty order.",
    "That Section 232 aluminum duties do not apply, or that they are assessed on aluminum content only.",
    "Manufacturing or inventory in the United States or Canada, unless a listed third-party warehouse holds stock.",
    "NFPA 285 or CAN/ULC S134 compliance for any assembly without a report number and assembly description.",
    "Equivalence to another brand's listing, project record or warranty.",
    "The word \"manufacturer\" for any product whose manufacturing entity is not named on /about/.",
  ],
} as const;

export type SiteStage = typeof site.stage;
