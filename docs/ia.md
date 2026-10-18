# Information architecture

Same routes and anchors as v1, so every existing link keeps working.

## Routes and windows

| Route | Windows (desktop order) | Anchors |
| --- | --- | --- |
| `/` | Cover (text + portrait figure + 2 proof badges) → Identity card · Experience window (left) │ About window with featured project + results card (centre) │ Worked with · Selected highlights (right) → Two profiles (2 windows) → Featured work → Recognition → Let's connect | `#about`, `#profiles`, `#highlights`, `#featured`, `#recognition`, `#connect` |
| `/urban-planning` | Left (sticky): Identity card · Sections window │ Main: Resume window, Portfolio window, Research window, Certifications window, closing CTA | `#resume`, `#portfolio`, `#research`, `#certifications` |
| `/business-development` | Left (sticky): Identity card · Sections window │ Main: Resume, Achievements (metrics, chart, engagements), Experience, Recognition, closing CTA | `#resume`, `#achievements`, `#experience`, `#recognition` |
| `/contact` | Identity window · Contact methods window · Form window | — |
| Search sheet | Over any page: rail Search button, `/`, ⌘K / Ctrl+K | — |
| `/404` | One window: message + links to the four routes | — |

Details open in a **sheet** on the same page and are deep-linkable: `/urban-planning?item=fa-avenue-1`, `/business-development?item=role-innotec`, etc. Slugs are listed in `src/content/*`.

Each item type opens on a home route: projects, research and planning certificates → `/urban-planning`; engagements and business recognition → `/business-development`; roles → their track's page. The Home page opens the same sheets in place.

## Global chrome

- **Desktop (≥ 1024):** nav rail (left, vertically centred), logo + route eyebrow (top-left, on the photo), location bar (top, sticky).
- **Tablet (768–1023):** rail stays; location bar keeps Copy link + LinkedIn and folds Download résumé into the popover; left column stacks above main.
- **Phone (< 768):** bottom tab bar (Home · Planning · Business · Search · Contact, always labelled), compact top bar (logo, section name, Copy link). Sections window → horizontal chip bar under the top bar.

