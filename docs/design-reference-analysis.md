# Design reference analysis

Reference: four frames of a concept shot by another designer (designer credit: Zahra Aslani). Used as a **style reference only** — no photo, avatar, illustration or text from it is reused, and no platform trademarks appear on the site.

Measurements were taken on `03-dashboard.png` (1905 × 1072) and scaled to a 1440 px viewport (× 0.756). Colours were sampled as 7 × 7 px averages (`docs/` sampling script in the build log).

## 1. Composition — what each frame contributes

| Frame | What it shows | What v2 takes |
| --- | --- | --- |
| `01-cover.png` | Huge light-weight title at left over a warm interior photo; windows peek in from the right edge | Home cover: eyebrow, name in Display 300, tagline at left; a left-side scrim; content anchored on the right |
| `02-feed.png` | Stories row of tall rounded tiles with circular badges; two "Top Posts" cards with header (avatar, name, location pin, pill button), image, footer icons | Recognition row (certificate tiles + issuer badge); Featured-work cards (category chip + pin + location, "View project" pill, drawing, key-fact chips) |
| `03-dashboard.png` | Location bar; left column (profile card, Messages with segmented control); big main window with headline, featured card, results card; right column (avatars, focus pill + chart, numbered "open projects" list); vertical pill rail | The whole Home dashboard grid and every page's chrome |
| `04-search.png` | Search window: large inset field, "Top researches" image tiles with the label centred on the image | Portfolio tile grid (label on a bottom scrim inside the tile) and the search sheet |

## 2. Grid, sizes and gaps (at 1440 px)

| Element | Reference (1905) | Scaled to 1440 | v2 value |
| --- | --- | --- | --- |
| Rail | 94 × 497, x = 202 | 71 × 376 | 72 wide, height = content (6 × 48 + gaps), left 24 |
| Location bar | 1373 × 68, top 110 | 1038 × 51 | height 56, pill |
| Left column | 330 wide | 249 | 300 (room for 13 px meta text) |
| Main window | 1020 wide | 771 | fluid (1fr) |
| Right column (inside main window) | 311 wide | 235 | 280, as its own window (see deviation D4) |
| Gaps between windows | 25–27 | 19–20 | **20** |
| Window inner padding | 22–24 | 17–18 | **24** desktop, 16 mobile |
| Page label | 30 px light, top-left | 23 px | route eyebrow 22 px / 400 |

Content max width: 1320 between rail and right edge.

## 3. Radii

| Element | Reference | v2 |
| --- | --- | --- |
| Windows | ≈ 30 px | 28 desktop / 22 mobile |
| Inner cards, tiles | ≈ 20 px | 18 cards / 16 tiles |
| Location bar, rail, segments, fields, pills | full | full |
| Avatars | circle, 2 px light ring | circle, 2 px white ring |

## 4. Glass treatment

| Property | Reference | v2 |
| --- | --- | --- |
| Tint | light warm grey, sampled `#A9A39D` (main window), `#938C81` (messages) | `rgba(59,53,48,0.64)` — a step deeper (see §7) |
| Blur | heavy, ≈ 40 px; background shapes unreadable | `blur(40px) saturate(1.3)` |
| Border | faint light edge | `1px solid rgba(255,255,255,0.22)` |
| Highlight | brighter top edge | `inset 0 1px 0 rgba(255,255,255,0.18)` |
| Shadow | soft, low contrast | `0 24px 60px rgba(0,0,0,0.25)` |
| Inner surfaces | lighter translucent fills (no second blur) | `--fill-raised` 6 % white, `--fill-inset` 18 % black |

## 5. Type

Family: geometric sans — matches **Poppins** (open licence). Light weight only for the giant cover title.

| Role in reference | Reference size (1905) | v2 |
| --- | --- | --- |
| Cover title | ≈ 96 px / 300 | Display `clamp(3rem, 7vw, 6rem)` / 300 |
| Page label | 30 px / 300 | 22 px / 400 (300 below 56 px is avoided) |
| Window headline ("You have work to do!") | 26 px / 700 | Title `clamp(1.75rem, 3vw, 2.25rem)` / 600 |
| Window label ("Messages") | 16 px / 500 | 14 px / 500, `--text-2` |
| Row name | 15 px / 500 | 15 px / 500 |
| Row preview | 12.5 px / 400 | 13 px / 400, `--text-2` |
| Timestamp | 9–10 px / 400 at ~55 % opacity | 13 px / 500, `--text-2` (Meta) |
| Big number ("27%") | 40 px / 700 | Metric `clamp(2rem, 4vw, 3rem)` / 600 |

Case: sentence case throughout; no all-caps labels.

## 6. Palette (sampled)

| Swatch | Sample | Role in v2 |
| --- | --- | --- |
| Coral (donut segment) | `#F87045` | `--accent-business-fill` `#F2703F`; marks use the lighter `#FF9A6E` |
| Aqua (donut segment) | `#7FE2DC` | `--accent-planning` `#7FDCD2` |
| Selected segment | `#C9C9C5` | `--fill-raised` + white text instead of light fill |
| Rail active circle | `#B4B6B3` | `--fill-raised` + 2 px white ring |
| Photo, darkest wall | `#2B281F` | — |
| Photo, bright floor | `#806B54` | tone-map ceiling `#C8C1B8` in v2 |

