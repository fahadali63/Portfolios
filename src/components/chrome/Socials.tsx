import { Mail } from "lucide-react";
import { contact } from "@/content/contact";
import { LinkedInGlyph } from "./LinkedInGlyph";
import { InstagramGlyph, WhatsAppGlyph } from "./SocialGlyphs";

/** Every way to reach Fahad, in one list (footer, contact page). */
export const socials = [
  { key: "email", label: "Email", value: contact.email, href: `mailto:${contact.email}`, Icon: ({ size = 20 }: { size?: number }) => <Mail size={size} strokeWidth={1.75} aria-hidden="true" />, external: false },
  { key: "whatsapp", label: "WhatsApp", value: contact.whatsappLabel, href: contact.whatsapp, Icon: WhatsAppGlyph, external: true },
  { key: "linkedin", label: "LinkedIn", value: contact.linkedinLabel, href: contact.linkedin, Icon: LinkedInGlyph, external: true },
  { key: "instagram", label: "Instagram", value: contact.instagramLabel, href: contact.instagram, Icon: InstagramGlyph, external: true },
] as const;

/** Round icon buttons with visible labels underneath. */
export function SocialButtons() {
  return (
    <ul className="socials">
      {socials.map(({ key, label, href, Icon, external }) => (
        <li key={key}>
          <a href={href} className="social" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <span className="social-icon">
              <Icon size={22} />
            </span>
            <span className="social-label">{label}</span>
            {external && <span className="sr-only"> (opens in new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
