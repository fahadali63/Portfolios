import { ChevronRight, Download, FileText, GraduationCap, Search, Wrench } from "lucide-react";
import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { certificationsFor, projects, research, rolesFor } from "@/content";
import { contact } from "@/content/contact";
import { education, languages } from "@/content/education";
import { projectCategories } from "@/content/projects";
import { sections, site } from "@/content/site";
import { planningSkills } from "@/content/skills";
import { PageFrame } from "@/components/chrome/PageFrame";
import { IdentityCard } from "@/components/sections/IdentityCard";
import { Connect } from "@/components/sections/Connect";
import { CertificateSheet } from "@/components/sheets/CertificateSheet";
import { ProjectSheet } from "@/components/sheets/ProjectSheet";
import { ResearchSheet } from "@/components/sheets/ResearchSheet";
import { RoleSheet } from "@/components/sheets/RoleSheet";
import { Areas } from "@/components/ui/Areas";
import { RoleEntry } from "@/components/ui/RoleEntry";
import { SectionNav } from "@/components/ui/SectionNav";
import { SheetLink } from "@/components/ui/SheetLink";
import { StoryTile } from "@/components/ui/StoryTile";
import { Thumb } from "@/components/ui/Thumb";
import { TrackChip } from "@/components/ui/TrackChip";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Unverified } from "@/components/ui/Unverified";
import { Window } from "@/components/ui/Window";
import { profilePageJsonLd } from "@/lib/jsonld";

const t = site.tracks.planning;
const copy = site.copy.planning;

export const metadata: Metadata = {
  title: site.seo.planning.title,
  description: site.seo.planning.description,
  alternates: { canonical: "/urban-planning" },
  openGraph: {
    title: `${site.seo.planning.title} — ${site.name}`,
    description: site.seo.planning.description,
    url: "/urban-planning",
    images: [{ url: "/og/urban-planning.png", width: 1200, height: 630, alt: `${site.name} — ${t.title}` }],
  },
  twitter: { title: `${site.seo.planning.title} — ${site.name}`, description: site.seo.planning.description, images: ["/og/urban-planning.png"] },
};

