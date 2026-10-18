// Generative "planner's map" backdrop, rendered to SVG (then rasterised by make-media.mjs).
//
// Layers, back to front:
//   1. base colour + soft aurora blobs (blurry-gradient technique) in the two career colours
//   2. graph-paper grid (a plan sheet)
//   3. topographic contours from seeded fractal noise (marching squares), every 5th line an index contour
//   4. a radial master-plan diagram — ring roads, spokes and parcel ticks (after FA Avenue 1's radial CBD)
//   5. a coral transit line with station dots (after the Orange Line TOD study)
//   6. vignette
// Same seed → same picture. Dark and light themes share the geometry, only the inks change.

const THEMES = {
  dark: {
    base: "#14100d",
    aurora: ["#0d302c", "#3b1a10", "#2b2015", "#0f2f2e", "#331710"],
    auroraOpacity: 0.9,
    grid: "rgba(255,236,214,0.035)",
    contour: "rgba(255,236,214,0.11)",
    contourIndex: "rgba(255,236,214,0.2)",
    plan: "rgba(127,220,210,0.32)",
    planFaint: "rgba(127,220,210,0.12)",
    route: "rgba(255,154,110,0.62)",
    stationFill: "#14100d",
    vignette: "rgba(8,6,4,0.55)",
  },
  light: {
    base: "#efe8de",
    aurora: ["#d3ebe6", "#f4d9c9", "#ebdecb", "#d9ece7", "#f2d2bf"],
    auroraOpacity: 0.95,
    grid: "rgba(70,48,30,0.045)",
    contour: "rgba(70,48,30,0.10)",
    contourIndex: "rgba(70,48,30,0.19)",
    plan: "rgba(14,124,114,0.30)",
    planFaint: "rgba(14,124,114,0.14)",
    route: "rgba(196,81,42,0.62)",
    stationFill: "#efe8de",
    vignette: "rgba(255,250,244,0.45)",
  },
};

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeNoise(rand) {
  const size = 256;
  const perm = Array.from({ length: size }, (_, i) => i);
  for (let i = size - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  const vals = Array.from({ length: size }, () => rand());
  const h = (x, y) => vals[perm[(perm[x & 255] + y) & 255]];
  const fade = (t) => t * t * (3 - 2 * t);
  const value = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
    const u = fade(xf), v = fade(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  return (x, y) => {
    let amp = 1, freq = 1, sum = 0, norm = 0;
    for (let o = 0; o < 4; o++) {
      sum += amp * value(x * freq, y * freq);
      norm += amp;
      amp *= 0.5;
      freq *= 2.03;
    }
    return sum / norm;
  };
}

const f = (n) => (Math.round(n * 10) / 10).toString();

/** Marching squares → line segments for one iso level. */
export function contourSegments(field, cols, rows, cell, level) {
  const segs = [];
  const at = (i, j) => field[j * (cols + 1) + i];
  const lerp = (a, b, va, vb) => a + ((level - va) / (vb - va)) * (b - a);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const tl = at(i, j), tr = at(i + 1, j), br = at(i + 1, j + 1), bl = at(i, j + 1);
      const idx = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const x = i * cell, y = j * cell;
      const top = [lerp(x, x + cell, tl, tr), y];
      const right = [x + cell, lerp(y, y + cell, tr, br)];
      const bottom = [lerp(x, x + cell, bl, br), y + cell];
      const left = [x, lerp(y, y + cell, tl, bl)];
      const table = {
        1: [[left, bottom]], 2: [[bottom, right]], 3: [[left, right]], 4: [[top, right]],
        5: [[left, top], [bottom, right]], 6: [[top, bottom]], 7: [[left, top]], 8: [[left, top]],
        9: [[top, bottom]], 10: [[left, bottom], [top, right]], 11: [[top, right]], 12: [[left, right]],
        13: [[bottom, right]], 14: [[left, bottom]],
      };
      for (const s of table[idx]) segs.push(s);
    }
  }
  return segs;
}

