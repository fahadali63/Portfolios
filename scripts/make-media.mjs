// npm run media
//
// Builds every image the site shows from the private files in content-source/ into public/media/,
// and writes src/content/media.generated.json (paths + exact pixel sizes, so every <img> has
// width/height — static export has no runtime image optimiser).
//
// Steps: environment photos (tone-map, scrim, blur) · portrait cutout · PDF pages and images
// (crop, redact, resize, WebP + AVIF) · favicon and touch icon.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
import { pdf } from "pdf-to-img";
import { environments, images, portrait } from "./media.config.mjs";
import { composeBackdrop } from "./lib/compose-backdrop.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CS = path.join(ROOT, "content-source");
const OUT = path.join(ROOT, "public/media");
const MANIFEST = path.join(ROOT, "src/content/media.generated.json");

const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const want = (id) => only.length === 0 || only.some((o) => id.startsWith(o));

if (!fs.existsSync(CS)) {
  console.error("content-source/ not found — media can only be rebuilt on the machine that has the original files.");
  process.exit(1);
}

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
const log = (...a) => console.log("  ", ...a);

// ───────────────────────── helpers ─────────────────────────

const pageCache = new Map();
/** Render one PDF page to a PNG buffer, at a scale that gives ~3000 px across. */
async function renderPdfPage(file, pageNo) {
  const key = `${file}#${pageNo}`;
  if (pageCache.has(key)) return pageCache.get(key);
  const abs = path.join(CS, file);
  const probe = await pdf(abs, { scale: 1 });
  const first = await probe.getPage(pageNo);
  await probe.destroy();
  const { width } = await sharp(first).metadata();
  const scale = Math.min(6, Math.max(1, 3000 / width));
  const doc = await pdf(abs, { scale });
  const buf = await doc.getPage(pageNo);
  await doc.destroy();
  pageCache.set(key, buf);
  return buf;
}

async function loadSource(src) {
  if (src.pdf) return renderPdfPage(src.pdf, src.page ?? 1);
  const abs = path.join(CS, src.image);
  if (/\.heic$/i.test(abs)) return heicToJpeg(abs);
  return fs.readFileSync(abs);
}

function heicToJpeg(abs) {
  // sharp's prebuilt binaries can't decode HEIC. macOS ships `sips`, which can.
  const tmp = path.join(ROOT, ".media-tmp.jpg");
  try {
    execFileSync("sips", ["-s", "format", "jpeg", abs, "--out", tmp], { stdio: "ignore" });
    const buf = fs.readFileSync(tmp);
    fs.rmSync(tmp);
    return buf;
  } catch {
    throw new Error(`Can't convert ${path.basename(abs)} — export it as JPG and point media.config.mjs at the JPG.`);
  }
}

const px = (f, total) => Math.round(f * total);

/** Paint each redaction box with the paper colour found inside it. */
async function redact(buf, boxes = []) {
  if (!boxes.length) return buf;
  const img = sharp(buf);
  const { width, height } = await img.metadata();
  const overlays = [];
  for (const b of boxes) {
    const region = { left: px(b.x, width), top: px(b.y, height), width: px(b.w, width), height: px(b.h, height) };
    const stats = await sharp(buf).extract(region).stats();
    const [r, g, bl] = stats.channels.slice(0, 3).map((c) => Math.max(0, c.max - 4));
    overlays.push({
      input: { create: { width: region.width, height: region.height, channels: 3, background: { r, g, b: bl } } },
      left: region.left,
      top: region.top,
    });
  }
  return sharp(buf).composite(overlays).png().toBuffer();
}

async function cropFraction(buf, c) {
  if (!c) return buf;
  const { width, height } = await sharp(buf).metadata();
  return sharp(buf)
    .extract({ left: px(c.x, width), top: px(c.y, height), width: Math.min(px(c.w, width), width - px(c.x, width)), height: Math.min(px(c.h, height), height - px(c.y, height)) })
    .png()
    .toBuffer();
}

async function cropAspect(buf, aspect) {
  if (!aspect) return buf;
  const { width, height } = await sharp(buf).metadata();
  const current = width / height;
  if (Math.abs(current - aspect) < 0.01) return buf;
  if (current > aspect) {
    const w = Math.round(height * aspect);
    return sharp(buf).extract({ left: Math.round((width - w) / 2), top: 0, width: w, height }).png().toBuffer();
  }
  const h = Math.round(width / aspect);
  return sharp(buf).extract({ left: 0, top: Math.round((height - h) / 2), width, height: h }).png().toBuffer();
}

/** Write WebP + AVIF, record size in the manifest. */
async function emit(id, pipeline, { webp = 80, avif = 55, alpha = false } = {}) {
  const base = path.join(OUT, id);
  fs.mkdirSync(path.dirname(base), { recursive: true });
  const buf = await pipeline.png().toBuffer();
  const { width, height } = await sharp(buf).metadata();
  await sharp(buf).webp({ quality: webp, alphaQuality: alpha ? 90 : 100, effort: 5 }).toFile(base + ".webp");
  await sharp(buf).avif({ quality: avif, effort: 4 }).toFile(base + ".avif");
  const kb = (f) => Math.round(fs.statSync(f).size / 1024);
  manifest[id] = { src: `/media/${id}.webp`, avif: `/media/${id}.avif`, width, height };
  log(`${id}  ${width}×${height}  webp ${kb(base + ".webp")} KB · avif ${kb(base + ".avif")} KB`);
  return { width, height };
}

