import type { MaterialSlug } from "./materials";

/**
 * Compliance status matrix rendered on /compliance/ and on each material page.
 *
 * Every cell starts as "unverified", "in-progress", "planned" or "not-applicable". A cell
 * becomes "available" only when a report number, the testing laboratory and
 * the assembly description can be published with it. Nothing here implies a
 * listing that has not been issued.
 */

export type ComplianceStatus = "available" | "unverified" | "in-progress" | "planned" | "not-applicable";

export type ComplianceColumnId =
  | "e84"
  | "nfpa285"
  | "listing"
  | "s134"
  | "s102"
  | "e136"
  | "e330"
  | "formaldehyde"
  | "lacey";

export interface ComplianceColumn {
  id: ComplianceColumnId;
  label: string;
  /** What the column means for a buyer, in one sentence. */
  meaning: string;
  region: "US" | "CA" | "both";
}

export const complianceColumns: ComplianceColumn[] = [
  { id: "e84", label: "ASTM E84 / UL 723", meaning: "Surface burning class (A, B or C) of the panel material; required for interior finishes under IBC Chapter 8.", region: "US" },
  { id: "nfpa285", label: "NFPA 285 assembly", meaning: "Full-scale fire test of a complete exterior wall assembly; required above 40 ft on Type I to IV buildings.", region: "US" },
  { id: "listing", label: "Listing (ICC-ES, Intertek, QAI)", meaning: "Third-party evaluation report or listing that references the tested assembly and the quality-control programme.", region: "both" },
  { id: "s134", label: "CAN/ULC S134", meaning: "Canadian full-scale exterior wall fire test required for noncombustible construction under NBC 3.1.5.5.", region: "CA" },
  { id: "s102", label: "CAN/ULC S102", meaning: "Canadian flame-spread rating of the material surface for interiors and combustible construction.", region: "CA" },
  { id: "e136", label: "ASTM E136", meaning: "Noncombustibility of the core or panel, where a noncombustible material is specified.", region: "US" },
  { id: "e330", label: "ASTM E330 / wind load", meaning: "Structural performance of the panel and its attachment under uniform static air pressure.", region: "both" },
  { id: "formaldehyde", label: "TSCA Title VI / SOR/2021-148", meaning: "Formaldehyde emission certification for composite wood cores; not applicable to phenolic, aluminum or concrete panels.", region: "both" },
  { id: "lacey", label: "Lacey Act declaration", meaning: "Species and country of harvest declared for any real wood content imported into the United States.", region: "US" },
];

export interface ComplianceCell {
  status: ComplianceStatus;
  note?: string;
}

export interface ComplianceRow {
  id: string;
  product: string;
  materialSlug: MaterialSlug;
  cells: Record<ComplianceColumnId, ComplianceCell>;
}

const inProgress = (note?: string): ComplianceCell => ({ status: "in-progress", note });
const planned = (note?: string): ComplianceCell => ({ status: "planned", note });
const unverified = (note?: string): ComplianceCell => ({ status: "unverified", note });
const na = (note?: string): ComplianceCell => ({ status: "not-applicable", note });

const almineReportStatus: Record<ComplianceColumnId, ComplianceCell> = {
  e84: unverified("Request the report for the exact ALMINE panel and finish."),
  nfpa285: unverified("No verified complete wall-assembly report is listed for the proposed project construction."),
  listing: unverified("No North American listing number is confirmed for the proposed SKU."),
  s134: unverified("Request Canadian wall-assembly evidence if the project requires it."),
  s102: unverified("Request the product-specific flame-spread report."),
  e136: unverified("ALMINE describes an inorganic A2 core; confirm the test method and report for the ordered construction."),
  e330: unverified("Panel and attachment structural test evidence to confirm for the project system."),
  formaldehyde: na("No composite wood component is described; verify the actual construction."),
  lacey: na("No real wood component is described; verify the actual construction."),
};

