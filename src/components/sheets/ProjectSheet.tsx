import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { Project } from "@/content/schema";
import { MetaList, Sheet } from "@/components/ui/Sheet";
import { Pic } from "@/components/ui/Pic";
import { ExternalLink, driveLabel } from "@/components/ui/ExternalLink";
import { Unverified } from "@/components/ui/Unverified";

export function ProjectSheet({ p }: { p: Project }) {
  const many = p.pages.length > 1;
  return (
    <Sheet
      slug={p.slug}
      title={p.title}
      eyebrow={
        <>
          <span className="chip" data-track="planning">
            <span className="dot" aria-hidden="true" />
            {p.category}
          </span>
          {p.location && (
            <span className="chip">
              <MapPin size={14} strokeWidth={1.75} aria-hidden="true" />
              {p.location}
            </span>
          )}
          <Unverified item={p} />
        </>
      }
    >
      <div className="grid gap-6 p-[var(--pad)] pt-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="min-w-0">
          <div className="gallery" data-gallery tabIndex={0} role="region" aria-label={`Drawings — ${p.pages.length} ${p.pages.length === 1 ? "sheet" : "sheets"}`}>
            {p.pages.map((pg, i) => (
              <figure key={pg.image} aria-label={many ? `Sheet ${i + 1} of ${p.pages.length}` : undefined}>
                <Pic id={pg.image} alt={pg.alt} />
              </figure>
            ))}
          </div>
          {many && (
            <div className="mt-3 flex items-center justify-between gap-3 no-print" data-gallery-controls hidden>
              <button type="button" className="icon-btn btn-glass" data-gallery-prev aria-label="Previous sheet">
                <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <p className="t-meta" aria-live="polite" data-gallery-count>
                Sheet 1 of {p.pages.length}
              </p>
              <button type="button" className="icon-btn btn-glass" data-gallery-next aria-label="Next sheet">
                <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <p className="t-body">{p.summary}</p>
          {p.contribution && (
            <p className="t-body">
              <span className="font-semibold">Contribution. </span>
              {p.contribution}
            </p>
          )}
          <MetaList
            items={[
              ["Location", p.location],
              ["Year", p.year],
              ["Key facts", p.keyFacts.length ? p.keyFacts.join(" · ") : undefined],
              ["Credit", p.credit],
              ["Tools & tags", p.tools.join(" · ")],
            ]}
          />
          {p.driveUrl && (
            <div>
              <ExternalLink href={p.driveUrl} className="btn btn-glass">
                {driveLabel(p.driveUrl)}
              </ExternalLink>
            </div>
          )}
        </div>
      </div>
    </Sheet>
  );
}
