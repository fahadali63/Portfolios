// npm run resumes — prints each profile page with the print stylesheet into public/resume/*.pdf.
// Builds the site first (needs out/), then rebuild once more so the "Download résumé" buttons appear.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { serve } from "./lib/serve.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public/resume");
if (!fs.existsSync(path.join(ROOT, "out"))) {
  console.error("Run `npm run build` first — this script prints the built pages.");
  process.exit(1);
}
fs.mkdirSync(OUT_DIR, { recursive: true });
const server = await serve(path.join(ROOT, "out"), 4199);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.addInitScript(() => localStorage.setItem("theme", "light"));
for (const [route, file] of [
  ["/urban-planning", "fahad-ali-urban-planning.pdf"],
  ["/business-development", "fahad-ali-business-development.pdf"],
]) {
  await page.goto(`http://localhost:4199${route}`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: path.join(OUT_DIR, file), format: "A4", printBackground: false, margin: { top: "14mm", bottom: "16mm", left: "14mm", right: "14mm" } });
  console.log("  ", `public/resume/${file}`, Math.round(fs.statSync(path.join(OUT_DIR, file)).size / 1024), "KB");
}
await browser.close();
server.close();
