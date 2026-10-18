// Extracts every piece of text from the previous site (v1) into docs/previous-site-extract.md.
//
// Source: the v1 source code (most exact). Its data files are imported directly (Node strips the
// TypeScript types), and the page-level copy that lived inside JSX is listed in PAGE_COPY below.
// With --verify, every extracted string is checked against the live site's HTML so we know the
// source and the deployed site agree.
//
//   npm run extract              # write the markdown
//   npm run extract -- --verify  # also check against https://fahadalicv.netlify.app
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = process.env.PREVIOUS_SITE_SRC || path.join(ROOT, "content-source/Old portfolio files/src");
const LIVE = "https://fahadalicv.netlify.app";
const OUT = path.join(ROOT, "docs/previous-site-extract.md");

if (!fs.existsSync(SRC)) {
  console.error(`Previous site source not found at ${SRC}. Set PREVIOUS_SITE_SRC or copy it into previous-site/.`);
  process.exit(1);
}

const load = async (f) => import(pathToFileURL(path.join(SRC, "data", f)).href);
const { profile } = await load("profile.ts");
const { contact } = await load("contact.ts");
const { planningProfile, planningExperience } = await load("urbanPlanning.ts");
const { bdProfile, bdMetrics, bdMonthly, bdEngagements, bdExperience } = await load("businessDevelopment.ts");
const { visibleProjects, featuredProjects } = await load("projects.ts");
const { visibleResearch } = await load("research.ts");
const { credentials } = await load("certifications.ts");
const { homeHighlights } = await load("highlights.ts");
const { seo } = await load("site.ts");

const hasLink = (u) => !!u && !String(u).trim().toUpperCase().startsWith("TODO");
const visibleCreds = credentials.filter((c) => !c.draft);
const fmtMetric = (m) => `${m.prefix ?? ""}${m.value.toLocaleString("en-US")}${m.suffix ?? ""}`;

// Copy that lived in the page JSX (src/app/**/page.tsx and components), transcribed verbatim.
const PAGE_COPY = {
  home: {
    aboutEyebrow: "About",
    aboutTitle: "Two careers, one way of working.",
    identitiesEyebrow: "Professional identity",
    identitiesTitle: "Two profiles. Pick your lens.",
    highlightsEyebrow: "Selected highlights",
    highlightsTitle: "Numbers from the record.",
    highlightsLead: "Every figure here comes from my resumes, completion letters, drawings or sales portfolio.",
    featuredEyebrow: "Featured work",
    featuredTitle: "Plans, places and maps.",
    featuredLead: "A selection from my planning portfolio. Open any project to preview the drawings.",
    featuredAction: "Full portfolio",
    recognitionEyebrow: "Certifications & recognition",
    recognitionTitle: "Recognised along the way.",
    cta: "Let's connect.",
  },
  planning: {
    eyebrow: "Urban Planning · GIS",
    title: "Planning from the parcel to the province.",
    resumeButton: "View / download full resume",
    secondaryButton: "See the portfolio",
    expertiseTitle: "Planning expertise.",
    expertiseLead: "What I bring to a planning or GIS team, grounded in the work below.",
    experienceTitle: "Where I've worked.",
    portfolioTitle: "Master plans, urban design and GIS.",
    portfolioLead: "Studio and professional work. Group projects are credited inside each preview.",
    portfolioAction: "Full portfolio on Drive",
    researchTitle: "Academic research.",
    researchLead:
      "Coursework research at the Department of City & Regional Planning, UET Lahore, from transit-oriented development to heritage conservation.",
    certTitle: "Certificates, letters & awards.",
    certLead: "Completion letters that show my national ID number are listed without a public preview.",
    cta: "Planning or GIS role in mind?",
  },
  bd: {
    eyebrow: "Business Development · Sales",
    title: "From first message to signed scope.",
    resumeButton: "View / download full resume",
    secondaryButton: "See the results",
    resumeTitle: "What I own in the sales cycle.",
    resumeLead: "Lead generation, client acquisition, proposals and delivery coordination, handled end to end.",
    achievementsTitle: "Results, by the numbers.",
    achievementsLead: "Figures from my business development resume, LinkedIn and sales portfolio at Ideas Animation Studio.",
    engagementsEyebrow: "Selected engagements",
    engagementsTitle: "Wins I sourced and closed.",
    engagementsLead: "Client names are withheld for confidentiality.",
    experienceTitle: "Career timeline.",
    recognitionTitle: "Awards & credentials.",
    cta: "Need someone to grow your pipeline?",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk.",
    lead: "Write to me directly or use the form.",
    formNote: "Opens your email app with this message ready to send.",
    formButton: "Continue in email",
    messagePlaceholder: "A few lines about the role, project or opportunity",
    mailtoNote: "Your email app should have opened. If not, click here or write to",
  },
  ctaLead: ". The fastest way to reach me is email or LinkedIn.",
  notFound: { eyebrow: "404", title: "This page isn't on the plan.", button: "Back home" },
};

