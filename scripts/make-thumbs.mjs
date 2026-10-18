// npm run thumbs
//
// One design language for every thumbnail on the site — the "ink card":
//   dark ink ground · faint plan grid · seeded contour lines in the track colour (aqua = planning,
//   coral = business) · a motif for the kind of item · corner registration marks.
// Projects and previewable certificates also carry a duotone glimpse of the real drawing/document.
// Text (category, title) is NOT baked in: the <Thumb> component overlays it in HTML so it stays crisp,
// readable and translatable.
//
// Reads the content files and the images already built by `npm run media`; writes public/media/thumbs/
// and adds entries to src/content/media.generated.json.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { contourSegments, makeNoise, mulberry32 } from "./lib/backdrop.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/media/thumbs");
const MANIFEST = path.join(ROOT, "src/content/media.generated.json");
const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const load = async (f) => import(pathToFileURL(path.join(ROOT, "src/content", f)).href);

const INK = [27, 23, 20];
const TRACK = { planning: [127, 220, 210], business: [255, 154, 110] };
const hex = (c) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const f = (n) => (Math.round(n * 10) / 10).toString();
const seedOf = (s) => [...s].reduce((h, ch) => (Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0), 2166136261);

function contours(W, H, seed, color, density = 1) {
  const noise = makeNoise(mulberry32(seed));
  const cell = Math.max(4, Math.round(Math.max(W, H) / 110));
  const cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
  const field = new Float32Array((cols + 1) * (rows + 1));
  const sc = 2.6 / Math.max(W, H);
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) field[j * (cols + 1) + i] = noise(i * cell * sc + (seed % 97), j * cell * sc + (seed % 53));
  let out = "";
  const levels = Math.round(16 * density);
  for (let l = 1; l < levels; l++) {
    const segs = contourSegments(field, cols, rows, cell, 0.25 + (l / levels) * 0.5);
    if (!segs.length) continue;
    const d = segs.map(([a, b]) => `M${f(a[0])},${f(a[1])}L${f(b[0])},${f(b[1])}`).join("");
    const idx = l % 4 === 0;
    out += `<path d="${d}" stroke="${rgba(color, idx ? 0.34 : 0.17)}" stroke-width="${idx ? 1.4 : 0.9}" fill="none" stroke-linecap="round"/>`;
  }
  return out;
}

function frame(W, H) {
  const m = Math.round(Math.min(W, H) * 0.045), t = Math.round(Math.min(W, H) * 0.05);
  const c = rgba([255, 255, 255], 0.28);
  const tick = (x, y, dx, dy) => `M${x + dx * t},${y}H${x}V${y + dy * t}`;
  return `<path d="${tick(m, m, 1, 1)}${tick(W - m, m, -1, 1)}${tick(m, H - m, 1, -1)}${tick(W - m, H - m, -1, -1)}" stroke="${c}" stroke-width="1.5" fill="none"/>`;
}

function grid(W, H) {
  const g = Math.round(Math.max(W, H) / 16);
  let d = "";
  for (let x = g; x < W; x += g) d += `M${x},0V${H}`;
  for (let y = g; y < H; y += g) d += `M0,${y}H${W}`;
  return `<path d="${d}" stroke="${rgba([255, 255, 255], 0.045)}" stroke-width="1" fill="none"/>`;
}

