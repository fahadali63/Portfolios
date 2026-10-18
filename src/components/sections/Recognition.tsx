import { ChevronLeft, ChevronRight } from "lucide-react";
import { lensFor, tracks } from "@/content/lens";
import { site } from "@/content/site";
import { LensOnly } from "@/components/ui/LensSwitch";
import { StoryTile } from "@/components/ui/StoryTile";
import { Window } from "@/components/ui/Window";

/** Stories row of certificates and awards for the chosen career, with visible previous/next buttons. */
export function Recognition() {
  return (
    <Window
      id="recognition"
      label="Certifications & recognition"
      labelId="recognition-label"
      aria-labelledby="recognition-label"
      data-section="recognition"
      data-section-label="Recognition"
      className="mb-gap"
      actions={
        <div className="no-print flex gap-2" data-js-only hidden>
          {(["prev", "next"] as const).map((d) => (
            <span key={d} className="contents">
              {tracks.map((track) => (
                <LensOnly key={track} track={track} as="span">
                  <button
                    type="button"
                    className="icon-btn btn-glass"
                    aria-label={d === "prev" ? "Scroll back" : "Scroll forward"}
                    aria-controls={`recognition-row-${track}`}
                    {...(d === "prev" ? { "data-scroller-prev": "" } : { "data-scroller-next": "" })}
                  >
                    {d === "prev" ? <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" /> : <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />}
                  </button>
                </LensOnly>
              ))}
            </span>
          ))}
        </div>
      }
    >
      <h2 className="t-title">{site.copy.recognitionTitle}</h2>
      {tracks.map((track) => {
        const items = lensFor(track).certifications;
        return (
          <LensOnly key={track} track={track}>
            <ul id={`recognition-row-${track}`} className="stories mt-6" tabIndex={0} aria-label={`${items.length} certificates and awards, scrolls sideways`}>
              {items.map((c) => (
                <li key={c.slug}>
                  <StoryTile c={c} />
                </li>
              ))}
            </ul>
          </LensOnly>
        );
      })}
    </Window>
  );
}
