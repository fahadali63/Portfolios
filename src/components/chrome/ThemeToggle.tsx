"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Light / dark switch. Remembers the choice; until one is made, the system setting decides. */
export function ThemeToggle({ className = "rail-item has-tip", withTip = true }: { className?: string; withTip?: boolean }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
    const mq = matchMedia("(prefers-color-scheme: light)");
    const onSystem = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {}
      if (stored) return;
      const t = mq.matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", t);
      setTheme(t);
    };
    mq.addEventListener("change", onSystem);
    const onOther = () => setTheme((document.documentElement.getAttribute("data-theme") as Theme) || "dark");
    window.addEventListener("theme:change", onOther);
    return () => {
      mq.removeEventListener("change", onSystem);
      window.removeEventListener("theme:change", onOther);
    };
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";
  const toggle = () => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#efe8de" : "#14100d");
    setTheme(next);
    window.dispatchEvent(new CustomEvent("theme:change"));
  };

  const label = theme ? `Switch to ${next} appearance` : "Switch appearance";
  return (
    <button type="button" className={className} onClick={toggle} aria-label={label}>
      {theme === "light" ? <Moon size={22} strokeWidth={1.75} aria-hidden="true" /> : <Sun size={22} strokeWidth={1.75} aria-hidden="true" />}
      {withTip && (
        <span className="tip" aria-hidden="true">
          {theme === "light" ? "Dark appearance" : "Light appearance"}
        </span>
      )}
    </button>
  );
}
