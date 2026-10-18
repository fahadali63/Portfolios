"use client";

import { BriefcaseBusiness, House, Map, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeFromPath } from "./routes";
import { openSearch } from "./events";

/** Phones (< 768 px): bottom tab bar, five labelled items, always visible. */
export function TabBar() {
  const current = routeFromPath(usePathname() || "/");
  const tab = (key: string) => (current === key ? "page" : undefined);
  return (
    <nav className="tabbar glass" aria-label="Main" data-inert-scope>
      <Link href="/" className="tab" aria-current={tab("home")}>
        <House size={22} strokeWidth={1.75} aria-hidden="true" />
        Home
      </Link>
      <Link href="/urban-planning" className="tab" aria-current={tab("planning")}>
        <Map size={22} strokeWidth={1.75} aria-hidden="true" />
        Planning
      </Link>
      <Link href="/business-development" className="tab" aria-current={tab("business")}>
        <BriefcaseBusiness size={22} strokeWidth={1.75} aria-hidden="true" />
        Business
      </Link>
      <button type="button" className="tab" onClick={openSearch}>
        <Search size={22} strokeWidth={1.75} aria-hidden="true" />
        Search
      </button>
      <Link href="/contact" className="tab" aria-current={tab("contact")}>
        <MessageCircle size={22} strokeWidth={1.75} aria-hidden="true" />
        Contact
      </Link>
    </nav>
  );
}
