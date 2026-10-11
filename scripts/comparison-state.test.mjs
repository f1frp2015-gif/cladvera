import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("..", import.meta.url));
const jsx = require("react/jsx-runtime");
const moduleCache = new Map();

function loadData(relative) {
  const filename = resolve(root, relative);
  if (moduleCache.has(filename)) return moduleCache.get(filename);
  const exports = {};
  moduleCache.set(filename, exports);
  const code = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInThisContext(`(function(require,exports){${code}\n})`, { filename })(
    id => loadData(resolve(dirname(filename), `${id}.ts`)),
    exports,
  );
  return exports;
}

const catalog = loadData("content/data/catalog.ts");
const comparisonCode = ts.transpileModule(readFileSync(resolve(root, "components/catalog/CompareProducts.tsx"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;

// Exercise the component's real click handlers with a minimal hook/store
// harness. No browser storage or network is touched by these regression tests.
function createComparison({ savedIds, sharedIds }) {
  let saved = [...savedIds];
  let cursor = 0;
  const slots = [];
  const writes = [];
  const react = {
    useState(initial) {
      const index = cursor++;
      if (index >= slots.length) slots.push(initial);
      return [slots[index], value => { slots[index] = typeof value === "function" ? value(slots[index]) : value; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (index >= slots.length) slots.push({ current: initial });
      return slots[index];
    },
  };
  const imports = {
    "react/jsx-runtime": jsx,
    react,
    "next/link": { __esModule: true, default: props => jsx.jsx("a", props) },
    "@/components/catalog/CatalogVisual": { __esModule: true, default: () => null },
    "@/content/data/catalog": catalog,
    "@/lib/product-selection": {
      useSelection: () => ({
        ids: saved,
        setSelection(next) { saved = [...next]; writes.push([...next]); },
      }),
    },
  };
  const exports = {};
  vm.runInNewContext(`(function(require,exports){${comparisonCode}\n})`, {
    requestAnimationFrame: callback => callback(),
  }, { filename: "CompareProducts.tsx" })(id => {
    assert.ok(id in imports, `Unexpected import: ${id}`);
    return imports[id];
  }, exports);

  function render() {
    cursor = 0;
    return collectElements(exports.default({ sharedIds }));
  }
  function click(label) {
    const element = render().find(item => item.type === "button" && (item.props["aria-label"] === label || textOf(item).trim() === label));
    assert.ok(element, `Button not found: ${label}`);
    element.props.onClick();
  }
  return { render, click, writes, saved: () => saved };
}

function textOf(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return textOf(node.props?.children);
}

function collectElements(node, result = []) {
  if (node == null || typeof node !== "object") return result;
  if (Array.isArray(node)) {
    node.forEach(child => collectElements(child, result));
  } else if (typeof node.type === "function") {
    collectElements(node.type(node.props), result);
  } else {
    result.push(node);
    collectElements(node.props?.children, result);
  }
  return result;
}

function requestUrls(comparison) {
  return comparison.render()
    .filter(element => element.type === "a" && /^\/(request-quote|samples)\?/.test(element.props.href))
    .map(element => new URL(element.props.href, "https://cladvera.test"));
}

const first = catalog.catalogProducts.find(product => product.id === "taktl-facade");
const removeFirst = `Remove ${first.name} from comparison`;

test("editing and clearing a shared selection leaves the saved shortlist untouched", () => {
  const comparison = createComparison({ savedIds: ["almine-a2"], sharedIds: ["taktl-facade", "gfrp-custom"] });
  comparison.click(removeFirst);
  assert.deepEqual(comparison.saved(), ["almine-a2"]);
  assert.equal(comparison.writes.length, 0);
  const urls = requestUrls(comparison);
  assert.equal(urls.length, 3);
  assert.ok(urls.every(url => url.searchParams.get("products") === "gfrp-custom"));
  assert.ok(urls.some(url => url.searchParams.get("intent") === "documents"));
  comparison.click("Clear shared selection");
  assert.deepEqual(comparison.saved(), ["almine-a2"]);
  assert.equal(comparison.writes.length, 0);
  assert.equal(requestUrls(comparison).length, 0);
  assert.ok(comparison.render().some(element => textOf(element).includes("This shared selection is empty.")));
});

test("explicit Save persists the currently edited shared selection", () => {
  const comparison = createComparison({ savedIds: ["almine-a2"], sharedIds: ["taktl-facade", "gfrp-custom"] });
  comparison.click(removeFirst);
  comparison.click("Save this selection ↗");
  assert.deepEqual(comparison.saved(), ["gfrp-custom"]);
  assert.deepEqual(comparison.writes, [["gfrp-custom"]]);
  assert.ok(comparison.render().some(element => element.type === "button" && textOf(element) === "Clear shortlist"));
});

test("returning from an edited shared view restores the saved selection without writes", () => {
  const comparison = createComparison({ savedIds: ["almine-a2"], sharedIds: ["taktl-facade", "gfrp-custom"] });
  comparison.click(removeFirst);
  comparison.click("View saved shortlist");
  assert.equal(comparison.writes.length, 0);
  assert.ok(requestUrls(comparison).every(url => url.searchParams.get("products") === "almine-a2"));
});

test("removing a product from the saved shortlist persists the remaining selection", () => {
  const comparison = createComparison({ savedIds: ["taktl-facade", "gfrp-custom"] });
  comparison.click(removeFirst);
  assert.deepEqual(comparison.saved(), ["gfrp-custom"]);
  assert.deepEqual(comparison.writes, [["gfrp-custom"]]);
  assert.ok(requestUrls(comparison).every(url => url.searchParams.get("products") === "gfrp-custom"));
});
