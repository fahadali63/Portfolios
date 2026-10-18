# Portfolio Website v2 — Claude Code Build Prompt (RCTO)

> **Before you paste this into Claude Code**
> 1. Create an empty project folder and open Claude Code in it.
> 2. Put the four design reference images in `reference/` as `01-cover.png`, `02-feed.png`, `03-dashboard.png`, `04-search.png` (the kit zip already has them named this way).
> 3. Put new or full-resolution files (photo, drawings, certificates, résumés) in `content-source/`. Claude Code can't open Google Drive or LinkedIn itself — download what you want used.
> 4. If you still have the source code of the current site (fahadalicv.netlify.app), copy it into `previous-site/`. This is optional but gives the most exact content.
> 5. Check **C6 → Decisions**, change anything you already know, then paste everything below the line.

---

## R — ROLE

You are a senior product designer and senior frontend engineer working as one person. You rebuild an existing portfolio with a new visual language while keeping every fact intact.

- **Platform honesty.** You design to Apple's Human Interface Guidelines principles — Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight — translated to the web. Accessibility failures are bugs, not style choices.
- **Faithful to the reference, functional underneath.** The reference is a spatial, visionOS-style interface: frosted glass windows floating over a real architectural photograph. You reproduce that look precisely, and you give every element a real job. Nothing is decorative mimicry — no fake browser buttons, no fake likes, no charts without data.
- **Fact discipline.** The current website is the source of truth for content. You never invent, round up, or "improve" a fact. You stop and ask only when a decision changes how I'm positioned professionally; small design and engineering calls are yours.

**Skill priority:** If the `apple-design` skill is available, load it in Phase 2 (design system) and Phase 6 (review). Where it disagrees with any other design skill (e.g. `frontend-design`), `apple-design` wins. If the `dataviz` skill is available, load it before building the results chart. If neither is installed, apply the rules written into this prompt — they were distilled from them.

---

## C — CONTEXT

### C1. Who this site is for

**Fahad Ali** — Lahore, Pakistan. Tagline (from the current site, keep it): **"Spatial thinking. Commercial instinct."**

Two careers running in parallel:

1. **Urban planning & GIS** — B.Sc. City & Regional Planning, UET Lahore (2023–2027, expected). GIS team lead on Punjab's Suthra Punjab programme; cadastral digitization of 13 districts for PULSE; internships at the Lahore Development Authority, The Union Associates (NESPAK district master plan) and Al-Akbari Builders. Studio work up to a 2,828-acre master plan; seven academic research reports.
2. **Business development** — currently Sales & Marketing Specialist at Innotec Engineering Services (since Sep 2026). Before that, Business Development Associate → Specialist at Ideas Animation Studio (Mar 2025 – Jun 2026): 100+ projects closed, best month 138% of target, enterprise wins up to $9,500.

Audience: planning firms and development authorities, international universities and scholarship panels, agencies and clients hiring for business development, recruiters.

The site must answer within ~5 seconds: who he is, the two things he does, proof of each, and how to reach him.

### C2. Sources and their order of authority

1. **The current website — https://fahadalicv.netlify.app — is the primary source for all content.** It was built from the résumés and then corrected against completion letters and the sales portfolio, so where it differs from the résumés or LinkedIn, **the website wins**. Reuse its copy (headlines, intros, descriptions, credits) verbatim unless a section no longer exists in the new layout.
   - If `previous-site/` exists, read its content/data files directly — that's the most exact source.
   - Otherwise extract from the live site with Playwright: every route (`/`, `/urban-planning`, `/business-development`, `/contact`), every anchor section, and **every dialog** (each "View project", "Read summary", "View certificate", "View letter" button opens a dialog with extra fields: contribution, location, year, key facts, credit, tools & tags). Save the full extraction to `docs/previous-site-extract.md`.
   - Download its images from `/images/projects/*.webp` and `/images/certificates/*.webp` (these are my own files) into `content-source/previous-site-assets/`.
2. **`content-source/`** — new or higher-resolution files I add (photo, drawing PDFs, certificates, résumés). Use them for assets and for anything the website doesn't cover. If a file here contradicts the website, flag it.
3. **Résumés and LinkedIn** — cross-check only. They are older than the website (LinkedIn misses the Team Lead and Innotec roles).

Google Drive and LinkedIn refuse automated access. Never try to scrape them; ask me for missing files.

### C3. Privacy boundary — non-negotiable

- My Drive also holds identity documents, family members' IDs, a passport, land records, transcripts, medical reports and bills. **Never** link to the root Drive folder (`1gDR2MGFBEFy6dn87cuJ2R1esL-1oUXn_`) or any folder that isn't purely portfolio material. Link individual files only, and only ones I list.
- Keep the current site's rule: **completion letters that show my national ID number are listed without a public preview** (The Spatio, The Union Associates, Al-Akbari). Never display or link those scans.
- City and country only — no street or neighborhood.
- Strip roll numbers and internal codes from any displayed title (e.g. `2023-CRP-21`).
- Client names in business development stay withheld, as on the current site.
- `content-source/` and `previous-site/` stay out of version control (`.gitignore`).

### C4. Content snapshot of the current site (read 17 Oct 2026) — re-verify against your extraction

**Positioning:** Town Planner & GIS Specialist · Business Development. Intro states he's a City & Regional Planning student at UET Lahore. Availability line: *Open to planning, GIS and business development roles.*

