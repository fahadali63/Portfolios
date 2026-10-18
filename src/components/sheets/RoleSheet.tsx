import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { Role } from "@/content/schema";
import { org } from "@/content";
import { Sheet } from "@/components/ui/Sheet";
import { Mono } from "@/components/ui/Mono";
import { TrackChip } from "@/components/ui/TrackChip";
import { Unverified } from "@/components/ui/Unverified";

export const roleDates = (r: Role) => `${r.start} – ${r.end === "present" ? "Present" : r.end}`;

export function RoleSheet({ r, showProfileLink = true }: { r: Role; showProfileLink?: boolean }) {
  const o = org(r.org);
  const profile = r.track === "planning" ? "/urban-planning#resume" : "/business-development#experience";
  return (
    <Sheet
      slug={r.slug}
      title={r.title}
      narrow
      eyebrow={
        <>
          <TrackChip track={r.track} />
          {r.end === "present" && (
            <span className="now-badge" data-track={r.track}>
              Now
            </span>
          )}
          <Unverified item={r} />
        </>
      }
    >
      <div className="flex flex-col gap-5 p-[var(--pad)] pt-5">
        <div className="flex items-center gap-4">
          <Mono short={o.short} track={r.track} size={48} />
          <div className="min-w-0">
            <p className="t-subhead">{r.orgName}</p>
            <p className="t-meta">
              {roleDates(r)}
              {r.project ? ` · ${r.project}` : ""}
            </p>
            <p className="t-meta inline-flex items-center gap-1.5">
              <MapPin size={13} strokeWidth={1.75} aria-hidden="true" /> {r.location}
            </p>
          </div>
        </div>
        {r.summary && <p className="t-body">{r.summary}</p>}
        {r.bullets.length > 0 && (
          <ul className="grid gap-2.5 pl-0">
            {r.bullets.map((b) => (
              <li key={b} className="t-body grid grid-cols-[14px_1fr] gap-2" data-track={r.track}>
                <span aria-hidden="true" className="mt-[10px] h-[6px] w-[6px] rounded-full bg-[var(--track)]" />
                {b}
              </li>
            ))}
          </ul>
        )}
        {r.note && <p className="t-meta border-t border-[var(--hairline)] pt-4">{r.note}</p>}
        {showProfileLink && (
          <div>
            <Link href={profile} className="link">
              See the full {r.track === "planning" ? "planning" : "business"} profile <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </Sheet>
  );
}
