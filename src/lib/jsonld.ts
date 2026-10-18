import { site } from "@/content/site";

/** schema.org ProfilePage for the two profile routes, pointing at the Person in the root layout. */
export function profilePageJsonLd(pathname: string, seo: { title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${seo.title} — ${site.name}`,
    description: seo.description,
    url: `${site.domain}${pathname}`,
    mainEntity: { "@id": `${site.domain}/#person` },
  };
}
