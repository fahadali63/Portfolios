// What `npm run media` builds. Paths are relative to content-source/.
//
// Every image entry:
//   id      → output path under public/media/ (without extension) and key in the manifest
//   src     → { pdf, page } or { image }
//   crop    → optional { x, y, w, h } as fractions of the source page (0–1), applied first
//   redact  → optional boxes (fractions of the page) painted over before cropping — used for
//             university roll numbers and letter reference numbers
//   rotate  → optional degrees
//   width   → output width in px (never upscaled)
//   aspect  → optional width/height ratio; centre-crops after `crop` (used for tiles)
//
// Add a project image: copy an entry, point it at the PDF page, run `npm run media`.

const P = "Portfolio/Projects/";
const C = "Portfolio/Certifications/";
const R = "Portfolio/Research Work/";

const TILE = { width: 800, aspect: 4 / 3 };
const PAGE = { width: 1800 };
const CERT = { width: 1800 };
const CERT_TILE = { width: 640 };

// Right-hand title-block column on the UET CAD sheets (names + roll numbers).
const CAD_BODY = { x: 0, y: 0, w: 0.7, h: 1 };
// "Contact #" cells on the 1- and 2-kanal sheets print a second phone number.
const CAD_CONTACT = [{ x: 0.385, y: 0.878, w: 0.312, h: 0.021 }];

// The backdrop is generated (scripts/lib/backdrop.mjs): a planner's map in a dark and a light version.
// Change `seed` for a different arrangement of contours, plan and route.
export const environments = [
  {
    id: "env/plan",
    generated: { seed: 1594 },
    sizes: { desktop: [2400, 1500], mobile: [1080, 1920] },
  },
];

export const portrait = {
  cutout: "photo/fahad-cutout.png",
  // Head-and-shoulders square inside the 768 × 1024 cutout, for avatars.
  avatarCrop: { x: 0.24, y: 0.15, w: 0.5, h: 0.375 },
  // The unedited photo, framed 4:5 on head and torso, for the home cover.
  photo: "photo/fahad-original.webp",
  photoCrop: { x: 0.14, y: 0.105, w: 0.833, h: 0.833 },
};

