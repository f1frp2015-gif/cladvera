import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import vm from "node:vm";
const root = fileURLToPath(new URL("..", import.meta.url));
const cache = new Map();
function load(relative) {
  const filename = resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  const code = ts.transpileModule(readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  cache.set(filename, exports);
  vm.runInThisContext(`(function(require,exports){${code}\n})`, { filename })(id => load(resolve(dirname(filename), `${id}.ts`)), exports);
  return exports;
}
const { catalogProducts, catalogCategories, catalogApplications, filterCatalog, parseProductIds, productRequestHref, MAX_SELECTION } = load("content/data/catalog.ts");
const { publishedPaths, isPublishedPath } = load("content/data/publication.ts");
const { mainNav, ctaNav, footerNav, routes } = load("content/data/navigation.ts");
test("each catalog product has a distinct ID, canonical published page and valid taxonomy", () => {
  assert.equal(new Set(catalogProducts.map(p => p.id)).size, catalogProducts.length);
  assert.equal(new Set(catalogProducts.map(p => p.path)).size, catalogProducts.length);
  for (const p of catalogProducts) {
    assert.ok(isPublishedPath(p.path), p.path);
    assert.ok(routes.some(r => r.path === p.path));
    assert.ok(existsSync(resolve(root, `app${p.path}/page.tsx`)));
    assert.ok(catalogCategories.some(c => c.id === p.category));
    assert.ok(p.applications.every(a => catalogApplications.some(c => c.id === a)));
  }
});
test("material categories have unique published canonical landing pages", () => {
  assert.equal(new Set(catalogCategories.map(category => category.path)).size, catalogCategories.length);
  for (const category of catalogCategories) {
    assert.equal(typeof category.path, "string", category.id);
    const url = new URL(category.path, "https://cladvera.test");
    assert.equal(url.origin, "https://cladvera.test", category.id);
    assert.equal(category.path, url.pathname, `${category.id} must link to a path without query parameters or a fragment`);
    assert.ok(isPublishedPath(category.path), category.path);
    assert.ok(routes.some(route => route.path === category.path && route.index), `${category.path} must be a registered indexable page`);
    assert.ok(existsSync(resolve(root, `app${category.path}/page.tsx`)), category.path);
  }
});
test("application and material filters combine without mixing hardware or interior board grades", () => {
  assert.deepEqual(filterCatalog({ category: "gfrp", application: "custom" }).map(p => p.id), ["gfrp-custom"]);
  assert.deepEqual(filterCatalog({ category: "hpl", application: "interior" }), []);
  assert.deepEqual(filterCatalog({ application: "healthcare" }).map(p => p.id), ["almine-medical"]);
  assert.ok(filterCatalog({ category: "uhpc" }).every(p => p.id !== "taktl-hardware"));
  assert.deepEqual(filterCatalog({ q: "  koRSA  " }).map(p => p.id), ["taktl-korsa"]);
  assert.deepEqual(filterCatalog({ manufacturer: "no-such-supplier" }), []);
});
test("search finds products using the material and application labels visitors see", () => {
  assert.deepEqual(filterCatalog({ q: "ACM" }).map(product => product.id), ["almine-a2", "almine-tunnel", "almine-medical"]);
  assert.deepEqual(filterCatalog({ q: "Exterior HPL" }).map(product => product.id), ["compactwood-exterior"]);
  assert.deepEqual(filterCatalog({ q: "Interior decorative boards" }).map(product => product.id), ["compactwood-interior"]);
  assert.deepEqual(filterCatalog({ q: "Transit & tunnels" }).map(product => product.id), ["almine-tunnel"]);
});
test("search handles punctuation and word order in existing product construction", () => {
  const fiberProducts = ["compactwood-interior", "gfrp-custom"];
  assert.deepEqual(filterCatalog({ q: "glass fiber" }).map(product => product.id), fiberProducts);
  assert.deepEqual(filterCatalog({ q: "  GLASS–FIBER  " }).map(product => product.id), fiberProducts);
  assert.deepEqual(filterCatalog({ q: "HPL exterior" }).map(product => product.id), ["compactwood-exterior"]);
  assert.deepEqual(filterCatalog({ q: "HPL façade" }).map(product => product.id), ["compactwood-exterior"]);
  assert.deepEqual(filterCatalog({ q: "thermoset glass fiber" }).map(product => product.id), ["compactwood-interior"]);
});
test("search terms remain constrained by every selected filter", () => {
  assert.deepEqual(filterCatalog({ q: "ACM", category: "mcm", application: "healthcare", manufacturer: "ALMINE" }).map(product => product.id), ["almine-medical"]);
  assert.deepEqual(filterCatalog({ q: "glass fiber", category: "gfrp", application: "facade", manufacturer: "Shandong Jinguang Group (Kinflare)" }).map(product => product.id), ["gfrp-custom"]);
  assert.deepEqual(filterCatalog({ q: "HPL", category: "hpl", application: "interior" }), []);
  assert.deepEqual(filterCatalog({ q: "ACM", manufacturer: "TAKTL" }), []);
  assert.deepEqual(filterCatalog({ q: "glass fiber missingmaterial" }), []);
  assert.deepEqual(filterCatalog({ q: " — / ", category: "hpl" }).map(product => product.id), ["compactwood-exterior"]);
});
test("shared shortlist accepts only known IDs, deduplicates and caps at four", () => {
  assert.deepEqual(parseProductIds("bad,taktl-facade,taktl-facade,gfrp-custom"), ["taktl-facade", "gfrp-custom"]);
  assert.equal(parseProductIds(catalogProducts.map(p => p.id).join(",")).length, MAX_SELECTION);
  assert.deepEqual(parseProductIds(null), []);
  assert.deepEqual(parseProductIds(["taktl-facade", "gfrp-custom"]), []);
});
test("sample, technical and quote paths carry the selected product and correct intent", () => {
  for (const intent of ["sample", "documents", "quote"]) {
    const url = new URL(productRequestHref("gfrp-custom", intent), "https://example.test");
    assert.equal(url.pathname, intent === "sample" ? "/samples" : "/request-quote");
    assert.equal(url.searchParams.get("products"), "gfrp-custom");
    assert.equal(url.searchParams.get("intent"), intent);
  }
});
test("public navigation and publication gates exclude unrelated draft routes", () => {
  const links = [
    ...mainNav.flatMap(group => [...(group.href ? [group.href] : []), ...group.links.map(link => link.href)]),
    ...ctaNav.map(link => link.href),
    ...footerNav.flatMap(group => group.links.map(link => link.href)),
  ];
  for (const href of links) {
    const url = new URL(href, "https://cladvera.test");
    assert.equal(url.origin, "https://cladvera.test", href);
    assert.ok(isPublishedPath(url.pathname), href);
  }
  for (const path of publishedPaths) assert.ok(routes.some(r => r.path === path), path);
  assert.ok(isPublishedPath("/"));
  assert.equal(isPublishedPath("/suppliers/taktl/unreviewed-product"), false);
  assert.equal(isPublishedPath("/compliance"), false);
});