export const complianceRows: ComplianceRow[] = [
  {
    id: "hpl-exterior",
    product: "Compactwood exterior wood fiber HPL panel",
    materialSlug: "exterior-hpl-panels",
    cells: {
      e84: unverified("Request the report for the exact Compactwood panel and finish."),
      nfpa285: unverified("No report for the proposed complete North American wall assembly has been verified."),
      listing: unverified("No North American listing number has been verified for the selected construction."),
      s134: unverified("Request Canadian wall-assembly evidence if the project requires it."),
      s102: unverified("Request the product-specific flame-spread report."),
      e136: unverified("The manufacturer cites Chinese GB 8624 B1/B2 grades; these do not establish ASTM E136 noncombustibility."),
      e330: unverified("Request structural evidence for the selected panel and attachment system."),
      formaldehyde: unverified("Confirm the exact construction and any applicable emissions requirements; no product-specific certificate was reviewed."),
      lacey: unverified("Wood fiber is described in the core; confirm declaration requirements and material origin for the shipment."),
    },
  },
  {
    id: "hpl-interior",
    product: "Compactwood interior decorative board (HPL status to confirm)",
    materialSlug: "interior-hpl-panels",
    cells: {
      e84: unverified("Request a report for the selected core and decorative surface."),
      nfpa285: na("Interior use only."),
      listing: unverified("No North American listing or evaluation number has been reviewed."),
      s134: na("Interior use only."),
      s102: unverified("Request the product-specific flame-spread report."),
      e136: unverified("No ASTM E136 report has been reviewed for either described core option."),
      e330: na("Interior use only."),
      formaldehyde: unverified("Confirm whether the ordered board uses a wood fiber core and what emissions documentation applies."),
      lacey: unverified("Confirm core material, origin and declaration requirements for the actual shipment."),
    },
  },
  {
    id: "almine-a2",
    product: "ALMINE A2 Fireproof Metal Composite Panel",
    materialSlug: "acm-panels",
    cells: almineReportStatus,
  },
  {
    id: "almine-tunnel",
    product: "ALMINE Tunnel Traffic Dedicated Panel",
    materialSlug: "acm-panels",
    cells: almineReportStatus,
  },
  {
    id: "almine-medical",
    product: "ALMINE Medical Antibacterial Special Panel",
    materialSlug: "acm-panels",
    cells: almineReportStatus,
  },
  {
    id: "veneer-phenolic",
    product: "Real wood veneer on phenolic compact core",
    materialSlug: "wood-veneer-panels",
    cells: {
      e84: inProgress("Material-level test; class to be published."),
      nfpa285: planned("Exterior use follows the IBC combustible exterior wall covering path; assembly test to be quoted."),
      listing: planned("After the assembly test."),
      s134: planned("Canadian assembly test."),
      s102: inProgress("Flame-spread rating to be published."),
      e136: na("Combustible by definition."),
      e330: planned("Tested with the attachment system named on /systems/."),
      formaldehyde: inProgress("Phenolic core is expected to fall outside TSCA Title VI and SOR/2021-148; written confirmation is being sought and emission data will be published regardless."),
      lacey: inProgress("Species (scientific name) and country of harvest declared per shipment; declarations drafted per species."),
    },
  },
  {
    id: "veneer-wood-core",
    product: "Real wood veneer on MDF or plywood core (Canada only)",
    materialSlug: "wood-veneer-panels",
    cells: {
      e84: na("Not offered in the United States: within the scope of the 2026 hardwood and decorative plywood AD/CVD orders."),
      nfpa285: na("Interior use only."),
      listing: na("Interior use only."),
      s134: na("Interior use only."),
      s102: inProgress("Flame-spread rating to be published."),
      e136: na("Combustible by definition."),
      e330: na("Interior use only."),
      formaldehyde: planned("Canadian SOR/2021-148 certification, labelling and record-keeping before the first order."),
      lacey: na("Not shipped to the United States."),
    },
  },
  {
    id: "uhpc",
    product: "UHPC facade panels, 15 to 30 mm",
    materialSlug: "uhpc-panels",
    cells: {
      e84: na("Concrete is noncombustible; ASTM E136 applies instead."),
      nfpa285: na("Noncombustible cladding; the assembly behind it is the designer's responsibility."),
      listing: planned("Project-specific engineering by a North American precaster or professional engineer; no generic listing is claimed."),
      s134: na("Noncombustible cladding."),
      s102: na("Noncombustible cladding."),
      e136: planned("Noncombustibility test of the panel mix."),
      e330: planned("Panel and anchor tested together under delegated design."),
      formaldehyde: na("No wood content."),
      lacey: na("No wood content."),
    },
  },
];

export const complianceStatusLabel: Record<ComplianceStatus, string> = {
  available: "Available",
  unverified: "Not verified",
  "in-progress": "In progress",
  planned: "Planned",
  "not-applicable": "Not applicable",
};
