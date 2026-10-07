/**
 * Site identity and supply facts.
 *
 * Everything here is read by the layout, metadata, structured data, llms.txt
 * and the forms. Values marked TBC are placeholders for launch: replace them
 * with verified facts before NEXT_PUBLIC_SITE_STAGE is set to "live".
 */

export const site = {
  /** Working brand name. Pending USPTO and CIPO trademark clearance. */
  brand: "Cladvera",
  brandNote:
    "Cladvera is a working name pending trademark clearance. Change `site.brand` once the name is confirmed.",
  tagline:
    "Specification-ready architectural panels for North American fabricators, distributors and contractors",
  /** Set NEXT_PUBLIC_SITE_URL on Vercel once a domain is attached. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cladvera.vercel.app",
  /**
   * "draft" renders the pre-launch notice and sends noindex. Set
   * NEXT_PUBLIC_SITE_STAGE=live on the production deployment to remove both.
   */
  stage: process.env.NEXT_PUBLIC_SITE_STAGE === "live" ? "live" : "draft",
  origin: "Made in China. Supplied to the United States and Canada.",
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
    "Drawings-based project quotes within two business days; budget ranges within one business day without drawings.",
    "Sample sets dispatched within two business days after a 48-hour verification of the request.",
    "Every SKU ships with a document pack: commercial invoice, packing list, origin statement, bill of materials and the test reports listed on /compliance/.",
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
