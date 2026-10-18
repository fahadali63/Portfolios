import { BriefcaseBusiness, Map } from "lucide-react";
import { defaultLens, tracks } from "@/content/lens";
import { site } from "@/content/site";

/**
 * Segmented switch between the two careers. Every instance on the page drives (and follows) the same
 * state: <html data-lens>. Enhancer.tsx handles clicks, remembers the choice and updates ?lens=.
 * Without JavaScript, Home shows the default lens (the current role's track).
 */
export function LensSwitch({ label = "Show my work in", compact = false }: { label?: string; compact?: boolean }) {
  return (
    <div className="segmented lens-switch" role="group" aria-label={label} style={{ ["--count" as string]: 2 }}>
      {tracks.map((t) => {
        const Icon = t === "planning" ? Map : BriefcaseBusiness;
        return (
          <button key={t} type="button" className="segment" data-lens-value={t} aria-pressed={t === defaultLens} data-track={t}>
            <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
            {compact ? (
              site.tracks[t].shortLabel
            ) : (
              <>
                <span className="lens-long">{site.tracks[t].label}</span>
                <span className="lens-short">{site.tracks[t].shortLabel}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Wraps content that belongs to one lens only. */
export function LensOnly({ track, children, as: Tag = "div", className }: { track: "planning" | "business"; children: React.ReactNode; as?: "div" | "span" | "li"; className?: string }) {
  return (
    <Tag data-lens-only={track} className={className}>
      {children}
    </Tag>
  );
}