// ───────────────────────── environment photos ─────────────────────────

const CAP = [200, 193, 184]; // #C8C1B8 — no pixel brighter than this after tone-mapping
const SCRIM = [20, 16, 12];
const SCRIM_ALPHA = 0.3;

/** Soft-knee highlight compression per channel, then the warm scrim. */
async function toneMap(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 3) {
    for (let c = 0; c < 3; c++) {
      const cap = CAP[c];
      const knee = cap * 0.55;
      const v = data[i + c];
      const t = v <= knee ? v : knee + (cap - knee) * (1 - Math.exp(-(v - knee) / (cap - knee)));
      out[i + c] = Math.round(t * (1 - SCRIM_ALPHA) + SCRIM[c] * SCRIM_ALPHA);
    }
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toBuffer();
}

async function underBudget(id, makeBuf, maxKB, startQ) {
  // Lower quality until the WebP fits the budget (AVIF is always smaller).
  let q = startQ;
  for (;;) {
    const size = await emit(id, sharp(await makeBuf()), { webp: q, avif: Math.round(q * 0.68) });
    const kb = fs.statSync(path.join(OUT, id + ".webp")).size / 1024;
    if (kb <= maxKB || q <= 40) return size;
    q -= 6;
  }
}

async function buildEnvironments() {
  for (const env of environments) {
    if (!want(env.id)) continue;
    if (env.generated) {
      for (const theme of ["dark", "light"]) {
        const [dw, dh] = env.sizes.desktop;
        const [mw, mh] = env.sizes.mobile;
        const desktop = await composeBackdrop({ theme, width: dw, height: dh, seed: env.generated.seed });
        await underBudget(`${env.id}-${theme}-desktop`, async () => desktop, 300, 82);
        // Phones skip backdrop-filter, so their backdrop is pre-softened.
        const mobile = await composeBackdrop({ theme, width: mw, height: mh, seed: env.generated.seed + 1, extraBlur: 2.5 });
        await underBudget(`${env.id}-${theme}-mobile`, async () => sharp(mobile).resize({ width: 720 }).png().toBuffer(), 120, 78);
      }
      continue;
    }
    // Photo backdrop (kept for future use): tone-map, scrim, blur.
    const raw = await loadSource(env.src);
    const graded = (b) => sharp(b).modulate({ saturation: 0.86 }).png().toBuffer();
    const desktop = await toneMap(await graded(await sharp(await cropFraction(raw, env.desktopCrop)).resize({ width: 2400 }).png().toBuffer()));
    await underBudget(`${env.id}-desktop`, async () => desktop, 300, 74);
    const mobile = await toneMap(await graded(await sharp(raw).resize({ width: 1080 }).png().toBuffer()));
    await emit(`${env.id}-mobile-blur`, sharp(mobile).resize({ width: 720 }).blur(16), { webp: 70, avif: 45 });
    manifest[`${env.id}-credit`] = env.credit;
  }
}

// ───────────────────────── portrait ─────────────────────────

