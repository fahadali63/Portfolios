// Headline numbers and the monthly attainment chart. Every number keeps the qualifier the v1 site gave it.
// Numbers are rendered as written here — final values are in the HTML (no counters).
import { Attainment, defineList, defineOne, Metric } from "./schema.ts";

/** Home: "Selected highlights" — each row opens the context the number comes from. */
export const homeHighlights = defineList("metrics.ts (homeHighlights)", Metric, [
  {
    slug: "districts-digitized",
    value: "13",
    label: "Districts digitized",
    qualifier: "Cadastral & survey data for the PULSE project, Punjab",
    track: "planning",
    sourceLabel: "per The Spatio's completion letter",
    opens: { item: "role-spatio-gis-specialist" },
    source: "site:/ #highlights",
    verified: true,
  },
  {
    slug: "acre-master-plan",
    value: "2,828",
    label: "Acre master plan",
    qualifier: "FA Avenue 1 — largest studio plan, UET Lahore",
    track: "planning",
    sourceLabel: "source: drawing title block",
    opens: { item: "fa-avenue-1" },
    source: "site:/ #highlights",
    verified: true,
  },
  {
    slug: "projects-closed",
    value: "100+",
    label: "Projects closed",
    qualifier: "Business development at Ideas Animation Studio",
    track: "business",
    sourceLabel: "source: business development résumé",
    opens: { item: "role-ideas-specialist" },
    source: "site:/ #highlights",
    verified: true,
  },
  {
    slug: "best-month",
    value: "138%",
    label: "Best month vs. target",
    qualifier: "$11,055 locked against an $8,000 target",
    track: "business",
    sourceLabel: "source: sales portfolio",
    opens: { href: "/business-development#achievements" },
    source: "site:/ #highlights",
    verified: true,
  },
]);

/** Business page: four metric tiles. */
export const businessMetrics = defineList("metrics.ts (businessMetrics)", Metric, [
  {
    slug: "bd-projects-closed",
    value: "100+",
    label: "Projects closed",
    qualifier: "Ideas Animation Studio, via Upwork, Fiverr and direct outreach",
    track: "business",
    sourceLabel: "source: business development résumé",
    opens: { item: "role-ideas-specialist" },
    source: "site:/business-development#achievements",
    verified: true,
  },
  {
    slug: "bd-oct-conversion",
    value: "100%",
    label: "Meeting conversion, Oct 2025",
    qualifier: "Every client meeting that month (7–8 calls) converted",
    track: "business",
    sourceLabel: "source: sales portfolio",
    opens: {},
    source: "site:/business-development#achievements",
    verified: true,
  },
  {
    slug: "bd-overall-conversion",
    value: "80%+",
    label: "Overall meeting conversion",
    qualifier: "Client meetings converted to signed work",
    track: "business",
    sourceLabel: "source: LinkedIn",
    opens: {},
    source: "site:/business-development#achievements",
    verified: true,
  },
  {
    slug: "bd-best-month",
    value: "138%",
    label: "Best month vs. target",
    qualifier: "$11,055 locked against an $8,000 monthly target",
    track: "business",
    sourceLabel: "source: sales portfolio",
    opens: {},
    source: "site:/business-development#achievements",
    verified: true,
  },
]);

export const attainment = defineOne("metrics.ts (attainment)", Attainment, {
  title: "Monthly target vs. locked revenue",
  period: "Jul – Dec 2025",
  currency: "USD",
  sourceLabel: "source: sales portfolio",
  months: [
    { month: "Jul", target: 2000, locked: 1737 },
    { month: "Aug", target: 4000, locked: 1935 },
    { month: "Sep", target: 4000, locked: 4900 },
    { month: "Oct", target: 6000, locked: 3350 },
    { month: "Nov", target: 8000, locked: 11055 },
    { month: "Dec", target: 8000, locked: 9500 },
  ],
  source: "site:/business-development#achievements chart; MY BDE Portfolio.pdf p7–p8",
  verified: true,
});

export const pctOfTarget = (m: { target: number; locked: number }) => Math.round((m.locked / m.target) * 100);
