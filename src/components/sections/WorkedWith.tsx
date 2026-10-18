import { lensFor, tracks } from "@/content/lens";
import { LensOnly } from "@/components/ui/LensSwitch";
import { SheetLink } from "@/components/ui/SheetLink";
import { Thumb } from "@/components/ui/Thumb";
import { Window } from "@/components/ui/Window";

/** The reference's Customers row: organisations in the chosen career, each opening its most recent role. */
export function WorkedWith({ index = 0 }: { index?: number }) {
  return (
    <Window index={index} label="Worked with" labelId="worked-label" aria-labelledby="worked-label">
      {tracks.map((track) => {
        const L = lensFor(track);
        return (
          <LensOnly key={track} track={track}>
            <ul className="orgs">
              {L.orgs.map((o) => {
                const role = L.roles.find((r) => r.org === o.slug)!;
                return (
                  <li key={o.slug}>
                    <SheetLink slug={role.slug} className="org" label={`${o.name} — ${role.title}`}>
                      <Thumb id={role.slug} kind="role" track={track} variant="mini" />
                      {o.name}
                    </SheetLink>
                  </li>
                );
              })}
            </ul>
          </LensOnly>
        );
      })}
    </Window>
  );
}