export const images = [
  // ───────── Projects ─────────
  { id: "projects/fa-avenue-1/tile", src: { pdf: P + "Housing Scheme Design 3000 Acres (CAD).pdf", page: 1 }, crop: { x: 0.11, y: 0.36, w: 0.434, h: 0.46 }, ...TILE },
  {
    id: "projects/fa-avenue-1/page-1",
    src: { pdf: P + "Housing Scheme Design 3000 Acres (CAD).pdf", page: 1 },
    redact: [{ x: 0.394, y: 0.877, w: 0.068, h: 0.024 }],
    ...PAGE,
  },

  { id: "projects/allama-iqbal-industrial-estate/tile", src: { pdf: P + "Industrial Estate Design (CAD).pdf", page: 1 }, crop: { x: 0, y: 0, w: 1, h: 0.5 }, ...TILE },
  { id: "projects/allama-iqbal-industrial-estate/page-1", src: { pdf: P + "Industrial Estate Design (CAD).pdf", page: 1 }, crop: { x: 0, y: 0, w: 1, h: 0.48 }, ...PAGE },
  { id: "projects/allama-iqbal-industrial-estate/page-2", src: { pdf: P + "Industrial Estate Design (CAD).pdf", page: 2 }, crop: { x: 0, y: 0, w: 1, h: 0.765 }, ...PAGE },
  { id: "projects/allama-iqbal-industrial-estate/page-3", src: { pdf: P + "Industrial Estate Design (CAD).pdf", page: 3 }, crop: { x: 0, y: 0, w: 1, h: 0.77 }, ...PAGE },
  { id: "projects/allama-iqbal-industrial-estate/page-4", src: { pdf: P + "Industrial Estate Design (CAD).pdf", page: 4 }, crop: { x: 0, y: 0, w: 1, h: 0.77 }, ...PAGE },

  { id: "projects/hanjarwal-tod/tile", src: { pdf: P + "Urban Design TOD Site (CAD + 2D).pdf", page: 1 }, crop: { x: 0.02, y: 0.06, w: 0.62, h: 0.62 }, ...TILE },
  { id: "projects/hanjarwal-tod/page-1", src: { pdf: P + "Urban Design TOD Site (CAD + 2D).pdf", page: 1 }, crop: { x: 0, y: 0, w: 0.84, h: 1 }, ...PAGE },
  { id: "projects/hanjarwal-tod/page-2", src: { pdf: P + "Urban Design TOD Site (CAD + 2D).pdf", page: 2 }, crop: { x: 0, y: 0, w: 0.84, h: 1 }, ...PAGE },

  { id: "projects/fasan-villas/tile", src: { pdf: P + "Planned Town 300 Kanals.pdf", page: 1 }, crop: { x: 0.22, y: 0.27, w: 0.66, h: 0.35 }, ...TILE },
  {
    id: "projects/fasan-villas/page-1",
    src: { pdf: P + "Planned Town 300 Kanals.pdf", page: 1 },
    redact: [{ x: 0.014, y: 0.921, w: 0.258, h: 0.034 }],
    ...PAGE,
  },

  { id: "projects/orange-line-landuse/tile", src: { pdf: P + "ArcMap (GIS)/GIS Map.pdf", page: 1 }, crop: { x: 0, y: 0.08, w: 0.78, h: 0.84 }, ...TILE },
  { id: "projects/orange-line-landuse/page-1", src: { pdf: P + "ArcMap (GIS)/GIS Map.pdf", page: 1 }, ...PAGE },

  { id: "projects/delhi-gate-regeneration/tile", src: { pdf: P + "ArcMap (GIS)/GIS Maps.pdf", page: 1 }, crop: { x: 0.1, y: 0.14, w: 0.76, h: 0.76 }, ...TILE },
  { id: "projects/delhi-gate-regeneration/page-1", src: { pdf: P + "ArcMap (GIS)/GIS Maps.pdf", page: 1 }, ...PAGE },

  { id: "projects/heritage-buffer-map/tile", src: { pdf: P + "ArcMap (GIS)/Buffer Map GIS.pdf", page: 1 }, crop: { x: 0.04, y: 0.08, w: 0.86, h: 0.86 }, ...TILE },
  { id: "projects/heritage-buffer-map/page-1", src: { pdf: P + "ArcMap (GIS)/Buffer Map GIS.pdf", page: 1 }, ...PAGE },

  { id: "projects/house-44x39/tile", src: { pdf: P + "44 x 39 (~1800 sq. ft) Personal House Implemented Plan (All Drawings).pdf", page: 10 }, ...TILE },
  ...[10, 1, 7, 6, 2, 3, 11].map((page, i) => ({
    id: `projects/house-44x39/page-${i + 1}`,
    src: { pdf: P + "44 x 39 (~1800 sq. ft) Personal House Implemented Plan (All Drawings).pdf", page },
    ...PAGE,
  })),

  { id: "projects/residential-cad-series/tile", src: { pdf: P + "10 Marla Complete Designed.pdf", page: 1 }, crop: { x: 0.04, y: 0.08, w: 0.6, h: 0.45 }, ...TILE },
  { id: "projects/residential-cad-series/page-1", src: { pdf: P + "10 Marla Complete Designed.pdf", page: 1 }, crop: { x: 0, y: 0, w: 0.82, h: 1 }, ...PAGE },
  { id: "projects/residential-cad-series/page-2", src: { pdf: P + "CAD/1 Kanal Houses.pdf", page: 1 }, redact: CAD_CONTACT, crop: CAD_BODY, ...PAGE },
  { id: "projects/residential-cad-series/page-3", src: { pdf: P + "CAD/2 Kanal House.pdf", page: 1 }, redact: CAD_CONTACT, crop: CAD_BODY, ...PAGE },
  { id: "projects/residential-cad-series/page-4", src: { pdf: P + "CAD/10 Marla Layout.pdf", page: 1 }, crop: CAD_BODY, ...PAGE },
  { id: "projects/residential-cad-series/page-5", src: { pdf: P + "CAD/5 Marla Layout.pdf", page: 1 }, crop: CAD_BODY, ...PAGE },

  // ───────── Research figures (cover pages are never used: they list roll numbers) ─────────
  { id: "research/model-town-cycle-track", src: { pdf: R + "Transportation Engineering/Cycle track report.pdf", page: 1 }, crop: { x: 0.08, y: 0.04, w: 0.84, h: 0.52 }, ...PAGE },

  // ───────── Certificates (public preview only) ─────────
  { id: "certificates/winter-school-award", src: { pdf: C + "Winter School Certificate.pdf", page: 1 }, ...CERT },
  { id: "certificates/winter-school-award-tile", src: { pdf: C + "Winter School Certificate.pdf", page: 1 }, ...CERT_TILE },
  { id: "certificates/ipp-seminar", src: { image: C + "IPP Certificate Fahad.png" }, ...CERT },
  { id: "certificates/ipp-seminar-tile", src: { image: C + "IPP Certificate Fahad.png" }, ...CERT_TILE },
  { id: "certificates/winter-school-participation", src: { image: C + "Winter School PArticipation.jpg" }, rotate: 270, ...CERT },
  { id: "certificates/winter-school-participation-tile", src: { image: C + "Winter School PArticipation.jpg" }, rotate: 270, ...CERT_TILE },
  {
    id: "certificates/lda-letter",
    src: { pdf: C + "LDA Internship Certificate.pdf", page: 1 },
    redact: [
      { x: 0.543, y: 0.157, w: 0.132, h: 0.03 }, // registration (roll) number
      { x: 0.636, y: 0.071, w: 0.078, h: 0.022 }, // letter reference number
    ],
    ...CERT,
  },
  {
    id: "certificates/lda-letter-tile",
    src: { pdf: C + "LDA Internship Certificate.pdf", page: 1 },
    redact: [
      { x: 0.543, y: 0.157, w: 0.132, h: 0.03 },
      { x: 0.636, y: 0.071, w: 0.078, h: 0.022 },
    ],
    ...CERT_TILE,
  },
  { id: "certificates/itdbm", src: { image: C + "ITDBM Certificate.png" }, ...CERT },
  { id: "certificates/itdbm-tile", src: { image: C + "ITDBM Certificate.png" }, ...CERT_TILE },
];

// Files that must never be rendered into public/ (checked by `npm run check-content`).
export const neverPublish = [
  C + "Spatio Certificate.pdf",
  C + "Akbari Builders Internship Certificate.pdf",
  C + "Union Associates Internship Certificate.HEIC",
  C + "Winter School Cash Receiving.HEIC",
];
