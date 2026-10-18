import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { contact } from "@/content/contact";
import { education } from "@/content/education";
import { site } from "@/content/site";
import { NavRail } from "@/components/chrome/NavRail";
import { TabBar } from "@/components/chrome/TabBar";
import { SearchSheet } from "@/components/chrome/SearchSheet";
import { Enhancer } from "@/components/chrome/Enhancer";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap", variable: "--font-poppins" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: site.seo.home.title, template: `%s — ${site.name}` },
  description: site.seo.home.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: contact.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.seo.home.title,
    description: site.seo.home.description,
    url: "/",
    locale: "en_GB",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: `${site.name} — ${site.positioning}` }],
  },
  twitter: { card: "summary_large_image", title: site.seo.home.title, description: site.seo.home.description, images: ["/og/home.png"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

// Runs before first paint: theme (stored choice, else system), and the Home lens (?lens=, stored choice, else current role).
const BEFORE_PAINT = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t);var l=new URLSearchParams(location.search).get('lens')||localStorage.getItem('lens');if(l==='planning'||l==='business')d.setAttribute('data-lens',l)}catch(e){}})()`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efe8de" },
    { media: "(prefers-color-scheme: dark)", color: "#14100d" },
  ],
  colorScheme: "dark light",
  viewportFit: "cover",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.domain}/#person`,
  name: site.name,
  url: site.domain,
  image: `${site.domain}/og/home.png`,
  jobTitle: ["Town Planner", "GIS Specialist", "Sales & Marketing Specialist"],
  worksFor: { "@type": "Organization", name: "Innotec Engineering Services" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Engineering and Technology, Lahore" },
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.country },
  email: `mailto:${contact.email}`,
  sameAs: [contact.linkedin],
  knowsAbout: ["Town planning", "GIS", "Cadastral mapping", "Urban design", "Business development", "Lead generation"],
  hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: `${education.degree} (${education.period})` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BEFORE_PAINT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavRail />
        <div className="shell">{children}</div>
        <TabBar />
        <SearchSheet />
        <Enhancer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
