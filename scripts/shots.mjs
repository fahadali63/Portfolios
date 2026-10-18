// Screenshots for review: node scripts/shots.mjs [baseUrl] [--widths=1440,375] [--routes=/,/contact] [--full]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("http")) || "http://localhost:3000";
const get = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) || "").split("=")[1] || d;
const widths = get("widths", "1440,375").split(",").map(Number);
const routes = get("routes", "/,/urban-planning,/business-development,/contact").split(",");
const out = get("out", path.resolve(import.meta.dirname, "../qa/screenshots"));
const full = args.includes("--full");
const theme = get("theme", "dark");
const lens = get("lens", "");
const tag = get("tag", "");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 812 : 900 }, deviceScaleFactor: 1, isMobile: w < 768, hasTouch: w < 768 });
  await ctx.addInitScript(([t, l]) => {
    try {
      localStorage.setItem("theme", t);
      if (l) localStorage.setItem("lens", l);
    } catch {}
  }, [theme, lens]);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.error(`[${w}] page error:`, e.message));
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const name = `${(r.replace(/[/?=#&]+/g, "_").replace(/^_|_$/g, "") || "home")}-${w}-${theme}${lens ? "-" + lens : ""}${tag}.png`;
    await page.screenshot({ path: path.join(out, name), fullPage: full });
    console.log("  ", name);
  }
  await ctx.close();
}
await browser.close();
