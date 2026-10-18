import { Award, FileBadge, Mail, Medal } from "lucide-react";
import type { Certificate } from "@/content/schema";
import { MetaList, Sheet } from "@/components/ui/Sheet";
import { Pic } from "@/components/ui/Pic";
import { ExternalLink, driveLabel } from "@/components/ui/ExternalLink";
import { Unverified } from "@/components/ui/Unverified";

export const kindLabel = { award: "Award", certificate: "Certificate", letter: "Letter", recognition: "Recognition" } as const;
export const kindIcon = { award: Medal, certificate: Award, letter: Mail, recognition: FileBadge } as const;

export function CertificateSheet({ c }: { c: Certificate }) {
  const Icon = kindIcon[c.kind];
  return (
    <Sheet
      slug={c.slug}
      title={c.title}
      narrow
      eyebrow={
        <>
          <span className="chip" data-track={c.track}>
            <span className="dot" aria-hidden="true" />
            {kindLabel[c.kind]}
          </span>
          {c.date && <span className="chip">{c.date}</span>}
          <Unverified item={c} />
        </>
      }
    >
      <div className="flex flex-col gap-5 p-[var(--pad)] pt-5">
        {c.image && c.publicPreview ? (
          <figure className="m-0 overflow-hidden rounded-[var(--r-card)] bg-[var(--mat)] p-3">
            <Pic id={c.image} alt={c.imageAlt ?? c.title} imgClassName="mx-auto max-h-[60dvh] w-auto" />
          </figure>
        ) : (
          <div className="card flex items-center gap-4">
            <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-[var(--fill-inset)]">
              <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="t-body">
              {c.publicPreview ? "The original document is available on request." : "This document shows a national ID number, so it isn't previewed publicly. The original is available on request."}
            </p>
          </div>
        )}
        {c.description && <p className="t-body">{c.description}</p>}
        <MetaList
          items={[
            ["Issued by", c.issuer],
            ["Date", c.date || undefined],
            ["Topic", c.topic],
          ]}
        />
        {c.driveUrl && c.publicPreview && (
          <div>
            <ExternalLink href={c.driveUrl} className="btn btn-glass">
              {driveLabel(c.driveUrl)}
            </ExternalLink>
          </div>
        )}
      </div>
    </Sheet>
  );
}
