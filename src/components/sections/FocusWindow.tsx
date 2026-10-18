import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content";
import { education, languages } from "@/content/education";
import { lensFor, tracks } from "@/content/lens";
import { attainment, pctOfTarget } from "@/content/metrics";
import { AttainmentChart } from "@/components/charts/AttainmentChart";
import { LensOnly } from "@/components/ui/LensSwitch";
import { SheetLink } from "@/components/ui/SheetLink";
import { Thumb } from "@/components/ui/Thumb";
import { Window } from "@/components/ui/Window";

/** Main dashboard window: the chosen career's headline, story, a featured piece of work and its evidence. */
export function FocusWindow({ index = 0 }: { index?: number }) {
  const fa = projects.find((p) => p.slug === "fa-avenue-1");
  const best = attainment.months.reduce((a, b) => (pctOfTarget(b) > pctOfTarget(a) ? b : a));
  return (
    <Window id="about" index={index} label="About" labelId="about-label" aria-labelledby="about-label" data-section="about" data-section-label="About">
      {tracks.map((track) => {
        const L = lensFor(track);
        const top = L.featuredEngagements[0];
        return (
          <LensOnly key={track} track={track}>
            <h2 className="t-title">{L.t.headline}</h2>
            <p className="t-body mt-4">{L.aboutParagraph}</p>

            {track === "planning" && fa && (
              <SheetLink slug={fa.slug} className="feature-card mt-6" label={`View project: ${fa.title}`}>
                <Thumb id={`project-${fa.slug}`} kind="project" track="planning" chip="Featured project" className="!rounded-none !aspect-[16/7]" />
                <span className="block p-5">
                  <span className="t-heading block">{fa.title}</span>
                  <span className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="t-meta inline-flex items-center gap-1.5">
                      <MapPin size={14} strokeWidth={1.75} aria-hidden="true" /> {fa.location}
                    </span>
                    <span className="text-[0.9375rem] font-semibold">{fa.keyFacts[0]}</span>
                  </span>
                </span>
              </SheetLink>
            )}

            {track === "business" && top && (
              <article className="feature-card mt-6 grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" aria-labelledby={`focus-${top.slug}`}>
                <Thumb id={`engagement-${top.slug}`} kind="engagement" track="business" chip="Largest win" className="!rounded-none" />
                <div className="flex flex-col gap-2 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="t-label !text-[var(--text-1)]">{top.descriptor}</p>
                    <span className="value-pill">{top.value}</span>
                  </div>
                  <h3 id={`focus-${top.slug}`} className="t-subhead !font-semibold">
                    {top.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-2">{top.how}</p>
                  <p className="mt-auto">
                    <span className="chip">{top.terms}</span>
                  </p>
                </div>
              </article>
            )}

            {track === "business" && (
              <div className="card mt-4 grid items-center gap-6 sm:grid-cols-[1fr_200px]" data-track="business">
                <div>
                  <p className="t-label">Results</p>
                  <p className="t-metric mt-2">{pctOfTarget(best)}%</p>
                  <p className="t-body mt-2">
                    Best month vs. target — ${best.locked.toLocaleString("en-US")} against an ${best.target.toLocaleString("en-US")} target.
                  </p>
                  <p className="t-meta mt-2 inline-flex items-center gap-2">
                    <span className="dot" aria-hidden="true" /> Monthly % of target, {attainment.period} · {attainment.sourceLabel}
                  </p>
                  <p className="mt-1">
                    <Link href="/business-development#achievements" className="link">
                      All results <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                  </p>
                </div>
                <AttainmentChart variant="mini" />
              </div>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {track === "planning" ? (
                <div className="inset flex gap-3 p-5">
                  <GraduationCap size={22} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 flex-none" />
                  <div>
                    <p className="t-label">Education</p>
                    <p className="mt-1 font-medium">{education.degree}</p>
                    <p className="t-meta">
                      {education.school} · {education.period}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="inset p-5">
                  <p className="t-label">Platforms &amp; tools</p>
                  <p className="mt-2 text-[0.9375rem]">{L.tools.join(" · ")}</p>
                </div>
              )}
              <div className="inset p-5">
                {track === "planning" ? (
                  <>
                    <p className="t-label">Software</p>
                    <p className="mt-2 text-[0.9375rem]">{L.tools.slice(0, 5).join(" · ")}</p>
                  </>
                ) : null}
                <p className={`t-label ${track === "planning" ? "mt-3" : ""}`}>Languages</p>
                <p className="mt-2 text-[0.9375rem]">{languages.join(" · ")}</p>
              </div>
            </div>
          </LensOnly>
        );
      })}
    </Window>
  );
}
