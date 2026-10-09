import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

const { catalogProducts } = load("content/data/catalog.ts");
const { filterTechnicalResources } = load("content/data/technical-resources.ts");
const ids = filters => filterTechnicalResources(filters).map(product => product.id);

test("the default resource register preserves every product and its stable order", () => {
  assert.deepEqual(ids(), catalogProducts.map(product => product.id));
  assert.equal(filterTechnicalResources().length, 11);
});

test("source pages do not count as linked documents", () => {
  const linked = ids({ availability: "linked" });
  const request = ids({ availability: "request" });
  assert.deepEqual(linked, ["taktl-facade", "taktl-korsa", "taktl-sola", "gfrp-custom"]);
  assert.ok(request.includes("almine-a2"));
  assert.ok(request.includes("compactwood-exterior"));
  assert.equal(request.length, 7);
  assert.equal(new Set([...linked, ...request]).size, catalogProducts.length);
});

test("resource search includes document titles and source context", () => {
  assert.deepEqual(ids({ q: "KORSA panel design guide" }), ["taktl-korsa"]);
  assert.deepEqual(ids({ q: "Chinese 2023" }), ["gfrp-custom"]);
  assert.deepEqual(ids({ q: "Exterior HPL" }), ["compactwood-exterior"]);
  assert.deepEqual(ids({ q: " GLASS–FIBER " }), ["compactwood-interior", "gfrp-custom"]);
  assert.deepEqual(ids({ q: "hpl façade" }), ["compactwood-exterior"]);
});

test("material, application, document access and query all constrain a result", () => {
  assert.deepEqual(ids({ q: "TAKTL", category: "uhpc", application: "interior", availability: "linked" }), ["taktl-facade"]);
  assert.deepEqual(ids({ q: "ACM", category: "mcm", application: "healthcare", availability: "request" }), ["almine-medical"]);
  assert.deepEqual(ids({ q: "Kinflare", category: "gfrp", application: "custom", availability: "linked" }), ["gfrp-custom"]);
  assert.deepEqual(ids({ category: "mcm", availability: "linked" }), []);
  assert.deepEqual(ids({ category: "hpl", application: "interior" }), []);
  assert.deepEqual(ids({ q: "KORSA unknownreport" }), []);
});

test("invalid filter values do not silently broaden the register", () => {
  assert.deepEqual(ids({ availability: "unknown" }), []);
  assert.deepEqual(ids({ category: "unpublished" }), []);
  assert.deepEqual(ids({ application: "unverified-use" }), []);
  assert.deepEqual(ids({ q: " — / ", category: "hardware" }), ["taktl-hardware"]);
});