**Experience**

| Track | Role | Organisation | Dates | Notes on site |
| --- | --- | --- | --- | --- |
| Business | Sales & Marketing Specialist | Innotec Engineering Services, Lahore | Sep 2026 – present | Current role |
| Business | Business Development Specialist | Ideas Animation Studio, Johar Town, Lahore | Jun 2025 – Jun 2026 | Promoted from Associate |
| Business | Business Development Associate | Ideas Animation Studio | Mar 2025 – Jun 2025 | |
| Planning | GIS Team Lead | The Spatio — Engineering & Geo-Spatial Consultants | Mar 2026 – May 2026 | Suthra Punjab project |
| Planning | GIS Specialist | The Spatio | Jun 2025 – Nov 2025 | PULSE, 13 districts; completed as a 6-month internship per completion letter (21 Nov 2025) |
| Planning | Intern — Town Planning Wing, Zone-IV | Lahore Development Authority | Jul 2024 – Sep 2024 | Six weeks, 15 Jul – 1 Sep 2024, per letter issued 15 Apr 2025 |
| Planning | Planning Intern | The Union Associates | Jun 2024 – Jul 2024 | District Master Plan project by NESPAK |
| Planning | 2D & 3D Designer (Intern) | Al-Akbari Houses Builders & Developers, Gulberg | Jun 2024 – Jul 2024 | 21 Jun – 31 Jul 2024 per letter (27 Jul 2024) |
| Business | Freelance Designer & WordPress Developer | Spider Marketing, Burewala | Jan 2023 – Jan 2024 | |

**Education:** B.Sc. City & Regional Planning, UET Lahore, 2023 – 2027 (expected). **Languages:** English (fluent), Urdu (native), Punjabi (native).

**Metrics (site, with sources it states):** 13 districts digitized (PULSE) · 2,828-acre master plan (FA Avenue 1) · 100+ projects closed (Ideas Animation) · 138% best month vs target — $11,055 against $8,000 · 100% meeting conversion in Oct 2025 (7–8 calls) · 80%+ overall meeting conversion · monthly target attainment Jul–Dec 2025: 87%, 48%, 123%, 56%, 138%, 119% (sales portfolio).

**Selected engagements (client names withheld):** global consumer-health enterprise $9,500 (flat fee) · international IT certification body $9,000 (over two months) · direct client, Enneagram series $5,000 · Fiverr client ≈ $5,000.

**Planning portfolio (9):** FA Avenue 1 — Integrated Urban Development Master Plan (2,828 ac, Ferozepur Road, 2026) · Allama Iqbal Industrial Estate, Kasur (870 ac, 2026) · Mixed-Use TOD near Hanjarwal Station (12 ac, 2026) · Fasan Villas — 300-Kanal Housing Scheme (37.5 ac) · Land-Use Classification — Orange Line Metro Stations · Proposed Regeneration Map — Delhi Gate · Heritage Sites Buffer Map · 44′ × 39′ Residence — Implemented Drawing Set (1,716 sq ft) · Residential House Designs — 5 Marla to 2 Kanal. Filters on site: Master Planning, Industrial Planning, Urban Design, Housing Scheme, GIS & Mapping, Architectural CAD. Group projects carry a credit line (course and supervising faculty) — keep it.

**Research (7):** Socio-Economic Patterns and TOD Impact of the Orange Line Metro (30 pp) · Urban Conservation and Regeneration Challenges… Delhi Gate, Lahore (27 pp) · Urban and Heritage Conservation Strategies for Selected Historic Sites in Lahore (23 pp) · Cycle Track Proposal for Model Town, Lahore (8 pp) · Ecological Footprint of Shadbagh (70 pp) · Relation of EP&M with the Industries Department (10 pp, 2024) · Earthquake as an Environmental Problem (15 pp).

**Certificates, letters & awards — planning (8):** Best Effort Award, Winter School Research Questions Competition, TU Dortmund × UET (Nov 2024) · Certificate of Appreciation, International Seminar, Institute of Planners Pakistan (3 Sep 2026) · Winter School — Planning in Germany and Pakistan, TU Dortmund · UET · DAAD (15–24 Nov 2024) · LDA Internship Completion Letter (issued 15 Apr 2025) · The Spatio completion letter (no preview) · The Union Associates certificate (no preview) · Al-Akbari completion letter (no preview) · Information Technology & Database Management, Dept. of Computer Science, UET. Also listed under achievements: Shield Award for Graphic Designing (CRP Dept., UET).
**Recognition — business (3):** Employee of the Month, Ideas Animation Studio (2025) · Rising Star of Ideas (Aug 2025) · Performance-based incentives (2025 – 2026).

**Contact:** mfahadali9463@gmail.com · +92 333 628 1594 · linkedin.com/in/fahad-ali-230854280 · Lahore, Pakistan. The current contact form opens the visitor's email app ("Continue in email") — an honest pattern; keep it unless C6 says otherwise.

### C5. Known differences and defects

**Older sources that the website already corrected — do not reintroduce:** "22 projects in four months", "90–95% meeting-to-client conversion", "2× revenue growth", "3,000-acre housing scheme" (it's FA Avenue 1 at 2,828 acres), "~1,800 sq ft" (it's 1,716), LDA end date "Aug 2024", Ideas Animation "Agency", the alternate phone number on LinkedIn.

