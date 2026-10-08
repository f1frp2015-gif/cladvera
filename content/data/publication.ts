/** TAKTL is the first published collection while the remaining site is draft. */
export const taktlPath = "/suppliers/taktl";

export function isTaktlPath(path: string) {
  return path === taktlPath || path.startsWith(`${taktlPath}/`);
}