const L = [];
const h = (n, t) => L.push("", `${"#".repeat(n)} ${t}`, "");
const p = (t) => L.push(t);
const li = (t) => L.push(`- ${t}`);
const kv = (k, v) => v && L.push(`- **${k}:** ${v}`);

L.push(
  "# Previous site — full text extract",
  "",
  `Source: v1 source code in \`${path.relative(ROOT, SRC)}\` (data files imported directly; JSX copy transcribed). ` +
    `Live site: ${LIVE}. Generated by \`scripts/extract-previous-site.mjs\` on ${new Date().toISOString().slice(0, 10)}.`,
  "",
  "Links marked TODO in v1 were hidden on the live site and are listed here as *(no link)*. Drafted items (`draft: true`) were not shown on the live site and are listed separately at the end."
);

// ─────────────── /
h(2, "Route `/` — Home");
kv("SEO title", seo.home.title);
kv("SEO description", seo.home.description);
h(3, "Hero");
kv("Eyebrow", profile.heroEyebrow);
kv("H1", profile.name);
kv("Tagline", profile.heroTitle.join(" "));
kv("Role chips", `${profile.heroRoles.planning} · ${profile.heroRoles.bd}`);
kv("Intro", profile.heroIntro);
kv("Buttons", "Explore Urban Planning · Explore Business Development");
kv("Links", "LinkedIn · Contact");
kv(`Badge — ${profile.heroBadges.planning.label}`, profile.heroBadges.planning.text);
kv(`Badge — ${profile.heroBadges.bd.label}`, profile.heroBadges.bd.text);
kv("Portrait", "none — “FA” monogram (photo field was empty)");
h(3, `About — “${PAGE_COPY.home.aboutTitle}”`);
profile.about.forEach((t) => p(`> ${t}\n`));
kv("Education card", `${profile.education.degree} · ${profile.education.school} · ${profile.education.period}`);
kv("Languages card", profile.languages.join(" · "));
h(3, `${PAGE_COPY.home.identitiesEyebrow} — “${PAGE_COPY.home.identitiesTitle}”`);
for (const [label, prof, cta] of [
  ["Urban Planning", planningProfile, "Explore Urban Planning"],
  ["Business Development", bdProfile, "Explore Business Development"],
]) {
  p(`**${label}** — ${prof.title}`);
  p("");
  p(prof.homeIntro);
  p("");
  p(`Chips: ${prof.expertise.map((e) => e.title).join(" · ")} — button: ${cta}`);
  p("");
}
h(3, `${PAGE_COPY.home.highlightsEyebrow} — “${PAGE_COPY.home.highlightsTitle}”`);
p(PAGE_COPY.home.highlightsLead);
p("");
homeHighlights.forEach((m) => li(`**${fmtMetric(m)}** ${m.label} — ${m.detail} *(track: ${m.track})*`));
p("");
p("Note: the counters animate from 0 in the browser; the server-rendered HTML shows “0” until JavaScript runs.");
h(3, `${PAGE_COPY.home.featuredEyebrow} — “${PAGE_COPY.home.featuredTitle}”`);
p(PAGE_COPY.home.featuredLead + ` Action: “${PAGE_COPY.home.featuredAction}”.`);
p("");
featuredProjects.forEach((x) => li(`${x.title} (opens the project dialog — see /urban-planning)`));
h(3, `${PAGE_COPY.home.recognitionEyebrow} — “${PAGE_COPY.home.recognitionTitle}”`);
visibleCreds.filter((c) => c.featured).forEach((c) => li(`${c.kind} · ${c.date} — ${c.title} — ${c.issuer}`));
h(3, "Closing band");
p(`“${PAGE_COPY.home.cta}” — ${contact.availability}${PAGE_COPY.ctaLead} Buttons: Get in touch · ${contact.email} · LinkedIn`);

