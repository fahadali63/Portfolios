"use client";

import { Check, Download, FileText, Link2, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/contact";
import { LinkedInGlyph } from "./LinkedInGlyph";
import { routeHref, routeName, type RouteKey } from "./routes";
import { copyText, useActiveSection } from "./useActiveSection";

type Resume = { label: string; file: string };

/**
 * The reference's browser bar, given a real job: a breadcrumb of where you are
 * (Fahad Ali / Urban Planning / Portfolio, following the scroll), plus three real actions.
 * No back/forward/reload — the browser already has them.
 */
export function LocationBar({ route, resumes }: { route: RouteKey; resumes: Resume[] }) {
  const section = useActiveSection();
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menu) return;
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}${section?.id ? `#${section.id}` : ""}`;
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="locbar-wrap" data-inert-scope>
      <div className="locbar glass">
        <div className="locbar-field">
          <MapPin size={18} strokeWidth={1.75} aria-hidden="true" className="flex-none" />
          <nav aria-label="You are here" className="min-w-0">
            <ol className="crumbs">
              <li>
                <Link href="/">Fahad Ali</Link>
              </li>
              {route !== "home" && (
                <li>
                  <Link href={routeHref[route]} aria-current={section ? undefined : "page"}>
                    {routeName[route]}
                  </Link>
                </li>
              )}
              {section?.label && (
                <li aria-current="location">
                  <span>{section.label}</span>
                </li>
              )}
            </ol>
          </nav>
        </div>
        <div className="locbar-actions">
          {resumes.length > 0 && (
            <div className="relative" ref={menuRef}>
              <button
                ref={btnRef}
                type="button"
                className="btn btn-sm btn-glass"
                aria-expanded={menu}
                aria-haspopup="true"
                aria-controls="resume-menu"
                onClick={() => setMenu((m) => !m)}
              >
                <Download size={18} strokeWidth={1.75} aria-hidden="true" />
                <span className="hidden lg:inline">Download résumé</span>
                <span className="lg:hidden">Résumé</span>
              </button>
              {menu && (
                <div id="resume-menu" className="popover glass">
                  {resumes.map((r) => (
                    <a key={r.file} href={r.file} download onClick={() => setMenu(false)}>
                      <FileText size={18} strokeWidth={1.75} aria-hidden="true" />
                      <span>
                        {r.label}
                        <span className="t-meta block">PDF · generated from this site</span>
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
          <button type="button" className="icon-btn has-tip" onClick={copy} aria-label={copied ? "Link copied" : "Copy link to this section"}>
            {copied ? <Check size={20} strokeWidth={1.75} aria-hidden="true" /> : <Link2 size={20} strokeWidth={1.75} aria-hidden="true" />}
            <span className="tip tip-below" aria-hidden="true">
              {copied ? "Link copied" : "Copy link"}
            </span>
          </button>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn has-tip" aria-label="LinkedIn (opens in new tab)">
            <LinkedInGlyph size={20} />
            <span className="tip tip-below" aria-hidden="true">
              LinkedIn ↗
            </span>
          </a>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </p>
      {copied && (
        <div className="toast" aria-hidden="true">
          Link copied
        </div>
      )}
    </div>
  );
}
