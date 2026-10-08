/**
 * Compactwood information is paraphrased from the linked manufacturer pages.
 * The published pages identify product families, not approved orderable SKUs.
 */

export const compactwoodSources = {
  about: "https://www.compactwood.cn/cn/about.php",
  exteriorProduct: "https://www.compactwood.cn/cn/productsd2.php?pid=309",
  interiorProduct: "https://www.compactwood.cn/cn/productsd2.php?pid=289",
  installation: "https://www.compactwood.cn/cn/fangan.php",
  supplierProject: "https://www.compactwood.cn/cn/cased.php?pid=312",
} as const;

export const compactwoodImages = {
  exteriorStructure: "/images/compactwood/wood-fiber-hpl-structure.jpg",
  interiorStructure: "/images/compactwood/paste-special-board-structure.jpg",
  supplierProject: "/images/compactwood/supplier-project.jpg",
} as const;

export const compactwoodExteriorPath = "/materials/exterior-hpl-panels";
export const compactwoodExteriorProductPath = `${compactwoodExteriorPath}/wood-fiber-facade`;
export const compactwoodInteriorPath = "/materials/interior-hpl-panels";
export const compactwoodInteriorProductPath = `${compactwoodInteriorPath}/paste-special-board`;

export const compactwoodReviewItems = [
  "Exact panel construction, thickness, dimensions and edge details",
  "Current finish card, physical samples and batch matching",
  "Product-specific fire, weathering and mechanical test reports",
  "Attachment design and complete wall-assembly evidence for the project jurisdiction",
  "Order quantity, production schedule and shipment terms",
] as const;
