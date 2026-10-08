import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("every page is registered in routes[] and vice versa", () => {
  const out = execFileSync("node", [fileURLToPath(new URL("./check-sitemap-routes.mjs", import.meta.url))], { encoding: "utf8" });
  assert.match(out, /check:sitemap ok/);
});
