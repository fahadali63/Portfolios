"use client";

import { useEffect, useState } from "react";

/** "It's 9:41 pm in Lahore" — so visitors know when a reply is likely. Static text without JavaScript. */
export function LocalTime({ timeZone, city }: { timeZone: string; city: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "numeric", minute: "2-digit", hour12: true });
    const tick = () => setNow(fmt.format(new Date()).replace(" ", " ").toLowerCase());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return <span suppressHydrationWarning>{now ? `It's ${now} in ${city}` : `${city} · Pakistan Standard Time (UTC+5)`}</span>;
}
