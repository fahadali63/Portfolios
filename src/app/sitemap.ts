import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.domain}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.domain}/urban-planning`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.domain}/business-development`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.domain}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
