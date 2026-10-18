// npm run og — 1200×630 share images per route, in the site's own visual language.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/og");
fs.mkdirSync(OUT, { recursive: true });
const b64 = (f) => fs.readFileSync(path.join(ROOT, "public", f)).toString("base64");
const bg = `data:image/webp;base64,${b64("media/env/plan-dark-desktop.webp")}`;
const fig = `data:image/webp;base64,${b64("media/portrait/fahad-figure.webp")}`;
const logo = `data:image/svg+xml;base64,${b64("brand/logo-mark.svg")}`;
const pages = [
  ["home", "Spatial thinking. Commercial instinct.", "Town Planner & GIS Specialist · Business Development", "#ff9a6e"],
  ["urban-planning", "Planning from the parcel to the province.", "Urban Planning & GIS", "#7fdcd2"],
  ["business-development", "From first message to signed scope.", "Business Development", "#ff9a6e"],
  ["contact", "Let's talk.", "Open to planning, GIS and business development roles", "#7fdcd2"],
];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [slug, title, sub, accent] of pages) {
  await page.setContent(`<!doctype html><html><head><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=block" rel="stylesheet"><style>
  body{margin:0;width:1200px;height:630px;font-family:Poppins,sans-serif;color:#fff;background:#14100d url(${bg}) center/cover;overflow:hidden;position:relative}
  .card{position:absolute;left:56px;top:56px;bottom:56px;width:700px;padding:44px;border-radius:32px;background:rgba(52,45,40,.62);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(30px);box-sizing:border-box;display:flex;flex-direction:column}
  .top{display:flex;align-items:center;gap:14px;font-size:26px;font-weight:500}.top img{width:48px;height:48px}
  h1{font-weight:300;font-size:60px;line-height:1.05;letter-spacing:-.02em;margin:auto 0 18px}
  p{margin:0;font-size:24px;color:rgba(255,255,255,.82)}.dot{display:inline-block;width:14px;height:14px;border-radius:50%;background:${accent};margin-right:12px}
  .arch{position:absolute;right:70px;bottom:0;width:340px;height:440px;border-radius:999px 999px 0 0;background:radial-gradient(90% 70% at 50% 18%,${accent}66,transparent 72%),rgba(52,45,40,.6);border:1px solid rgba(255,255,255,.18)}
  .fig{position:absolute;right:95px;bottom:0;height:560px}</style></head><body>
  <div class="card"><div class="top"><img src="${logo}">Fahad Ali</div><h1>${title}</h1><p><span class="dot"></span>${sub}</p></div>
  <div class="arch"></div><img class="fig" src="${fig}"></body></html>`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(OUT, `${slug}.png`) });
  console.log("  ", `public/og/${slug}.png`);
}
await browser.close();
