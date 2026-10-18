import { ArrowRight, Mail } from "lucide-react";
import { LensOnly } from "@/components/ui/LensSwitch";
import Link from "next/link";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Window } from "@/components/ui/Window";

/** Closing window: availability and the three fastest ways to reach Fahad. */
export function Connect({ title = site.copy.connectTitle, id = "connect", lens = false }: { title?: string; id?: string; lens?: boolean }) {
  return (
    <Window id={id} label="Let's connect" labelId={`${id}-label`} aria-labelledby={`${id}-title`} data-section={id} data-section-label="Contact" className="mb-gap">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 id={`${id}-title`} className="t-title">
            {lens ? (
              <>
                <LensOnly track="business" as="span">
                  {site.tracks.business.closing}
                </LensOnly>
                <LensOnly track="planning" as="span">
                  {site.tracks.planning.closing}
                </LensOnly>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="t-body mt-3">
            {site.availability}. {site.copy.connectLead}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-glass">
            Get in touch <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </Link>
          <a href={`mailto:${contact.email}`} className="btn btn-glass">
            <Mail size={18} strokeWidth={1.75} aria-hidden="true" /> {contact.email}
          </a>
          <ExternalLink href={contact.linkedin} className="btn btn-glass">
            LinkedIn
          </ExternalLink>
        </div>
      </div>
    </Window>
  );
}
