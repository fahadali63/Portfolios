import { Copy, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { PageFrame } from "@/components/chrome/PageFrame";
import { socials } from "@/components/chrome/Socials";
import { ContactForm } from "@/components/sections/ContactForm";
import { Pic } from "@/components/ui/Pic";
import { Window } from "@/components/ui/Window";

export const metadata: Metadata = {
  title: site.seo.contact.title,
  description: site.seo.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${site.seo.contact.title} — ${site.name}`,
    description: site.seo.contact.description,
    url: "/contact",
    images: [{ url: "/og/contact.png", width: 1200, height: 630, alt: `Contact ${site.name}` }],
  },
  twitter: { title: `${site.seo.contact.title} — ${site.name}`, description: site.seo.contact.description, images: ["/og/contact.png"] },
};

export default function ContactPage() {
  return (
    <PageFrame route="contact">
      <div className="grid items-start gap-[var(--gap)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="stack">
          <Window index={0} aria-labelledby="contact-title" className="overflow-hidden">
            <div className="grid items-end gap-4 sm:grid-cols-[1fr_200px]">
              <div className="pb-2">
                <p className="window-label">Contact</p>
                <h1 id="contact-title" className="t-title mt-3">
                  {site.copy.contact.title}
                </h1>
                <p className="t-body mt-3">
                  {site.availability}. {site.copy.contact.lead}
                </p>
                <div className="mt-6">
                  <p className="t-subhead !font-semibold">{site.name}</p>
                  <p className="t-meta">{site.positioning}</p>
                  <p className="t-meta mt-1 inline-flex items-center gap-1.5">
                    <MapPin size={14} strokeWidth={1.75} aria-hidden="true" /> {site.location}
                  </p>
                </div>
                <p className="status-pill mt-4">
                  <span className="ring" aria-hidden="true" />
                  {site.availabilityShort}
                </p>
              </div>
              <div className="hidden w-[200px] flex-none sm:block">
                <Pic id="portrait/fahad-photo" alt={site.photoAlt} className="portrait-photo" sizes="200px" />
              </div>
            </div>
          </Window>

          <Window index={1} label="Reach me directly" labelId="methods-label" aria-labelledby="methods-label">
            <ul className="rows rows-divided">
              {socials.map(({ key, label, value, href, Icon, external }) => (
                <li key={key} className="flex items-center gap-2">
                  <a href={href} className="row flex-1 !mr-0 !w-auto" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <span className="social-icon !h-11 !w-11 flex-none">
                      <Icon size={20} />
                    </span>
                    <span className="row-main">
                      <span className="t-meta block">{label}</span>
                      <span className="row-title block break-all">{value}</span>
                    </span>
                    {external && <span className="sr-only">(opens in new tab)</span>}
                  </a>
                  {key === "email" && (
                    <button type="button" className="btn btn-sm btn-glass flex-none" data-copy={contact.email} aria-describedby="copy-status" data-js-only hidden>
                      <Copy size={16} strokeWidth={1.75} aria-hidden="true" />
                      <span data-copy-label>Copy</span>
                      <span className="sr-only"> email address</span>
                    </button>
                  )}
                </li>
              ))}
              <li>
                <a href={contact.phoneHref} className="row">
                  <span className="social-icon !h-11 !w-11 flex-none">
                    <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="row-main">
                    <span className="t-meta block">Phone</span>
                    <span className="row-title block">{contact.phone}</span>
                  </span>
                </a>
              </li>
            </ul>
            <p id="copy-status" className="sr-only" role="status" aria-live="polite" />
          </Window>
        </div>

        <Window index={2} label="Send a message" labelId="form-label" aria-labelledby="form-label">
          <ContactForm />
        </Window>
      </div>
    </PageFrame>
  );
}
