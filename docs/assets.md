# Assets

Every image or document the v2 site shows, where it comes from, and whether it may be shown publicly. `npm run media` builds everything in `public/media/` from these sources; nothing else is published.

Source roots: `CS/` = `content-source/Portfolio/`, `V1/` = `content-source/Old portfolio files/public/images/` (the live site's own images).

## Privacy policy for images

- **No national ID numbers.** The Spatio, The Union Associates and Al-Akbari letters are never rendered, linked or copied into `public/` (`publicPreview: false`, enforced by `check-content`).
- **No roll numbers.** Drawing title blocks and report cover pages print university roll numbers (`2023-CRP-xx`). v2 crops title blocks out of tiles, and the sheet pages carry redaction boxes defined in `scripts/media.config.mjs`; report cover pages are not shown at all. QA re-checks every rendered page.
- **No other people.** `Winter School Cash Receiving.HEIC` (group photo) is not used.
- **No neighbourhoods.** Résumé PDFs (TP résumé prints a neighbourhood) are not published as files.

## Portrait and brand

| Asset | Source | Depicts | Resolution | Public | Used |
| --- | --- | --- | --- | --- | --- |
| Portrait (original) | `content-source/photo/fahad-original.webp` (sent in chat) | Fahad Ali, waist-up, black waistcoat, park background | 768 × 1024 | ✓ | Source for the cutout and the circular crop |
| Portrait cutout | made on-device with macOS Vision subject lifting → `content-source/photo/fahad-cutout.png` | same, background removed (edges checked at 2×, 1 px fringe trimmed in pipeline) | 768 × 1024, alpha | ✓ | Home cover figure, identity cards (on a warm disc), contact, OG images |
| Logo mark | `public/brand/logo-mark.svg` (drawn for v2) | "FA" ligature: white F/A on a warm-dark disc, coral bar (business), aqua location dot (planning) | vector | ✓ | Favicon, apple-touch icon, top-left home link, OG images |

## Environment (backdrop) photos — decided at the checkpoint

| Option | Source | Depicts | Licence | Notes |
| --- | --- | --- | --- | --- |
| A | Unsplash `LbRCic9i5JY` by Arooba Arif | Wazir Khan Mosque seen through a brick archway, Walled City of Lahore | Unsplash License (free, credit given in footer) | Inside the Delhi Gate precinct of Fahad's regeneration research |
| B | Unsplash `6cwVNcY63kY` by Muhammad Taha Khan | Lahore Fort corridor with jali screens and warm light | Unsplash License | Calmest; closest to the reference's architectural interior |
| C | `CS/Projects/Industrial Estate Design (CAD).pdf` p1 | AI-assisted aerial render of the Allama Iqbal Industrial Estate | own work (group project) | ~1,785 px wide at best; AI render |

## Planning portfolio (9 projects)

| Project | Source file | Pages used in sheet | Tile | Notes |
| --- | --- | --- | --- | --- |
| FA Avenue 1 | `CS/Projects/Housing Scheme Design 3000 Acres (CAD).pdf` | p1 | crop of zoning plan + CBD | Title block (bottom-left) redacted |
| Allama Iqbal Industrial Estate | `CS/Projects/Industrial Estate Design (CAD).pdf` | p2 perspectives, p3 zoning plan, p4 site plan | aerial render from p1 (no text) | p1 cover lists roll numbers → only the render area is used |
| Mixed-Use TOD, Hanjarwal | `CS/Projects/Urban Design TOD Site (CAD + 2D).pdf` | p1, p2 | 3D render grid of p1 | right-hand title block cropped |
| Fasan Villas | `CS/Projects/Planned Town 300 Kanals.pdf` | p1 | layout plan | title block cropped |
| Orange Line land use | `CS/Projects/ArcMap (GIS)/GIS Map.pdf` | p1 | station buffers | — |
| Delhi Gate regeneration | `CS/Projects/ArcMap (GIS)/GIS Maps.pdf` | p1 (as v1) | parcel map | — |
| Heritage buffer map | `CS/Projects/ArcMap (GIS)/Buffer Map GIS.pdf` | p1 | buffers | — |
| 44′ × 39′ residence | `CS/Projects/44 x 39 (~1800 sq. ft) … .pdf` | p1 (as v1) + further sheets | layout drawings | filename's "~1800" is not shown (site says 1,716 sq ft) |
| Residential series | `CS/Projects/10 Marla Complete Designed.pdf`, `CS/Projects/CAD/*.pdf` | 10 marla complete, 1 kanal, 2 kanal, 10 marla, 5 marla (as v1) | 10 marla complete | title blocks cropped |

Fallback for every project: the v1 WebP in `V1/projects/` (1200 px), used if a PDF fails to render.

## Research (7 reports)

Rows only; the sheet shows one figure where a map exists. **Cover pages are not shown** (they list roll numbers).

| Report | Figure in sheet | Source |
| --- | --- | --- |
| Orange Line TOD | Land-use map of station buffers | `CS/Projects/ArcMap (GIS)/GIS Map.pdf` p1 |
| Delhi Gate | Proposed regeneration map | `CS/Projects/ArcMap (GIS)/GIS Maps.pdf` p1 |
| Heritage strategies | Buffer map | `CS/Projects/ArcMap (GIS)/Buffer Map GIS.pdf` p1 |
| Cycle track, Model Town | Map of Model Town (report p1) | `CS/Research Work/Transportation Engineering/Cycle track report.pdf` p1 |
| Ecological footprint, EP&M/ICI, Earthquake | none (text only) | — |

## Certificates (planning 8, business 3)

| Item | Source | Public preview |
| --- | --- | --- |
| Best Effort Award (Winter School) | `CS/Certifications/Winter School Certificate.pdf` | ✓ |
| IPP Certificate of Appreciation | `CS/Certifications/IPP Certificate Fahad.png` (2160 × 3046) | ✓ |
| Winter School participation | `CS/Certifications/Winter School PArticipation.jpg` (781 × 1280) | ✓ |
| LDA completion letter | `CS/Certifications/LDA Internship Certificate.pdf` (scan) | ✓ — as on the live site; the registration line is redacted in v2 |
| ITDBM certificate | `CS/Certifications/ITDBM Certificate.png` (3544 × 2500) | ✓ |
| The Spatio letter | `CS/Certifications/Spatio Certificate.pdf` | ✗ national ID — icon + issuer only |
| The Union Associates certificate | `CS/Certifications/Union Associates Internship Certificate.HEIC` | ✗ national ID — icon + issuer only |
| Al-Akbari letter | `CS/Certifications/Akbari Builders Internship Certificate.pdf` | ✗ national ID — icon + issuer only |
| Employee of the Month, Rising Star, Incentives | no files | issuer badge only |

## Not used

| File | Why |
| --- | --- |
| `CS/Certifications/Winter School Cash Receiving.HEIC` | group photo with other people; not on the current site |
| `CS/Fahad Ali Resume TP Sep 2026.pdf`, `CS/Fahad Ali BDE Resume Sept. 2025.pdf` | contain a neighbourhood and superseded figures; résumé downloads use Drive links only |
| `CS/MY BDE Portfolio.pdf` | names clients; used only as the source of the monthly figures |
| `CS/Planned Town.pdf` | duplicate of the Fasan Villas sheet set |
| `CS/Research Work/Transportation Engineering/Project Analysis (2).pptx` | slide deck, not on the current site |
