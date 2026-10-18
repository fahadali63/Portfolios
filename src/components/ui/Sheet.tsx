import { X } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Detail sheet, rendered on the server for every item a page can open (so all text is in the HTML).
 * Enhancer.tsx opens/closes it with focus trap, Escape, swipe-down and ?item= deep links.
 * Without JavaScript it opens via #item-<slug> (:target) and closes via #close.
 */
export function Sheet({
  slug,
  title,
  eyebrow,
  children,
  narrow = false,
}: {
  slug: string;
  title: string;
  eyebrow?: ReactNode;
  children: ReactNode;
  narrow?: boolean;
}) {
  const titleId = `item-${slug}-title`;
  return (
    <div className="sheet" id={`item-${slug}`} role="dialog" aria-modal="true" aria-labelledby={titleId} data-sheet-panel={slug}>
      <a className="sheet-scrim" href="#close" data-sheet-close tabIndex={-1} aria-hidden="true" />
      <div className={`sheet-panel glass ${narrow ? "is-narrow" : ""}`} data-sheet-surface>
        <div className="sheet-grabber" aria-hidden="true" data-sheet-grabber />
        <div className="sheet-head">
          <div className="min-w-0">
            {eyebrow && <div className="mb-3 flex flex-wrap gap-2">{eyebrow}</div>}
            <h2 id={titleId} className="t-heading">
              {title}
            </h2>
          </div>
          <a href="#close" className="icon-btn has-tip" data-sheet-close role="button" aria-label="Close">
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
            <span className="tip tip-below" aria-hidden="true">
              Close (Esc)
            </span>
          </a>
        </div>
        <div className="sheet-scroll" data-sheet-scroll>
          {children}
        </div>
      </div>
    </div>
  );
}

export function MetaList({ items }: { items: [string, ReactNode | undefined | null | false][] }) {
  const rows = items.filter(([, v]) => v !== undefined && v !== null && v !== false && v !== "");
  if (!rows.length) return null;
  return (
    <dl className="meta-list">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