const motifs = {
  /** Radial plan: rings + spokes (planning roles, planning research) */
  radial(W, H, color, rand) {
    const cx = W * (0.62 + rand() * 0.2), cy = H * (0.38 + rand() * 0.2), R = Math.max(W, H) * 0.55;
    let d = "";
    [0.14, 0.28, 0.46, 0.68, 0.92].forEach((k) => {
      const r = k * R;
      d += `M${f(cx + r)},${f(cy)}A${f(r)},${f(r)} 0 1 0 ${f(cx - r)},${f(cy)}A${f(r)},${f(r)} 0 1 0 ${f(cx + r)},${f(cy)}`;
    });
    for (let s = 0; s < 14; s++) {
      const a = (s / 14) * Math.PI * 2;
      d += `M${f(cx + Math.cos(a) * R * 0.14)},${f(cy + Math.sin(a) * R * 0.14)}L${f(cx + Math.cos(a) * R)},${f(cy + Math.sin(a) * R)}`;
    }
    return `<path d="${d}" stroke="${rgba(color, 0.42)}" stroke-width="1.6" fill="none"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 0.05)}" fill="${rgba(color, 0.9)}"/>`;
  },
  /** Rising route with stations (business roles, engagements) */
  route(W, H, color, rand) {
    const pts = [];
    for (let k = 0; k <= 30; k++) {
      const t = k / 30;
      pts.push([-W * 0.05 + t * W * 1.1, H * (0.86 - 0.6 * t) + Math.sin(t * Math.PI * 2 + rand()) * H * 0.05]);
    }
    let out = `<path d="${pts.map(([x, y], i) => `${i ? "L" : "M"}${f(x)},${f(y)}`).join("")}" stroke="${rgba(color, 0.9)}" stroke-width="${f(Math.max(W, H) / 170)}" fill="none" stroke-linecap="round"/>`;
    for (let k = 3; k < 30; k += 6) {
      const [x, y] = pts[k];
      out += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(Math.max(W, H) / 70)}" fill="${hex(INK)}" stroke="${rgba(color, 0.95)}" stroke-width="${f(Math.max(W, H) / 220)}"/>`;
    }
    return out;
  },
  /** Bars rising to a target line (engagements) */
  bars(W, H, color, rand) {
    let out = "";
    const n = 6, bw = W / 14, base = H * 0.86;
    for (let i = 0; i < n; i++) {
      const h = H * (0.18 + rand() * 0.45 + i * 0.035);
      const x = W * 0.52 + i * bw * 1.35;
      out += `<rect x="${f(x)}" y="${f(base - h)}" width="${f(bw)}" height="${f(h)}" rx="${f(bw * 0.18)}" fill="${rgba(color, 0.22 + i * 0.1)}"/>`;
    }
    out += `<path d="M${f(W * 0.48)},${f(base - H * 0.5)}H${f(W * 0.97)}" stroke="${rgba([255, 255, 255], 0.55)}" stroke-dasharray="6 6" stroke-width="1.5"/>`;
    return out;
  },
  /** Stacked pages with text lines (research) */
  pages(W, H, color) {
    let out = "";
    const pw = W * 0.34, ph = H * 0.62, x0 = W * 0.56, y0 = H * 0.14;
    for (let k = 2; k >= 0; k--) {
      const x = x0 + k * W * 0.04, y = y0 + k * H * 0.04;
      out += `<rect x="${f(x)}" y="${f(y)}" width="${f(pw)}" height="${f(ph)}" rx="${f(W * 0.015)}" fill="${hex(INK)}" stroke="${rgba(color, 0.55 - k * 0.12)}" stroke-width="1.5"/>`;
    }
    for (let l = 0; l < 7; l++) {
      const y = y0 + ph * (0.16 + l * 0.11);
      out += `<path d="M${f(x0 + pw * 0.12)},${f(y)}H${f(x0 + pw * (l % 3 === 2 ? 0.6 : 0.88))}" stroke="${rgba(color, 0.55)}" stroke-width="${f(H / 70)}" stroke-linecap="round"/>`;
    }
    return out;
  },
  /** Seal: concentric rings with ticks (certificates without a public preview, recognition) */
  seal(W, H, color) {
    const cx = W * 0.5, cy = H * 0.42, r = Math.min(W, H) * 0.24;
    let ticks = "";
    for (let k = 0; k < 48; k++) {
      const a = (k / 48) * Math.PI * 2;
      ticks += `M${f(cx + Math.cos(a) * r * 1.08)},${f(cy + Math.sin(a) * r * 1.08)}L${f(cx + Math.cos(a) * r * 1.2)},${f(cy + Math.sin(a) * r * 1.2)}`;
    }
    return (
      `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="none" stroke="${rgba(color, 0.7)}" stroke-width="2"/>` +
      `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * 0.78)}" fill="${rgba(color, 0.08)}" stroke="${rgba(color, 0.45)}" stroke-width="1.2" stroke-dasharray="3 5"/>` +
      `<path d="${ticks}" stroke="${rgba(color, 0.5)}" stroke-width="1.4"/>`
    );
  },
};

