import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { lensFor } from "@/content/lens";
import type { Engagement, Project } from "@/content/schema";
import { site } from "@/content/site";
import { LensOnly } from "@/components/ui/LensSwitch";
import { SheetLink } from "@/components/ui/SheetLink";
import { Thumb } from "@/components/ui/Thumb";
import { Window } from "@/components/ui/Window";

/** A "Top Posts" card with real jobs: category + place, View project, the thumbnail, key facts. */
export function PostCard({ p }: { p: Project }) {
  return (
    <article className="card post" aria-labelledby={`post-${p.slug}`}>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="chip" data-track="planning">
            <span className="dot" aria-hidden="true" />
            {p.category}
          </span>
          {p.location && (
            <p className="t-meta mt-2 inline-flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={1.75} aria-hidden="true" /> {p.location}
              {p.year ? ` · ${p.year}` : ""}
            </p>
          )}
        </div>
        <SheetLink slug={p.slug} className="btn btn-sm btn-outline flex-none" label={`View project: ${p.title}`}>
          View project
        </SheetLink>
      </header>
      <SheetLink slug={p.slug} className="block" label={`View project: ${p.title}`}>
        <Thumb id={`project-${p.slug}`} kind="project" track="planning" title={p.title} sub={p.keyFacts[0]} />
      </SheetLink>
      {p.keyFacts.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Key facts">
          {p.keyFacts.map((f) => (
            <li key={f} className="chip">
              {f}
            </li>
          ))}
        </ul>
      )}
      <h3 id={`post-${p.slug}`} className="sr-only">
        {p.title}
      </h3>
    </article>
  );
}

/** An engagement as a post card: who (withheld), value, scope, how it was won, terms. */
export function EngagementCard({ e, headingLevel = 3 }: { e: Engagement; headingLevel?: 3 | 4 }) {
  const H = `h${headingLevel}` as "h3" | "h4";
  return (
    <article className="card post" aria-labelledby={`eng-${e.slug}`}>
      <Thumb id={`engagement-${e.slug}`} kind="engagement" track="business" chip={e.terms} badge={<span className="value-pill">{e.value}</span>} title={e.descriptor} />
      <H id={`eng-${e.slug}`} className="t-subhead !font-semibold">
        {e.title}
      </H>
      <p className="text-[0.9375rem] leading-relaxed text-2">{e.how}</p>
    </article>
  );
}

export function FeaturedWork() {
  const P = lensFor("planning");
  const B = lensFor("business");
  return (
    <Window id="featured" label="Featured work" labelId="featured-label" aria-labelledby="featured-label" data-section="featured" data-section-label="Featured work" className="mb-gap">
      <LensOnly track="planning">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="t-title">{site.copy.featuredTitle}</h2>
            <p className="t-body mt-2">{site.copy.featuredLead}</p>
          </div>
          <Link href="/urban-planning#portfolio" className="link">
            Full portfolio <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
        <div className="posts mt-6">
          {P.featuredProjects.map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </div>
      </LensOnly>
      <LensOnly track="business">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="t-title">{site.copy.business.engagementsTitle}</h2>
            <p className="t-body mt-2">{site.copy.business.engagementsLead}</p>
          </div>
          <Link href="/business-development#achievements" className="link">
            All results <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
        <div className="posts posts-4 mt-6">
          {B.featuredEngagements.map((e) => (
            <EngagementCard key={e.slug} e={e} />
          ))}
        </div>
      </LensOnly>
    </Window>
  );
}
