import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";
import vm from "node:vm";

const root = fileURLToPath(new URL("..", import.meta.url));
const canonicalOrigin = "https://cladvera.example";
const description = "Review architectural panel materials, manufacturer sources and project requirements before selecting a product, requesting documents or preparing a quotation.";
const nodeRequire = createRequire(import.meta.url);
const notFoundDigest = "NEXT_HTTP_ERROR_FALLBACK;404";
const navigationStub = {
  notFound() { throw Object.assign(new Error("Not found"), { digest: notFoundDigest }); },
  permanentRedirect(location) { throw Object.assign(new Error("Permanent redirect"), { location, status: 308 }); },
};
const componentStubs = new Proxy({}, { get: () => () => null });

function loader(stage, extraEnv = {}) {
  const cache = new Map();
  function load(relative) {
    const filename = resolve(root, relative);
    if (cache.has(filename)) return cache.get(filename);
    const exports = {};
    cache.set(filename, exports);
    const code = ts.transpileModule(readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
    const require = id => {
      if (id === "next/navigation") return navigationStub;
      if (id === "react/jsx-runtime") return nodeRequire(id);
      // Exercise real page/data logic while excluding presentation components.
      if (id === "next/link" || id.startsWith("@/components/")) return componentStubs;
      return load(id.startsWith("@/") ? `${id.slice(2)}.ts` : resolve(dirname(filename), `${id}.ts`));
    };
    vm.runInNewContext(code, { exports, require, URL, Response, console, process: { env: { NEXT_PUBLIC_SITE_STAGE: stage, NEXT_PUBLIC_SITE_URL: canonicalOrigin, ...extraEnv } } }, { filename });
    return exports;
  }
  return load;
}

for (const stage of ["draft", "live"]) {
  test(`${stage}: unreviewed and unregistered pages cannot become indexable`, () => {
    const load = loader(stage);
    const { buildPageMetadata } = load("lib/seo.ts");
    const metadata = path => buildPageMetadata({ title: "Architectural Panels | Cladvera", description, path });
    for (const path of ["/finishes", "/compliance", "/materials/uhpc-panels", "/unregistered-page"]) {
      assert.equal(metadata(path).robots.index, false, path);
    }
    for (const path of ["/compare", "/samples", "/request-quote"]) {
      assert.equal(metadata(path).robots.index, false, `${path} remains noindex even without a page override`);
    }
    const home = metadata("/");
    assert.equal(home.robots.index, true);
    assert.equal(home.robots.follow, true);
    assert.equal(home.robots["max-image-preview"], "large");
    assert.equal(home.alternates.canonical, `${canonicalOrigin}/`);
    assert.equal(buildPageMetadata({ title: "Architectural Panels | Cladvera", description, path: "/", noindex: true }).robots.index, false);
  });

  test(`${stage}: sitemap entries agree with publication, registry and metadata`, () => {
    const load = loader(stage);
    const { isPublishedPath } = load("content/data/publication.ts");
    const { routes } = load("content/data/navigation.ts");
    const { buildPageMetadata } = load("lib/seo.ts");
    const entries = load("app/sitemap.ts").default();
    assert.equal(new Set(entries.map(entry => entry.url)).size, entries.length);
    assert.ok(entries.some(entry => new URL(entry.url).pathname === "/"));
    assert.ok(entries.some(entry => new URL(entry.url).pathname === "/materials/gfrp-custom-elements"));
    for (const entry of entries) {
      const url = new URL(entry.url);
      assert.equal(url.origin, canonicalOrigin);
      assert.equal(url.search, "");
      assert.ok(isPublishedPath(url.pathname), entry.url);
      assert.ok(routes.some(route => route.path === url.pathname && route.index), entry.url);
      assert.equal(buildPageMetadata({ title: "Architectural Panels | Cladvera", description, path: url.pathname }).robots.index, true);
      assert.equal(entry.lastModified, undefined, "No fabricated modification timestamp");
    }
    for (const path of ["/finishes", "/compliance", "/compare", "/samples", "/request-quote"]) {
      assert.ok(!entries.some(entry => new URL(entry.url).pathname === path), path);
    }
  });

  test(`${stage}: crawler policy permits known statuses and assets without opening facets`, () => {
    const load = loader(stage);
    const rules = load("app/robots.ts").default().rules;
    assert.equal(rules.length, 1, "Existing wildcard policy applies without changing training-agent preferences");
    assert.equal(rules[0].userAgent, "*");
    assert.equal(rules[0].disallow, "/");
    const allowed = path => rules[0].allow.some(pattern => new RegExp(`^${pattern.replace(/[.+?^{}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}`).test(path));
    const { routes } = load("content/data/navigation.ts");
    const { finishes } = load("content/data/finishes.ts");
    const knownPaths = [...routes.map(route => route.path), ...finishes.map(finish => `/finishes/${finish.code.toLowerCase()}`)];
    for (const path of [...knownPaths, "/_next/static/chunk.js", "/images/example.jpg", "/documents/example.pdf", "/icon.svg"]) {
      assert.ok(allowed(path), path);
    }
    for (const path of ["/api/request", "/products/unreviewed", "/finishes/unknown-code", "/products?category=mcm", "/technical-resources?availability=linked", "/compliance?preview=1"]) {
      assert.equal(allowed(path), false, path);
    }
  });

  test(`${stage}: unreviewed static and finish pages stop rendering before draft content`, async () => {
    const load = loader(stage);
    const { routes } = load("content/data/navigation.ts");
    const { isPublishedPath } = load("content/data/publication.ts");
    const redirects = new Map([["/materials", "/products"], ["/for-contractors", "/procurement"]]);
    const draftPages = routes.filter(route => !isPublishedPath(route.path) && !redirects.has(route.path));
    assert.ok(draftPages.length > 0);
    for (const { path } of draftPages) {
      const page = load(`app${path}/page.tsx`);
      assert.throws(() => page.default(), { digest: notFoundDigest }, path);
    }
    for (const [path, location] of redirects) {
      assert.throws(() => load(`app${path}/page.tsx`).default(), { location, status: 308 }, path);
    }
    const { finishes } = load("content/data/finishes.ts");
    const detail = load("app/finishes/[code]/page.tsx");
    for (const code of [...finishes.map(finish => finish.code), "unknown-code"]) {
      if (isPublishedPath(`/finishes/${code.toLowerCase()}`)) continue;
      const props = { params: Promise.resolve({ code }) };
      await assert.rejects(detail.default(props), { digest: notFoundDigest }, code);
      await assert.rejects(detail.generateMetadata(props), { digest: notFoundDigest }, `${code} metadata`);
    }
  });
}

test("the text index uses configured identity and links only indexable reviewed content", async () => {
  const load = loader("live", { NEXT_PUBLIC_CONTACT_EMAIL: "project-desk@example.test" });
  const text = await load("app/llms.txt/route.ts").GET().text();
  const { isPublishedPath } = load("content/data/publication.ts");
  const { routes } = load("content/data/navigation.ts");
  assert.ok(text.includes("project-desk@example.test"));
  assert.ok(!text.includes("sales@cladvera.com"));
  assert.ok(text.includes("TAKTL manufacturer collection are distinct"));
  const links = [...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(match => new URL(match[1]));
  assert.ok(links.length > 0);
  for (const url of links) {
    assert.equal(url.origin, canonicalOrigin);
    assert.ok(isPublishedPath(url.pathname), url.pathname);
    assert.ok(routes.some(route => route.path === url.pathname && route.index), url.pathname);
  }
});

test("organization identity stays separate from product manufacturing claims", () => {
  const load = loader("draft");
  const { site } = load("content/data/site.ts");
  const { organizationSchema, websiteSchema } = load("lib/seo.ts");
  assert.equal(organizationSchema["@type"], "Organization");
  assert.equal(organizationSchema.description, site.description);
  assert.equal(organizationSchema.contactPoint.email, site.contact.email);
  assert.equal(websiteSchema.publisher["@id"], organizationSchema["@id"]);
  assert.equal(organizationSchema.countryOfOrigin, undefined);
  assert.equal(organizationSchema.address, undefined, "Unconfirmed legal address is not structured data");
});
