// Planning portfolio. Text verbatim from v1 (site:/urban-planning#portfolio dialogs).
//
// Add a project:
//   1. Add its drawings to scripts/media.config.mjs (a "tile" and one "page-N" per sheet) and run `npm run media`.
//   2. Copy one object below, change every field, and set `verified: true` once the facts are checked.
//   3. Run `npm run check-content`.
import { PORTFOLIO_DRIVE } from "./contact.ts";
import { defineList, Project } from "./schema.ts";

export const projects = defineList("projects.ts", Project, [
  {
    slug: "fa-avenue-1",
    title: "FA Avenue 1 — Integrated Urban Development Master Plan",
    category: "Master Planning",
    location: "Ferozepur Road, Lahore",
    year: "2026",
    summary:
      "A 2,828-acre integrated urban district planned around a 168-acre Central Business District, linked to Ferozepur Road by a 150-ft main boulevard. Commercial, mixed-use, education, healthcare, civic and recreational uses sit within a connected radial framework with a clear road hierarchy, integrated parking and preserved green infrastructure.",
    contribution: "Prepared the master plan, zoning plan, CBD layout and a 300-acre neighbourhood plan, with road cross-sections.",
    keyFacts: ["2,828 acres", "168-acre CBD", "150-ft boulevard"],
    credit: "Planning of New Towns · checked by Prof. Dr. Obaid Ullah Nadeem, UET Lahore",
    tools: ["Master plan", "Zoning", "CBD", "AutoCAD"],
    cover: "projects/fa-avenue-1/tile",
    coverAlt: "Zoning plan of FA Avenue 1: density zones in yellow and orange radiating from a blue central business district",
    pages: [
      {
        image: "projects/fa-avenue-1/page-1",
        alt: "Master plan sheet for FA Avenue 1 with the zoning plan, circular CBD layout, boulevard cross-sections, a 300-acre neighbourhood plan and land-use legends",
      },
    ],
    featured: true,
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog; drawing title block",
    verified: true,
  },
  {
    slug: "allama-iqbal-industrial-estate",
    title: "Allama Iqbal Industrial Estate, Kasur",
    category: "Industrial Planning",
    location: "Kasur, Punjab",
    year: "2026",
    summary:
      "An 870-acre manufacturing estate near major transport corridors in the Kasur region, combining zoned industrial plots, vocational training zones, utility networks, green buffers and central treatment facilities.",
    contribution: "Three-person team deliverables: site plan, zoning plan, zone-wise division of the estate, and SketchUp / AI-assisted perspectives.",
    keyFacts: ["870 acres", "Zoned plots 14 marla – 3 acres", "250-ft main road"],
    credit: "Industrial Estate Design · group project with Rao Babar and Muhammad Zeeshan · checked by Dr. Muhammad Asim",
    tools: ["Industrial estate", "Zoning", "SketchUp", "Group project"],
    cover: "projects/allama-iqbal-industrial-estate/tile",
    coverAlt: "Aerial perspective of the industrial estate: rows of factory sheds around a landscaped central roundabout",
    pages: [
      { image: "projects/allama-iqbal-industrial-estate/page-1", alt: "AI-assisted aerial perspective of the Allama Iqbal Industrial Estate and its central roundabout" },
      { image: "projects/allama-iqbal-industrial-estate/page-2", alt: "Sheet of model perspectives: street, isometric and perspective views in SketchUp and rendered versions" },
      { image: "projects/allama-iqbal-industrial-estate/page-3", alt: "Zoning plan of the estate: plot zones by size around a central green roundabout, with legend" },
      { image: "projects/allama-iqbal-industrial-estate/page-4", alt: "Site plan of the estate with zone-wise plot division, land-use breakdown table and legend" },
    ],
    featured: true,
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog; drawing title blocks",
    verified: true,
  },
  {
    slug: "hanjarwal-tod",
    title: "Mixed-Use TOD near Hanjarwal Station",
    category: "Urban Design",
    location: "Lahore",
    year: "2026",
    summary:
      "A compact, walkable 12-acre transit-oriented development integrating a shopping mall, mixed-use blocks (commercial, apartments, offices) and residential apartments around a landscaped public plaza, with CPTED principles, rooftop gardens and renewable energy.",
    contribution: "Team deliverables: site plan, land-use calculation, legibility map and 3D views (SketchUp and AI-assisted renders).",
    keyFacts: ["12 acres", "35.8% mixed use", "Scale 1:500"],
    credit:
      "Urban Design · group project with Rao Babar, Muhammad Zeeshan, Muhammad Anas and Abdul Rehman Sudais · checked by Prof. Dr. Obaidullah Nadeem",
    tools: ["TOD", "Mixed use", "CPTED", "SketchUp"],
    cover: "projects/hanjarwal-tod/tile",
    coverAlt: "Grid of 3D renders of the mixed-use TOD: mid-rise blocks, a plaza and streets near Hanjarwal station",
    pages: [
      { image: "projects/hanjarwal-tod/page-1", alt: "TOD sheet with fourteen 3D renders of the site, a land-use table and a legibility map" },
      { image: "projects/hanjarwal-tod/page-2", alt: "Shopping mall and apartments sheet: 2D layout renders of each floor and 3D elevation renders" },
    ],
    featured: true,
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog; drawing title blocks",
    verified: true,
  },
  {
    slug: "fasan-villas",
    title: "Fasan Villas — 300-Kanal Housing Scheme",
    category: "Housing Scheme",
    location: "Sharif Medical City Road, Lahore",
    summary:
      "Layout plan for a 37.5-acre (300-kanal) housing scheme on Sharif Medical City Road, with 5-marla to 1-kanal plots, commercial frontage, mosques, a community park, a solid-waste site and an 80-ft main boulevard.",
    contribution: "Co-planned the layout, plot sub-division and road network.",
    keyFacts: ["300 kanals", "37.5 acres", "80-ft boulevard"],
    credit: "Housing & Urban Development · with Muhammad Anas and Abdul Rehman Sudais · approved by Ms. Saima Rafique",
    tools: ["Housing scheme", "Layout plan", "AutoCAD", "Group project"],
    cover: "projects/fasan-villas/tile",
    coverAlt: "Layout plan of Fasan Villas: colour-coded plots by size along a diagonal boulevard with a central park",
    pages: [
      { image: "projects/fasan-villas/page-1", alt: "Full layout plan of the 300-kanal Fasan Villas scheme with plot schedule, land-use table and legend" },
    ],
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog; drawing title block",
    verified: true,
  },
  {
    slug: "orange-line-landuse",
    title: "Land-Use Classification — Orange Line Metro Stations",
    category: "GIS & Mapping",
    location: "Lahore",
    summary:
      "Land-use classification within a 0.5 km radius of every Orange Line Metro station — commercial, residential, green, vacant, educational, public and industrial — prepared for the TOD study of the corridor.",
    contribution: "Class-wide GIS exercise (CRP Session 2023) that fed into the Orange Line TOD research.",
    keyFacts: ["0.5 km station buffers", "9 land-use classes"],
    credit: "Developed by CRP Session 2023, UET Lahore · submitted to Ms. Saima Rafique",
    tools: ["ArcGIS", "Land use", "Transit"],
    cover: "projects/orange-line-landuse/tile",
    coverAlt: "Map of the Orange Line corridor: a chain of circular station buffers coloured by land use",
    pages: [
      { image: "projects/orange-line-landuse/page-1", alt: "Land-use classification map of 0.5 km buffers around each Orange Line Metro station, with legend" },
    ],
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog",
    verified: true,
  },
  {
    slug: "delhi-gate-regeneration",
    title: "Proposed Regeneration Map — Delhi Gate",
    category: "GIS & Mapping",
    location: "Walled City, Lahore",
    summary:
      "Parcel-level land-use and regeneration proposals for the Delhi Gate area of the Walled City, linking Wazir Khan Masjid, Shahi Hammam and the surrounding bazaars.",
    contribution: "Map prepared within the Delhi Gate conservation and regeneration study.",
    keyFacts: [],
    credit: "Urban Conservation & Regeneration · group study, UET Lahore",
    tools: ["ArcGIS", "Heritage", "Regeneration"],
    cover: "projects/delhi-gate-regeneration/tile",
    coverAlt: "Parcel map of the Delhi Gate area with proposed uses in red, blue and purple, framed by site photographs",
    pages: [
      { image: "projects/delhi-gate-regeneration/page-1", alt: "Proposed regeneration map of the Delhi Gate area, parcels coloured by proposal, with photographs of Wazir Khan Masjid and Shahi Hammam" },
    ],
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog",
    verified: true,
  },
  {
    slug: "heritage-buffer-map",
    title: "Heritage Sites Buffer Map",
    category: "GIS & Mapping",
    location: "Lahore",
    summary:
      "0.5 km buffer analysis around Neevin Masjid, the Tomb of Khan-e-Jahan Zafar Jang Kokaltash and the Tomb of Nadira Begum, used to frame conservation strategies.",
    contribution: "Class-wide ArcMap exercise (CRP Session 2023) used in the heritage conservation study.",
    keyFacts: [],
    credit: "Developed by CRP Session 2023, UET Lahore · submitted to Ms. Saima Rafique",
    tools: ["ArcMap", "Buffer analysis", "Heritage"],
    cover: "projects/heritage-buffer-map/tile",
    coverAlt: "Street map of Lahore with three blue circular buffers around heritage sites",
    pages: [
      { image: "projects/heritage-buffer-map/page-1", alt: "Buffer map of 0.5 km around three historic sites in Lahore on a street basemap" },
    ],
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog",
    verified: true,
  },
  {
    slug: "house-44x39",
    title: "44′ × 39′ Residence — Implemented Drawing Set",
    category: "Architectural CAD",
    summary:
      "Complete working-drawing set for a 1,716 sq ft (6-marla) house: existing vs. modified layouts, ground, mezzanine and first floors, and a schedule of doors, windows and vents.",
    contribution: "Prepared the full working-drawing set for a plan that was implemented.",
    keyFacts: ["1,716 sq ft", "3 levels"],
    tools: ["AutoCAD", "Working drawings", "Residential"],
    cover: "projects/house-44x39/tile",
    coverAlt: "Dusk visualisation of the two-storey residence: white and dark facade with linear lighting",
    pages: [
      { image: "projects/house-44x39/page-1", alt: "Dusk visualisation of the residence's front facade" },
      { image: "projects/house-44x39/page-2", alt: "Layout drawings: existing and modified ground, mezzanine and first-floor plans with a door and window schedule" },
      { image: "projects/house-44x39/page-3", alt: "Overview sheet of layout and working drawings" },
      { image: "projects/house-44x39/page-4", alt: "Front elevation with lighting notes" },
      { image: "projects/house-44x39/page-5", alt: "Electrical drawings for the mezzanine and first floor, with legend" },
      { image: "projects/house-44x39/page-6", alt: "Plumbing drawings with cold, hot and fresh water lines" },
      { image: "projects/house-44x39/page-7", alt: "Visualisation of the residence at sunset from a low angle" },
    ],
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog; drawing set (1,716 sq ft printed on the plans)",
    verified: true,
  },
  {
    slug: "residential-cad-series",
    title: "Residential House Designs — 5 Marla to 2 Kanal",
    category: "Architectural CAD",
    summary:
      "A series of residential layouts across standard Pakistani plot sizes — 5 marla, 10 marla (with full sections and elevations), 1 kanal and 2 kanal — each with title blocks and site plans.",
    contribution: "Designed and drafted each layout in AutoCAD.",
    keyFacts: [],
    credit: "1-kanal design checked by Prof. Kashif Ali",
    tools: ["AutoCAD", "Residential", "Layouts"],
    cover: "projects/residential-cad-series/tile",
    coverAlt: "Sections and elevations of a 10-marla house drawn in AutoCAD",
    pages: [
      { image: "projects/residential-cad-series/page-1", alt: "10-marla complete design: sections, front and side elevations and four floor plans" },
      { image: "projects/residential-cad-series/page-2", alt: "1-kanal house ground-floor plan with furniture, garage and lawn" },
      { image: "projects/residential-cad-series/page-3", alt: "2-kanal house ground-floor plan with pool and garage" },
      { image: "projects/residential-cad-series/page-4", alt: "10-marla house ground-floor layout with dimensions" },
      { image: "projects/residential-cad-series/page-5", alt: "5-marla house ground-floor layout with dimensions" },
    ],
    driveUrl: PORTFOLIO_DRIVE,
    source: "site:/urban-planning#portfolio dialog",
    verified: true,
  },
]);

export const featuredProjects = () => projects.filter((p) => p.featured);
export const projectCategories = ["Master Planning", "Industrial Planning", "Urban Design", "Housing Scheme", "GIS & Mapping", "Architectural CAD"] as const;
