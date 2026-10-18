"use client";

import { useEffect, useState } from "react";

export type Section = { id: string; label: string };

/** Scroll-spy over elements marked data-section / data-section-label. */
export function useActiveSection(): Section | null {
  const [active, setActive] = useState<Section | null>(null);
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!els.length) return;
    const visible = new Map<HTMLElement, number>();
    const pick = () => {
      // The section whose top is closest above the 35% line wins.
      const line = window.innerHeight * 0.35;
      let best: HTMLElement | null = null;
      for (const el of els) {
        const top = el.getBoundingClientRect().top;
        if (top <= line) best = el;
      }
      setActive(best ? { id: best.id || best.dataset.section!, label: best.dataset.sectionLabel || "" } : null);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target as HTMLElement, e.intersectionRatio));
        pick();
      },
      { threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    window.addEventListener("scroll", pick, { passive: true });
    pick();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", pick);
    };
  }, []);
  return active;
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}
