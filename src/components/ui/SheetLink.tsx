import type { ReactNode } from "react";

/**
 * Opens an item's sheet. With JavaScript the click is handled in place (and the URL becomes ?item=slug);
 * without it, the link reloads with #item-slug and CSS :target shows the same sheet.
 * Pass `route` when the sheet lives on another page.
 */
export function SheetLink({
  slug,
  route = "",
  className,
  children,
}: {
  slug: string;
  route?: string;
  className?: string;
  children: ReactNode;
  /** kept for call sites; the link is named by its visible text (WCAG 2.5.3 label-in-name) */
  label?: string;
}) {
  return (
    <a href={`${route}?item=${slug}#item-${slug}`} data-sheet={route ? undefined : slug} className={className} aria-haspopup={route ? undefined : "dialog"}>
      {children}
    </a>
  );
}
