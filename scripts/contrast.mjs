// Prints the worst-case contrast table for the design tokens (docs/design-system.md).
// Worst case = glass over the brightest pixel the media pipeline allows (#C8C1B8 + baked scrim).
import { contrast, hex, over, toHex } from "./lib/color.mjs";

const WHITE = [255, 255, 255];
const clamp = hex("#C8C1B8"); // tone-map ceiling
const scrim = [20, 16, 12];
const photoMax = over(scrim, 0.3, clamp); // baked scrim
const glass = over(hex("#3B3530"), 0.64, photoMax);
const opaque = hex("#3A342F");
const raised = over(WHITE, 0.06, glass);
const inset = over([0, 0, 0], 0.18, glass);
const text2 = (bg) => over(WHITE, 0.8, bg);
const rows = [
  ["Brightest photo pixel after scrim", toHex(photoMax), "—"],
  ["Glass surface, worst case", toHex(glass), "—"],
  ["--text-1 on glass", "", contrast(WHITE, glass)],
  ["--text-2 on glass", "", contrast(text2(glass), glass)],
  ["--text-1 on --fill-raised (6%) inside glass", toHex(raised), contrast(WHITE, raised)],
  ["--text-2 on --fill-raised inside glass", "", contrast(text2(raised), raised)],
  ["--text-1 on --fill-inset inside glass", toHex(inset), contrast(WHITE, inset)],
  ["--text-2 on --fill-inset inside glass", "", contrast(text2(inset), inset)],
  ["--text-1 on --glass-opaque", "#3A342F", contrast(WHITE, opaque)],
  ["--text-2 on --glass-opaque", "", contrast(text2(opaque), opaque)],
  ["--accent-planning #7FDCD2 mark on glass", "", contrast(hex("#7FDCD2"), glass)],
  ["--accent-business #FF9A6E mark on glass", "", contrast(hex("#FF9A6E"), glass)],
  ["--accent-business on --fill-raised", "", contrast(hex("#FF9A6E"), raised)],
  ["--on-accent #1A1613 on aqua #7FDCD2", "", contrast(hex("#1A1613"), hex("#7FDCD2"))],
  ["--on-accent #1A1613 on coral #F2703F", "", contrast(hex("#1A1613"), hex("#F2703F"))],
  ["White on coral #F2703F (never used)", "", contrast(WHITE, hex("#F2703F"))],
  ["Coral #F2703F as text on glass (never used)", "", contrast(hex("#F2703F"), glass)],
  ["Hairline rgba(255,255,255,.16) on glass (decorative)", toHex(over(WHITE, 0.16, glass)), contrast(over(WHITE, 0.16, glass), glass)],
  ["Focus ring white on dark halo #1A1613", "", contrast(WHITE, hex("#1A1613"))],
];
console.log("| Pair | Surface | Ratio |\n| --- | --- | --- |");
for (const [k, s, r] of rows) console.log(`| ${k} | ${s} | ${typeof r === "number" ? r.toFixed(2) + ":1" : r} |`);
