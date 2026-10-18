// Route keys and display names used by the chrome.
export type RouteKey = "home" | "planning" | "business" | "contact" | "404";

export const routeName: Record<RouteKey, string> = {
  home: "Home",
  planning: "Urban Planning",
  business: "Business Development",
  contact: "Contact",
  "404": "Page not found",
};

export const routeHref: Record<RouteKey, string> = {
  home: "/",
  planning: "/urban-planning",
  business: "/business-development",
  contact: "/contact",
  "404": "/",
};

export function routeFromPath(path: string): RouteKey {
  const p = path.replace(/\/$/, "").replace(/\.html$/, "") || "/";
  if (p === "/") return "home";
  if (p.startsWith("/urban-planning")) return "planning";
  if (p.startsWith("/business-development")) return "business";
  if (p.startsWith("/contact")) return "contact";
  return "404";
}
