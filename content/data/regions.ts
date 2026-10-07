/**
 * Country-level content differences. The header switch sets `data-region`
 * on <html>; `RegionBlock` renders the US and CA variants side by side and
 * the stylesheet hides the inactive one.
 *
 * Duty and code statements below are summaries for buyers, not legal advice.
 * Rates change: the /supply-and-delivery/ page tells importers to confirm
 * classification and rates with their broker before ordering.
 */

export type Region = "US" | "CA";

export interface RegionProfile {
  code: Region;
  name: string;
  currency: string;
  units: string;
  /** Short heading used on country blocks. */
  label: string;
  /** Where panels are shipped and cleared. */
  ports: string[];
  /** One-paragraph note on duties payable by the importer. */
  dutyNote: string;
  /** One-paragraph note on the fire-code route for exterior use. */
  codeNote: string;
  /** Public procurement rules the site does not claim to meet. */
  procurementNote: string;
}

export const regions: Record<Region, RegionProfile> = {
  US: {
    code: "US",
    name: "United States",
    currency: "USD",
    units: "inches and square feet, with millimetres in brackets",
    label: "United States",
    ports: ["Los Angeles / Long Beach", "Houston", "New York / New Jersey", "Savannah"],
    dutyNote:
      "China-origin panels entering the United States carry the general rate plus Section 301 duties, and aluminum composite panels also carry Section 232 aluminum duties assessed on the full customs value. Veneered panels on wood-based cores fall within the 2026 hardwood and decorative plywood antidumping and countervailing duty orders. Classification and rates are confirmed with the importer's broker before an order; the HTS references on each material page are for orientation only.",
    codeNote:
      "Exterior use on Type I to IV buildings above 40 ft requires an NFPA 285 tested, listed or engineered wall assembly under the International Building Code. Below that height, and on Type V buildings, panels are specified on material-level data (ASTM E84, ASTM E136 where relevant). Interior finishes follow IBC Chapter 8 flame-spread classes.",
    procurementNote:
      "Not for federally funded or federally procured projects: the products do not meet Buy American (FAR 25) or Build America, Buy America domestic-content rules.",
  },
  CA: {
    code: "CA",
    name: "Canada",
    currency: "CAD",
    units: "millimetres and square metres, with imperial in brackets",
    label: "Canada",
    ports: ["Vancouver", "Toronto (via Montreal or rail)", "Montreal"],
    dutyNote:
      "Phenolic (HPL), UHPC and veneered panels enter Canada at the MFN rate plus GST. Aluminum composite panels from China carry the 25 percent surtax under the China Surtax Order (2024), and aluminum smelted or cast in China is traced even when routed through third countries. Classification and rates are confirmed with the importer's broker before an order.",
    codeNote:
      "Exterior use on buildings required to be of noncombustible construction needs a CAN/ULC S134 tested wall assembly under the National Building Code (3.1.5.5), with storey and sprinkler conditions. Combustible construction and interiors follow CAN/ULC S102 flame-spread limits. NFPA 285 data is not assumed to be accepted in place of S134.",
    procurementNote:
      "Not for federal contracts covered by the Buy Canadian policy (December 2025), which requires Canadian steel, aluminum and wood on large federal construction contracts.",
  },
};

export const regionList: Region[] = ["US", "CA"];
