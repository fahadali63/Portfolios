import { site } from "@/content/site";
import { Pic } from "@/components/ui/Pic";
import { LensOnly } from "@/components/ui/LensSwitch";
import { Window } from "@/components/ui/Window";

/** The reference's profile card: photo with ring, name, positioning, availability pill. */
export function IdentityCard({ index = 0, heading = true, lens = false }: { index?: number; heading?: boolean; lens?: boolean }) {
  const H = heading ? "h2" : "p";
  return (
    <Window as="div" index={index} className="!p-5 lens-tint" aria-label="Profile">
      <div className="flex items-center gap-4">
        <span className="avatar" style={{ ["--size" as string]: "64px" }}>
          <Pic id="portrait/fahad-avatar@2x" alt={site.photoAlt} />
        </span>
        <div className="min-w-0">
          <H className="t-subhead !font-semibold">{site.name}</H>
          {lens ? (
            <>
              <LensOnly track="business" as="span" className="t-meta block">
                {site.tracks.business.title}
              </LensOnly>
              <LensOnly track="planning" as="span" className="t-meta block">
                {site.tracks.planning.title}
              </LensOnly>
            </>
          ) : (
            <p className="t-meta">
              Town Planner &amp; GIS
              <br />
              Business Development
            </p>
          )}
        </div>
      </div>
      <p className="status-pill mt-4">
        <span className="ring" aria-hidden="true" />
        {site.availabilityShort}
        <span className="sr-only">: {site.availability}</span>
      </p>
    </Window>
  );
}
