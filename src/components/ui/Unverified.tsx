import { isProduction, isPublishable } from "@/content";

/** Development-only marker for items with verified: false or a TODO. Never rendered in production. */
export function Unverified({ item }: { item: { verified: boolean } }) {
  if (isProduction || isPublishable(item)) return null;
  return <span className="unverified">Unverified</span>;
}
