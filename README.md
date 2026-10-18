# Fahad Ali — Portfolio (v2)

A static website (Next.js, exported to plain HTML) with two careers: **Urban Planning & GIS** and **Business Development**.
Frosted-glass windows float over a generated "planner's map". Light and dark appearance. Home shows one career
at a time (the "lens") and starts with your current role.

| Route | Page |
|---|---|
| `/` | Home — cover, experience, focus, highlights, expertise, featured work, recognition |
| `/urban-planning` | `#resume` · `#portfolio` · `#research` · `#certifications` |
| `/business-development` | `#resume` · `#achievements` · `#experience` · `#recognition` |
| `/contact` | Email, WhatsApp, phone, LinkedIn, Instagram, message form |

Any item opens in a panel with its own link, e.g. `/urban-planning?item=fa-avenue-1`. Home can be linked in a
career: `/?lens=planning` or `/?lens=business`.

---

## 1. Run it

Install **Node.js 22 or newer** (nodejs.org), then in this folder:

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

## 2. The commands

| Command | What it does | Needs `content-source/`? |
|---|---|---|
| `npm run dev` | Live preview while editing | no |
| `npm run check-content` | Checks every content file, lists unfinished items, runs the privacy checks | no |
| `npm run build` | Checks content, then writes the finished site to `out/` | no |
| `npm run media` | Rebuilds images from your original files (drawings, certificates, portrait, backdrop) | **yes** |
| `npm run thumbs` | Rebuilds the ink-card thumbnails for every item | no |
| `npm run og` | Rebuilds the share images (`public/og/`) | no |
| `npm run resumes` | Copies your own résumé PDFs from `content-source/Portfolio/` into `public/resume/` (unchanged) | **yes** |
| `npm run qa` | Accessibility scan (both themes), no-JavaScript check, privacy scan of `out/` | no |

`content-source/` (your private originals) is never committed. Everything the site needs from it is
generated into `public/media/`, which **is** committed.

## 3. Updating content

All text lives in `src/content/`. Each item carries `source` (where the fact comes from) and `verified`.
Items with `verified: false` or containing `TODO` are left out of the live site and listed by
`npm run check-content`; in `npm run dev` they show an "Unverified" badge.

### Add a project
1. Put the PDF in `content-source/Portfolio/Projects/`.
2. In `scripts/media.config.mjs`, copy a project block: one `…/tile` (4:3 crop) and one `…/page-N` per sheet.
   If a sheet prints roll numbers or phone numbers, add `redact` boxes (fractions of the page) or a `crop`.
3. In `src/content/projects.ts`, copy one object and change every field (slug, title, category, summary,
   keyFacts, credit, tools, cover, coverAlt, pages with alt text). Keep `driveUrl: PORTFOLIO_DRIVE` or paste
   a single-file Drive link.
4. Run `npm run media`, `npm run thumbs`, `npm run check-content`.

### Add a certificate
- **With a preview:** add a full image and a `-tile` entry in `scripts/media.config.mjs`, run `npm run media`,
  then add an object in `src/content/certifications.ts` with `image: "certificates/<slug>"`, `imageAlt` and
  `publicPreview: true`. Run `npm run thumbs`.
- **Without a preview** (e.g. a letter showing your national ID): add the object with `publicPreview: false`
  and no `image`. The build refuses an image or link on such an item. Run `npm run thumbs` (it draws a seal card).

### Change the current role
In `src/content/experience.ts`, set the old role's `end` to a month (`"Oct 2027"`) and add the new role at the
top of its track with `end: "present"`. Home automatically leads with the current role's career.
Run `npm run thumbs`.

### Change a number
`src/content/metrics.ts`. Write the value exactly as it should appear (`"138%"`) and keep its qualifier.

### Change the About text, headlines, SEO text
`src/content/site.ts`.

### Swap the portrait
Replace `content-source/photo/fahad-cutout.png` (a transparent cutout, portrait orientation), then
`npm run media`, `npm run og`. A larger original (≥ 1500 px tall) will look sharper on big screens.

### Change the backdrop
It is generated. In `scripts/media.config.mjs` change `seed` under `environments` for a different
arrangement, or edit colours in `scripts/lib/backdrop.mjs`. Then `npm run media`.

### Socials and links
`src/content/contact.ts` — email, phone, WhatsApp, LinkedIn, Instagram, the portfolio Drive folder, résumé files.
Only the portfolio folder may be linked as a folder; every other Drive link must be a single file.

## 4. Colours and glass

Only in `src/styles/tokens.css`: dark values at the top, light values under `[data-theme="light"]`.
Glass strength is two tokens: `--glass-fill` (opacity) and `--glass-blur`.
After changing colours, check contrast: `node scripts/contrast.mjs`.

## 5. Contact form

By default "Continue in email" opens the visitor's email app with the message filled in.
To send directly from the site, create a form endpoint (e.g. Formspree) and set an environment variable
`NEXT_PUBLIC_FORM_ENDPOINT` (in Netlify: Site settings → Environment variables), then redeploy.
The button changes to "Send message", with honest sending / sent / error states.

## 6. Deploying to Netlify

`netlify.toml` already sets: build command `npm run build`, publish directory `out`, Node 24.
Connect the repository in Netlify, or drag the `out/` folder onto app.netlify.com/drop.

**Custom domain:** add it in Netlify (Domain settings), then change `domain` in `src/content/site.ts`
(used for canonical links, share previews and the sitemap), run `npm run og` and rebuild.

## 7. Where things are

```
docs/              decisions, content extract and inventory, design system, QA report
scripts/           media, thumbnails, backdrop, résumés, share images, checks, QA
src/content/       all text and data
src/components/    chrome (rail, bars, sheets), sections, ui
src/styles/        tokens.css · globals.css · print.css
public/media/      generated images (committed)
```
