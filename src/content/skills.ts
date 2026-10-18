// Expertise areas, skills, tools and achievements for each track. Verbatim from v1.
// Sources: site:/urban-planning#resume and site:/business-development#resume.

export const planningSkills = {
  expertise: [
    { title: "Town & Master Planning", detail: "Land-use zoning, road hierarchy and layout planning — from a 300-kanal scheme to a 2,828-acre master plan." },
    { title: "GIS & Cadastral Mapping", detail: "Digitizing cadastral and survey data with attribute integrity, topological consistency and QC." },
    { title: "Urban Design", detail: "Mixed-use, transit-oriented site design with 2D drawings and 3D massing." },
    { title: "Planning Research", detail: "Transit-oriented development, heritage conservation and environmental planning studies." },
    { title: "Land-Use Regulation", detail: "Land-use conversion approvals, penalty notices and public-service workflows at LDA." },
    { title: "Field Surveys", detail: "Land-use surveys, SDZ delineation and vetting plans with local government." },
  ],
  skills: [
    "Town Planning",
    "Master Planning",
    "Site & Zoning Plans",
    "Land-Use Surveying",
    "Cadastral Mapping & Digitization",
    "GIS Data Management",
    "Topological Consistency",
    "QC & Data Verification",
    "Land-Use Conversion",
    "E-Khidmat · PM Portal · BPR Applications",
    "Team Coordination",
  ],
  tools: ["AutoCAD", "ArcGIS / ArcMap", "Google Earth Pro", "SketchUp", "Microsoft Office", "Power BI", "IBM SPSS", "Adobe Photoshop"],
  achievements: [
    "Best Effort Award — Winter School Research Questions Competition, TU Dortmund × UET Lahore (Nov 2024)",
    "Shield Award for Graphic Designing — Cultural & Sports Festival, Dept. of City & Regional Planning, UET Lahore",
    "Certificate of Appreciation — Institute of Planners Pakistan international seminar with the Lahore Chamber of Commerce & Industry (Sep 2026)",
  ],
} as const;

export const businessSkills = {
  expertise: [
    { title: "Lead Generation", detail: "Sourcing and qualifying opportunities across Upwork, Fiverr and LinkedIn outreach." },
    { title: "Client Acquisition", detail: "Consultative discovery calls that convert — 100% of client meetings in October 2025." },
    { title: "Proposals & Pitch Decks", detail: "Proposals, quotations and decks matched to each client's stated requirements." },
    { title: "Negotiation & Closing", detail: "From first conversation to signed scope, including enterprise flat-fee engagements." },
    { title: "Marketplace Optimization", detail: "Rebuilt marketplace profiles for visibility, positioning and inbound volume." },
    { title: "Delivery Coordination", detail: "Onboarding, stakeholder communication, timelines and QA/QC through to hand-over." },
  ],
  groups: [
    { name: "Business Development", items: ["Lead generation", "Client acquisition", "Opportunity qualification", "Sales strategy", "Negotiation", "Account management", "Conversion optimization"] },
    { name: "Research & Positioning", items: ["Market research", "Competitor benchmarking", "Platform & profile optimization", "Service packaging", "SEO fundamentals"] },
    { name: "Client & Project Management", items: ["Discovery calls", "Requirement gathering", "Stakeholder management", "Delivery coordination", "QA/QC oversight"] },
    { name: "Communication", items: ["Proposal writing", "Quotations", "Pitch decks", "Presentation design", "Business communication"] },
  ],
  tools: ["Upwork", "Fiverr", "LinkedIn", "Microsoft PowerPoint", "Microsoft Excel", "Power BI", "Adobe Photoshop", "WordPress"],
} as const;
