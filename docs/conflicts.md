# Conflicts and resolutions

Rule of authority (BUILD_PROMPT C2): **the current website wins**, then newer files in `content-source/`, then résumés and LinkedIn (cross-check only).

The v1 source code was found in `content-source/Old portfolio files/`. Its data files were compared string by string with the live site (`npm run extract -- --verify`): every visible string matches, so the source code is treated as the exact text of the live site.

## A. Older-source figures the website already corrected (do not reintroduce)

| # | Older source says | Website says (used) | Source of the older figure | Resolution |
| --- | --- | --- | --- | --- |
| A1 | "Closed 22 projects in last four months" | 100+ projects closed | BDE résumé (Sept 2025) | Website: **100+** |
| A2 | "90–95% meeting-to-client conversion rate" | 100% in Oct 2025 (7–8 calls); 80%+ overall | BDE résumé | Website figures |
| A3 | "Contributed to 2x revenue growth" | not stated | BDE résumé | Not used |
| A4 | "Housing Scheme Design (3,000 Acres)" | FA Avenue 1 — 2,828 acres | TP résumé, PDF filename | Website: **FA Avenue 1, 2,828 acres** |
| A5 | "Personal House … (~1,800 sq. ft)" | 1,716 sq ft | TP résumé, PDF filename | Website: **1,716 sq ft** |
| A6 | LDA "July 2024 – August 2024" | Jul 2024 – Sep 2024; note "Six weeks, 15 Jul – 1 Sep 2024, per LDA's letter" | TP résumé, LinkedIn | Website |
| A7 | Ideas Animation "Agency" | Ideas Animation Studio | LinkedIn | Website |
| A8 | Second phone number +92 318 … ("Work") | +92 333 628 1594 only | LinkedIn | Website; second number never shown (privacy check greps for it) |
| A9 | "Lead Business Development Executive (Part-time)" | Associate (Mar–Jun 2025) → Specialist (Jun 2025–Jun 2026) | BDE résumé | Website titles |
| A10 | "Management, Winter School…" | Winter School participation certificate only | TP résumé | Website (certificate shows participation) |
| A11 | "Innotec Claims" | Innotec Engineering Services | LinkedIn headline | Website |

## B. New differences found in this rebuild

| # | Difference | Sources | Resolution |
| --- | --- | --- | --- |
| B1 | July attainment: sales deck table prints **86%**; the site computes **87%** ($1,737 / $2,000 = 86.85%, rounded) | `MY BDE Portfolio.pdf` p8 vs site chart | Website: **87%** (correct rounding). The deck truncated. |
| B2 | TP résumé gives a neighbourhood ("Qainchi Bazar") | TP résumé header | City and country only (C3). The résumé PDFs are **not** published as files — see checkpoint question on résumé downloads. |
| B3 | TP résumé prints a truncated Drive folder link (`drive.google.com/folders/1mQkZ0…`) | TP résumé | Folder links are never used (C3, `check-content` fails on `/folders/`). |
| B4 | `Winter School Cash Receiving.HEIC` — group photo with faculty and classmates | content-source | Not used: shows other people and is not on the current site. |
| B5 | Research "Cycle Track Proposal": authors not printed on the report | v1 data (`TODO`) | Authors line omitted, as on the live site. |
| B6 | Ideas Animation Associate role (Mar–Jun 2025) has no bullets | v1 data | Shown as a role row with the promotion note, no bullets (as live). |
| B7 | "44′ × 39′ Residence": owner / client and year not stated | v1 data comment | Shown as on the live site (no location/year). |
| B8 | v1 defects: canonical/OG = `http://localhost:3000`; counters render `0` without JS; "Anthropic Sans" in the font stack; no photo | live HTML | Fixed in v2 (C5 #1–#4). |

## C. Open items (not on the current site; included only if files are supplied)

| Item | Status |
| --- | --- |
| "Excellence in Creativity" (Ideas Animation) | No file in `content-source/` → excluded (kept as a draft entry, never rendered). |
| Ideas Animation experience letter | No file → excluded (draft entry). |
| Google AI Essentials certificate | Listed on LinkedIn only, no file → excluded (draft entry). |
| Employee of the Month / Rising Star certificates | Listed on the site without images → shown as recognition tiles with an issuer badge, no preview. |

## D. Checkpoint answers

Answered 18 Oct 2026.

| Question | Answer | Effect |
| --- | --- | --- |
| Backdrop photo | **A — Wazir Khan Mosque through an arch** (Unsplash, Arooba Arif) | One photo for all routes (`src/content/environments.ts`); landscape crop on desktop, full portrait frame on phones; credit in the footer |
| Résumé downloads | **Generate from the site** | `npm run resumes` prints each profile page with the print stylesheet to `public/resume/*.pdf` (Playwright); the location bar's "Download résumé" offers both |
| Logo | **Another direction → option 2, the "fa." tile** | `public/brand/logo-mark.svg`: lowercase "fa" in white on a warm-dark rounded tile with a coral full stop |

## E. Revision requests (18 Oct 2026)

| Request | Resolution |
| --- | --- |
| New backdrop, something unique | Generated "planner's map" (`scripts/lib/backdrop.mjs`): contours, a radial master plan after FA Avenue 1, a coral transit line after the Orange Line study. Dark and light versions. The Unsplash photo is no longer used (no credit needed). |
| Cutout didn't match | Edge recoloured from the figure's interior, mask tightened ~2 px and feathered, gentle warm grade; the figure now stands in a tinted arch frame instead of being pasted onto a photo. |
| Home focused on current work; toggle changes everything; no mixing | Home "lens": default = current role's track (Business). One switch (cover + Experience window) swaps cover, portrait tint, experience, focus window, worked-with, highlights, expertise, featured work, recognition and closing line. No business figures appear in the Planning lens and vice versa. |
| Light / dark toggle | Theme toggle in the rail (phones: top bar). Follows the system until chosen; remembered. |
| Thumbnails in one design language | "Ink card" thumbnails for all 9 projects, 7 reports, 11 certificates, 9 roles and 4 engagements (`npm run thumbs`). |
| Icons instead of "IA" letters | Certificates/recognition show kind icons (award, certificate, letter, recognition); roles show track icons. |
| Drive links on research and portfolio | Every project and report links to the portfolio folder (`…/folders/1mQkZ0…`). The privacy check allows this one folder only; the root Drive folder and any other folder are still refused. **Make sure that folder holds only portfolio material and is shared "Anyone with the link".** |
| New footer | Sign-off window: tagline set large, Lahore coordinate stamp with live local time, social buttons, quick links, back to top. |
| Socials | Email, WhatsApp, LinkedIn, Instagram in the footer and on Contact. |