// ─────────────── /urban-planning
h(2, "Route `/urban-planning`");
kv("SEO title", seo.planning.title);
kv("SEO description", seo.planning.description);
h(3, "Hero");
kv("Eyebrow", PAGE_COPY.planning.eyebrow);
kv("H1", PAGE_COPY.planning.title);
kv("Lead", planningProfile.summary);
kv("Aside", `${profile.education.degree} · UET Lahore · ${profile.education.period} | ${planningProfile.tools.slice(0, 5).join(" · ")}`);
kv("Buttons", `${PAGE_COPY.planning.resumeButton} *(hidden — link TODO)* · ${PAGE_COPY.planning.secondaryButton}`);
kv("Sub-nav", "Resume · Portfolio · Research · Certifications");
h(3, `#resume — “${PAGE_COPY.planning.expertiseTitle}”`);
p(PAGE_COPY.planning.expertiseLead);
p("");
planningProfile.expertise.forEach((e, i) => li(`${String(i + 1).padStart(2, "0")} **${e.title}** — ${e.detail}`));
h(4, `Experience — “${PAGE_COPY.planning.experienceTitle}”`);
writeRoles(planningExperience);
h(4, "Education / Languages / Skills / Software & tools / Achievements");
kv("Education", `${profile.education.degree} · ${profile.education.school} · ${profile.education.period}`);
kv("Languages", profile.languages.join(" · "));
kv("Skills", planningProfile.skills.join(" · "));
kv("Software & tools", planningProfile.tools.join(" · "));
p("**Achievements:**");
planningProfile.achievements.forEach(li);
h(3, `#portfolio — “${PAGE_COPY.planning.portfolioTitle}”`);
p(PAGE_COPY.planning.portfolioLead + ` (“${PAGE_COPY.planning.portfolioAction}” hidden — link TODO)`);
p("");
p(`Filters: All · ${[...new Set(visibleProjects.map((x) => x.category))].join(" · ")}`);
for (const x of visibleProjects) {
  h(4, `Project — ${x.title}`);
  kv("Card", `${x.category} · ${[x.location, x.year].filter(Boolean).join(" · ") || "—"} · button “View project”`);
  kv("Dialog — description", x.description);
  kv("Dialog — Contribution", x.contribution);
  kv("Location", x.location);
  kv("Year", x.year);
  kv("Key facts", x.facts?.join(" · "));
  kv("Credit", x.credit);
  kv("Tools & tags", x.tags.join(" · "));
  kv("Images", x.images.join(", "));
  kv("Featured on Home", x.featured ? "yes" : "");
  kv("Full file", hasLink(x.driveUrl) ? x.driveUrl : "*(no link)*");
}
h(3, `#research — “${PAGE_COPY.planning.researchTitle}”`);
p(PAGE_COPY.planning.researchLead);
for (const r of visibleResearch) {
  h(4, `Research — ${r.title}`);
  kv("Card", `${r.category}${r.pages ? ` · ${r.pages} pp` : ""}${r.year ? ` · ${r.year}` : ""} · subtitle “${r.topic}” · button “Read summary”`);
  kv("Dialog — summary", r.description);
  kv("Course", `${r.course}, UET Lahore`);
  kv("Authors", hasLink(r.authors) ? r.authors : "*(not shown — TODO in v1)*");
  kv("Length", r.pages ? `${r.pages} pages` : "");
  kv("Year", r.year);
  kv("Type", "Academic coursework report");
  kv("Images", [r.image, r.coverImage].filter(Boolean).join(", "));
  kv("Full report", hasLink(r.driveUrl) ? r.driveUrl : "*(no link)*");
}
h(3, `#certifications — “${PAGE_COPY.planning.certTitle}”`);
p(PAGE_COPY.planning.certLead);
writeCreds(visibleCreds.filter((c) => c.track === "planning"));
h(3, "Closing band");
p(`“${PAGE_COPY.planning.cta}” — ${contact.availability}${PAGE_COPY.ctaLead}`);

