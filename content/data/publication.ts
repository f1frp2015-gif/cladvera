/** Published product collections while the remaining site is draft. */
export const taktlPath = "/suppliers/taktl";
export const alminePath = "/materials/acm-panels";
export const compactwoodExteriorPath = "/materials/exterior-hpl-panels";
export const compactwoodInteriorPath = "/materials/interior-hpl-panels";

export const alminePublishedPaths = [
  alminePath,
  `${alminePath}/a2-fireproof`,
  `${alminePath}/tunnel-traffic`,
  `${alminePath}/medical-antibacterial`,
] as const;

export const compactwoodPublishedPaths = [
  compactwoodExteriorPath,
  `${compactwoodExteriorPath}/wood-fiber-facade`,
  compactwoodInteriorPath,
  `${compactwoodInteriorPath}/paste-special-board`,
] as const;

export const publishedCollectionPaths = [taktlPath, alminePath, compactwoodExteriorPath, compactwoodInteriorPath] as const;

export function isTaktlPath(path: string) {
  return path === taktlPath || path.startsWith(`${taktlPath}/`);
}

export function isAlminePath(path: string) {
  return path === alminePath || path.startsWith(`${alminePath}/`);
}

export function isCompactwoodPath(path: string) {
  return path === compactwoodExteriorPath || path.startsWith(`${compactwoodExteriorPath}/`) ||
    path === compactwoodInteriorPath || path.startsWith(`${compactwoodInteriorPath}/`);
}

export function isPublishedPath(path: string) {
  return isTaktlPath(path) || alminePublishedPaths.some((publishedPath) => path === publishedPath) ||
    compactwoodPublishedPaths.some((publishedPath) => path === publishedPath);
}
