import type { MaterialSlug, Use } from "./materials";

/**
 * Finish library.
 *
 * PLACEHOLDER DATA: the codes, names and swatch colours below illustrate the
 * data model and the page layout. Replace every entry with a real SKU (code,
 * photographed swatch, full-sheet photo, gloss reading, range-sample policy
 * and stock status) before the site goes live. Nothing here is a product
 * that can be ordered today.
 */

export type FinishFamilySlug =
  | "solid"
  | "metallic"
  | "wood-grain"
  | "stone-look"
  | "natural-veneer"
  | "textured-concrete";

export interface FinishFamily {
  slug: FinishFamilySlug;
  name: string;
  description: string;
  /** Collection page, where one exists. */
  path?: string;
}

export const finishFamilies: FinishFamily[] = [
  { slug: "solid", name: "Solid colours", description: "Single-tone coil coatings on ACM and unicolour HPL decors." },
  { slug: "metallic", name: "Metallic and brushed", description: "Metallic PVDF coatings and brushed aluminum faces. Directional; install arrows the same way." },
  { slug: "wood-grain", name: "Wood-grain", description: "Printed wood decors on HPL and ACM. Repeats are stated per decor so elevations can be planned.", path: "/finishes/wood-grain" },
  { slug: "stone-look", name: "Stone-look", description: "Printed stone patterns on ACM and HPL. Flat surfaces, not relief." },
  { slug: "natural-veneer", name: "Natural veneer", description: "Real wood veneer with natural variation. Approved against range samples, never a single chip.", path: "/finishes/wood-grain" },
  { slug: "textured-concrete", name: "Concrete textures", description: "UHPC surfaces from the mould: smooth, sandblasted, ribbed and board-formed.", path: "/finishes/textured-concrete" },
];

export type VariationClass = "uniform" | "moderate" | "natural";

export interface Finish {
  code: string;
  name: string;
  family: FinishFamilySlug;
  materials: MaterialSlug[];
  use: Use[];
  gloss: string;
  texture: string;
  directional: boolean;
  variation: VariationClass;
  /** True when multi-piece range samples are issued for approval. */
  rangeSample: boolean;
  stock: "made-to-order" | "planned-stock";
  moq: string;
  /** CSS background for the placeholder swatch. */
  swatch: string;
  note?: string;
}

export const variationLabel: Record<VariationClass, string> = {
  uniform: "Uniform (coated or printed; batch-controlled)",
  moderate: "Moderate (printed decor; repeat and direction matter)",
  natural: "Natural (real wood or cast concrete; approved on range samples)",
};

