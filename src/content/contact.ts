// Contact details and external links.

/** Portfolio folder on Google Drive. This is the ONLY folder link allowed on the site (check-content enforces it). */
export const PORTFOLIO_DRIVE = "https://drive.google.com/drive/folders/1mQkZ0MWUa1Gh4jjPMZGz8N5Pdt3R_9bO";
// Résumés: generated from the profile pages by `npm run resumes` (print layout → PDF).

export const contact = {
  email: "mfahadali9463@gmail.com",
  phone: "+92 333 628 1594",
  phoneHref: "tel:+923336281594",
  linkedin: "https://www.linkedin.com/in/fahad-ali-230854280",
  linkedinLabel: "linkedin.com/in/fahad-ali-230854280",
  location: "Lahore, Pakistan",

  whatsapp: "https://api.whatsapp.com/send/?phone=923336281594",
  whatsappLabel: "+92 333 628 1594",
  instagram: "https://www.instagram.com/fahadali_63",
  instagramLabel: "@fahadali_63",

  /** The planning portfolio folder on Google Drive (portfolio material only — shared "Anyone with the link"). */
  portfolioDrive: PORTFOLIO_DRIVE,

  /** Coordinates shown in the footer's location stamp (city centre, not an address). */
  coordinates: "31.5204° N, 74.3587° E",
  timeZone: "Asia/Karachi",

  resumes: [
    { track: "planning", label: "Planning résumé", file: "/resume/fahad-ali-urban-planning.pdf" },
    { track: "business", label: "Business résumé", file: "/resume/fahad-ali-business-development.pdf" },
  ],

  /**
   * Contact form: with NEXT_PUBLIC_FORM_ENDPOINT unset, "Continue in email" opens the visitor's email
   * app with the message filled in (same as v1). Set it (e.g. a Formspree URL) to POST instead.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
} as const;
