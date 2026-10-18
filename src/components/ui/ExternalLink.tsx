import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/** Opens in a new tab, with a visible glyph and a screen-reader note. */
export function ExternalLink({ href, children, className = "link", showIcon = true }: { href: string; children: ReactNode; className?: string; showIcon?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {showIcon && <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

/** A Drive folder holds several files, so its button says so; a single file is "Open full file". */
export const driveLabel = (url: string, fileLabel = "Open full file") => (url.includes("/folders/") ? "View files on Google Drive" : fileLabel);