async function buildPortrait() {
  if (!want("portrait")) return;
  const src = fs.readFileSync(path.join(CS, portrait.cutout));
  const { width, height } = await sharp(src).metadata();
  const N = width * height;
  /** Run a pipeline and return exactly one byte per pixel, whatever channel count sharp hands back. */
  const one = async (pipe) => {
    const { data, info } = await pipe.raw().toBuffer({ resolveWithObject: true });
    if (info.channels === 1) return data;
    const o = Buffer.alloc(N);
    for (let i = 0; i < N; i++) o[i] = data[i * info.channels];
    return o;
  };

  // 1. Decontaminate the edge: semi-transparent pixels still carry the original (bright, green) background.
  //    Replace their colour with colour "bled" outward from the opaque interior: blur(rgb·a) / blur(a).
  const { data: pix } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const premul = Buffer.alloc(N * 3);
  const alphaBuf = Buffer.alloc(N);
  // Only the deep interior (≥ ~4 px inside the mask) contributes colour.
  const deep = await one(sharp(src).extractChannel(3).blur(4));
  for (let i = 0; i < N; i++) {
    alphaBuf[i] = deep[i] > 250 ? 255 : 0;
    for (let c = 0; c < 3; c++) premul[i * 3 + c] = Math.round((pix[i * 4 + c] * alphaBuf[i]) / 255);
  }
  const sigma = 6;
  const bpRaw = await sharp(premul, { raw: { width, height, channels: 3 } }).blur(sigma).raw().toBuffer({ resolveWithObject: true });
  const bp = bpRaw.info.channels === 3 ? bpRaw.data : Buffer.from(Array.from({ length: N * 3 }, (_, k) => bpRaw.data[Math.floor(k / 3) * bpRaw.info.channels + (k % 3)]));
  const ba = await one(sharp(alphaBuf, { raw: { width, height, channels: 1 } }).blur(sigma));

  // 2. Tighten and feather the alpha (≈1.5 px in, soft 1 px edge).
  const tight = await one(sharp(src).extractChannel(3).blur(1.6).linear(2.8, -1.8 * 255).blur(0.7));
  const zone = await one(sharp(tight, { raw: { width, height, channels: 1 } }).blur(3));

  const outBuf = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) {
    const a = tight[i];
    // Within ~3 px of the edge, blend toward the interior colour (fully at the rim).
    const t = zone[i] >= 252 ? 0 : Math.min(1, (252 - zone[i]) / 60 + 0.35);
    for (let c = 0; c < 3; c++) {
      let v = pix[i * 4 + c];
      if (t > 0 && ba[i] > 8) v = v * (1 - t) + Math.min(255, (bp[i * 3 + c] * 255) / ba[i]) * t;
      // gentle grade: a touch more contrast, slightly warmer, so the figure sits in the warm palette
      v = (v - 128) * 1.05 + 128 + (c === 0 ? 3 : c === 2 ? -3 : 0);
      outBuf[i * 4 + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
    outBuf[i * 4 + 3] = a;
  }
  const clean = await sharp(outBuf, { raw: { width, height, channels: 4 } }).png().toBuffer();

  // Tight box around the figure.
  const { data, info } = await sharp(clean).extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      if (data[(y * width + x) * info.channels] > 16) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
  const figure = await sharp(clean).extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 }).png().toBuffer();
  fs.mkdirSync(path.join(OUT, "portrait"), { recursive: true });
  fs.writeFileSync(path.join(OUT, "portrait/.figure-source.png"), figure); // used by the OG script; not linked
  // The source photo is 768 px wide, so the figure ships at its native size (no upscaling).
  await emit("portrait/fahad-figure", sharp(figure), { webp: 88, avif: 64, alpha: true });

  const c = portrait.avatarCrop;
  const side = px(c.w, width);
  const avatar = await sharp(clean).extract({ left: px(c.x, width), top: px(c.y, height), width: side, height: side }).png().toBuffer();
  await emit("portrait/fahad-avatar", sharp(avatar).resize(160), { webp: 86, avif: 62, alpha: true });
  await emit("portrait/fahad-avatar@2x", sharp(avatar).resize(320), { webp: 86, avif: 62, alpha: true });

  // Cover photo: the real photo, cropped 4:5 at native resolution, with a light warm grade.
  const photoSrc = sharp(fs.readFileSync(path.join(CS, portrait.photo)));
  const pm = await photoSrc.metadata();
  const pc = portrait.photoCrop;
  const pw = px(pc.w, pm.width);
  await emit(
    "portrait/fahad-photo",
    photoSrc
      .extract({ left: px(pc.x, pm.width), top: px(pc.y, pm.height), width: pw, height: Math.round((pw * 5) / 4) })
      .modulate({ saturation: 0.88 })
      .linear([1.05, 1.03, 1.0], [-6, -6, -8]),
    { webp: 86, avif: 60 }
  );
}

// ───────────────────────── PDF pages and images ─────────────────────────

async function buildImages() {
  for (const item of images) {
    if (!want(item.id)) continue;
    try {
      let buf = await loadSource(item.src);
      if (item.rotate) buf = await sharp(buf).rotate(item.rotate).png().toBuffer();
      buf = await redact(buf, item.redact);
      buf = await cropFraction(buf, item.crop);
      buf = await cropAspect(buf, item.aspect);
      await emit(item.id, sharp(buf).flatten({ background: "#ffffff" }).resize({ width: item.width, withoutEnlargement: true }));
    } catch (e) {
      console.error(`✗ ${item.id}: ${e.message}`);
      process.exitCode = 1;
    }
  }
}

// ───────────────────────── icons ─────────────────────────

async function buildIcons() {
  if (!want("icons")) return;
  const svg = fs.readFileSync(path.join(ROOT, "public/brand/logo-mark.svg"));
  fs.writeFileSync(path.join(ROOT, "src/app/icon.svg"), svg);
  await sharp(svg, { density: 900 }).resize(180, 180).flatten({ background: "#2E2824" }).png().toFile(path.join(ROOT, "src/app/apple-icon.png"));
  await sharp(svg, { density: 900 }).resize(512, 512).png().toFile(path.join(ROOT, "public/brand/logo-mark-512.png"));
  log("icons: src/app/icon.svg, src/app/apple-icon.png, public/brand/logo-mark-512.png");
}

console.log("Environment photos");
await buildEnvironments();
console.log("Portrait");
await buildPortrait();
console.log("Pages and images");
await buildImages();
console.log("Icons");
await buildIcons();

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
console.log(`\nWrote ${path.relative(ROOT, MANIFEST)} (${Object.keys(sorted).length} entries)`);
