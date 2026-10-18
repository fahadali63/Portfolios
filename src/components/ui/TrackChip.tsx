import { BriefcaseBusiness, Map } from "lucide-react";
import type { Track } from "@/content/schema";

/** Track is never shown by colour alone: dot + icon + name. */
export function TrackChip({ track, label }: { track: Track; label?: string }) {
  const Icon = track === "planning" ? Map : BriefcaseBusiness;
  return (
    <span className="chip" data-track={track}>
      <span className="dot" aria-hidden="true" />
      <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
      {label ?? (track === "planning" ? "Urban Planning" : "Business Development")}
    </span>
  );
}
