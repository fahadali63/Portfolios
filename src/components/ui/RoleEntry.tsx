import { MapPin } from "lucide-react";
import type { Role } from "@/content/schema";
import { org } from "@/content";
import { Thumb } from "./Thumb";
import { Unverified } from "./Unverified";

/** Full role entry for the profile pages: date, title, organisation, project, location, bullets, note. */
export function RoleEntry({ r }: { r: Role }) {
  const o = org(r.org);
  return (
    <article className="card" data-track={r.track} aria-labelledby={`role-${r.slug}`}>
      <div className="flex flex-wrap items-start gap-4">
        <Thumb id={r.slug} kind="role" track={r.track} variant="mini" className="!w-[56px]" />
        <div className="min-w-0 flex-1">
          <p className="t-meta flex flex-wrap items-center gap-2">
            <time>{r.start}</time> – <time>{r.end === "present" ? "Present" : r.end}</time>
            {r.end === "present" && (
              <span className="now-badge" data-track={r.track}>
                Now
              </span>
            )}
            <Unverified item={r} />
          </p>
          <h3 id={`role-${r.slug}`} className="t-heading mt-1">
            {r.title}
          </h3>
          <p className="mt-0.5 font-medium">{r.orgName}</p>
          <p className="t-meta mt-0.5 flex flex-wrap items-center gap-x-1.5">
            {r.project && <span>{r.project} ·</span>}
            <MapPin size={13} strokeWidth={1.75} aria-hidden="true" /> {r.location}
          </p>
        </div>
      </div>
      {r.summary && <p className="t-body mt-4">{r.summary}</p>}
      {r.bullets.length > 0 && (
        <ul className="mt-4 grid gap-2">
          {r.bullets.map((b) => (
            <li key={b} className="grid grid-cols-[14px_1fr] gap-2 text-[0.9375rem] leading-relaxed">
              <span aria-hidden="true" className="mt-[10px] h-[6px] w-[6px] rounded-full bg-[var(--track)]" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {r.note && <p className="t-meta mt-4 border-t border-[var(--hairline)] pt-3">{r.note}</p>}
    </article>
  );
}
