// npm run resumes — copies your own résumé PDFs, unchanged, from content-source/Portfolio/ into public/resume/.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "content-source/Portfolio");
const OUT_DIR = path.join(ROOT, "public/resume");

// [source file in content-source/Portfolio, file served by the site]
const RESUMES = [
  ["Fahad Ali Resume TP Sep 2026.pdf", "fahad-ali-urban-planning.pdf"],
  ["Fahad Ali BDE Resume Sept. 2025.pdf", "fahad-ali-business-development.pdf"],
];

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const [src, file] of RESUMES) {
  const from = path.join(SRC, src);
  if (!fs.existsSync(from)) {
    console.error(`Missing ${path.relative(ROOT, from)}`);
    process.exit(1);
  }
  fs.copyFileSync(from, path.join(OUT_DIR, file));
  console.log("  ", `public/resume/${file}`, "←", src, Math.round(fs.statSync(from).size / 1024), "KB");
}
