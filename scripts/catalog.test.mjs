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
const { mainNav, footerNav, routes } = load("content/data/navigation.ts");
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
test("application and material filters combine without mixing hardware or interior board grades", () => {
  assert.deepEqual(filterCatalog({ category: "gfrp", application: "custom" }).map(p => p.id), ["gfrp-custom"]);
  assert.deepEqual(filterCatalog({ category: "hpl", application: "interior" }), []);
  assert.deepEqual(filterCatalog({ application: "healthcare" }).map(p => p.id), ["almine-medical"]);
  assert.ok(filterCatalog({ category: "uhpc" }).every(p => p.id !== "taktl-hardware"));
  assert.deepEqual(filterCatalog({ q: "  koRSA  " }).map(p => p.id), ["taktl-korsa"]);
  assert.deepEqual(filterCatalog({ manufacturer: "no-such-supplier" }), []);
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
  const links = [...mainNav.map(n => n.href), ...footerNav.flatMap(g => g.links.map(l => l.href))];
  for (const href of links) assert.ok(isPublishedPath(href.split("?")[0]), href);
  for (const path of publishedPaths) assert.ok(routes.some(r => r.path === path), path);
  assert.ok(isPublishedPath("/"));
  assert.equal(isPublishedPath("/suppliers/taktl/unreviewed-product"), false);
  assert.equal(isPublishedPath("/compliance"), false);
});