## Home — 1440 px

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ (FA) Fahad Ali                                                                              │  ← on photo, top scrim
│      ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│      │ ⌖  Fahad Ali / Home                                        [Résumé ▾] [⧉ Copy] [in]│ │  ← location bar
│      └────────────────────────────────────────────────────────────────────────────────────┘ │
│ ╭──╮                                                                                         │
│ │⌂ │  Lahore, Pakistan                                         ╭──────────╮                 │
│ │🗺 │  Fahad Ali                                    (Display)  │  portrait │ ┌──────────────┐ │
│ │💼│  Spatial thinking. Commercial instinct.                    │  cutout   │ │◯ Latest in    │ │
│ │🔍│  Town Planner & GIS Specialist · Business Development      │  standing │ │ planning: GIS │ │
│ │💬│  I'm a City & Regional Planning student at UET Lahore…     │  in the   │ │ Team Lead …   │ │
│ │──│  [Explore Urban Planning] [Explore Business Development]  │  space    │ └──────────────┘ │
│ │in│  LinkedIn ↗ · Contact →                                    │ (fades at │ ┌──────────────┐ │
│ ╰──╯                                                            │  bottom)  │ │◯ In BD: 100+ │ │
│                                                                 ╰──────────╯ └──────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│      ┌────────────┐ ┌────────────────────────────────────────────┐ ┌──────────────────────┐ │
│      │(◉) Fahad Ali│ │ About                                       │ │ Worked with          │ │
│      │ Town Planner│ │ Two careers, one way of working.            │ │ (LDA)(TS)(UA)(IA)(IN)│ │
│      │ ◉ Open to   │ │ ¶ about ×3                                  │ └──────────────────────┘ │
│      │   roles     │ │ ┌─────────────────────────────────────────┐ │ ┌──────────────────────┐ │
│      └────────────┘ │ │ [drawing: FA Avenue 1]                   │ │ │ Selected highlights   │ │
│      ┌────────────┐ │ │ FA Avenue 1 — Integrated Urban Dev…      │ │ │ 1  13 districts…   ›  │ │
│      │ Experience  │ │ │ ⌖ Ferozepur Road, Lahore     2,828 acres │ │ │ 2  2,828-acre…     ›  │ │
│      │[Planning|Bus│ │ └─────────────────────────────────────────┘ │ │ 3  100+ projects…  ›  │ │
│      │(TS) The Spat│ │ ┌─────────────────────────────────────────┐ │ │ 4  138% best month ›  │ │
│      │ GIS Team Le │ │ │ Results     138%   ▁▁▅▂█▇ Jul–Dec 2025  │ │ └──────────────────────┘ │
│      │(TS) …       │ │ │ Best month vs. target — $11,055 / $8,000│ │                          │
│      │(LDA) …      │ │ └─────────────────────────────────────────┘ │                          │
│      └────────────┘ └────────────────────────────────────────────┘                          │
│      ┌───────────────────────────────────────┐ ┌───────────────────────────────────────┐    │
│      │ ◯ Urban Planning (aqua ring)          │ │ ◯ Business Development (coral ring)   │    │
│      │ Town Planner & GIS Specialist         │ │ Business Development & Lead Gen…      │    │
│      │ intro · six chips · [Explore …]       │ │ intro · six chips · [Explore …]       │    │
│      └───────────────────────────────────────┘ └───────────────────────────────────────┘    │
│      ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│      │ Featured work — Plans, places and maps.                       Full portfolio →   │   │
│      │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐                   │   │
│      │ │[chip] ⌖ location │ │ …                │ │ …                │  (post cards)     │   │
│      │ │      [View project]│                  │ │                  │                   │   │
│      │ │ [drawing]         │ │                  │ │                  │                   │   │
│      │ │ facts chips       │ │                  │ │                  │                   │   │
│      │ └──────────────────┘ └──────────────────┘ └──────────────────┘                   │   │
│      └──────────────────────────────────────────────────────────────────────────────────┘   │
│      ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│      │ Recognised along the way.                                          ‹  ›           │   │
│      │ ▯▯▯▯▯▯▯  story tiles (certificate on mat · issuer badge · title)                  │   │
│      └──────────────────────────────────────────────────────────────────────────────────┘   │
│      ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│      │ Let's connect. Open to planning, GIS and business development roles.             │   │
│      │ [Get in touch]  mfahadali9463@gmail.com  LinkedIn ↗                              │   │
│      └──────────────────────────────────────────────────────────────────────────────────┘   │
│      footer: name · positioning · Lahore · photo credit                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Home — 375 px

```
┌───────────────────────────────────┐
│ (FA) Home              [⧉ Copy]   │ ← compact top bar (flat glass)
├───────────────────────────────────┤
│        ╭───────────────╮          │
│        │ portrait      │          │ ← cutout, 220 px tall, fades out
│        │ cutout        │          │
│        ╰───────────────╯          │
│ Lahore, Pakistan                  │
│ Fahad Ali               (48 / 400)│
│ Spatial thinking.                 │
│ Commercial instinct.              │
│ Town Planner & GIS Specialist ·   │
│ Business Development              │
│ I'm a City & Regional Planning…   │
│ [ Explore Urban Planning        ] │
│ [ Explore Business Development  ] │
│ LinkedIn ↗ · Contact →            │
│ ┌───────────────────────────────┐ │
│ │ ◯ Latest in planning: GIS…    │ │ ← proof badges, one row each
│ │ ◯ In BD: 100+ projects closed │ │
│ └───────────────────────────────┘ │
│ ┌───────────────────────────────┐ │
│ │ (◉) Fahad Ali · Open to roles │ │ ← identity card
│ └───────────────────────────────┘ │
│ ┌───────────────────────────────┐ │
│ │ Experience                    │ │
│ │ [ Planning | Business ]       │ │
│ │ rows …                        │ │
│ └───────────────────────────────┘ │
│ About · featured project · 138%   │
│ Worked with · Highlights          │
│ Two profiles (stacked)            │
│ Featured work (1 column)          │
│ Recognition (swipe row + ‹ ›)     │
│ Let's connect                     │
├───────────────────────────────────┤
│ ⌂Home 🗺Planning 💼Business 🔍Search 💬Contact │ ← tab bar, safe-area
└───────────────────────────────────┘
```

## Profile pages — 1440 px (Urban Planning shown; Business mirrors it)

```
┌ rail ┐ ┌ location bar: ⌖ Fahad Ali / Urban Planning / Portfolio ──────── [Résumé ▾][⧉][in] ┐
│      │ ┌──────────────┐ ┌──────────────────────────────────────────────────────────────────┐
│      │ │ identity card │ │ #resume  Urban Planning · GIS                                     │
│      │ ├──────────────┤ │ Planning from the parcel to the province.  (h1)                   │
│      │ │ Sections      │ │ summary · education · tools · expertise 01–06 · experience …     │
│      │ │ Resume        │ └──────────────────────────────────────────────────────────────────┘
│      │ │ Portfolio  9  │ ┌──────────────────────────────────────────────────────────────────┐
│      │ │ Research   7  │ │ #portfolio  [🔍 Search projects…]  (All)(Master)(Industrial)…     │
│      │ │ Certific.  8  │ │ ┌────────┐┌────────┐┌────────┐  tiles: chip top-left, label on   │
│      │ └──────────────┘ │ │        ││        ││        │  bottom scrim → sheet             │
│      │   (sticky)       │ └────────┘└────────┘└────────┘                                    │
│      │                  └──────────────────────────────────────────────────────────────────┘
│      │                  #research (numbered rows ›) · #certifications (stories + grid) · CTA
```
