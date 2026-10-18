"use client";

import { ArrowRight, BriefcaseBusiness, FileText, Award, Map as MapIcon, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/app/search-index.json/route";
import { openSheet } from "./events";

const groups = ["Projects", "Research", "Certificates & letters", "Experience"] as const;
const groupIcon = { Projects: MapIcon, Research: FileText, "Certificates & letters": Award, Experience: BriefcaseBusiness } as const;

/** The search sheet: opens from the rail/tab bar, "/" or ⌘K / Ctrl+K. Index is built at build time. */
export function SearchSheet() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [error, setError] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    setQ("");
    setTimeout(() => returnFocus.current?.focus({ preventScroll: true }), 0);
  }, []);

  useEffect(() => {
    window.addEventListener("search:open", show);
    return () => window.removeEventListener("search:open", show);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const scopes = document.querySelectorAll<HTMLElement>("[data-inert-scope]");
    scopes.forEach((s) => s.setAttribute("inert", ""));
    document.documentElement.style.overflow = "hidden";
    input.current?.focus();
    if (!items)
      fetch("/search-index.json")
        .then((r) => r.json())
        .then(setItems)
        .catch(() => setError(true));
    return () => {
      scopes.forEach((s) => s.removeAttribute("inert"));
      document.documentElement.style.overflow = "";
    };
  }, [open, items]);

  const results = useMemo(() => {
    if (!items) return [];
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const matched = words.length ? items.filter((it) => words.every((w) => it.text.toLowerCase().includes(w) || it.title.toLowerCase().includes(w))) : items.filter((it) => it.group !== "Experience").slice(0, 0);
    return matched;
  }, [items, q]);

  const go = (it: SearchItem) => {
    const here = (pathname || "/").replace(/\/$/, "") || "/";
    hide();
    if (here === it.route && document.getElementById(`item-${it.slug}`)) {
      setTimeout(() => openSheet(it.slug), 10);
    } else {
      router.push(`${it.route}?item=${it.slug}`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      hide();
    }
    if (e.key === "Enter" && (e.target as HTMLElement) === input.current && results[0]) {
      e.preventDefault();
      go(results[0]);
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const links = Array.from(panel.current?.querySelectorAll<HTMLElement>("[data-result]") ?? []);
      if (!links.length) return;
      e.preventDefault();
      const i = links.indexOf(document.activeElement as HTMLElement);
      const next = e.key === "ArrowDown" ? (i < 0 ? 0 : Math.min(links.length - 1, i + 1)) : i <= 0 ? -1 : i - 1;
      if (next < 0) input.current?.focus();
      else links[next]!.focus();
    }
    if (e.key === "Tab") {
      const f = Array.from(panel.current?.querySelectorAll<HTMLElement>("input, button, [data-result]") ?? []);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) (e.preventDefault(), f[f.length - 1]!.focus());
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) (e.preventDefault(), f[0]!.focus());
    }
  };

  if (!open) return null;
  return (
    <div className="sheet" data-open role="dialog" aria-modal="true" aria-labelledby="search-title" onKeyDown={onKeyDown}>
      <div className="sheet-scrim" onClick={hide} aria-hidden="true" />
      <div className="sheet-panel glass is-narrow" ref={panel} style={{ maxHeight: "min(720px, calc(100dvh - 48px))" }}>
        <div className="sheet-grabber" aria-hidden="true" />
        <div className="sheet-head">
          <h2 id="search-title" className="t-heading">
            Search
          </h2>
          <button type="button" className="icon-btn" onClick={hide} aria-label="Close search">
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <div className="px-[var(--pad)] pt-4">
          <div className="search-field">
            <Search size={20} strokeWidth={1.75} aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Search projects, research, certificates and experience
            </label>
            <input
              id="site-search"
              ref={input}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, research, certificates…"
              autoComplete="off"
              spellCheck={false}
              aria-describedby="search-hint"
            />
          </div>
          <p id="search-hint" className="t-meta mt-3">
            Enter opens the first result · ↑ ↓ to move · Esc to close
          </p>
        </div>
        <div className="sheet-scroll px-[var(--pad)] pb-[var(--pad)] pt-4">
          <p className="sr-only" role="status" aria-live="polite">
            {q ? `${results.length} ${results.length === 1 ? "result" : "results"}` : ""}
          </p>
          {error && <p className="t-body">The search index didn't load. Check your connection and try again.</p>}
          {!q && !error && (
            <p className="t-body text-2">Try “master plan”, “GIS”, “heritage”, “Upwork” or an organisation name.</p>
          )}
          {q && items && results.length === 0 && <p className="t-body">Nothing matches “{q}”. Try a shorter word.</p>}
          {groups.map((g) => {
            const list = results.filter((r) => r.group === g);
            if (!list.length) return null;
            const Icon = groupIcon[g];
            return (
              <section key={g} aria-labelledby={`sg-${g}`} className="mb-5">
                <h3 id={`sg-${g}`} className="window-label mb-1 flex items-center gap-2">
                  <Icon size={16} strokeWidth={1.75} aria-hidden="true" /> {g}
                </h3>
                <ul className="rows">
                  {list.map((it) => (
                    <li key={it.slug}>
                      <a
                        href={`${it.route}?item=${it.slug}`}
                        className="row"
                        data-result
                        onClick={(e) => {
                          e.preventDefault();
                          go(it);
                        }}
                      >
                        <span className="row-main">
                          <span className="row-title block">{it.title}</span>
                          <span className="row-sub block">{it.sub}</span>
                        </span>
                        <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