**Defects in the current site to fix in v2:**
1. Canonical and Open Graph URLs point to `http://localhost:3000` — must use the real domain.
2. Animated counters render `0` in the HTML until JavaScript runs (crawlers, link previews and no-JS readers see "0+ projects closed"). Final values must be in the server-rendered HTML.
3. The font stack declares "Anthropic Sans" (proprietary, not licensed for other sites; it silently falls back to Inter). Remove it.
4. No photograph anywhere — only an "FA" monogram. v2 uses the real photo.
5. No "full file" links. v2 supports a per-item Drive link, shown only when I've provided one.

**Still open (ask at the checkpoint only if `ASK` in C6):** "Excellence in Creativity" and the Ideas Animation experience letter were in my original brief but aren't on the site; include only if the files are in `content-source/`.

Log every further difference in `docs/conflicts.md` with source and resolution.

### C6. Decisions (edit before pasting; `ASK` = raise at checkpoint)

```yaml
content_source_of_truth: current_website     # do not change unless you mean it
environment_photos: ASK
  # The full-screen photograph behind the glass. Best: your own photos of places tied
  # to your work (Walled City / Delhi Gate, an Orange Line station, a site you surveyed,
  # a render of one of your projects). Fallback: a free-licensed architectural photo
  # credited in the footer. One photo for all pages, or one per page:
  #   home: TODO   urban_planning: TODO   business_development: TODO   contact: TODO
photo: content-source/photo/Fahad Pic Compressod.jpg   # never "Avatar AI.png"
drive_links: per_item_when_provided   # items without a link simply show no "Open full file"
contact_form: mailto                  # mailto (as now) | endpoint (set NEXT_PUBLIC_FORM_ENDPOINT)
site_search: yes                      # search sheet across projects, research, certificates, roles
domain: https://fahadalicv.netlify.app   # change if you add a custom domain
keep_current_urls_and_anchors: yes    # /urban-planning#portfolio etc. keep working
hosting: netlify
```

### C7. Design inputs and their priority

1. **Truth and privacy** (C2–C5).
2. **Accessibility floor** (T3.8).
3. **The reference images** in `reference/` — the primary visual direction. Reproduce their look: the composition, the glass, the type, the radii, the palette, the window arrangement.
4. **`apple-design` / HIG rules** in this prompt — how that look is executed: legibility, glass discipline, color budget, motion, controls, writing.
5. **T3 defaults** fill anything the images don't show.

When the reference and a rule collide, keep the look and fix the numbers (darker glass tint, larger meta text, bigger hit targets). Log each change in `docs/design-reference-analysis.md`.

The reference is a concept shot by another designer ("Vison Pro — Website for Freelancer Growth & Visibility", designer credit Zahra Aslani). Use it as a style reference only: don't copy its photo, avatars, illustrations or text, and don't use Apple names, logos or the words "Vision Pro"/"visionOS" anywhere on the site.

### C8. What changes from the current site, and why

- **Visual language replaced; content and URLs kept.** The dark "graphite + gradient" look becomes the reference's spatial glass over a photograph. Routes, anchors and copy stay so existing links keep working.
- **Glass is the window material** — that's the idiom the reference borrows from Apple's spatial platform, where windows themselves are glass. The HIG rule still applies *inside* windows: **no glass on glass**. Cards, list rows, fields and segments inside a window use flat translucent fills, never another blur.
- **Every reference element gets a real job** — mapped in T4. The fake browser bar becomes a working location bar; the messages list becomes the experience list; the "Pick your lens" idea from the current site becomes the reference's segmented control.
- **The glass is a step deeper than the reference**, and the photo is tone-mapped, so white text passes contrast everywhere. This also keeps my original wish for a dark, premium feel.
- **Coral and teal from the reference become the two career colors**: teal = planning, coral = business.

---

## T — TASK

### T1. Phases

Keep a task list visible.

**Phase 0 — Setup check.** List `reference/`, `content-source/`, `previous-site/`. Report what's missing.

**Phase 1 — Content.** Extract the current site (C2). Produce:
- `docs/previous-site-extract.md` — complete text of every page and dialog.
- `docs/content-inventory.md` — every fact grouped by track, each with its source (site route + section/dialog, or file + page).
- `docs/conflicts.md` — C5 plus anything new.
- `docs/assets.md` — every image/PDF to be shown: source, what it depicts, resolution, whether it's previewable (C3).

**Phase 2 — Direction.** Load `apple-design` if available. Produce:
- `docs/design-reference-analysis.md` — for each reference image: grid and margins, window sizes and gaps, radii, glass treatment (tint, blur, border, highlight, shadow), type (family, weights, sizes, case), icon style, palette sampled as hex, and the element-by-element mapping in T4. Then every rule-driven adjustment with its numbers.
- `docs/design-system.md` — final tokens with contrast ratios computed from hex values, type scale, spacing, components, glass spec, motion spec.
- `docs/ia.md` — routes, windows per route, and ASCII wireframes of Home at 375 px and 1440 px.
- Critique the plan before showing it: is every reference element doing real work? Is anything decorative only? Remove it or give it a job.

**⏸ CHECKPOINT — stop and ask me once.** Present: open items from C6 marked `ASK`, any new conflicts, the environment-photo plan, and the wireframes. Wait for answers. Don't ask about trivial choices.

**Phase 3 — Scaffold.** Project setup, tokens, content schema and data files (T7), media pipeline, base components (Window, NavRail, TabBar, LocationBar, Segmented, ListRow, Tile, StoryTile, Sheet, MetricTile, Chart).

