import { ArrowRight, ChevronRight, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { businessMetrics, certificationsFor, engagements, rolesFor } from "@/content";
import { contact } from "@/content/contact";
import { sections, site } from "@/content/site";
import { businessSkills } from "@/content/skills";
import { AttainmentChart } from "@/components/charts/AttainmentChart";
import { PageFrame } from "@/components/chrome/PageFrame";
import { Connect } from "@/components/sections/Connect";
import { IdentityCard } from "@/components/sections/IdentityCard";
import { CertificateSheet } from "@/components/sheets/CertificateSheet";
import { RoleSheet } from "@/components/sheets/RoleSheet";
import { Areas } from "@/components/ui/Areas";
import { EngagementCard } from "@/components/sections/FeaturedWork";
import { RoleEntry } from "@/components/ui/RoleEntry";
import { SectionNav } from "@/components/ui/SectionNav";
import { SheetLink } from "@/components/ui/SheetLink";
import { StoryTile } from "@/components/ui/StoryTile";
import { TrackChip } from "@/components/ui/TrackChip";
import { Unverified } from "@/components/ui/Unverified";
import { Window } from "@/components/ui/Window";
import { profilePageJsonLd } from "@/lib/jsonld";

const t = site.tracks.business;
const copy = site.copy.business;

export const metadata: Metadata = {
  title: site.seo.business.title,
  description: site.seo.business.description,
  alternates: { canonical: "/business-development" },
  openGraph: {
    title: `${site.seo.business.title} — ${site.name}`,
    description: site.seo.business.description,
    url: "/business-development",
    images: [{ url: "/og/business-development.png", width: 1200, height: 630, alt: `${site.name} — ${t.title}` }],
  },
  twitter: { title: `${site.seo.business.title} — ${site.name}`, description: site.seo.business.description, images: ["/og/business-development.png"] },
};

export default function BusinessDevelopmentPage() {
  const roles = rolesFor("business");
  const certs = certificationsFor("business");
  const [now, previous] = roles;
  const resume = contact.resumes.find((r) => r.track === "business")!;
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", resume.file));
  const counts: Record<string, number | undefined> = { experience: roles.length, recognition: certs.length };
  const navItems = sections.business.map((s) => ({ ...s, count: counts[s.id] }));

  return (
    <PageFrame
      route="business"
      sheets={
        <>
          {roles.map((r) => (
            <RoleSheet key={r.slug} r={r} showProfileLink={false} />
          ))}
          {certs.map((c) => (
            <CertificateSheet key={c.slug} c={c} />
          ))}
        </>
      }
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd("/business-development", site.seo.business)) }} />
      <SectionNav items={navItems} label="Business development sections" variant="chips" />
      <div className="profile-grid" data-track="business">
        <aside className="profile-side" aria-label="Profile and sections">
          <IdentityCard index={0} heading={false} />
          <SectionNav items={navItems} label="Business development sections" variant="window" />
        </aside>

        <div className="stack">
          {/* ───────── Resume ───────── */}
          <Window id="resume" index={1} aria-labelledby="business-title" data-section="resume" data-section-label="Resume">
            <TrackChip track="business" label={t.eyebrow} />
            <h1 id="business-title" className="t-title mt-4">
              {t.headline}
            </h1>
            <p className="t-body mt-4">{t.summary}</p>
            {now && previous && (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <SheetLink slug={now.slug} className="card block transition-colors hover:bg-[var(--fill-hover)]" label={`Now: ${now.title}, ${now.orgName}`}>
                  <span className="flex items-center gap-2">
                    <span className="now-badge" data-track="business">
                      Now
                    </span>
                    <span className="t-meta">since {now.start}</span>
                  </span>
                  <span className="t-heading mt-3 block">{now.title}</span>
                  <span className="t-meta mt-1 block">{now.orgName}</span>
                </SheetLink>
                <SheetLink slug={previous.slug} className="card block transition-colors hover:bg-[var(--fill-hover)]" label={`Previously: ${previous.title}, ${previous.orgName}`}>
                  <span className="t-label block">Previously</span>
                  <span className="t-heading mt-3 block">{previous.title}</span>
                  <span className="t-meta mt-1 block">
                    {previous.orgName} · {previous.start} – {previous.end}
                  </span>
                </SheetLink>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-3 no-print">
              {hasResume && (
                <a href={resume.file} download className="btn btn-primary" data-track="business">
                  <Download size={18} strokeWidth={1.75} aria-hidden="true" /> Download résumé (PDF)
                </a>
              )}
              <a href="#achievements" className="btn btn-glass">
                See the results <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>

            <h2 className="t-heading section-gap">{copy.resumeTitle}</h2>
            <p className="t-body mt-1 text-2">{copy.resumeLead}</p>
            <div className="mt-5">
              <Areas items={businessSkills.expertise} />
            </div>

            <div className="section-gap grid gap-3 md:grid-cols-2">
              {businessSkills.groups.map((g) => (
                <div key={g.name} className="card">
                  <h3 className="t-label">{g.name}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="card mt-3">
              <h3 className="t-label">Platforms &amp; tools</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {businessSkills.tools.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Window>

          {/* ───────── Achievements ───────── */}
          <Window id="achievements" label="Achievements" labelId="ach-label" aria-labelledby="ach-title" data-section="achievements" data-section-label="Achievements">
            <h2 id="ach-title" className="t-title">
              {copy.achievementsTitle}
            </h2>
            <p className="t-body mt-2">{copy.achievementsLead}</p>
            <ul className="metrics mt-6">
              {businessMetrics.map((m) => (
                <li key={m.slug} className="metric" data-track="business">
                  <p className="t-metric">{m.value}</p>
                  <p className="font-medium leading-snug">{m.label}</p>
                  <p className="t-meta">{m.qualifier}</p>
                  <p className="t-meta mt-auto pt-1">{m.sourceLabel}</p>
                  <Unverified item={m} />
                </li>
              ))}
            </ul>
            <div className="card mt-4 !p-6" data-track="business">
              <AttainmentChart />
            </div>

            <h3 className="t-heading section-gap">{copy.engagementsTitle}</h3>
            <p className="t-body mt-1 text-2">{copy.engagementsLead}</p>
            <ul className="posts posts-4 mt-5">
              {engagements.map((e) => (
                <li key={e.slug}>
                  <EngagementCard e={e} headingLevel={4} />
                </li>
              ))}
            </ul>
          </Window>

          {/* ───────── Experience ───────── */}
          <Window id="experience" label="Experience" labelId="exp-label" aria-labelledby="exp-title" data-section="experience" data-section-label="Experience">
            <h2 id="exp-title" className="t-title">
              {copy.experienceTitle}
            </h2>
            <div className="mt-5 grid gap-3">
              {roles.map((r) => (
                <RoleEntry key={r.slug} r={r} />
              ))}
            </div>
            <p className="mt-5 no-print">
              <Link href="/urban-planning#resume" className="link">
                Planning experience <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </p>
          </Window>

          {/* ───────── Recognition ───────── */}
          <Window id="recognition" label="Recognition" labelId="rec-label" aria-labelledby="rec-title" data-section="recognition" data-section-label="Recognition">
            <h2 id="rec-title" className="t-title">
              {copy.recognitionTitle}
            </h2>
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