// ─────────────── /business-development
h(2, "Route `/business-development`");
kv("SEO title", seo.bd.title);
kv("SEO description", seo.bd.description);
h(3, "Hero");
kv("Eyebrow", PAGE_COPY.bd.eyebrow);
kv("H1", PAGE_COPY.bd.title);
kv("Lead", bdProfile.summary);
kv("Aside — Now", `${bdExperience[0].title} · ${bdExperience[0].org} · since ${bdExperience[0].start}`);
kv("Aside — Previously", `${bdExperience[1].title} · ${bdExperience[1].org}`);
kv("Buttons", `${PAGE_COPY.bd.resumeButton} *(hidden — link TODO)* · ${PAGE_COPY.bd.secondaryButton}`);
kv("Sub-nav", "Resume · Achievements · Experience · Recognition");
h(3, `#resume — “${PAGE_COPY.bd.resumeTitle}”`);
p(PAGE_COPY.bd.resumeLead);
p("");
bdProfile.expertise.forEach((e, i) => li(`${String(i + 1).padStart(2, "0")} **${e.title}** — ${e.detail}`));
p("");
for (const [g, list] of Object.entries(bdProfile.skills)) kv(g, list.join(" · "));
kv("Platforms & tools", bdProfile.tools.join(" · "));
h(3, `#achievements — “${PAGE_COPY.bd.achievementsTitle}”`);
p(PAGE_COPY.bd.achievementsLead);
p("");
bdMetrics.forEach((m) => li(`**${fmtMetric(m)}** ${m.label} — ${m.detail}`));
h(4, `Chart — ${bdMonthly.title}`);
p(`${bdMonthly.period} · USD · source: sales portfolio`);
p("");
p("| Month | Target | Locked | % of target (rounded) |");
p("| --- | --- | --- | --- |");
bdMonthly.months.forEach((m) =>
  p(`| ${m.month} | $${m.target.toLocaleString("en-US")} | $${m.locked.toLocaleString("en-US")} | ${Math.round((m.locked / m.target) * 100)}% |`)
);
h(4, `${PAGE_COPY.bd.engagementsEyebrow} — “${PAGE_COPY.bd.engagementsTitle}”`);
p(PAGE_COPY.bd.engagementsLead);
p("");
bdEngagements.forEach((e) => li(`**${e.client}** — ${e.value} — ${e.scope}. ${e.how} *(${e.terms})*`));
h(3, `#experience — “${PAGE_COPY.bd.experienceTitle}”`);
writeRoles(bdExperience);
h(3, `#recognition — “${PAGE_COPY.bd.recognitionTitle}”`);
writeCreds(visibleCreds.filter((c) => c.track === "bd"));
h(3, "Closing band");
p(`“${PAGE_COPY.bd.cta}” — ${contact.availability}${PAGE_COPY.ctaLead}`);

