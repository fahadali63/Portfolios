"use client";

import { ChevronRight } from "lucide-react";
import { useActiveSection } from "@/components/chrome/useActiveSection";

type Item = { id: string; label: string; count?: number };

/**
 * The reference's message list, used as the page's section index (desktop, sticky) and as a
 * chip bar under the top bar (tablet/phone). The active row follows the scroll.
 */
export function SectionNav({ items, label, variant }: { items: Item[]; label: string; variant: "window" | "chips" }) {
  const active = useActiveSection();
  if (variant === "chips") {
    return (
      <nav className="chipbar glass" aria-label={label}>
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} aria-current={active?.id === it.id ? "true" : undefined}>
            {it.label}
            {it.count !== undefined && <span className="count-badge">{it.count}</span>}
          </a>
        ))}
      </nav>
    );
  }
  return (
    <nav className="glass window sections-window settle" style={{ ["--i" as string]: 1 }} aria-label={label}>
      <p className="window-label mb-2">Sections</p>
      <ul className="rows">
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className="row !min-h-[52px]" aria-current={active?.id === it.id ? "true" : undefined}>
              <span className="row-main row-title">{it.label}</span>
              {it.count !== undefined && (
                <span className="count-badge" aria-label={`${it.count} items`}>
                  {it.count}
                </span>
              )}
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
