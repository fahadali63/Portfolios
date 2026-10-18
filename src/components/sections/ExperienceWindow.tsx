import { lensFor, tracks } from "@/content/lens";
import { LensOnly, LensSwitch } from "@/components/ui/LensSwitch";
import { RoleRow } from "@/components/ui/RoleRow";
import { Window } from "@/components/ui/Window";

/** The reference's Messages window: roles as rows. Its switch is the Home lens — it changes the whole page. */
export function ExperienceWindow({ index = 0 }: { index?: number }) {
  return (
    <Window index={index} label="Experience" labelId="experience-label" aria-labelledby="experience-label">
      <LensSwitch compact label="Experience in" />
      {tracks.map((track) => (
        <LensOnly key={track} track={track} className="mt-3">
          <ul className="rows">
            {lensFor(track).roles.map((r) => (
              <li key={r.slug}>
                <RoleRow r={r} />
              </li>
            ))}
          </ul>
        </LensOnly>
      ))}
    </Window>
  );
}