// ─────────────── /contact
h(2, "Route `/contact`");
kv("SEO title", seo.contact.title);
kv("SEO description", seo.contact.description);
kv("Eyebrow", PAGE_COPY.contact.eyebrow);
kv("H1", PAGE_COPY.contact.title);
kv("Lead", `${contact.availability}. ${PAGE_COPY.contact.lead}`);
kv("Identity", `${profile.name} · ${profile.positioning} · ${contact.location}`);
kv("Email", contact.email);
kv("Phone", `${contact.phone} (${contact.phoneHref})`);
kv("LinkedIn", `${contact.linkedinLabel} → ${contact.linkedin}`);
kv("WhatsApp", hasLink(contact.whatsapp) ? contact.whatsapp : "*(not shown — TODO)*");
kv("Form fields", "Name · Email · Subject · Message (+ hidden honeypot “company”)");
kv("Message placeholder", PAGE_COPY.contact.messagePlaceholder);
kv("Form note", PAGE_COPY.contact.formNote);
kv("Submit", PAGE_COPY.contact.formButton);
kv("After submit", `${PAGE_COPY.contact.mailtoNote} ${contact.email}.`);

// ─────────────── chrome
h(2, "Global chrome");
kv("Nav", "Home · Urban Planning (Resume, Portfolio, Research, Certifications) · Business Development (Resume, Achievements, Experience, Recognition) · Contact");
kv("Footer", `${profile.name} · ${profile.positioning} · ${contact.location} · LinkedIn · Email · Phone · © ${new Date().getFullYear()} ${profile.name}. All rights reserved.`);
kv("404", `${PAGE_COPY.notFound.eyebrow} — ${PAGE_COPY.notFound.title} — ${PAGE_COPY.notFound.button}`);
kv("Head", "canonical and og:url = http://localhost:3000 (defect); font stack declared “Anthropic Sans” falling back to Inter (defect)");

h(2, "Drafted in v1 (not shown on the live site)");
credentials.filter((c) => c.draft).forEach((c) => li(`${c.title} — ${c.issuer} — ${c.date}`));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, L.join("\n") + "\n");
console.log(`Wrote ${path.relative(ROOT, OUT)} (${L.length} lines)`);

if (process.argv.includes("--verify")) await verify();

function writeRoles(roles) {
  for (const r of roles) {
    p(`**${r.title}** — ${r.org}`);
    p("");
    p(`${r.start} – ${r.end}${r.project ? ` · ${r.project}` : ""}${r.location ? ` · ${r.location}` : ""}`);
    p("");
    if (r.summary) p(`${r.summary}\n`);
    r.points.forEach(li);
    if (r.note) p(`\n*Note: ${r.note}*`);
    p("");
  }
}

function writeCreds(list) {
  for (const c of list) {
    h(4, `${c.kind} — ${c.title}`);
    kv("Issuer", c.issuer);
    kv("Date", c.date || "—");
    kv("Topic", c.topic);
    kv("Dialog text", c.description);
    kv("Preview", c.image ? c.image : "no public preview — dialog says “The original document is available on request.”");
    kv("Button", c.image || hasLink(c.driveUrl) || c.description ? `View ${c.kind === "Letter" ? "letter" : "certificate"}` : "none (card not clickable)");
  }
}

async function verify() {
  const dec = (s) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\\u0026/g, "&")
      .replace(/\\"/g, '"');
  const pages = await Promise.all(["/", "/urban-planning", "/business-development", "/contact"].map((r) => fetch(LIVE + r).then((x) => x.text())));
  const live = dec(pages.join("\n"));
  const strings = [
    profile.heroIntro,
    ...profile.about,
    planningProfile.summary,
    bdProfile.summary,
    ...visibleProjects.flatMap((x) => [x.title, x.description, x.contribution, x.credit].filter(Boolean)),
    ...visibleResearch.flatMap((r) => [r.title, r.description]),
    ...visibleCreds.flatMap((c) => [c.title, c.issuer]),
    ...[...planningExperience, ...bdExperience].flatMap((r) => [r.title, ...r.points, r.note].filter(Boolean)),
    ...bdEngagements.flatMap((e) => [e.client, e.how]),
    ...Object.values(PAGE_COPY.planning),
    ...Object.values(PAGE_COPY.bd),
  ];
  const missing = strings.filter((s) => !live.includes(s));
  console.log(`Verified ${strings.length - missing.length}/${strings.length} strings against ${LIVE}`);
  missing.forEach((s) => console.log("  not found live:", s));
}
