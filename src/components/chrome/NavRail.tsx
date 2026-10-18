"use client";

import { BriefcaseBusiness, House, Map, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/content/contact";
import { LinkedInGlyph } from "./LinkedInGlyph";
import { routeFromPath } from "./routes";
import { openSearch } from "./events";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { key: "home", href: "/", label: "Home", Icon: House },
  { key: "planning", href: "/urban-planning", label: "Urban Planning", Icon: Map },
  { key: "business", href: "/business-development", label: "Business Development", Icon: BriefcaseBusiness },
] as const;

/** Floating navigation rail (≥ 768 px). Tooltips appear on hover and on keyboard focus. */
export function NavRail() {
  const current = routeFromPath(usePathname() || "/");
  return (
    <nav className="rail glass" aria-label="Main" data-inert-scope>
      {items.map(({ key, href, label, Icon }) => (
        <Link key={key} href={href} className="rail-item has-tip" aria-label={label} aria-current={current === key ? "page" : undefined}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
          <span className="tip" aria-hidden="true">
            {label}
          </span>
        </Link>
      ))}
      <button type="button" className="rail-item has-tip" aria-label="Search" aria-keyshortcuts="/ Control+K Meta+K" onClick={openSearch}>
        <Search size={22} strokeWidth={1.75} aria-hidden="true" />
        <span className="tip" aria-hidden="true">
          Search <kbd>/</kbd>
        </span>
      </button>
      <Link href="/contact" className="rail-item has-tip" aria-label="Contact" aria-current={current === "contact" ? "page" : undefined}>
        <MessageCircle size={22} strokeWidth={1.75} aria-hidden="true" />
        <span className="tip" aria-hidden="true">
          Contact
        </span>
      </Link>
      <span className="rail-sep" aria-hidden="true" />
      <ThemeToggle />
      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="rail-item has-tip" aria-label="LinkedIn (opens in new tab)">
        <LinkedInGlyph size={22} />
        <span className="tip" aria-hidden="true">
          LinkedIn ↗
        </span>
      </a>
    </nav>
  );
}
