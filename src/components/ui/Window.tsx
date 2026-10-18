import type { ReactNode } from "react";

/**
 * A top-level glass window. Windows never nest windows — inside, use .card / .inset fills.
 * `index` staggers the settle-in animation (first three windows only).
 */
export function Window({
  id,
  label,
  labelId,
  actions,
  children,
  className = "",
  index = 0,
  as: Tag = "section",
  track,
  ...rest
}: {
  id?: string;
  label?: ReactNode;
  labelId?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "section" | "div" | "article" | "aside" | "nav";
  track?: "planning" | "business";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "data-section"?: string;
  "data-section-label"?: string;
}) {
  return (
    <Tag id={id} className={`glass window settle ${className}`} style={{ ["--i" as string]: index }} data-track={track} {...rest}>
      {(label || actions) && (
        <div className="window-head">
          {label ? (
            <p className="window-label" id={labelId}>
              {label}
            </p>
          ) : (
            <span />
          )}
          {actions}
        </div>
      )}
      {children}
    </Tag>
  );
}
