"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive enhancement for server-rendered markup, via event delegation (no extra React state):
 *  - sheets: open/close, ?item= deep links, back button, focus trap, Escape, swipe-down, inert background
 *  - galleries inside sheets: prev/next + "Sheet n of m"
 *  - segmented controls (tabs, arrow keys)
 *  - portfolio search + filter chips
 *  - horizontal scrollers with prev/next buttons
 *  - copy buttons
 *  - "/" and ⌘K / Ctrl+K open search
 * Everything here is optional: without JavaScript the content is all present and sheets open via #item-<slug>.
 */
export function Enhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    let openEl: HTMLElement | null = null;
    let returnFocus: HTMLElement | null = null;
    let pushed = false;

    const sheetFor = (slug: string) => document.getElementById(`item-${slug}`);
    const focusables = (el: HTMLElement) =>
      Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])')).filter(
        (x) => !x.hasAttribute("hidden") && x.offsetParent !== null && !x.closest("[hidden]")
      );

    const setInert = (on: boolean) => {
      document.querySelectorAll<HTMLElement>("[data-inert-scope]").forEach((el) => {
        if (on) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
      root.style.overflow = on ? "hidden" : "";
    };

    function open(slug: string, opts: { push?: boolean; trigger?: HTMLElement | null } = {}) {
      const el = sheetFor(slug);
      if (!el) return false;
      if (openEl && openEl !== el) closeEl(false);
      returnFocus = opts.trigger ?? (document.activeElement as HTMLElement | null);
      el.setAttribute("data-open", "");
      openEl = el;
      setInert(true);
      initGalleries(el);
      const title = el.querySelector<HTMLElement>("h2");
      if (title) {
        title.tabIndex = -1;
        title.focus({ preventScroll: true });
      }
      const url = new URL(window.location.href);
      if (url.searchParams.get("item") !== slug || url.hash) {
        url.searchParams.set("item", slug);
        url.hash = "";
        if (opts.push) {
          history.pushState({ sheet: slug }, "", url);
          pushed = true;
        } else history.replaceState(history.state, "", url);
      }
      return true;
    }

    function closeEl(restoreFocus = true) {
      if (!openEl) return;
      openEl.removeAttribute("data-open");
      openEl = null;
      setInert(false);
      if (restoreFocus && returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
      returnFocus = null;
    }

    function close() {
      if (!openEl) return;
      if (pushed) {
        pushed = false;
        history.back(); // popstate closes it
        return;
      }
      closeEl();
      const url = new URL(window.location.href);
      url.searchParams.delete("item");
      if (url.hash.startsWith("#item-")) url.hash = "";
      history.replaceState(history.state, "", url);
    }

    function syncFromUrl() {
      const url = new URL(window.location.href);
      const slug = url.searchParams.get("item") || (url.hash.startsWith("#item-") ? url.hash.slice(6) : "");
      if (slug && sheetFor(slug)) {
        if (openEl?.id !== `item-${slug}`) open(slug);
      } else if (openEl) closeEl();
    }

    // ── Galleries ──
    function initGalleries(scope: HTMLElement) {
      scope.querySelectorAll<HTMLElement>("[data-gallery]").forEach((g) => {
        if (g.dataset.ready) return;
        g.dataset.ready = "1";
        const controls = g.parentElement?.querySelector<HTMLElement>("[data-gallery-controls]");
        if (!controls) return;
        controls.hidden = false;
        const count = controls.querySelector<HTMLElement>("[data-gallery-count]");
        const total = g.children.length;
        const index = () => Math.round(g.scrollLeft / g.clientWidth);
        const update = () => {
          if (count) count.textContent = `Sheet ${index() + 1} of ${total}`;
        };
        const go = (d: number) => g.scrollTo({ left: Math.max(0, Math.min(total - 1, index() + d)) * g.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        controls.querySelector("[data-gallery-prev]")?.addEventListener("click", () => go(-1));
        controls.querySelector("[data-gallery-next]")?.addEventListener("click", () => go(1));
        g.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
        g.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight") (e.preventDefault(), go(1));
          if (e.key === "ArrowLeft") (e.preventDefault(), go(-1));
        });
      });
    }

    // ── Lens (Home): one career at a time ──
    function setLens(v: "planning" | "business", announce = false) {
      root.setAttribute("data-lens", v);
      try {
        localStorage.setItem("lens", v);
      } catch {}
      document.querySelectorAll<HTMLElement>("[data-lens-value]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lensValue === v)));
      if (document.querySelector("[data-lens-only]")) {
        const url = new URL(window.location.href);
        url.searchParams.set("lens", v);
        history.replaceState(history.state, "", url);
      }
      const live = document.getElementById("lens-status");
      if (live && announce) live.textContent = v === "planning" ? "Showing Urban Planning" : "Showing Business Development";
    }

    // ── Segmented controls ──
    function selectSegment(group: HTMLElement, tab: HTMLElement, focus = false) {
      const tabs = Array.from(group.querySelectorAll<HTMLElement>('[role="tab"]'));
      tabs.forEach((t, i) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls") || "");
        if (panel) panel.hidden = !on;
        if (on) group.style.setProperty("--index", String(i));
      });
      if (focus) tab.focus();
    }

    // ── Filters (portfolio) ──
    function applyFilter(scope: HTMLElement) {
      const q = (scope.querySelector<HTMLInputElement>("[data-filter-search]")?.value || "").trim().toLowerCase();
      const cat = scope.querySelector<HTMLElement>('[data-filter-chip][aria-pressed="true"]')?.dataset.filterChip || "All";
      let shown = 0;
      scope.querySelectorAll<HTMLElement>("[data-filter-item]").forEach((item) => {
        const okCat = cat === "All" || item.dataset.category === cat;
        const okText = !q || (item.dataset.text || "").includes(q);
        item.hidden = !(okCat && okText);
        if (!item.hidden) shown++;
      });
      const status = scope.querySelector<HTMLElement>("[data-filter-status]");
      if (status) status.textContent = shown === 0 ? "No projects match. Try another word or choose All." : `${shown} ${shown === 1 ? "project" : "projects"} shown`;
      const empty = scope.querySelector<HTMLElement>("[data-filter-empty]");
      if (empty) empty.hidden = shown !== 0;
    }

    // ── Event delegation ──
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const trigger = t.closest<HTMLElement>("[data-sheet]");
      if (trigger) {
        if (open(trigger.dataset.sheet!, { push: true, trigger })) e.preventDefault();
        return;
      }
      if (t.closest("[data-sheet-close]")) {
        e.preventDefault();
        close();
        return;
      }
      const lensBtn = t.closest<HTMLElement>("[data-lens-value]");
      if (lensBtn) {
        setLens(lensBtn.dataset.lensValue as "planning" | "business", true);
        return;
      }
      const tab = t.closest<HTMLElement>('[data-segmented] [role="tab"]');
      if (tab) {
        selectSegment(tab.closest<HTMLElement>("[data-segmented]")!, tab);
        return;
      }
      const chip = t.closest<HTMLElement>("[data-filter-chip]");
      if (chip) {
        const scope = chip.closest<HTMLElement>("[data-filter-scope]")!;
        scope.querySelectorAll("[data-filter-chip]").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        applyFilter(scope);
        return;
      }
      const sc = t.closest<HTMLElement>("[data-scroller-prev],[data-scroller-next]");
      if (sc) {
        const target = document.getElementById(sc.getAttribute("aria-controls") || "");
        if (target) target.scrollBy({ left: (sc.hasAttribute("data-scroller-next") ? 1 : -1) * target.clientWidth * 0.8, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        return;
      }
      const copyBtn = t.closest<HTMLElement>("[data-copy]");
      if (copyBtn) {
        const text = copyBtn.dataset.copy!;
        navigator.clipboard?.writeText(text).then(() => {
          const label = copyBtn.querySelector<HTMLElement>("[data-copy-label]");
          const status = document.getElementById(copyBtn.getAttribute("aria-describedby") || "");
          const prev = label?.textContent;
          if (label) label.textContent = "Copied";
          if (status) status.textContent = "Copied to clipboard";
          setTimeout(() => {
            if (label && prev) label.textContent = prev;
            if (status) status.textContent = "";
          }, 2000);
        });
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable;

      if (openEl) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
          return;
        }
        if (e.key === "Tab") {
          const f = focusables(openEl);
          if (!f.length) return;
          const first = f[0]!;
          const last = f[f.length - 1]!;
          if (e.shiftKey && (document.activeElement === first || !openEl.contains(document.activeElement))) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
        return;
      }

      // Arrow keys in segmented controls
      if (target.getAttribute("role") === "tab" && target.closest("[data-segmented]")) {
        const group = target.closest<HTMLElement>("[data-segmented]")!;
        const tabs = Array.from(group.querySelectorAll<HTMLElement>('[role="tab"]'));
        const i = tabs.indexOf(target);
        const next = e.key === "ArrowRight" ? tabs[(i + 1) % tabs.length] : e.key === "ArrowLeft" ? tabs[(i - 1 + tabs.length) % tabs.length] : e.key === "Home" ? tabs[0] : e.key === "End" ? tabs[tabs.length - 1] : null;
        if (next) {
          e.preventDefault();
          selectSegment(group, next, true);
        }
        return;
      }

      if (!typing && (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"))) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("search:open"));
      }
    };

    const onInput = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.matches("[data-filter-search]")) applyFilter(t.closest<HTMLElement>("[data-filter-scope]")!);
    };

    // Swipe down on the sheet's top area (phones) to close.
    let startY = 0;
    let tracking = false;
    const onTouchStart = (e: TouchEvent) => {
      if (!openEl) return;
      const t = e.target as HTMLElement;
      const head = t.closest("[data-sheet-grabber], .sheet-head");
      const scroller = openEl.querySelector<HTMLElement>("[data-sheet-scroll]");
      tracking = !!head || (!!scroller && scroller.contains(t) && scroller.scrollTop <= 0);
      startY = e.touches[0]!.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!tracking || !openEl) return;
      const dy = e.touches[0]!.clientY - startY;
      const panel = openEl.querySelector<HTMLElement>("[data-sheet-surface]");
      if (panel && dy > 0) panel.style.transform = `translateY(${dy}px)`;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking || !openEl) return;
      tracking = false;
      const dy = e.changedTouches[0]!.clientY - startY;
      const panel = openEl.querySelector<HTMLElement>("[data-sheet-surface]");
      if (panel) panel.style.transform = "";
      if (dy > 90) close();
    };

    const onPop = () => {
      pushed = false;
      syncFromUrl();
    };
    const onOpenEvent = (e: Event) => open((e as CustomEvent<string>).detail, { push: true });

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    document.addEventListener("input", onInput);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", syncFromUrl);
    window.addEventListener("sheet:open", onOpenEvent);

    // Sync lens switches with the lens chosen before paint (URL, stored choice or default).
    const lensNow = root.getAttribute("data-lens");
    if (lensNow === "planning" || lensNow === "business") setLens(lensNow);

    // Show scroller buttons and segmented thumbs now that JS is here.
    document.querySelectorAll<HTMLElement>("[data-js-only]").forEach((el) => (el.hidden = false));
    syncFromUrl();

    return () => {
      closeEl(false);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("input", onInput);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", syncFromUrl);
      window.removeEventListener("sheet:open", onOpenEvent);
    };
  }, [pathname]);

  return null;
}
