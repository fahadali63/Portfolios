# Design system

> **Revision 18 Oct 2026:** two appearances (dark/light, tokens in `tokens.css`), a generated map backdrop instead of a photo, the Home lens, "ink card" thumbnails (`npm run thumbs`) in the same language for every item, the logo is the "fa." tile, and the footer is a sign-off window. Values below that conflict with `tokens.css` are superseded by it; contrast is re-verified by `npm run qa` (axe, both themes).

All tokens live in `src/styles/tokens.css` as CSS custom properties. Tailwind reads them through `@theme`. Change colours there and nowhere else.

## 1. Concept

One full-screen photograph of a real Lahore place, fixed behind everything. Frosted windows float over it in a calm grid, with a navigation rail at the left and a location bar at the top. The person — Fahad's own portrait, cut out — stands in that space on the Home cover. Nothing else competes: no gradients, glows or illustrations.

**Signature:** the place itself, seen through warm glass.

## 2. Colour tokens

| Token | Value | Role |
| --- | --- | --- |
| `--glass-fill` | `rgba(59,53,48,0.64)` | window, rail, bars, sheets |
| `--glass-blur` | `blur(40px) saturate(1.3)` | backdrop filter (≥ 768 px only) |
| `--glass-border` | `rgba(255,255,255,0.22)` (0.40 under increased contrast) | window edge |
| `--glass-highlight` | `inset 0 1px 0 rgba(255,255,255,0.18)` | top edge light |
| `--glass-shadow` | `0 24px 60px rgba(0,0,0,0.25)` | float |
| `--glass-opaque` | `#3A342F` | fallback: reduced transparency, increased contrast, no `backdrop-filter` |
| `--fill-raised` | `rgba(255,255,255,0.06)` | inner cards, selected segment, hovered row |
| `--fill-hover` | `rgba(255,255,255,0.10)` | hover on rows/tiles (text-1 only on hover) |
| `--fill-inset` | `rgba(0,0,0,0.18)` | segmented track, fields, location field |
| `--hairline` | `rgba(255,255,255,0.16)` | dividers, tile borders (decorative) |
| `--text-1` | `#FFFFFF` | primary text |
| `--text-2` | `rgba(255,255,255,0.80)` | secondary text — the floor |
| `--accent-planning` | `#7FDCD2` | planning marks and fills |
| `--accent-business` | `#FF9A6E` | business marks on glass |
| `--accent-business-fill` | `#F2703F` | business button / badge fill |
| `--on-accent` | `#1A1613` | text on accent fills |
| `--mat` | `#F4F1EC` | light mat behind drawings and certificates |
| focus | `outline: 2px solid #FFF; box-shadow: 0 0 0 4px rgba(26,22,19,.85)` | visible on glass and on photo |

### Worst-case contrast (computed by `node scripts/contrast.mjs`)

Worst case = glass over the brightest pixel the media pipeline allows (`#C8C1B8`, plus the baked 30 % warm scrim).

| Pair | Surface | Ratio | Needs |
| --- | --- | --- | --- |
| Brightest photo pixel after scrim | `#928C84` | — | |
| Glass surface, worst case | `#5A544E` | — | |
| `--text-1` on glass | | **7.43:1** | 4.5 ✓ |
| `--text-2` on glass | | **5.47:1** | 4.5 ✓ |
| `--text-1` on `--fill-raised` inside glass | `#645F59` | **6.35:1** | 4.5 ✓ |
| `--text-2` on `--fill-raised` inside glass | | **4.77:1** | 4.5 ✓ |
| `--text-1` on `--fill-inset` | `#4A4540` | **9.46:1** | ✓ |
| `--text-2` on `--fill-inset` | | **6.76:1** | ✓ |
| `--text-1` on `--glass-opaque` | `#3A342F` | **12.27:1** | ✓ |
| `--text-2` on `--glass-opaque` | | **8.49:1** | ✓ |
| `--accent-planning` mark on glass | | **4.62:1** | 3 ✓ |
| `--accent-business` mark on glass | | **3.57:1** | 3 ✓ |
| `--accent-business` mark on `--fill-raised` | | **3.05:1** | 3 ✓ |
| `--on-accent` on aqua `#7FDCD2` | | **11.19:1** | ✓ |
| `--on-accent` on coral `#F2703F` | | **6.13:1** | ✓ |
| White on coral `#F2703F` | | 2.93:1 | **never used** |
| Coral `#F2703F` as text on glass | | 2.54:1 | **never used** |
| Focus ring white on `#1A1613` halo | | 17.98:1 | ✓ |

Text directly on the photo (route eyebrow, cover text) sits on an extra scrim: top band `rgba(20,16,12,.45)`, cover band `linear-gradient(90deg, rgba(20,16,12,.62), rgba(20,16,12,.5) 640px, transparent 900px)` on desktop and a uniform `rgba(20,16,12,.45)` on mobile. The QA legibility audit samples the real processed photos under each of these.

### Rules