export default function UrbanPlanningPage() {
  const roles = rolesFor("planning");
  const certs = certificationsFor("planning");
  const resume = contact.resumes.find((r) => r.track === "planning")!;
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", resume.file));
  const counts: Record<string, number | undefined> = { portfolio: projects.length, research: research.length, certifications: certs.length };
  const navItems = sections.planning.map((s) => ({ ...s, count: counts[s.id] }));
  const usedCategories = projectCategories.filter((c) => projects.some((p) => p.category === c));

  return (
    <PageFrame
      route="planning"
      sheets={
        <>
          {projects.map((p) => (
            <ProjectSheet key={p.slug} p={p} />
          ))}
          {research.map((r) => (
            <ResearchSheet key={r.slug} r={r} />
          ))}
          {certs.map((c) => (
            <CertificateSheet key={c.slug} c={c} />
          ))}
          {roles.map((r) => (
            <RoleSheet key={r.slug} r={r} showProfileLink={false} />
          ))}
        </>
      }
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd("/urban-planning", site.seo.planning)) }} />
      <SectionNav items={navItems} label="Urban planning sections" variant="chips" />
      <div className="profile-grid" data-track="planning">
        <aside className="profile-side" aria-label="Profile and sections">
          <IdentityCard index={0} heading={false} />
          <SectionNav items={navItems} label="Urban planning sections" variant="window" />
        </aside>

        <div className="stack">
          {/* ───────── Resume ───────── */}
          <Window id="resume" index={1} aria-labelledby="planning-title" data-section="resume" data-section-label="Resume">
            <TrackChip track="planning" label={t.eyebrow} />
            <h1 id="planning-title" className="t-title mt-4">
              {t.headline}
            </h1>
            <p className="t-body mt-4">{t.summary}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <div className="inset flex gap-4 p-4">
                <GraduationCap size={22} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 flex-none" />
                <div>
                  <p className="font-medium">{education.degree}</p>
                  <p className="t-meta">
                    {education.schoolShort} · {education.period}
                  </p>
                </div>
              </div>
              <div className="inset flex gap-4 p-4">
                <Wrench size={22} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 flex-none" />
                <p className="t-meta !text-[0.9375rem] !text-[var(--text-1)]">{planningSkills.tools.slice(0, 5).join(" · ")}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 no-print">
              {hasResume && (
                <a href={resume.file} download className="btn btn-primary" data-track="planning">
                  <Download size={18} strokeWidth={1.75} aria-hidden="true" /> Download résumé (PDF)
                </a>
              )}
              <a href="#portfolio" className="btn btn-glass">
                See the portfolio <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>

            <h2 className="t-heading section-gap">{copy.expertiseTitle}</h2>
            <p className="t-body mt-1 text-2">{copy.expertiseLead}</p>
            <div className="mt-5">
              <Areas items={planningSkills.expertise} />
            </div>

            <h2 className="t-heading section-gap" id="planning-experience">
              {copy.experienceTitle}
            </h2>
            <div className="mt-5 grid gap-3">
              {roles.map((r) => (
                <RoleEntry key={r.slug} r={r} />
              ))}
            </div>

            <div className="section-gap grid gap-3 lg:grid-cols-3">
              <div className="card">
                <h2 className="t-label">Education</h2>
                <p className="mt-2 font-medium">{education.degree}</p>
                <p className="t-meta">{education.school}</p>
                <p className="t-meta">{education.period}</p>
                <h2 className="t-label mt-5">Languages</h2>
                <p className="mt-2 text-[0.9375rem]">{languages.join(" · ")}</p>
              </div>
              <div className="card">
                <h2 className="t-label">Skills</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {planningSkills.skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h2 className="t-label">Software &amp; tools</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {planningSkills.tools.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card mt-3">
              <h2 className="t-label">Achievements</h2>
              <ul className="mt-3 grid gap-3 md:grid-cols-3">
                {planningSkills.achievements.map((a) => (
                  <li key={a} className="border-l-2 border-[var(--track)] pl-3 text-[0.9375rem] leading-relaxed">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Window>

          {/* ───────── Portfolio ───────── */}
          <Window id="portfolio" label="Portfolio" labelId="portfolio-label" aria-labelledby="portfolio-title" data-section="portfolio" data-section-label="Portfolio">
            <div data-filter-scope>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 id="portfolio-title" className="t-title">
                    {copy.portfolioTitle}
                  </h2>
                  <p className="t-body mt-2">{copy.portfolioLead}</p>
                </div>
                <ExternalLink href={contact.portfolioDrive} className="btn btn-sm btn-glass">
                  Full portfolio on Drive
                </ExternalLink>
              </div>
              <div className="search-field mt-5 no-print" data-js-only hidden>
                <Search size={20} strokeWidth={1.75} aria-hidden="true" />
                <label htmlFor="project-search" className="sr-only">
                  Search projects
                </label>
                <input id="project-search" type="search" placeholder="Search projects…" autoComplete="off" data-filter-search aria-describedby="portfolio-status" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 no-print" role="group" aria-label="Filter by category" data-js-only hidden>
                {["All", ...usedCategories].map((c) => (
                  <button key={c} type="button" className="chip filter-chip" aria-pressed={c === "All"} data-filter-chip={c}>
                    {c}
                  </button>
                ))}
              </div>
              <p id="portfolio-status" className="sr-only" role="status" aria-live="polite" data-filter-status />
              <ul className="tiles mt-5">
                {projects.map((p, i) => (
                  <li
                    key={p.slug}
                    data-filter-item
                    data-category={p.category}
                    data-text={[p.title, p.category, p.location, p.summary, p.tools.join(" "), p.keyFacts.join(" ")].join(" ").toLowerCase()}
                  >
                    <SheetLink slug={p.slug} className="block" label={`View project: ${p.title}`}>
                      <Thumb
                        id={`project-${p.slug}`}
                        kind="project"
                        track="planning"
                        chip={p.category}
                        title={p.title}
                        sub={[p.location, p.year].filter(Boolean).join(" · ") || p.keyFacts[0]}
                        priority={i < 2}
                        badge={<Unverified item={p} />}
                      />
                    </SheetLink>
                  </li>
                ))}
              </ul>
              <p className="t-body mt-4" data-filter-empty hidden>
                No projects match. Try another word or choose All.
              </p>
            </div>
          </Window>

          {/* ───────── Research ───────── */}
          <Window id="research" label="Research" labelId="research-label" aria-labelledby="research-title" data-section="research" data-section-label="Research">
            <h2 id="research-title" className="t-title">
              {copy.researchTitle}
            </h2>
            <p className="t-body mt-2">{copy.researchLead}</p>
            <ol className="rows rows-divided mt-5">
              {research.map((r) => (
                <li key={r.slug}>
                  <SheetLink slug={r.slug} className="row !items-start !py-4" label={`Read summary: ${r.title}`}>
                    <Thumb id={`research-${r.slug}`} kind="research" track="planning" variant="mini" className="!w-[64px]" />
                    <span className="row-main">
                      <span className="mb-1.5 flex flex-wrap gap-2">
                        <span className="chip" data-track="planning">
                          <span className="dot" aria-hidden="true" />
                          {r.category}
                        </span>
                        <span className="chip">
                          <FileText size={13} strokeWidth={1.75} aria-hidden="true" /> {r.pages} pp
                        </span>
                        {r.year && <span className="chip">{r.year}</span>}
                        <Unverified item={r} />
                      </span>
                      <span className="block text-[1.0625rem] font-semibold leading-snug">{r.title}</span>
                      <span className="row-sub mt-1 block">{r.topic}</span>
                      <span className="mt-2 block text-[0.875rem] font-medium underline decoration-white/45 underline-offset-4">Read summary</span>
                    </span>
                    <span className="chev mt-1" aria-hidden="true">
                      <ChevronRight size={16} strokeWidth={1.75} />
                    </span>
                  </SheetLink>
                </li>
              ))}
            </ol>
          </Window>

          {/* ───────── Certifications ───────── */}
          <Window id="certifications" label="Certifications" labelId="cert-label" aria-labelledby="cert-title" data-section="certifications" data-section-label="Certifications">
            <h2 id="cert-title" className="t-title">
              {copy.certTitle}
            </h2>
            <p className="t-body mt-2">{copy.certLead}</p>
            <ul className="story-grid mt-6">
              {certs.map((c) => (
                <li key={c.slug}>
                  <StoryTile c={c} />
                </li>
              ))}
            </ul>
          </Window>

          <Connect title={t.closing} id="connect" />
        </div>
      </div>
    </PageFrame>
  );
}
