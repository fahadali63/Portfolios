import type { Certificate } from "@/content/schema";
import { kindLabel } from "@/components/sheets/CertificateSheet";
import { SheetLink } from "./SheetLink";
import { Thumb } from "./Thumb";

/** Certificate / award tile: the ink card (document glimpse or seal), a kind icon, a short title and the issuer. */
export function StoryTile({ c, route }: { c: Certificate; route?: string }) {
  return (
    <SheetLink slug={c.slug} route={route} className="story" label={`View ${kindLabel[c.kind].toLowerCase()}: ${c.title}, ${c.issuer}`}>
      <Thumb
        id={`cert-${c.slug}`}
        kind={c.kind}
        track={c.track}
        chip={c.publicPreview ? kindLabel[c.kind] : "No public preview"}
        title={c.date || undefined}
      />
      <span className="story-title">
        {shortTitle(c.title)}
        <span className="t-meta block font-normal">{c.issuer}</span>
      </span>
    </SheetLink>
  );
}

/** "Best Effort Award — Winter School …" → "Best Effort Award" for the tile; the sheet has the full title. */
const shortTitle = (t: string) => t.split(" — ")[0]!;
