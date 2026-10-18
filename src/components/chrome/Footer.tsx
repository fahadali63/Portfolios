import { ArrowUp, Compass } from "lucide-react";
import Link from "next/link";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { LocalTime } from "./LocalTime";
import { SocialButtons } from "./Socials";

/**
 * Sign-off window: the tagline set large, a location stamp with the live time in Lahore,
 * every way to get in touch, the four routes and a way back up.
 */
export function Footer() {
  return (
    <footer className="footer glass" data-inert-scope aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Get in touch and site links
      </h2>
      <p className="footer-tagline" aria-hidden="true">
        <span>
          {site.hero.tagline[0].replace(".", "")}
          <i className="footer-dot" data-track="planning" />
        </span>
        <span>
          {site.hero.tagline[1].replace(".", "")}
          <i className="footer-dot" data-track="business" />
        </span>
      </p>

      <div className="footer-grid">
        <div>
          <p className="footer-name">
            <img src="/brand/logo-mark.svg" width={40} height={40} alt="" />
            {site.name}
          </p>
          <p className="t-meta mt-2">{site.positioning}</p>
          <p className="stamp mt-5">
            <Compass size={16} strokeWidth={1.75} aria-hidden="true" />
            <span>
              <span className="block font-medium">{contact.coordinates}</span>
              <span className="t-meta block">
                <LocalTime timeZone={contact.timeZone} city={site.city} />
              </span>
            </span>
          </p>
          <p className="status-pill mt-4">
            <span className="ring" aria-hidden="true" />
            {site.availability}
          </p>
        </div>

        <div>
          <p className="window-label mb-3">Reach me directly</p>
          <SocialButtons />
        </div>

        <nav aria-label="Footer">
          <p className="window-label mb-2">Explore</p>
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/urban-planning">Urban Planning</Link>
            </li>
            <li>
              <Link href="/business-development">Business Development</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <a href="#main" className="inline-flex items-center gap-1.5">
                Back to top <ArrowUp size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer-base">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </span>
        <span>Backdrop: a generated map — contours, a radial master plan and a transit line.</span>
      </div>
    </footer>
  );
}