Icons: outline, ≈ 1.75 stroke, rounded caps → Lucide at 1.75.

## 7. Element-by-element mapping (every element gets a real job)

| Reference element | v2 element | Its job |
| --- | --- | --- |
| Page label "Dashboard page" | Logo mark + route eyebrow | Says where you are; logo links Home |
| Browser bar with back/forward/reload | **Location bar** | Breadcrumb `Fahad Ali / Urban Planning / Portfolio` from scroll-spy; map-pin instead of padlock. **No back/forward/reload** (the browser has them) |
| Download / extension icons in bar | Download résumé (popover) · Copy link · LinkedIn | Real actions; résumé items appear only when Drive links exist |
| Vertical pill rail | Nav rail: Home · Urban Planning · Business Development · Search · Contact · LinkedIn | Primary navigation; tooltips; `aria-current` |
| Profile card | Identity card | Photo (cutout on a warm disc), name, positioning, "Open to roles" pill |
| "Focus mode" pill | "Open to roles" status pill | Availability |
| Messages window | Experience window | Roles as rows; opens the role sheet |
| General / Primary segmented control | Planning / Business segmented control | Filters the experience list (tabs semantics, arrow keys) |
| Avatar in a row | Organisation monogram badge with track ring | Identifies the organisation; ring colour + track label |
| Timestamp | Dates | Meta size, not 9 px |
| Unread count badge | "Now" badge | Marks the current role |
| "You have work to do!" headline | "Two careers, one way of working." | v1 copy |
| "Movie web php project" card | Featured project card: FA Avenue 1 | Opens the project sheet; location left, "2,828 acres" right |
| "Property / Congrats! 27%" card + donut | Results card: **138%** + sentence | The donut is replaced by a 6-bar mini chart of the real monthly attainment (it encodes real data) |
| Customers avatars | "Worked with" organisation badges | Each opens the matching role |
| Line chart with S–S labels | Removed | It would be decorative — the real chart lives on the Business page |
| "Your open projects" numbered list | "Selected highlights" list | 13 districts · 2,828 acres · 100+ · 138%, each opening its source |
| Stories row | Recognition row | Certificate tiles; issuer badge; prev/next buttons |
| Top Posts card | Featured work card | Category chip, pin + location, "View project" pill, key-fact chips (no likes/comments/share) |
| "Unfollow" pill | "View project" pill | Opens the sheet |
| Search field + Top researches tiles | Portfolio search + tile grid; global search sheet | Live filtering; build-time index |

## 8. Intentional deviations from the reference (rule-driven)

| # | Deviation | Rule | Numbers |
| --- | --- | --- | --- |
| D1 | Glass tint deeper: reference `#A9A39D` under white text ≈ 2.4:1 → v2 `rgba(59,53,48,.64)` | Text contrast ≥ 4.5:1 (T3.8) | white 7.43:1, 80 % white 5.47:1 worst case |
| D2 | Photo tone-mapped (max `#C8C1B8`) and a warm scrim baked in | Legibility over the brightest pixel | brightest pixel after scrim `#928C84` |
| D3 | Timestamps 9–10 px → 13 px Meta at 80 % white | Nothing below 13 px; no text fainter than `--text-2` | — |
| D4 | Right column becomes its own window instead of cards inside the main window | No glass on glass; keeps one blur per window | ≤ 6 blurred surfaces per viewport |
| D5 | Windows are flat, not perspective-tilted as on the cover frame | Tilt hurts legibility | — |
| D6 | Fake browser controls removed | Every element does real work | — |
| D7 | Donut replaced with a real 6-bar attainment chart (or removed) | No charts without data | — |
| D8 | Segment selected state uses a 6 % white fill + white text instead of a light grey pill | Contrast of the selected label | white on `#645F59` 6.35:1 |
| D9 | Hit targets: rail 48 px, rows ≥ 56 px, segments 44 px tall | ≥ 44 × 44 px | — |
| D10 | Inner cards use 6 % white (reference looks ≈ 12 %) | `--text-2` must pass on inner cards | 4.77:1 at 6 %, 4.15:1 at 8 % (fails) |
| D11 | Business accent for marks lightened `#F2703F` → `#FF9A6E` | Non-text marks ≥ 3:1 | 3.57:1 on glass, 3.05:1 on inner fills |
| D12 | The person in the cover is the real portrait (cutout), not an illustration | C7, user request | — |

## 9. Critique of the plan

- **Is every element doing real work?** Yes after D6 and D7. The one candidate for decoration — the reference's weekly line chart — is removed rather than faked.
- **Anything decorative only?** The cover figure is the one non-functional image; it is the portrait, which answers "who is this" in the first five seconds, so it stays. No gradients, glows or illustrations are added.
- **Would this plan fit a different person?** The structure (dashboard of glass) comes from the reference; what makes it Fahad's: a real Lahore place behind the glass, his photo standing in it, two career colours that mean exactly two things, and a "location bar" that literally reads like a map breadcrumb. Kept.
- **Remove one accessory:** the reference shows both a profile card and a cover title on the same screen. v2 drops the name plate on the cover figure (the name is already in Display size) and keeps the identity card for the dashboard row only.
