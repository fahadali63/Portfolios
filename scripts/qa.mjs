// npm run qa — axe-core on every route (dark + light, both Home lenses), no-JS content check, privacy scan of out/.
import path from "node:path";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { serve } from "./lib/serve.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const server = await serve(path.join(ROOT, "out"), 4198);
const base = "http://localhost:4198";
const routes = ["/", "/urban-planning", "/business-development", "/contact", "/missing-page"];
const browser = await chromium.launch();
let serious = 0;
for (const theme of ["dark", "light"]) {
  for (const lens of ["business", "planning"]) {
    for (const r of lens === "planning" ? ["/"] : routes) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      await ctx.addInitScript(([t, l]) => (localStorage.setItem("theme", t), localStorage.setItem("lens", l)), [theme, lens]);
      const page = await ctx.newPage();
      await page.goto(base + r, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const bad = res.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      serious += bad.length;
      console.log(`${theme.padEnd(5)} ${lens.padEnd(8)} ${r.padEnd(22)} violations: ${res.violations.length} (serious/critical ${bad.length})`);
      for (const v of res.violations) console.log(`      - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}) e.g. ${v.nodes[0]?.target.join(" ")}`);
      await ctx.close();
    }
  }
}
// No-JS: all text and final numbers present
const ctx = await browser.newContext({ javaScriptEnabled: false });
const p = await ctx.newPage();
const must = { "/": ["Fahad Ali", "100+", "138%", "Sales & Marketing Specialist"], "/urban-planning": ["2,828", "13 districts", "FA Avenue 1"], "/business-development": ["$11,055", "100%", "80%+"] };
for (const [r, words] of Object.entries(must)) {
  await p.goto(base + r);
  const html = await p.content();
  const missing = words.filter((w) => !html.includes(w.replace("&", "&amp;")) && !html.includes(w));
  console.log(`no-JS ${r.padEnd(22)} ${missing.length ? "MISSING " + missing.join(", ") : "all present"}`);
}
await browser.close();
server.close();
console.log("\nPrivacy scan of out/:");
try {
  execFileSync("node", ["scripts/check-content.mjs", "--out"], { stdio: "inherit", cwd: ROOT });
} catch {
  process.exitCode = 1;
}
console.log(`\nSerious/critical axe findings: ${serious}`);
if (serious) process.exitCode = 1;
