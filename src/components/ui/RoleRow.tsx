import type { Role } from "@/content/schema";
import { org } from "@/content";
import { SheetLink } from "./SheetLink";
import { Thumb } from "./Thumb";
import { Unverified } from "./Unverified";

/** The reference's message row: thumbnail · organisation / role / dates · "Now" badge. Opens the role sheet. */
export function RoleRow({ r, route }: { r: Role; route?: string }) {
  const o = org(r.org);
  const dates = `${r.start} – ${r.end === "present" ? "Present" : r.end}`;
  return (
    <SheetLink slug={r.slug} route={route} className="row" label={`${r.title}, ${o.name}, ${dates}`}>
      <Thumb id={r.slug} kind="role" track={r.track} variant="mini" />
      <span className="row-main">
        <span className="row-title block">{o.name}</span>
        <span className="row-sub block">{r.title}</span>
        <span className="t-meta block">{dates}</span>
      </span>
      <span className="row-end">
        {r.end === "present" && (
          <span className="now-badge" data-track={r.track}>
            Now
          </span>
        )}
        <Unverified item={r} />
      </span>
    </SheetLink>
  );
}
