import { Award, BriefcaseBusiness, FileBadge, FileText, Mail, Map, Medal, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { media } from "@/content/media";
import type { Track } from "@/content/schema";

export type ThumbKind = "project" | "research" | "award" | "certificate" | "letter" | "recognition" | "role" | "engagement";

const icons: Record<ThumbKind, LucideIcon> = {
  project: Map,
  research: FileText,
  award: Medal,
  certificate: Award,
  letter: Mail,
  recognition: FileBadge,
  role: Map,
  engagement: BriefcaseBusiness,
};

/**
 * The "ink card" thumbnail (built by `npm run thumbs`) with its label set in HTML on top:
 * a kind chip with an icon at the top, title + subtitle at the bottom. The art is decorative (alt=""),
 * so the text here is what screen readers and search engines get.
 */
export function Thumb({
  id,
  kind,
  track,
  chip,
  title,
  sub,
  variant = "card",
  className = "",
  priority = false,
  badge,
}: {
  id: string;
  kind: ThumbKind;
  track: Track;
  chip?: string;
  title?: string;
  sub?: ReactNode;
  variant?: "card" | "mini";
  className?: string;
  priority?: boolean;
  badge?: ReactNode;
}) {
  const m = media(`thumbs/${id}`);
  const Icon = kind === "role" && track === "business" ? BriefcaseBusiness : icons[kind];
  return (
    <span className={`thumb thumb-${variant} ${className}`} data-track={track} style={{ aspectRatio: `${m.width} / ${m.height}` }}>
      <picture>
        <source srcSet={m.avif} type="image/avif" />
        <img src={m.src} width={m.width} height={m.height} alt="" loading={priority ? "eager" : "lazy"} decoding="async" />
      </picture>
      {variant === "mini" ? (
        <span className="thumb-icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.75} />
        </span>
      ) : (
        <>
          <span className="thumb-top">
            {chip && (
              <span className="thumb-chip">
                <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
                {chip}
              </span>
            )}
            {badge}
          </span>
          {(title || sub) && (
            <span className="thumb-bottom">
              {title && <span className="thumb-title">{title}</span>}
              {sub && <span className="thumb-sub">{sub}</span>}
            </span>
          )}
        </>
      )}
    </span>
  );
}
