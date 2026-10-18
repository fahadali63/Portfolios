"use client";

import { Check, Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { routeName, type RouteKey } from "./routes";
import { copyText, useActiveSection } from "./useActiveSection";
import { ThemeToggle } from "./ThemeToggle";

/** Phones: compact top bar — logo, where you are, Copy link. */
export function TopBar({ route }: { route: RouteKey }) {
  const section = useActiveSection();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}${section?.id ? `#${section.id}` : ""}`;
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <header className="topbar glass" data-inert-scope>
      <Link href="/" aria-label="Fahad Ali — home" className="grid h-11 w-11 flex-none place-items-center">
        <img src="/brand/logo-mark.svg" width={32} height={32} alt="" />
      </Link>
      <p className="topbar-title" aria-live="off">
        {section?.label && route !== "home" ? `${routeName[route]} · ${section.label}` : route === "home" ? section?.label || "Fahad Ali" : routeName[route]}
      </p>
      <ThemeToggle className="icon-btn" withTip={false} />
      <button type="button" className="icon-btn" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check size={20} strokeWidth={1.75} aria-hidden="true" /> : <Link2 size={20} strokeWidth={1.75} aria-hidden="true" />}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </p>
      {copied && (
        <div className="toast" aria-hidden="true">
          Link copied
        </div>
      )}
    </header>
  );
}
