import { catalogProducts } from "./catalog";
/** Exact reviewed routes. Draft content stays outside navigation and indexing. */
export const taktlPath = "/suppliers/taktl";
export const alminePath = "/materials/acm-panels";
export const compactwoodExteriorPath = "/materials/exterior-hpl-panels";
export const compactwoodInteriorPath = "/materials/interior-hpl-panels";
export const publishedCollectionPaths = [taktlPath, alminePath, compactwoodExteriorPath, compactwoodInteriorPath] as const;
export const publishedPaths = [
  "/", "/products", "/applications", "/architects", "/procurement", "/technical-resources", "/compare", "/samples", "/request-quote",
  ...publishedCollectionPaths, ...catalogProducts.map(p => p.path),
];
export const alminePublishedPaths = publishedPaths.filter(p => p === alminePath || p.startsWith(`${alminePath}/`));
export const compactwoodPublishedPaths = publishedPaths.filter(p => p === compactwoodExteriorPath || p.startsWith(`${compactwoodExteriorPath}/`) || p === compactwoodInteriorPath || p.startsWith(`${compactwoodInteriorPath}/`));
export function isTaktlPath(path: string) { return path === taktlPath || path.startsWith(`${taktlPath}/`); }
export function isAlminePath(path: string) { return alminePublishedPaths.includes(path); }
export function isCompactwoodPath(path: string) { return compactwoodPublishedPaths.includes(path); }
export function isPublishedPath(path: string) { return publishedPaths.includes(path); }
