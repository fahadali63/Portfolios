# QA report — 18 Oct 2026

Run with `npm run build && npm run qa` against the static export in `out/`.

## Accessibility (axe-core, WCAG 2.1 A/AA)
| Theme | Lens | / | /urban-planning | /business-development | /contact | 404 |
| --- | --- | --- | --- | --- | --- | --- |
| dark | business | 0 | 0 | 0 | 0 | 0 |
| dark | planning | 0 | — | — | — | — |
| light | business | 0 | 0 | 0 | 0 | 0 |
| light | planning | 0 | — | — | — | — |

Fixed during QA: links whose `aria-label` didn't contain their visible text (label-in-name) — links are now named by what they show.

Built in: skip link; one `h1` per page; focus ring visible on glass and on the backdrop; sheets trap focus, close on Escape and swipe-down, return focus, make the background inert; segmented/lens switches are buttons with `aria-pressed`; reduced motion removes all animation; reduced transparency and increased contrast make glass opaque.

## No-JavaScript
All text and final numbers present on every route (counters removed; sheets open via `#item-<slug>` without JS).

## Privacy
`check-content --out`: no root Drive folder, no other folder links, no second phone number, no roll numbers, no neighbourhood, no national ID numbers in `src/`, `public/` or `out/`. Drawing sheets: title blocks cropped; roll numbers (FA Avenue 1, Fasan Villas), the LDA registration and reference numbers, and the phone number on the 1- and 2-kanal sheets painted out. ID-bearing letters (The Spatio, The Union Associates, Al-Akbari) are never rendered; their cards are generated seal art.

## Layout
Playwright screenshots in `qa/screenshots/` (1440 and 375 px, dark/light, both lenses). Horizontal overflow check at 375 px: 0 px on all routes (the earlier overflow is fixed).

## Performance notes
Backdrop: 97–149 KB (AVIF/WebP, desktop), ~15 KB on phones. Thumbnails 14–60 KB each, lazy-loaded. Portrait 28–46 KB. No client animation library; fonts self-hosted (4 weights).

## Not run here
Lighthouse (not installed in this environment) and a manual screen-reader pass. Recommended before launch.
