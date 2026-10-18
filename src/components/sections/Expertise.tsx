import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { lensFor, tracks } from "@/content/lens";
import { Areas } from "@/components/ui/Areas";
import { LensOnly } from "@/components/ui/LensSwitch";
import { TrackChip } from "@/components/ui/TrackChip";
import { Window } from "@/components/ui/Window";

/** What Fahad brings in the chosen career: title, one-paragraph pitch, six areas, the way in. */
export function Expertise() {
  return (
    <Window id="expertise" label="Expertise" labelId="expertise-label" aria-labelledby="expertise-label" data-section="expertise" data-section-label="Expertise" className="mb-gap lens-tint">
      {tracks.map((track) => {
        const L = lensFor(track);
        return (
          <LensOnly key={track} track={track}>
            <div className="grid items-end gap-4 lg:grid-cols-[1fr_auto]">
              <div>
                <TrackChip track={track} />
                <h2 className="t-title mt-4">{L.t.title}</h2>
                <p className="t-body mt-3">{L.t.homeIntro}</p>
              </div>
              <Link href={L.t.href} className="btn btn-primary justify-self-start" data-track={track}>
                {L.t.cta} <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6">
              <Areas items={L.expertise} />
            </div>
          </LensOnly>
        );
      })}
    </Window>
  );
}
