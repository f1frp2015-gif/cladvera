// Every static app/**/page.tsx must appear in content/data/navigation.ts
// `routes`, and every route there must have a page. Dynamic segments are
// skipped (finish detail pages come from the finish library).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const APP = join(ROOT, "app");

function walk(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry.startsWith("[") || entry.startsWith("(") || entry === "api") continue;
      walk(full, found);
    } else if (entry === "page.tsx") {
      const rel = relative(APP, dir).replace(/\\/g, "/");
      found.push(rel === "" ? "/" : `/${rel}`);
    }
  }
  return found;
}

const pages = walk(APP).sort();
const navSource = readFileSync(join(ROOT, "content/data/navigation.ts"), "utf8");
const declared = [...navSource.matchAll(/\{ path: "([^"]+)"/g)].map((m) => m[1]).sort();

const missingFromRoutes = pages.filter((p) => !declared.includes(p));
const missingPages = declared.filter((p) => !pages.includes(p));

if (missingFromRoutes.length || missingPages.length) {
  if (missingFromRoutes.length) console.error("Pages missing from routes[]:\n  " + missingFromRoutes.join("\n  "));
  if (missingPages.length) console.error("Routes without a page.tsx:\n  " + missingPages.join("\n  "));
  process.exit(1);
}
console.log(`check:sitemap ok (${pages.length} static pages)`);
