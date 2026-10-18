// Build-time search index (static file /search-index.json). No external service.
import { certifications, homeRouteOf, projects, research, roles } from "@/content";

export const dynamic = "force-static";

export type SearchItem = { group: string; slug: string; title: string; sub: string; route: string; text: string };

export function GET() {
  const items: SearchItem[] = [
    ...projects.map((p) => ({
      group: "Projects",
      slug: p.slug,
      title: p.title,
      sub: [p.category, p.location, p.year].filter(Boolean).join(" · "),
      route: homeRouteOf(p.slug),
      text: [p.title, p.category, p.location, p.summary, p.keyFacts.join(" "), p.tools.join(" "), p.credit].join(" "),
    })),
    ...research.map((r) => ({
      group: "Research",
      slug: r.slug,
      title: r.title,
      sub: `${r.category} · ${r.pages} pp${r.year ? ` · ${r.year}` : ""}`,
      route: homeRouteOf(r.slug),
      text: [r.title, r.topic, r.category, r.summary, r.course].join(" "),
    })),
    ...certifications.map((c) => ({
      group: "Certificates & letters",
      slug: c.slug,
      title: c.title,
      sub: [c.issuer, c.date].filter(Boolean).join(" · "),
      route: homeRouteOf(c.slug),
      text: [c.title, c.issuer, c.topic, c.description].join(" "),
    })),
    ...roles.map((r) => ({
      group: "Experience",
      slug: r.slug,
      title: `${r.title} — ${r.orgName}`,
      sub: `${r.start} – ${r.end === "present" ? "Present" : r.end}${r.project ? ` · ${r.project}` : ""}`,
      route: homeRouteOf(r.slug),
      text: [r.title, r.orgName, r.project, r.location, r.bullets.join(" ")].join(" "),
    })),
  ];
  return Response.json(items);
}
