import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { contact } from "@/content/contact";
import { education } from "@/content/education";
import { lensFor, tracks } from "@/content/lens";
import { site } from "@/content/site";
import { Pic } from "@/components/ui/Pic";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { LensOnly, LensSwitch } from "@/components/ui/LensSwitch";
import { SheetLink } from "@/components/ui/SheetLink";

/** Home cover: who he is, what he's doing now (in the chosen career), proof, and how to reach him. */
export function Cover() {
  return (
    <section className="cover lens-tint" aria-labelledby="cover-title" data-section="top" data-section-label="">
      <div className="cover-text">
        <p className="eyebrow">
          <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
          {site.hero.eyebrow}
        </p>
        <h1 id="cover-title" className="t-display mt-4">
          {site.name}
        </h1>
        <p className="cover-tagline">
          {site.hero.tagline[0]}
          <br />
          {site.hero.tagline[1]}
        </p>

        <div className="mt-7">
          <LensSwitch />
          <p id="lens-status" className="sr-only" role="status" aria-live="polite" />
        </div>

        {tracks.map((track) => {
          const L = lensFor(track);
          const r = L.latest;
          return (
            <LensOnly key={track} track={track}>
              <SheetLink slug={r.slug} className="now-line glass mt-5 inline-flex" label={`${L.isNow ? "Now" : "Latest"}: ${r.title}, ${r.orgName}`}>
                <span className="now-badge" data-track={track}>
                  {L.isNow ? "Now" : "Latest"}
                </span>
                <span>
                  <strong>{r.title}</strong> · {r.orgName.split(" — ")[0]}
                </span>
                <span className="t-meta">{r.end === "present" ? `since ${r.start}` : `${r.start} – ${r.end}`}</span>
              </SheetLink>
              {track === "planning" && (
                <p className="t-meta mt-3">
                  Studying {education.degree}, {education.schoolShort} · {education.period}
                </p>
              )}
              <p className="t-body mt-5 max-w-[56ch]">{L.t.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={L.t.href} className="btn btn-primary" data-track={track}>
                  {L.t.cta} <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </Link>
                <Link href="/contact" className="btn btn-glass">
                  Get in touch
                </Link>
              </div>
            </LensOnly>
          );
        })}
        <p className="mt-4 flex flex-wrap items-center gap-x-6">
          <ExternalLink href={contact.linkedin}>LinkedIn</ExternalLink>
          <a href={`mailto:${contact.email}`} className="link">
            Email me
          </a>
        </p>
      </div>

      <div className="portrait-stage">
        <Pic id="portrait/fahad-photo" alt={site.photoAlt} className="portrait-photo" priority sizes="(max-width: 1023px) 340px, 420px" />
        {tracks.map((track) =>
          lensFor(track).proofs.map((p, i) => {
            const cls = `proof proof-${i + 1} glass`;
            const inner = (
              <>
                <span className="proof-value" data-track={track}>
                  {p.value}
                </span>
                <span className="proof-label">{p.label}</span>
              </>
            );
            return (
              <LensOnly key={`${track}-${p.slug}`} track={track}>
                {p.item ? (
                  <SheetLink slug={p.item} className={cls} label={`${p.value} ${p.label}`}>
                    {inner}
                  </SheetLink>
                ) : (
                  <Link href={p.href!} className={cls}>
                    {inner}
                  </Link>
                )}
              </LensOnly>
            );
          })
        )}
      </div>
    </section>
  );
}
