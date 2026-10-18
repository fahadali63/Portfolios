import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
import { PageFrame } from "@/components/chrome/PageFrame";
import { Window } from "@/components/ui/Window";

export default function NotFound() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/urban-planning", label: "Urban Planning" },
    { href: "/business-development", label: "Business Development" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <PageFrame route="404">
      <Window aria-labelledby="nf-title" className="mx-auto my-[8vh] max-w-[640px]">
        <p className="window-label">404</p>
        <h1 id="nf-title" className="t-title mt-3">
          {site.copy.notFound.title}
        </h1>
        <p className="t-body mt-3">The link may be old or mistyped. These pages are all still here:</p>
        <ul className="rows rows-divided mt-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="row">
                <span className="row-main row-title">{l.label}</span>
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Window>
    </PageFrame>
  );
}
