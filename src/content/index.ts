// The one place pages read content from. In production, anything unverified or still containing
// "TODO" is left out; in development it is shown with an "Unverified" badge.
import { certifications as allCertifications } from "./certifications.ts";
import { engagements as allEngagements } from "./engagements.ts";
import { organisations, roles as allRoles } from "./experience.ts";
import { attainment, businessMetrics as allBusinessMetrics, homeHighlights as allHighlights } from "./metrics.ts";
import { projects as allProjects } from "./projects.ts";
import { research as allResearch } from "./research.ts";
import type { Track } from "./schema.ts";

export const isProduction = process.env.NODE_ENV === "production";

/** True if any string anywhere in the item starts a TODO. */
export function hasTodo(value: unknown): boolean {
  if (typeof value === "string") return /\bTODO\b/.test(value);
  if (Array.isArray(value)) return value.some(hasTodo);
  if (value && typeof value === "object") return Object.values(value).some(hasTodo);
  return false;
}

export const isPublishable = (item: { verified: boolean }) => item.verified && !hasTodo(item);
const publish = <T extends { verified: boolean }>(items: T[]) => (isProduction ? items.filter(isPublishable) : items);

export const roles = publish(allRoles);
export const projects = publish(allProjects);
export const research = publish(allResearch);
export const certifications = publish(allCertifications);
export const engagements = publish(allEngagements);
export const homeHighlights = publish(allHighlights);
export const businessMetrics = publish(allBusinessMetrics);
export { attainment, organisations };

export const rolesFor = (track: Track) => roles.filter((r) => r.track === track);
export const certificationsFor = (track: Track) => certifications.filter((c) => c.track === track);
export const org = (slug: string) => {
  const o = organisations.find((x) => x.slug === slug);
  if (!o) throw new Error(`Unknown organisation "${slug}" in src/content/experience.ts`);
  return o;
};

/** Where each kind of item lives (its sheet opens on this page). */
export function homeRouteOf(slug: string): string {
  if (projects.some((p) => p.slug === slug) || research.some((r) => r.slug === slug)) return "/urban-planning";
  const role = roles.find((r) => r.slug === slug);
  if (role) return role.track === "planning" ? "/urban-planning" : "/business-development";
  const cert = certifications.find((c) => c.slug === slug);
  if (cert) return cert.track === "planning" ? "/urban-planning" : "/business-development";
  if (engagements.some((e) => e.slug === slug)) return "/business-development";
  return "/";
}
