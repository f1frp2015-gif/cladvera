import type { MaterialSlug } from "./materials";

/**
 * Compliance status matrix rendered on /compliance/ and on each material page.
 *
 * Every cell starts as "in-progress", "planned" or "not-applicable". A cell
 * becomes "available" only when a report number, the testing laboratory and
 * the assembly description can be published with it. Nothing here implies a
 * listing that has not been issued.
 */

export type ComplianceStatus = "available" | "in-progress" | "planned" | "not-applicable";

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
const na = (note?: string): ComplianceCell => ({ status: "not-applicable", note });

export const complianceRows: ComplianceRow[] = [
  {
    id: "hpl-exterior",
    product: "Exterior phenolic (HPL) compact panels, 6 to 12 mm",
    materialSlug: "exterior-hpl-panels",
    cells: {
      e84: inProgress("Material-level test at an ILAC-accredited laboratory; class to be published with the report number."),
      nfpa285: planned("Assembly test quoted with Intertek, UL Solutions and QAI; a generic steel-stud, gypsum and mineral-wool rainscreen assembly is proposed."),
      listing: planned("Intertek CCRR or ICC-ES listing after the assembly test."),
      s134: planned("Separate Canadian assembly test; NFPA 285 data is not assumed to be accepted."),
      s102: inProgress("Flame-spread rating to be published with the report number."),
      e136: na("Phenolic panels are combustible by definition; specified by assembly test, not by E136."),
      e330: planned("Tested with the attachment system named on /systems/."),
      formaldehyde: na("Phenolic resin core; EPA and ECCC positions on veneer-over-phenolic to be confirmed for the veneer line, not this one."),
      lacey: na("No real wood content; kraft paper core."),
    },
  },
  {
    id: "hpl-interior",
    product: "Interior HPL panels",
    materialSlug: "interior-hpl-panels",
    cells: {
      e84: inProgress("Material-level test; interior finish class to be published."),
      nfpa285: na("Interior use only."),
      listing: na("Not required for interior finishes; test reports are supplied instead."),
      s134: na("Interior use only."),
      s102: inProgress("Flame-spread rating to be published."),
      e136: na("Combustible by definition."),
      e330: na("Interior use only."),
      formaldehyde: planned("Applies only to variants with particleboard or MDF substrates; those variants are certified before they are offered."),
      lacey: na("No real wood content."),
    },
  },
  {
    id: "acm-fr",
    product: "Aluminum composite (ACM) panels, FR mineral-filled core, 4 mm",
    materialSlug: "acm-panels",
    cells: {
      e84: inProgress("Material-level test; class to be published."),
      nfpa285: planned("Assembly test scheduled after the HPL assembly; until then sold for interiors and exterior walls below 40 ft only."),
      listing: planned("ICC-ES ESL/ESR under AC25 after the assembly test."),
      s134: planned("Canadian assembly test; Canadian ACM brands hold QAI listings on this basis."),
      s102: inProgress("Flame-spread rating to be published."),
      e136: planned("Core noncombustibility, where a project specifies it."),
      e330: planned("Tested with the route-and-return system named on /systems/."),
      formaldehyde: na("No wood content."),
      lacey: na("No wood content."),
    },
  },
  {
    id: "acm-pe",
    product: "Aluminum composite (ACM) panels, standard PE core",
    materialSlug: "acm-panels",
    cells: {
      e84: inProgress("Material-level test; interior class to be published."),
      nfpa285: na("Not offered for exterior walls where NFPA 285 applies."),
      listing: na("Not offered for exterior use above 40 ft."),
      s134: na("Not offered for noncombustible construction."),
      s102: inProgress("Flame-spread rating to be published."),
      e136: na("Polyethylene core is combustible."),
      e330: na("Interior and low-rise signage-free uses only."),
      formaldehyde: na("No wood content."),
      lacey: na("No wood content."),
    },
  },
  {
    id: "veneer-phenolic",
    product: "Real wood veneer on high-pressure thermoset core",
    materialSlug: "wood-veneer-panels",
    cells: {
      e84: inProgress("Material-level test; class to be published."),
      nfpa285: planned("Exterior use follows the IBC combustible exterior wall covering path; assembly test to be quoted."),
      listing: planned("After the assembly test."),
      s134: planned("Canadian assembly test."),
      s102: inProgress("Flame-spread rating to be published."),
      e136: na("Combustible by definition."),
      e330: planned("Tested with the attachment system named on /systems/."),
      formaldehyde: inProgress("Core composition is being confirmed. A kraft-paper phenolic core is expected to fall outside TSCA Title VI and SOR/2021-148; a wood-fibre core is assessed as a composite wood product. Emission data will be published either way."),
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
  "in-progress": "In progress",
  planned: "Planned",
  "not-applicable": "Not applicable",
};
