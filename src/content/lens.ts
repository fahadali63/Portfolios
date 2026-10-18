// The Home page "lens": everything on Home is shown for one career at a time.
// Default = the track of the current role (end: "present"), so Home leads with what Fahad is doing now.
import { businessMetrics, certificationsFor, engagements, homeHighlights, organisations, projects, research, roles, rolesFor } from "./index.ts";
import type { Metric, Track } from "./schema.ts";
import { site } from "./site.ts";
import { businessSkills, planningSkills } from "./skills.ts";

export const tracks: Track[] = ["business", "planning"];
export const defaultLens: Track = roles.find((r) => r.end === "present")?.track ?? "planning";

/** A highlight row: the number, what it is, where it comes from, and what it opens. */
export type Highlight = { slug: string; value: string; label: string; qualifier: string; item?: string; href?: string };

const fromMetric = (m: Metric): Highlight => ({ slug: m.slug, value: m.value, label: m.label, qualifier: m.qualifier, item: m.opens.item, href: m.opens.href });

export function lensFor(track: Track) {
  const t = site.tracks[track];
  const trackRoles = rolesFor(track);
  const now = trackRoles.find((r) => r.end === "present");
  const latest = now ?? trackRoles[0]!;
  const highlights: Highlight[] =
    track === "planning"
      ? [
          ...homeHighlights.filter((m) => m.track === "planning").map(fromMetric),
          { slug: "portfolio-count", value: String(projects.length), label: "Portfolio projects", qualifier: "Master plans, urban design, GIS maps and CAD", href: "/urban-planning#portfolio" },
          { slug: "research-count", value: String(research.length), label: "Research reports", qualifier: "Coursework research, UET Lahore", href: "/urban-planning#research" },
        ]
      : ["bd-projects-closed", "bd-best-month", "bd-oct-conversion", "bd-overall-conversion"]
          .map((slug) => businessMetrics.find((m) => m.slug === slug))
          .filter((m): m is Metric => !!m)
          .map((m) => ({ ...fromMetric(m), href: m.opens.item ? undefined : "/business-development#achievements" }));
  return {
    track,
    t,
    latest,
    isNow: !!now,
    roles: trackRoles,
    orgs: organisations.filter((o) => trackRoles.some((r) => r.org === o.slug)),
    aboutParagraph: site.about.paragraphs[track === "planning" ? 0 : 1]!,
    highlights,
    proofs: highlights.slice(0, 2),
    expertise: (track === "planning" ? planningSkills : businessSkills).expertise,
    tools: (track === "planning" ? planningSkills : businessSkills).tools,
    featuredProjects: track === "planning" ? projects.filter((p) => p.featured) : [],
    featuredEngagements: track === "business" ? engagements : [],
    certifications: certificationsFor(track),
  };
}
export type Lens = ReturnType<typeof lensFor>;
