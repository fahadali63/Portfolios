// npm run check-content   (also runs before every `npm run build`)
//
// 1. Loads every file in src/content/ — each one validates itself and stops with a plain message.
// 2. Lists items that will be left out of the production build (unverified or containing TODO).
// 3. Checks every image id exists (run `npm run media` if not).
// 4. Privacy: no Drive folder links, no previews of ID-bearing letters, no second phone number,
//    roll numbers, neighbourhood or national ID numbers anywhere in src/ or public/.
// Exits with code 1 on any error.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const C = path.join(ROOT, "src/content");
const errors = [];
const warnings = [];

const load = async (f) => import(pathToFileURL(path.join(C, f)).href);
let content;
try {
  content = {
    ...(await load("experience.ts")),
    ...(await load("projects.ts")),
    ...(await load("research.ts")),
    ...(await load("certifications.ts")),
    ...(await load("metrics.ts")),
    ...(await load("engagements.ts")),
    ...(await load("environments.ts")),
    ...(await load("contact.ts")),
  };
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const { roles, projects, research, certifications, homeHighlights, businessMetrics, engagements, environments, contact } = content;
const collections = { "experience.ts": roles, "projects.ts": projects, "research.ts": research, "certifications.ts": certifications, "metrics.ts": [...homeHighlights, ...businessMetrics], "engagements.ts": engagements };

// ── 2. Left out of production ──
const hasTodo = (v) => (typeof v === "string" ? /\bTODO\b/.test(v) : Array.isArray(v) ? v.some(hasTodo) : v && typeof v === "object" ? Object.values(v).some(hasTodo) : false);
const findTodos = (v, p = "") =>
  typeof v === "string"
    ? /\bTODO\b/.test(v) ? [`${p}: ${v}`] : []
    : Array.isArray(v)
      ? v.flatMap((x, i) => findTodos(x, `${p}[${i}]`))
      : v && typeof v === "object"
        ? Object.entries(v).flatMap(([k, x]) => findTodos(x, p ? `${p}.${k}` : k))
        : [];
const excluded = [];
for (const [file, items] of Object.entries(collections)) {
  for (const item of items) {
    if (!item.verified || hasTodo(item)) {
      const why = [!item.verified && "verified: false", ...findTodos(item)].filter(Boolean).join("; ");
      excluded.push(`  • src/content/${file} → "${item.slug}" — ${why}`);
    }
  }
}

// ── 3. Images ──
const manifestPath = path.join(C, "media.generated.json");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
const needImage = (id, where) => {
  if (!manifest[id]?.src) errors.push(`Missing image "${id}" (${where}) — add it to scripts/media.config.mjs and run npm run media`);
  else if (!fs.existsSync(path.join(ROOT, "public", manifest[id].src))) errors.push(`Image file ${manifest[id].src} is missing on disk (${where}) — run npm run media`);
};
for (const p of projects) {
  needImage(p.cover, `projects.ts → ${p.slug}`);
  p.pages.forEach((pg) => needImage(pg.image, `projects.ts → ${p.slug}`));
}
for (const r of research) if (r.figure) needImage(r.figure.image, `research.ts → ${r.slug}`);
for (const c of certifications) {
  if (c.image) {
    needImage(c.image, `certifications.ts → ${c.slug}`);
    needImage(c.image + "-tile", `certifications.ts → ${c.slug}`);
  }
}
for (const e of environments) for (const v of ["-dark-desktop", "-dark-mobile", "-light-desktop", "-light-mobile"]) needImage(e.image + v, `environments.ts → ${e.route}`);
for (const id of ["portrait/fahad-photo", "portrait/fahad-figure", "portrait/fahad-avatar", "portrait/fahad-avatar@2x"]) needImage(id, "portrait");

// ── 4. Privacy ──
const ROOT_DRIVE_FOLDER = "1gDR2MGFBEFy6dn87cuJ2R1esL-1oUXn_";
const ALLOWED_FOLDER = "1mQkZ0MWUa1Gh4jjPMZGz8N5Pdt3R_9bO"; // the portfolio folder — the only folder the site may link
const links = [
  ...[...projects, ...research, ...certifications].map((x) => [x.slug, x.driveUrl]),
  ["contact.linkedin", contact.linkedin],
  ["contact.whatsapp", contact.whatsapp],
  ["contact.instagram", contact.instagram],
  ["contact.portfolioDrive", contact.portfolioDrive],
].filter(([, u]) => u);
for (const [where, url] of links) {
  if (url.includes(ROOT_DRIVE_FOLDER)) errors.push(`${where}: links to the root Drive folder — never allowed`);
  const portfolioFolder = url.includes(`/folders/${ALLOWED_FOLDER}`);
  if (url.includes("/folders/") && !portfolioFolder) errors.push(`${where}: links to a Drive folder other than the portfolio folder`);
  if (/drive\.google|docs\.google/.test(url) && !portfolioFolder && !/\/(file|document|presentation|spreadsheets)\/d\//.test(url)) errors.push(`${where}: Drive link is not a single-file link: ${url}`);
}
for (const c of certifications.filter((c) => !c.publicPreview)) {
  // Real document renders live under certificates/. (Generated thumbnails for these items are seal art only.)
  const leaked = Object.keys(manifest).filter((id) => id.startsWith("certificates/") && id.includes(c.slug));
  if (leaked.length) errors.push(`certifications.ts → ${c.slug} has publicPreview: false but images exist: ${leaked.join(", ")}`);
}

const patterns = [
  [new RegExp(ROOT_DRIVE_FOLDER), "root Drive folder id"],
  [new RegExp(`drive\\.google\\.com/[^\\s"']*/folders/(?!${ALLOWED_FOLDER})`), "Drive folder link (other than the portfolio folder)"],
  [/0?3\s?1\s?8[\s-]?6\s?6\s?8\s?1\s?8\s?2\s?3|318\s?668\s?1823/, "second phone number"],
  [/\b20\d\d-CRP-\d+\b/i, "university roll number"],
  [/Qainchi/i, "neighbourhood name"],
  [/\b\d{5}-\d{7}-\d\b/, "national ID number"],
];
const textExt = /\.(ts|tsx|js|mjs|json|css|md|html|txt|xml|svg|webmanifest)$/;
const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]))
    : [];
const scanDirs = [path.join(ROOT, "src"), path.join(ROOT, "public"), ...(process.argv.includes("--out") ? [path.join(ROOT, "out")] : [])];
for (const file of scanDirs.flatMap(walk)) {
  if (!textExt.test(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const [re, what] of patterns) if (re.test(text)) errors.push(`${path.relative(ROOT, file)} contains a ${what}`);
}
const neverPublish = ["spatio", "akbari", "union-associates", "cash-receiving"];
for (const file of walk(path.join(ROOT, "public/media/certificates"))) {
  const name = path.basename(file).toLowerCase();
  if (neverPublish.some((n) => name.includes(n))) errors.push(`public/ contains ${path.relative(ROOT, file)} — ID-bearing documents are never published`);
}

// ── Report ──
console.log("Content check");
console.log(`  ${roles.length} roles · ${projects.length} projects · ${research.length} research · ${certifications.length} certificates · ${engagements.length} engagements`);
if (excluded.length) {
  console.log(`\nLeft out of the production build until finished (${excluded.length}):`);
  console.log(excluded.join("\n"));
}
if (warnings.length) console.log("\nWarnings:\n" + warnings.map((w) => "  ! " + w).join("\n"));
if (errors.length) {
  console.error("\nErrors:\n" + errors.map((e) => "  ✗ " + e).join("\n"));
  process.exit(1);
}
console.log("\n✓ No errors.");