export const finishes: Finish[] = [
  {
    code: "AC-SW01",
    name: "Signal White",
    family: "solid",
    materials: ["acm-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, 25 to 35 GU at 60°",
    texture: "Smooth coil coating",
    directional: false,
    variation: "uniform",
    rangeSample: false,
    stock: "made-to-order",
    moq: "One coil run; mixed-finish containers from 180 m² per finish (TBC)",
    swatch: "#f3f3f0",
  },
  {
    code: "AC-CH02",
    name: "Charcoal",
    family: "solid",
    materials: ["acm-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, 25 to 35 GU at 60°",
    texture: "Smooth coil coating",
    directional: false,
    variation: "uniform",
    rangeSample: false,
    stock: "made-to-order",
    moq: "One coil run; mixed-finish containers from 180 m² per finish (TBC)",
    swatch: "#2f3136",
  },
  {
    code: "AC-BM03",
    name: "Brushed Aluminum",
    family: "metallic",
    materials: ["acm-panels"],
    use: ["interior", "exterior"],
    gloss: "Low sheen, direction-dependent",
    texture: "Brushed face under clear coat",
    directional: true,
    variation: "moderate",
    rangeSample: true,
    stock: "made-to-order",
    moq: "180 m² per finish (TBC)",
    swatch: "linear-gradient(90deg, #c9ccd1 0%, #e4e6ea 40%, #c3c6cb 60%, #dfe1e5 100%)",
    note: "Colour reads differently across the brush direction. Sheets are marked with arrows and should be installed in one direction per elevation.",
  },
  {
    code: "AC-CP04",
    name: "Copper Metallic",
    family: "metallic",
    materials: ["acm-panels"],
    use: ["interior", "exterior"],
    gloss: "Satin, 40 to 60 GU at 60°",
    texture: "Smooth metallic PVDF",
    directional: true,
    variation: "moderate",
    rangeSample: true,
    stock: "made-to-order",
    moq: "180 m² per finish (TBC)",
    swatch: "linear-gradient(135deg, #a9633a 0%, #c98a5a 50%, #9c5a33 100%)",
  },
  {
    code: "AC-WO05",
    name: "Oak Woodgrain (printed)",
    family: "wood-grain",
    materials: ["acm-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, 15 to 25 GU at 60°",
    texture: "Smooth; printed grain, no relief",
    directional: true,
    variation: "moderate",
    rangeSample: true,
    stock: "made-to-order",
    moq: "180 m² per finish (TBC)",
    swatch: "repeating-linear-gradient(90deg, #c69a62 0px, #d4ab74 6px, #b98a52 9px, #cfa46c 14px)",
    note: "Pattern repeat along the sheet length is stated on the data sheet; plan joints so repeats do not align across adjacent sheets.",
  },
  {
    code: "AC-TR07",
    name: "Travertine (printed)",
    family: "stone-look",
    materials: ["acm-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, 15 to 25 GU at 60°",
    texture: "Smooth; printed stone, no relief",
    directional: false,
    variation: "moderate",
    rangeSample: true,
    stock: "made-to-order",
    moq: "180 m² per finish (TBC)",
    swatch: "linear-gradient(180deg, #e2d8c6 0%, #d3c6ad 30%, #e6ddcc 60%, #cfc2a8 100%)",
  },
  {
    code: "HP-NO11",
    name: "Natural Oak decor",
    family: "wood-grain",
    materials: ["exterior-hpl-panels", "interior-hpl-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, 8 to 12 GU at 60°",
    texture: "Fine embossed wood pore",
    directional: true,
    variation: "moderate",
    rangeSample: true,
    stock: "planned-stock",
    moq: "Stock programme planned for 8 mm; otherwise 150 m² per decor (TBC)",
    swatch: "repeating-linear-gradient(90deg, #cfa875 0px, #d9b687 5px, #c39a68 8px, #d5b283 13px)",
  },
  {
    code: "HP-WA12",
    name: "Weathered Ash decor",
    family: "wood-grain",
    materials: ["exterior-hpl-panels", "interior-hpl-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, 8 to 12 GU at 60°",
    texture: "Fine embossed wood pore",
    directional: true,
    variation: "moderate",
    rangeSample: true,
    stock: "made-to-order",
    moq: "150 m² per decor (TBC)",
    swatch: "repeating-linear-gradient(90deg, #a79d8d 0px, #b8afa0 5px, #9c9282 8px, #b3aa9b 13px)",
  },
  {
    code: "HP-SG13",
    name: "Slate Grey",
    family: "solid",
    materials: ["exterior-hpl-panels", "interior-hpl-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, 8 to 12 GU at 60°",
    texture: "Fine matte texture",
    directional: false,
    variation: "uniform",
    rangeSample: false,
    stock: "planned-stock",
    moq: "Stock programme planned for 8 mm; otherwise 150 m² per decor (TBC)",
    swatch: "#5b606a",
  },
  {
    code: "HP-TC14",
    name: "Terracotta",
    family: "solid",
    materials: ["exterior-hpl-panels"],
    use: ["exterior"],
    gloss: "Matte, 8 to 12 GU at 60°",
    texture: "Fine matte texture",
    directional: false,
    variation: "uniform",
    rangeSample: false,
    stock: "made-to-order",
    moq: "150 m² per decor (TBC)",
    swatch: "#b2603f",
  },
  {
    code: "VN-OAK21",
    name: "Rift White Oak",
    family: "natural-veneer",
    materials: ["wood-veneer-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte EB-cured face, gloss value TBC",
    texture: "Open pore under overlay",
    directional: true,
    variation: "natural",
    rangeSample: true,
    stock: "made-to-order",
    moq: "120 m² per species and cut (TBC)",
    swatch: "repeating-linear-gradient(90deg, #d8c3a0 0px, #e3d0b1 7px, #cdb48d 10px, #ddc8a6 16px)",
    note: "Approved on a signed master and a range set of at least five pieces. Lacey Act species and origin declared per shipment.",
  },
  {
    code: "VN-WAL22",
    name: "American Walnut",
    family: "natural-veneer",
    materials: ["wood-veneer-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte EB-cured face, gloss value TBC",
    texture: "Open pore under overlay",
    directional: true,
    variation: "natural",
    rangeSample: true,
    stock: "made-to-order",
    moq: "120 m² per species and cut (TBC)",
    swatch: "repeating-linear-gradient(90deg, #6b4a34 0px, #7d5a42 7px, #5e3f2b 10px, #76533c 16px)",
  },
  {
    code: "UH-SM31",
    name: "Smooth Natural Grey",
    family: "textured-concrete",
    materials: ["uhpc-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, sealed",
    texture: "Smooth from steel mould; pinholes within the agreed range",
    directional: false,
    variation: "natural",
    rangeSample: true,
    stock: "made-to-order",
    moq: "Per project; mould amortised over the order (TBC)",
    swatch: "#b9b7b2",
  },
  {
    code: "UH-SB32",
    name: "Sandblasted Warm Grey",
    family: "textured-concrete",
    materials: ["uhpc-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, sealed",
    texture: "Light sandblast exposing fine aggregate",
    directional: false,
    variation: "natural",
    rangeSample: true,
    stock: "made-to-order",
    moq: "Per project (TBC)",
    swatch: "radial-gradient(circle at 30% 30%, #c6c0b4 0%, #b5aea2 40%, #c1bbaf 100%)",
  },
  {
    code: "UH-RB33",
    name: "Ribbed 20 mm",
    family: "textured-concrete",
    materials: ["uhpc-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, sealed",
    texture: "Vertical ribs 20 mm pitch, 4 mm relief",
    directional: true,
    variation: "natural",
    rangeSample: true,
    stock: "made-to-order",
    moq: "Per project (TBC)",
    swatch: "repeating-linear-gradient(90deg, #aeaba5 0px, #c2bfb8 6px, #9f9c96 10px, #bdbab3 14px)",
    note: "Relief depth is stated in millimetres so shadow lines can be judged at the intended viewing distance.",
  },
  {
    code: "UH-BF34",
    name: "Board-formed",
    family: "textured-concrete",
    materials: ["uhpc-panels"],
    use: ["interior", "exterior"],
    gloss: "Matte, sealed",
    texture: "Timber board impression, 140 mm boards",
    directional: true,
    variation: "natural",
    rangeSample: true,
    stock: "made-to-order",
    moq: "Per project (TBC)",
    swatch: "repeating-linear-gradient(0deg, #b4b0a8 0px, #c4c0b8 18px, #a9a59d 22px, #bfbbb3 40px)",
  },
];

export function finishesForMaterial(slug: MaterialSlug) {
  return finishes.filter((f) => f.materials.includes(slug));
}

export function finishesInFamily(family: FinishFamilySlug) {
  return finishes.filter((f) => f.family === family);
}

export function findFinish(code: string) {
  return finishes.find((f) => f.code.toLowerCase() === code.toLowerCase());
}