- Accents never carry body text on glass. Accent fills always carry `--on-accent` text.
- One colour, one meaning: aqua = planning, coral = business. Track is always also named (label or icon).
- At most two accent-filled buttons per view.
- **No glass on glass.** `backdrop-filter` only on: windows, rail, location bar, tab bar, sheets, popovers.
- Under `prefers-reduced-transparency`, `prefers-contrast: more`, or no `backdrop-filter` support → `--glass-opaque`, no blur; under increased contrast the border goes to 0.40.
- Below 768 px: no `backdrop-filter`. The page uses the pre-blurred photo and windows use `--glass-fill` as a flat colour.

## 3. Typography

Poppins via `next/font/google` (self-hosted at build), Latin, weights 300/400/500/600, `display: swap`. Fallback `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`.

| Style | Size | Weight / leading | Use |
| --- | --- | --- | --- |
| Display | `clamp(3rem, 7vw, 6rem)` | 300 / 1.0, tracking −0.02em | Cover name only (≥ 56 px at desktop; 48 px on phones → 400) |
| Title | `clamp(1.75rem, 3vw, 2.25rem)` | 600 / 1.15 | Window headlines (h1/h2) |
| Heading | `1.375rem` | 600 / 1.25 | Card, project, role titles |
| Subhead | `1.0625rem` | 500 / 1.4 | Row names, sheet subtitles |
| Body | `1rem` | 400 / 1.6, max 62ch | Paragraphs |
| Window label | `0.875rem` | 500, `--text-2` | "Experience", "Highlights" |
| Meta | `0.8125rem` | 400–500, `--text-2` | Dates, locations, page counts |
| Metric | `clamp(2rem, 4vw, 3rem)` | 600 / 1, tabular | Numbers |

Nothing below 13 px. Text survives 200 % zoom: all sizes in `rem`, no fixed heights on text containers.

## 4. Shape and spacing

- Radii: windows 28 (desktop) / 22 (mobile) · cards 18 · tiles 16 · pills full · avatars circle + 2 px ring.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48, 64. Window padding 24 / 16. Window gap 20.
- Content max width 1320 px between the rail and the right edge.
- Icons: Lucide, stroke 1.75, 20–22 px, white. Only for actions, places (map-pin) and tracks (map = planning, briefcase = business).

## 5. Components

| Component | Material | Notes |
| --- | --- | --- |
| `Window` | glass | label slot + actions slot; never nests another `Window` |
| `NavRail` | glass | 72 px wide pill; 48 px circular items; active = `--fill-raised` + 2 px white ring; tooltips on hover and focus |
| `TabBar` (< 768) | flat glass | 5 labelled items, safe-area padding |
| `LocationBar` | glass | inset pill field with breadcrumb; actions: Download résumé (popover), Copy link, LinkedIn |
| `Segmented` | inset track + raised thumb | `role="tablist"`; arrow keys; thumb slides 180 ms |
| `ListRow` | none / hover fill | ≥ 56 px tall; badge, title, subtitle, meta, trailing chevron or badge |
| `Tile` | image + bottom scrim | label on scrim `rgba(20,16,12,.72)`; category chip top-left |
| `StoryTile` | image on mat | issuer badge with track ring; title below |
| `Sheet` | glass (opaque on mobile) | focus trap, Escape, close button, swipe-down on touch, background `inert`, deep-link `?item=` |
| `MetricTile` | `--fill-raised` | number, label, qualifier in Meta |
| `Chip` | `--fill-inset` | category, key facts, skills |
| `Button` | primary accent fill (≤ 2 per view) / glass secondary | 44 px tall min |
| `AttainmentChart` | inside window | bars vs dashed 100 % line; table toggle |

## 6. Glass spec (CSS)

```css
.glass {
  background: var(--glass-fill);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-highlight), var(--glass-shadow);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
}
@media (max-width: 767px) { .glass { backdrop-filter: none; -webkit-backdrop-filter: none; } }
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .glass { background: var(--glass-opaque); backdrop-filter: none; -webkit-backdrop-filter: none; }
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: var(--glass-opaque); }
}
```

## 7. Motion

| Moment | Spec |
| --- | --- |
| Route settle-in (once per route load) | windows: opacity 0→1, translateY 12→0, scale .98→1; 60 ms stagger; ≤ 450 ms total; CSS only, content visible without JS |
| Segmented thumb, rail indicator | slide 180 ms, `cubic-bezier(.2,.8,.2,1)` |
| Hover | row/tile → `--fill-hover`; windows never move |
| Sheets | fade + 16 px rise, 220 ms; reduced motion → fade only |
| Counters | none — final numbers in HTML |
| `prefers-reduced-motion: reduce` | no settle-in, instant state changes |

No parallax, no scroll-jacking, no page transitions beyond a ≤ 200 ms fade.

## 8. Logo

`public/brand/logo-mark.svg`: an "FA" ligature — the F's top bar runs into the A's apex — in white on a warm-dark disc. The F's middle bar is coral (business) and a single aqua dot sits in the A's counter like a location pin (planning). Works from 16 px (favicon) up. Shown once per page (top-left home link) plus favicon and share images; never repeated in content.