/** Duotone: drawings are inverted (paper → ink, linework → glowing track colour); photos/renders are not. */
async function duotone(file, W, H, color, { photo = false, fit = "cover" } = {}) {
  let img = sharp(file).resize(W, H, { fit, background: { r: 255, g: 255, b: 255, alpha: 1 }, position: "attention" }).flatten({ background: "#ffffff" }).grayscale();
  if (!photo) img = img.negate({ alpha: false });
  const { data, info } = await img.normalise().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const l = data[i * info.channels] / 255;
    const t = photo ? Math.pow(l, 1.15) * 0.9 : Math.pow(l, 0.85);
    for (let c = 0; c < 3; c++) out[i * 4 + c] = Math.round(INK[c] + (color[c] - INK[c]) * t);
    out[i * 4 + 3] = 255;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

async function makeThumb({ id, W, H, track, kind, seed, image, photo, fitDoc }) {
  const color = TRACK[track];
  const rand = mulberry32(seed);
  let plate = "";
  if (image) {
    const isDoc = kind === "certificate";
    const pw = isDoc ? Math.round(W * 0.62) : W;
    const ph = isDoc ? Math.round(H * 0.6) : H;
    const buf = await duotone(path.join(ROOT, "public", image), pw, ph, color, { photo, fit: fitDoc ? "contain" : "cover" });
    const href = `data:image/png;base64,${buf.toString("base64")}`;
    if (isDoc) {
      const x = (W - pw) / 2, y = H * 0.1;
      plate =
        `<rect x="${f(x - 6)}" y="${f(y - 6)}" width="${pw + 12}" height="${ph + 12}" rx="10" fill="${hex(INK)}" stroke="${rgba(color, 0.55)}" stroke-width="1.5"/>` +
        `<image href="${href}" x="${f(x)}" y="${f(y)}" width="${pw}" height="${ph}" preserveAspectRatio="xMidYMid meet"/>`;
    } else {
      plate =
        `<defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.45" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
        `<mask id="m"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask></defs>` +
        `<image href="${href}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" mask="url(#m)" opacity="0.92"/>`;
    }
  }
  const motif =
    kind === "role-planning" ? motifs.radial(W, H, color, rand)
    : kind === "role-business" ? motifs.route(W, H, color, rand)
    : kind === "engagement" ? motifs.route(W, H, color, rand) + motifs.bars(W, H, color, rand)
    : kind === "research" && !image ? motifs.pages(W, H, color)
    : kind === "seal" ? motifs.seal(W, H, color)
    : "";
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect width="${W}" height="${H}" fill="${hex(INK)}"/>` +
    grid(W, H) +
    contours(W, H, seed, color, image && kind !== "certificate" ? 0.6 : 1) +
    plate +
    motif +
    `<rect width="${W}" height="${H}" fill="url(#shade)"/><defs><linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.5" stop-color="${hex(INK)}" stop-opacity="0"/><stop offset="1" stop-color="${hex(INK)}" stop-opacity="0.85"/></linearGradient></defs>` +
    frame(W, H) +
    `</svg>`;
  const base = path.join(OUT, id);
  fs.mkdirSync(path.dirname(base), { recursive: true });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  await sharp(png).webp({ quality: 82, effort: 5 }).toFile(base + ".webp");
  await sharp(png).avif({ quality: 56, effort: 4 }).toFile(base + ".avif");
  manifest[`thumbs/${id}`] = { src: `/media/thumbs/${id}.webp`, avif: `/media/thumbs/${id}.avif`, width: W, height: H };
  console.log(`   thumbs/${id}  ${W}×${H}  ${Math.round(fs.statSync(base + ".webp").size / 1024)} KB`);
}

const { projects } = await load("projects.ts");
const { research } = await load("research.ts");
const { certifications } = await load("certifications.ts");
const { roles } = await load("experience.ts");
const { engagements } = await load("engagements.ts");
const PHOTO = new Set(["allama-iqbal-industrial-estate", "house-44x39"]);
// Where the 4:3 tile crop makes a poor thumbnail, use a different image.
const SOURCE_OVERRIDE = { "fasan-villas": "projects/fasan-villas/page-1" };
const only = process.argv.slice(2);
const want = (id) => !only.length || only.some((o) => id.startsWith(o));

const jobs = [
  ...projects.map((p) => ({
    id: `project-${p.slug}`, W: 800, H: 600, track: "planning", kind: "project", seed: seedOf(p.slug),
    image: manifest[SOURCE_OVERRIDE[p.slug] ?? p.cover]?.src, photo: PHOTO.has(p.slug),
  })),
  ...research.map((r) => ({
    id: `research-${r.slug}`, W: 800, H: 600, track: "planning", kind: "research", seed: seedOf(r.slug),
    image: r.figure ? manifest[r.figure.image]?.src : undefined,
  })),
  ...certifications.map((c) => ({
    id: `cert-${c.slug}`,
    W: 480,
    H: 640,
    track: c.track,
    kind: c.image && c.publicPreview ? "certificate" : "seal",
    seed: seedOf(c.slug),
    image: c.image && c.publicPreview ? manifest[`${c.image}-tile`]?.src : undefined,
    fitDoc: true,
  })),
  ...roles.map((r) => ({ id: r.slug, W: 480, H: 480, track: r.track, kind: `role-${r.track}`, seed: seedOf(r.slug) })),
  ...engagements.map((e) => ({ id: `engagement-${e.slug}`, W: 800, H: 600, track: "business", kind: "engagement", seed: seedOf(e.slug) })),
];
console.log("Thumbnails");
for (const j of jobs) if (want(j.id)) await makeThumb(j);
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
console.log(`Wrote ${jobs.length} thumbnails`);
