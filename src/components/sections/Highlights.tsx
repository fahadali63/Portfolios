import { BriefcaseBusiness, ChevronRight, Map } from "lucide-react";
import { lensFor, tracks } from "@/content/lens";
import { site } from "@/content/site";
import { LensOnly } from "@/components/ui/LensSwitch";
import { Window } from "@/components/ui/Window";

/** The reference's "Your open projects" list: numbered rows, each opening the source of the number. */
export function Highlights({ index = 0 }: { index?: number }) {
  return (
    <Window id="highlights" index={index} label="Selected highlights" labelId="highlights-label" aria-labelledby="highlights-label" data-section="highlights" data-section-label="Highlights">
      <h2 className="t-heading">{site.copy.highlightsTitle}</h2>
      {tracks.map((track) => {
        const Icon = track === "planning" ? Map : BriefcaseBusiness;
        return (
          <LensOnly key={track} track={track}>
            <ol className="rows rows-divided mt-3" data-track={track}>
              {lensFor(track).highlights.map((m, i) => (
                <li key={m.slug}>
                  <a href={m.item ? `?item=${m.item}#item-${m.item}` : m.href} data-sheet={m.item} className="row" aria-haspopup={m.item ? "dialog" : undefined}>
                    <span className="num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="row-main">
                      <span className="row-title block">
                        <span className="text-[1.125rem] font-semibold tabular-nums">{m.value}</span> {m.label.toLowerCase()}
                      </span>
                      <span className="row-sub flex items-start gap-1.5">
                        <Icon size={13} strokeWidth={1.75} aria-hidden="true" className="mt-[3px] flex-none" style={{ color: "var(--track)" }} />
                        <span>{m.qualifier}</span>
                      </span>
                    </span>
                    <span className="chev" aria-hidden="true">
                      <ChevronRight size={16} strokeWidth={1.75} />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </LensOnly>
        );
      })}
    </Window>
  );
}
