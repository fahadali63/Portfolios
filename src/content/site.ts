// Who Fahad is, the two track profiles, navigation and SEO text.
// Copy is verbatim from the v1 site (fahadalicv.netlify.app) unless marked "new in v2".

export const site = {
  /** Change this when a custom domain is added (used for canonical, Open Graph, sitemap). */
  domain: "https://fahadalicv.netlify.app",
  name: "Fahad Ali",
  firstName: "Fahad",
  positioning: "Town Planner & GIS Specialist · Business Development",
  location: "Lahore, Pakistan",
  city: "Lahore",
  country: "PK",

  hero: {
    eyebrow: "Lahore, Pakistan",
    tagline: ["Spatial thinking.", "Commercial instinct."] as const,
    intro:
      "I'm a City & Regional Planning student at UET Lahore who has led a GIS digitization team on a province-wide programme and, alongside it, run business development for a creative studio — winning enterprise clients through discovery calls and tailored proposals.",
    badges: {
      planning: { label: "Latest in planning", text: "GIS Team Lead · Suthra Punjab", opens: "role-spatio-team-lead" },
      business: { label: "In business development", text: "100+ projects closed", opens: "role-ideas-specialist" },
    },
  },

  about: {
    title: "Two careers, one way of working.",
    paragraphs: [
      "My planning work started in the field: land-use surveys for a district master plan, land-use conversion cases at the Lahore Development Authority, and then cadastral GIS work at The Spatio — first digitizing 13 districts for the PULSE programme, later leading a team on Suthra Punjab.",
      "In parallel I built a second career in business development at Ideas Animation Studio, owning the cycle from first outreach on Upwork and Fiverr through discovery calls, proposals and negotiation to delivery hand-over.",
      "The two tracks meet in one habit: taking something complex — a 2,828-acre master plan or a client's half-formed brief — and turning it into a clear, structured proposal people can say yes to.",
    ],
  },

  availability: "Open to planning, GIS and business development roles",
  /** new in v2 — the status pill on identity cards */
  availabilityShort: "Open to roles",

  photoAlt: "Fahad Ali, standing, in a black waistcoat over a black shirt",

  tracks: {
    planning: {
      label: "Urban Planning",
      shortLabel: "Planning",
      href: "/urban-planning",
      cta: "Explore Urban Planning",
      title: "Town Planner & GIS Specialist",
      eyebrow: "Urban Planning · GIS",
      headline: "Planning from the parcel to the province.",
      homeIntro:
        "Public-sector planning, master-plan fieldwork and province-scale cadastral GIS — backed by studio work from housing schemes to a 2,828-acre master plan.",
      summary:
        "City & Regional Planning student at UET Lahore with hands-on experience across public-sector planning, district master-planning fieldwork and large-scale cadastral GIS. Most recently led a GIS team digitizing mauzas across Punjab for the Suthra Punjab initiative.",
      closing: "Planning or GIS role in mind?",
    },
    business: {
      label: "Business Development",
      shortLabel: "Business",
      href: "/business-development",
      cta: "Explore Business Development",
      title: "Business Development & Lead Generation",
      eyebrow: "Business Development · Sales",
      headline: "From first message to signed scope.",
      homeIntro:
        "End-to-end B2B business development — lead generation on Upwork, Fiverr and LinkedIn, discovery calls, proposals and closing, through to delivery hand-over.",
      summary:
        "B2B business developer who owns the full cycle — sourcing and qualifying opportunities, running discovery calls, writing proposals and pitch decks, negotiating, and handing over to delivery. Built a track record of enterprise wins on Upwork and Fiverr for a creative studio, and now works in sales and marketing for an engineering-services firm.",
      closing: "Need someone to grow your pipeline?",
    },
  },

  /** Section headings carried over from v1 */
  copy: {
    profilesTitle: "Two profiles. Pick your lens.",
    highlightsTitle: "Numbers from the record.",
    highlightsLead: "Every figure here comes from my resumes, completion letters, drawings or sales portfolio.",
    featuredTitle: "Plans, places and maps.",
    featuredLead: "A selection from my planning portfolio. Open any project to preview the drawings.",
    recognitionTitle: "Recognised along the way.",
    connectTitle: "Let's connect.",
    connectLead: "The fastest way to reach me is email or LinkedIn.",
    planning: {
      expertiseTitle: "Planning expertise.",
      expertiseLead: "What I bring to a planning or GIS team, grounded in the work below.",
      experienceTitle: "Where I've worked.",
      portfolioTitle: "Master plans, urban design and GIS.",
      portfolioLead: "Studio and professional work. Group projects are credited inside each preview.",
      researchTitle: "Academic research.",
      researchLead:
        "Coursework research at the Department of City & Regional Planning, UET Lahore, from transit-oriented development to heritage conservation.",
      certTitle: "Certificates, letters & awards.",
      certLead: "Completion letters that show my national ID number are listed without a public preview.",
    },
    business: {
      resumeTitle: "What I own in the sales cycle.",
      resumeLead: "Lead generation, client acquisition, proposals and delivery coordination, handled end to end.",
      achievementsTitle: "Results, by the numbers.",
      achievementsLead: "Figures from my business development resume, LinkedIn and sales portfolio at Ideas Animation Studio.",
      engagementsTitle: "Wins I sourced and closed.",
      engagementsLead: "Client names are withheld for confidentiality.",
      experienceTitle: "Career timeline.",
      recognitionTitle: "Awards & credentials.",
    },
    contact: {
      title: "Let's talk.",
      lead: "Write to me directly or use the form.",
    },
    notFound: { title: "This page isn't on the plan.", button: "Back home" },
  },

  seo: {
    home: {
      title: "Fahad Ali — Town Planner & GIS Specialist · Business Development",
      description:
        "Portfolio of Fahad Ali, a Lahore-based City & Regional Planning student (UET) with GIS team-lead experience on Punjab cadastral programmes and a business development track record winning enterprise clients.",
    },
    planning: {
      title: "Urban Planning & GIS",
      description:
        "Fahad Ali's town planning and GIS profile: experience at The Spatio, LDA and on a NESPAK master-plan project, plus master plans, urban design, GIS maps, research and certifications.",
    },
    business: {
      title: "Business Development",
      description:
        "Fahad Ali's business development profile: 100+ projects closed, 100% meeting conversion in October 2025, enterprise engagements and target performance at Ideas Animation Studio.",
    },
    contact: {
      title: "Contact",
      description: "Get in touch with Fahad Ali about town planning, GIS or business development opportunities in Lahore and remotely.",
    },
  },
} as const;

/** Primary navigation (rail on desktop, tab bar on phones). */
export const nav = [
  { key: "home", label: "Home", short: "Home", href: "/" },
  { key: "planning", label: "Urban Planning", short: "Planning", href: "/urban-planning" },
  { key: "business", label: "Business Development", short: "Business", href: "/business-development" },
  { key: "contact", label: "Contact", short: "Contact", href: "/contact" },
] as const;

/** Sections on each profile page, in order (anchors kept from v1). */
export const sections = {
  planning: [
    { id: "resume", label: "Resume" },
    { id: "portfolio", label: "Portfolio" },
    { id: "research", label: "Research" },
    { id: "certifications", label: "Certifications" },
  ],
  business: [
    { id: "resume", label: "Resume" },
    { id: "achievements", label: "Achievements" },
    { id: "experience", label: "Experience" },
    { id: "recognition", label: "Recognition" },
  ],
} as const;