**Phase 4 — Pages.** Home → Urban Planning → Business Development → Contact → Search sheet → 404.

**Phase 5 — Responsive, accessibility and performance pass** (T3.8, T7.6, T7.7).

**Phase 6 — Review and QA** (T8). Fix every Critical and High finding.

**Phase 7 — Handoff** (Output section).

### T2. Information architecture

Same routes and anchors as the current site.

| Route | Sections (anchors) |
| --- | --- |
| `/` | Cover · About · Two profiles · Highlights · Featured work · Recognition · Let's connect |
| `/urban-planning` | `#resume` · `#portfolio` · `#research` · `#certifications` |
| `/business-development` | `#resume` · `#achievements` · `#experience` · `#recognition` |
| `/contact` | Contact methods · Form |
| Search sheet | Opens over any page from the nav rail, `/` key or ⌘K / Ctrl+K |
| `/404` | Short message + links to the main routes |

Details (project, research, certificate, role) open in a **sheet** on the same page, deep-linkable via `?item=<slug>`.

### T3. Design system — derived from the reference

Values below are the starting point. In Phase 2, sample the reference images and adjust within the rules; record final values and contrast numbers.

#### T3.1 Concept and signature

- **The space:** one full-screen photograph of a real place, fixed behind everything (`position: fixed`, `object-fit: cover`). Frosted glass windows float above it in a calm grid, with a floating navigation rail at the left and a location bar at the top — exactly the arrangement in `03-dashboard.png`.
- **Signature element:** the environment itself — a place tied to Fahad's work, seen through warm glass. Nothing else competes with it: no gradients, no glows, no extra illustration.
- **Not copied:** perspective-tilted windows from `01-cover.png` (keep windows flat — tilt hurts legibility), fake browser controls, social actions (likes, comments, follow), decorative charts, avatar galleries of people.

#### T3.2 Environment photo

- Process every environment photo in `npm run media`:
  - Resize: 2400 px wide (desktop), 1080 px (mobile); AVIF + WebP; target ≤ 300 KB desktop, ≤ 120 KB mobile.
  - **Tone-map so no pixel is brighter than `#C8C1B8`** (compress highlights; keep the warm, airy look).
  - Bake in a warm scrim: `rgba(20,16,12,0.30)`.
  - Also export a **pre-blurred** version (blur ≈ 40 px, same scrim) for mobile and reduced-transparency use.