/** Returns { aurora, lines, blur }: aurora is blurred by `blur` px as a raster, then the crisp lines go on top. */
export function renderBackdrop({ theme = "dark", width = 2400, height = 1500, seed = 1594 } = {}) {
  const T = THEMES[theme];
  const rand = mulberry32(seed);
  const noise = makeNoise(mulberry32(seed * 7 + 3));
  const W = width, H = height, M = Math.max(W, H);
  const out = [];

  // 1 · base + aurora (returned separately: blurred as a raster by make-media, which avoids SVG blur artefacts)
  const aurora = [`<rect width="${W}" height="${H}" fill="${T.base}"/>`, `<g opacity="${T.auroraOpacity}">`];
  out.push(`<defs><radialGradient id="v" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="${T.vignette}" stop-opacity="0"/><stop offset="100%" stop-color="${T.vignette}"/></radialGradient></defs>`);
  const spots = [
    [0.18, 0.2, 0.34], [0.82, 0.72, 0.4], [0.55, 0.12, 0.26], [0.88, 0.18, 0.28], [0.12, 0.86, 0.3],
  ];
  spots.forEach(([x, y, r], k) => {
    const rr = M * r * (0.85 + rand() * 0.3);
    aurora.push(`<ellipse cx="${f(x * W)}" cy="${f(y * H)}" rx="${f(rr)}" ry="${f(rr * (0.6 + rand() * 0.3))}" fill="${T.aurora[k % T.aurora.length]}"/>`);
  });
  aurora.push(`</g>`);

  // 2 · graph-paper grid
  const g = Math.round(M / 40);
  let grid = "";
  for (let x = g; x < W; x += g) grid += `M${x},0V${H}`;
  for (let y = g; y < H; y += g) grid += `M0,${y}H${W}`;
  out.push(`<path d="${grid}" stroke="${T.grid}" stroke-width="1" fill="none"/>`);

  // 3 · contours
  const cell = Math.max(6, Math.round(M / 300));
  const cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
  const field = new Float32Array((cols + 1) * (rows + 1));
  const scale = 3.2 / M;
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) field[j * (cols + 1) + i] = noise(i * cell * scale + 11.3, j * cell * scale + 4.7);
  const levels = 26;
  for (let l = 1; l < levels; l++) {
    const level = 0.22 + (l / levels) * 0.56;
    const segs = contourSegments(field, cols, rows, cell, level);
    if (!segs.length) continue;
    const d = segs.map(([a, b]) => `M${f(a[0])},${f(a[1])}L${f(b[0])},${f(b[1])}`).join("");
    const index = l % 5 === 0;
    out.push(`<path d="${d}" stroke="${index ? T.contourIndex : T.contour}" stroke-width="${index ? 1.6 : 1}" fill="none" stroke-linecap="round"/>`);
  }

  // 4 · radial master-plan diagram (off-centre, partly off-canvas)
  const cx = W * 0.8, cy = H * 0.66, R = M * 0.42;
  const rings = [0.12, 0.2, 0.31, 0.45, 0.62, 0.82, 1].map((k) => k * R);
  let plan = "", faint = "";
  rings.forEach((r, i) => {
    const arc = `M${f(cx + r)},${f(cy)}A${f(r)},${f(r)} 0 1 0 ${f(cx - r)},${f(cy)}A${f(r)},${f(r)} 0 1 0 ${f(cx + r)},${f(cy)}`;
    if (i % 2 === 0) plan += arc;
    else faint += arc;
  });
  const spokes = 18;
  for (let s = 0; s < spokes; s++) {
    const a = (s / spokes) * Math.PI * 2 + 0.11;
    const r0 = rings[0], r1 = s % 3 === 0 ? R * 1.25 : rings[5];
    plan += `M${f(cx + Math.cos(a) * r0)},${f(cy + Math.sin(a) * r0)}L${f(cx + Math.cos(a) * r1)},${f(cy + Math.sin(a) * r1)}`;
  }
  // parcel ticks between rings
  for (let i = 1; i < rings.length - 1; i++) {
    const n = 16 + i * 10;
    for (let k = 0; k < n; k++) {
      if (rand() < 0.35) continue;
      const a = (k / n) * Math.PI * 2 + rand() * 0.02;
      const r0 = rings[i], r1 = rings[i] + (rings[i + 1] - rings[i]) * (0.35 + rand() * 0.3);
      faint += `M${f(cx + Math.cos(a) * r0)},${f(cy + Math.sin(a) * r0)}L${f(cx + Math.cos(a) * r1)},${f(cy + Math.sin(a) * r1)}`;
    }
  }
  out.push(`<path d="${faint}" stroke="${T.planFaint}" stroke-width="1.2" fill="none"/>`);
  out.push(`<path d="${plan}" stroke="${T.plan}" stroke-width="1.6" fill="none"/>`);
  out.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rings[0] * 0.45)}" fill="none" stroke="${T.plan}" stroke-width="1.6"/>`);
  out.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rings[0] * 0.2)}" fill="${T.plan}"/>`);

  // 5 · transit line with stations
  const pts = [];
  const steps = 60;
  for (let k = 0; k <= steps; k++) {
    const t = k / steps;
    // Hugs the bottom edge on the left (under the cover text), rises only in the right half.
    const x = -W * 0.05 + t * W * 1.1;
    const s = Math.min(1, Math.max(0, (t - 0.42) / 0.58));
    const ease = s * s * (3 - 2 * s);
    const y = H * (0.955 - 0.6 * ease) + Math.sin(t * Math.PI * 3 + 0.6) * H * 0.012;
    pts.push([x, y]);
  }
  const route = pts.map(([x, y], k) => `${k ? "L" : "M"}${f(x)},${f(y)}`).join("");
  out.push(`<path d="${route}" stroke="${T.route}" stroke-width="${f(M / 600)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
  for (let k = 4; k < steps; k += 7) {
    const [x, y] = pts[k];
    out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(M / 300)}" fill="${T.stationFill}" stroke="${T.route}" stroke-width="${f(M / 900)}"/>`);
  }

  // 6 · vignette
  out.push(`<rect width="${W}" height="${H}" fill="url(#v)"/>`);

  const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${body}</svg>`;
  return { aurora: svg(aurora.join("")), lines: svg(out.join("")), blur: M * 0.09 };
}
