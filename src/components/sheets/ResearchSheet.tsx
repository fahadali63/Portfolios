import { FileText } from "lucide-react";
import type { Research } from "@/content/schema";
import { MetaList, Sheet } from "@/components/ui/Sheet";
import { Pic } from "@/components/ui/Pic";
import { ExternalLink, driveLabel } from "@/components/ui/ExternalLink";
import { Unverified } from "@/components/ui/Unverified";

export function ResearchSheet({ r }: { r: Research }) {
  return (
    <Sheet
      slug={r.slug}
      title={r.title}
      narrow
      eyebrow={
        <>
          <span className="chip" data-track="planning">
            <span className="dot" aria-hidden="true" />
            {r.category}
          </span>
          <span className="chip">
            <FileText size={14} strokeWidth={1.75} aria-hidden="true" />
            {r.pages} pp
          </span>
          {r.year && <span className="chip">{r.year}</span>}
          <Unverified item={r} />
        </>
      }
    >
      <div className="flex flex-col gap-5 p-[var(--pad)] pt-5">
        <p className="t-subhead">{r.topic}</p>
        <p className="t-body">{r.summary}</p>
        {r.figure && (
          <figure className="m-0 overflow-hidden rounded-[var(--r-card)] bg-[var(--mat)] p-3">
            <Pic id={r.figure.image} alt={r.figure.alt} imgClassName="mx-auto max-h-[52dvh] w-auto" />
          </figure>
        )}
        <MetaList
          items={[
            ["Course", `${r.course}, UET Lahore`],
            ["Authors", r.authors],
            ["Length", `${r.pages} pages`],
            ["Year", r.year],
            ["Type", "Academic coursework report"],
          ]}
        />
        {r.driveUrl && (
          <div>
            <ExternalLink href={r.driveUrl} className="btn btn-glass">
              {driveLabel(r.driveUrl, "Open full report")}
            </ExternalLink>
          </div>
        )}
      </div>
    </Sheet>
  );
}