- Home cover gets an extra left-side scrim behind the large name: `linear-gradient(90deg, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0) 60%)`.
- Preload the environment image (it's the LCP element); `fetchpriority="high"`.
- If a page's photo is missing, fall back to the Home photo; never ship a blank background.

#### T3.3 Glass, fills and color tokens

All contrast figures computed against the **worst case** — glass over the brightest allowed photo pixel.

| Token | Value | Role | Contrast |
| --- | --- | --- | --- |
| `--glass-fill` | `rgba(59,53,48,0.55)` (`#3B3530` @ 55%) | window and bar material | worst-case surface ≈ `#625C56` |
| `--glass-blur` | `blur(40px) saturate(1.3)` | backdrop filter (desktop) | — |
| `--glass-border` | `1px solid rgba(255,255,255,0.22)` | window edge | — |
| `--glass-highlight` | `inset 0 1px 0 rgba(255,255,255,0.18)` | top edge light | — |
| `--glass-shadow` | `0 24px 60px rgba(0,0,0,0.25)` | float | — |
| `--glass-opaque` | `#3A342F` | fallback (reduced transparency, increased contrast, no backdrop-filter support) | white 12.3:1 |
| `--fill-raised` | `rgba(255,255,255,0.10)` | selected segment, hovered row, inner cards | — |
| `--fill-inset` | `rgba(0,0,0,0.18)` | segmented track, search field, location field | — |
| `--hairline` | `rgba(255,255,255,0.16)` | dividers, tile borders | — |
| `--text-1` | `#FFFFFF` | primary text | 6.6:1 worst case |
| `--text-2` | `rgba(255,255,255,0.80)` | secondary text — **the floor; no text is fainter than this** | 4.9:1 worst case |
| `--accent-planning` | `#7FDCD2` (aqua, from the reference) | planning marks: rings, dots, chart lines, active indicators | 4.1:1 on glass (non-text ✓) |
| `--accent-business` | `#FF9A6E` (light coral) | business marks on glass | 3.2:1 on glass (non-text ✓) |
| `--accent-business-fill` | `#F2703F` (coral, from the reference) | business button/badge fill | — |
| `--on-accent` | `#1A1613` | text on accent fills | 11.2:1 on aqua · 6.1:1 on coral |
| focus ring | `outline: 2px solid #FFF; box-shadow: 0 0 0 4px rgba(26,22,19,0.85)` | visible on glass and on photo | — |

Rules:
- **Accents never carry body text on glass.** Coral as text on glass is 2.3:1 — fails. Use accents for marks and for fills behind `--on-accent` text. White on coral (2.9:1) is never allowed.
- **One color means one thing:** aqua = planning, coral = business, everywhere. Track is never shown by color alone — always a label or icon too.
- Max one or two accent-filled buttons per view.
- **No glass on glass.** Only top-level windows, the nav rail, the location bar, the mobile tab bar and sheets get `backdrop-filter`. Everything inside uses fills.
- `@supports not (backdrop-filter: blur(1px))`, `prefers-reduced-transparency: reduce` and `prefers-contrast: more` → `--glass-opaque`, no blur; under increased contrast also `--glass-border` at 0.40 opacity.
- **Mobile (< 768 px):** no `backdrop-filter`. The page background is the pre-blurred environment and windows use `--glass-fill` as a flat translucent color — the same look at a fraction of the cost.

#### T3.4 Typography

- **Poppins** (open license, Google Fonts; matches the reference), self-hosted via `next/font`, Latin subset, weights **300, 400, 500, 600** only. Fallback: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`.
- Weight 300 only at ≥ 56 px (the cover name, as in `01-cover.png`). HIG: avoid light weights for small text.

| Style | Size | Weight | Use |
| --- | --- | --- | --- |
| Display | `clamp(3rem, 7vw, 6rem)` | 300 | Cover name |
| Title | `clamp(1.75rem, 3vw, 2.25rem)` | 600 | Window headlines ("Spatial thinking. Commercial instinct.") |
| Heading | `1.375rem` | 600 | Card titles, project titles |
| Window label | `0.875rem` | 500, `--text-2` | Small window titles ("Experience", "Highlights") as in the reference |
| Body | `1rem` / line-height 1.6 | 400 | Paragraphs (max 62ch — Poppins is wide) |
| Meta | `0.8125rem` | 400–500, `--text-2` | Dates, locations, page counts |
| Metric | `clamp(2rem, 4vw, 3rem)` | 600 | Numbers ("138%") |

- Nothing below 13 px — the reference's tiny timestamps (~9–10 px at ~55% opacity) fail both size and contrast; they become Meta.
- Must survive 200% zoom without overlap or horizontal scroll.

#### T3.5 Shape, spacing, icons

- Radii (from the reference): windows 28 px (desktop) / 22 px (mobile) · inner cards and tiles 16–18 px · controls, segments, fields, nav rail: full pill · avatars: circle with a 2 px ring.
- 8-point spacing: 4, 8, 12, 16, 20, 24, 32, 48, 64. Window padding 24 px (desktop) / 16 px (mobile). Window gap 20 px.
- Content max width 1320 px between the nav rail and the right edge.
- Icons: Lucide, stroke 1.75, 20–22 px, white — matches the reference's outline icons. Icons only where they label an action, a place (map-pin) or a track.

#### T3.6 Motion

- **One orchestrated moment:** on first load of a route, windows settle into place — opacity 0→1, translateY 12 px→0, scale 0.98→1, 60 ms stagger, ≤ 450 ms total.
- Segmented-control thumb and nav-rail active indicator slide (150–200 ms).
- Hover: row/tile gets `--fill-raised`; windows themselves never move on hover.
- Counters: none. Numbers are rendered final in HTML (fixes C5 #2).
- `prefers-reduced-motion: reduce` → no settle-in, instant state changes.
- No parallax on the environment, no scroll-jacking, no page-transition animations beyond a ≤ 200 ms fade.

#### T3.7 Imagery

- **Portrait:** the real photo, circular with a 2 px white ring (as the reference's profile card) in the identity card; larger rounded-rectangle crop (4:5) on the Home cover at desktop only if it doesn't crowd the name. Light grading to sit in the warm palette; no background removal unless edges stay clean at 2× zoom; no AI stylization. Used at most twice per page.
- **Drawings:** project tiles show the most legible part of the sheet (crop the drawing, not the title block). In the sheet, show full pages on a light mat inside the glass window so line work stays readable.
- **Certificates:** whole document on a light mat. Items marked "no preview" show a document icon and the issuer instead of an image.
- **Organisations** (LDA, The Spatio, The Union Associates, Al-Akbari, Ideas Animation, Innotec): circular monogram badges in place of the reference's avatars. Use real logos only if I supply them.

#### T3.8 Accessibility floor

- Text contrast ≥ 4.5:1 (≥ 3:1 for ≥ 24 px, or bold ≥ 18.66 px); non-text marks that carry meaning ≥ 3:1. Measure on glass over the brightest part of each environment photo, not over the average.
- Touch targets ≥ 44 × 44 px; ≥ 8 px between adjacent targets. Nav rail buttons 48 px.
- Icon-only buttons have `aria-label` and a visible tooltip on hover **and** keyboard focus.
- Visible focus ring everywhere (token above); logical tab order; skip link; one `h1` per page; no skipped heading levels.
- Segmented controls use `role="tablist"`/`tab` or radio semantics with arrow-key support.
- Sheets: focus trap, Escape closes, visible close button, focus returns to the trigger, swipe-down on touch, background inert.
- Alt text describes what the drawing shows ("Master plan of FA Avenue 1 with zoning colors and CBD layout").
- Nothing conveyed by color or motion alone.

### T4. Page specifications — reference element → real function

#### Global chrome

| Reference element | Becomes | Behavior |
| --- | --- | --- |
| Vertical pill nav (left) | **Nav rail** — Home · Urban Planning (map icon) · Business Development (briefcase) · Search · Contact (message-circle), separator, LinkedIn (external) | Fixed, vertically centered, floats over window edges as in the reference. Active item = filled circle (`--fill-raised` + white ring), `aria-current="page"`. Tooltips with full labels. |
| Browser bar (top) | **Location bar** — an inset pill showing where you are: `Fahad Ali / Urban Planning / Portfolio` (updates with scroll-spy), not editable, map-pin icon instead of a padlock | Right-side actions: **Download résumé** (popover: Planning résumé / Business résumé — Drive links from C6), **Copy link** (copies URL incl. section, shows "Link copied"), **LinkedIn**. **No back/forward/reload buttons** — the real browser already has them. |
| Page label top-left ("Dashboard page") | Route eyebrow — "Urban Planning", "Business Development" — Poppins 300 | The route's real `h1` sits in the main window. |
| Mobile | Rail → **bottom glass tab bar** (5 labeled items, always visible, `env(safe-area-inset-bottom)`). Location bar → compact top bar (section name + Copy link). | |

#### `/` Home

1. **Cover** (`01-cover.png` composition, full viewport): left — eyebrow "Lahore, Pakistan", name in Display 300, tagline "Spatial thinking. Commercial instinct.", positioning line, the site's one-sentence intro, buttons "Explore Urban Planning" (aqua fill) and "Explore Business Development" (glass), text links LinkedIn · Contact. Right — two live windows: the **identity card** and the **experience window** (below). Flat, not tilted.
2. **Identity card** (reference's profile card): photo with ring, "Fahad Ali", "Town Planner & GIS · Business Development", a small status pill "Open to roles" (reference's "Focus mode" pill).
3. **Experience window** (reference's Messages panel): window label "Experience"; segmented control **Planning | Business** (the current site's "Pick your lens"). Rows: organisation monogram (reference avatar), organisation (name line), role (preview line), dates top-right (timestamp position), "Now" badge on the current role (count-badge position). Row opens the role sheet.
4. **Dashboard grid** (`03-dashboard.png` layout) for About, Two profiles and Highlights:
   - Main window: label "About"; headline "Two careers, one way of working."; the site's About text; a **featured project card** in the reference's "Movie web php project" slot — FA Avenue 1 image, title, "Ferozepur Road, Lahore" left, "2,828 acres" right.
   - Results card (reference's "Property / Congrats! 27%" card): big "138%", sentence "Best month vs. target — $11,055 against an $8,000 target", legend dot in coral. Replace the decorative donut with a small real chart only if it encodes real data (see Business page); otherwise number + sentence only.
   - Right column: "Worked with" (reference's Customers row) — organisation monograms with names; below, **"Selected highlights"** list in the reference's "Your open projects" style — numbered rows with chevrons: 13 districts digitized · 2,828-acre master plan · 100+ projects closed · 138% best month — each opening its source context.
   - Two profiles: two windows side by side, each with track label + color ring, the site's one-paragraph description, its six skill chips, and the track button.
5. **Featured work** (`02-feed.png` "Top Posts" cards): header = category chip + map-pin + location; pill button "View project" where the reference has "Unfollow"; drawing image; footer = key-fact chips instead of like/comment icons. Three projects as on the current site; "Full portfolio" link.
6. **Recognition** (`02-feed.png` stories row): vertical tiles with the certificate thumbnail, circular issuer badge with a track-colored ring, short title below. Horizontally scrollable with visible prev/next buttons; keyboard reachable.
7. **Let's connect** window: availability line, "Get in touch", email, LinkedIn.

#### `/urban-planning`

- Left column (sticky on desktop): identity card, then a **sections window** in the Messages-list style — rows for Resume, Portfolio, Research, Certifications with counts as badges (9 projects, 7 reports, 8 items); the active row follows scroll-spy. On mobile this becomes a horizontal chip bar under the top bar.
- Main window, `#resume`: eyebrow, headline "Planning from the parcel to the province.", intro, education line, tools line; **Planning expertise** — the six numbered areas as inner cards; **Experience** — role entries (date, title, organisation, project, location, bullets, the letter-based note); education, languages, skills chips, software & tools, achievements.
- `#portfolio` (`04-search.png` pattern): window label "Portfolio"; search field "Search projects…" (filters live); filter chips (All + the six categories); **tile grid** with the label over the image as in "Top researches" (title on a bottom scrim inside the tile, category chip top-left). Tile → sheet: gallery of drawing pages, description, Contribution, Location, Year, Key facts, Credit, Tools & tags, "Open full file" (only if a Drive link exists).
- `#research`: numbered list rows with chevrons ("Your open projects" style) — category chip, title, subtitle, page count, year if stated → sheet with the summary and "Open full report" (if linked).
- `#certifications`: stories-style row for awards + grid for certificates and letters; "no preview" items as described in T3.7.
- Closing CTA: "Planning or GIS role in mind?" + contact.

#### `/business-development`

- Left column: identity card + sections window (Resume, Achievements, Experience, Recognition).
- `#resume`: headline "From first message to signed scope.", intro, "Now" card (Innotec) and "Previously" card (Ideas Animation) as two inner cards; "What I own in the sales cycle" — six numbered areas; skill groups as chip clusters; platforms & tools.
- `#achievements`: four metric tiles (100+ · 100% Oct 2025 · 80%+ · 138%) each with its stated source in Meta; **results chart** — monthly attainment Jul–Dec 2025 as bars against a dashed 100% target line (coral marks on glass, white target line, month labels, % labels on bars), with an accessible data table toggle; **Selected engagements** as Top-Posts-style cards (client descriptor as the header, value as a coral-fill pill with `--on-accent` text, description, terms chip).
- `#experience`: role entries in the experience-row style, Innotec first, promotion note shown.
- `#recognition`: stories row — Employee of the Month, Rising Star of Ideas, Performance-based incentives.
- Closing CTA: "Need someone to grow your pipeline?"

#### `/contact`

- Identity window: photo, name, positioning, Lahore, Pakistan, availability pill.
- Contact window in list-row style: Email (copy button → "Copied"), Phone (`tel:`), LinkedIn.
- Form window: Name, Email, Subject, Message as inset fields; behavior per T7.5.

#### Search sheet (`04-search.png`)

- Glass sheet with a large search field ("Search projects, research, certificates…"), results grouped (Projects, Research, Certificates & letters, Experience) as tiles/rows; Enter opens the first result; Escape closes. Index built at build time from the content files; no external service.

### T5. Components and interaction rules

- **Window**: glass material, label slot, optional actions slot. Windows never nest windows.
- **Buttons**: labels say what happens — "View project", "Read summary", "View certificate", "Open full file", "Download résumé", "Send message"/"Continue in email". Sentence case for actions, as on the current site ("View project", "Read summary"), with route names keeping their capitals ("Explore Urban Planning"). Apply it consistently.
- **External links** open in a new tab with `rel="noopener"`, an external-link glyph and "(opens in new tab)" for screen readers.
- **Empty or `TODO` content never renders in production** (T7.3).
- **Loading:** images reserve their aspect ratio; lazy-load below the fold.

### T6. Content rules and voice

- Reuse the current site's copy verbatim, including headlines ("Two careers, one way of working.", "Numbers from the record.", "Plans, places and maps.", "Recognised along the way.", "Let's talk."). Write new copy only for elements the old layout didn't have (window labels, empty states, search hints) — short, plain, in the same voice.
- Keep British spellings as the site uses them (recognised, programme, neighbourhood).
- Every number keeps the qualifier the site gives it (e.g. "per completion letter", "source: sales portfolio").
- Banned phrasing in any new copy: passionate, results-driven, dynamic, leverage, synergy, seamless, cutting-edge, elevate, unlock, journey, delve.
- Missing information → a `TODO:` string in the data file, never a guess.

### T7. Engineering

#### T7.1 Stack

- Next.js (App Router, current stable), **static export** (`output: 'export'`), deployed to Netlify as now.
- TypeScript strict. Tailwind CSS with all tokens as CSS custom properties in `src/styles/tokens.css`.
- Motion (`motion/react`) only for window settle-in, segmented thumb and sheets; CSS for the rest.
- Lucide icons. Zod for content validation. No UI kits, no analytics unless I ask.

#### T7.2 Structure

```
reference/             # 01-cover.png … 04-search.png
content-source/        # my files + previous-site-assets/ — gitignored
previous-site/         # optional old source — gitignored
docs/                  # extract, inventory, conflicts, assets, analysis, design-system, ia, qa-report
scripts/
  extract-previous-site.mjs   # Playwright: pages + dialogs → docs/previous-site-extract.md
  make-media.mjs              # environment tone-map/scrim/blur, PDF → images, HEIC → JPG, WebP/AVIF
  check-content.mjs           # validation, TODO list, Drive-link allowlist, privacy checks
src/
  app/  layout.tsx · page.tsx · not-found.tsx · urban-planning/ · business-development/ · contact/
  components/
    chrome/   NavRail · TabBar · LocationBar · SearchSheet
    ui/       Window · Segmented · ListRow · Tile · StoryTile · Sheet · Chip · MetricTile · Button
    sections/ Cover · IdentityCard · ExperienceWindow · About · Profiles · Highlights · FeaturedWork · Recognition · Connect · …
    charts/   AttainmentChart
  content/
    schema.ts · site.ts · contact.ts · experience.ts · education.ts · skills.ts
    projects.ts · research.ts · certifications.ts · metrics.ts · engagements.ts · environments.ts
  styles/  tokens.css · globals.css · print.css
public/media/          # output of make-media.mjs only
```

#### T7.3 Content model

One object per item; adding a project = adding one object. Every item carries `source` (e.g. `"site:/urban-planning#portfolio dialog"` or `"content-source/…pdf p2"`) and `verified: boolean`.

```ts
type Project = {
  slug: string; title: string; category: 'Master Planning' | 'Industrial Planning' | 'Urban Design' | 'Housing Scheme' | 'GIS & Mapping' | 'Architectural CAD';
  location?: string; year?: string; summary: string; contribution?: string;
  keyFacts: string[]; credit?: string; tools: string[];
  cover: string; pages: string[]; driveUrl?: string; featured?: boolean;
  source: string; verified: boolean;
};
type Certificate = {
  slug: string; title: string; issuer: string; date: string;
  kind: 'award' | 'certificate' | 'letter' | 'recognition'; track: 'planning' | 'business';
  topic: string; image?: string; publicPreview: boolean; driveUrl?: string;
  source: string; verified: boolean;
};
```

Similar shapes for `Role` (track, title, org, project?, location, start, end | 'present', bullets, note?), `Research` (category, title, subtitle?, pages, year?, summary, driveUrl?), `Metric` (value, label, qualifier, source), `Engagement` (descriptor, value, title, how, terms), `Environment` (route, image, credit?).

Build rules:
- Zod validates every file at build; errors name the file and field in plain words.
- Items with `verified: false` or any `TODO:` are excluded from production and listed by `npm run check-content`; in dev they show an "Unverified" badge.
- `check-content` fails if a URL contains the root Drive folder ID or any `/folders/` link, or if an item with `publicPreview: false` has an `image`.

#### T7.4 Media pipeline (`npm run media`)

- Environment photos per T3.2.
- PDFs → page images (pdftoppm or pdf.js); HEIC → JPG; output WebP/AVIF at 800 px (tiles) and 1800 px (sheet pages) into `public/media/`.
- Explicit width/height on every image (static export has no runtime image optimizer — all optimization happens here).
- No Google Drive iframes.

#### T7.5 Contact form

- Default (`contact_form: mailto`): as on the current site — validated fields, then "Continue in email" opens the visitor's email app with the message filled in; the note says so plainly.
- If `NEXT_PUBLIC_FORM_ENDPOINT` is set: POST to it with a honeypot field; clear sending / sent / error states, errors saying what to do next. Never fake success.

#### T7.6 SEO

- Per-route title, description, Open Graph and Twitter metadata from the site's positioning; canonical and OG URLs from `site.ts` domain (fixes C5 #1).
- Static OG images (1200 × 630) per route in the new visual language.
- JSON-LD `Person` (name, jobTitle, alumniOf UET Lahore, worksFor Innotec Engineering Services, address Lahore, sameAs LinkedIn) and `ProfilePage` on profile routes.
- `sitemap.xml`, `robots.txt`. Keep every current URL and anchor working.

#### T7.7 Performance budget

- LCP ≤ 2.5 s on a mid-range phone over 4G; CLS < 0.1; INP < 200 ms.
- Home JS ≤ 120 KB gzipped. Poppins: 4 files max, `font-display: swap`.
- Desktop: at most ~6 blurred surfaces in the viewport; test scroll smoothness. If it janks, fall back to the mobile technique (pre-blurred background + flat fills) at that width.
- Lazy-load below the fold; preload only the environment photo and the portrait.

### T8. QA

Record results in `docs/qa-report.md`.

1. **Content audit:** every name, title, organisation, date, number and URL on the new site checked against `docs/previous-site-extract.md`; list each check. Count parity: 9 roles, 9 projects, 7 research reports, 8 planning certificates/letters, 3 business recognitions, 4 engagements, 6 monthly figures.
2. **Privacy audit:** grep the build for the root Drive folder ID, `/folders/`, ID-number letter scans, any second phone number, neighbourhood names, roll numbers.
3. **Legibility audit:** for each environment photo, sample the brightest region under each window type and compute contrast for `--text-1` and `--text-2`; all must pass T3.8.
4. **Reference fidelity:** screenshots of Home, Urban Planning and Business at 1440 px next to `03-dashboard.png`, `02-feed.png`, `04-search.png` — note what matches and every intentional deviation.
5. **Responsive screenshots** (Playwright) at 1440, 1280, 1024, 768, 480, 375 and 320 px for every route, plus an open sheet and the search sheet on mobile. Fix overlaps, cramped spacing, broken rhythm.
6. **Accessibility:** axe-core on every route (zero serious/critical); keyboard-only walkthrough (rail, location bar actions, segmented controls, filters, sheets, search, form); reduced-motion, reduced-transparency and increased-contrast emulation; 200% zoom.
7. **Lighthouse** (if available): Performance ≥ 90 mobile, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
8. **No-JS check:** with JavaScript disabled, all text and final numbers are present.
9. **Design review:** `apple-design` review of the screenshots; fix Critical and High; list Medium/Low left open and why.
10. **Print preview** of both profile pages (light print stylesheet: white background, `#1B1F26` text, no glass, no photo, no nav).

---

## O — OUTPUT

### Deliverables

1. A Next.js project (structure in T7.2) that builds with `npm run build` to a static `out/` folder with no errors and no unverified content.
2. `docs/`: `previous-site-extract.md`, `content-inventory.md`, `conflicts.md` (with my answers), `assets.md`, `design-reference-analysis.md`, `design-system.md`, `ia.md`, `qa-report.md`.
3. `README.md` for a non-developer:
   - Setup: install Node, `npm install`, `npm run dev`.
   - **How to update content** — a short worked example for each file in `src/content/`: add a project, add a certificate (with and without public preview), change the current role, change a metric, change the About text, swap the portrait, swap an environment photo; then `npm run media` and `npm run check-content`.
   - How to change colors (`tokens.css` only) and the glass strength (two tokens).
   - How to switch the contact form from email to an endpoint (one environment variable).
   - Deploying to Netlify (build command, publish directory, `netlify.toml`), and how to add a custom domain and update `site.ts`.
4. A **handoff message** in chat:
   - What was built, in 5–8 lines.
   - Checkpoint decisions and how each difference in `conflicts.md` was resolved.
   - Remaining `TODO`s with file and field.
   - Drive files I need to share as "Anyone with the link can view" (individual files only).
   - QA results, design-review findings left open, and screenshot paths for Home at 1440 and 375 next to the reference.

### Definition of done

- At 1440 px, the Home page is recognizably the reference's world — glass windows over a real place, nav rail, location bar, experience panel with a segmented control — and every element does real work.
- A stranger understands who Fahad is, both careers, and how to reach him within five seconds — on a phone.
- Every fact matches the current site (or a newer file I provided), with nothing private reachable.
- All text passes contrast over the brightest part of every photo; reduced motion, reduced transparency and keyboard use all work.
- I can add a project by editing one object and running two commands.
