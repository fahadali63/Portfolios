// Shapes for every content file. Each file calls `defineList` / `defineOne`, which checks the data
// when the site builds and stops the build with a plain-language message if something is wrong.
import { z } from "zod";

export const Track = z.enum(["planning", "business"]);
export type Track = z.infer<typeof Track>;

/** Every item says where its facts come from and whether they have been checked. */
const Provenance = {
  /** e.g. "site:/urban-planning#portfolio dialog" or "content-source/…pdf p2" */
  source: z.string().min(3),
  /** false = shown in development with an "Unverified" badge, left out of the production build */
  verified: z.boolean(),
};

const slug = z.string().regex(/^[a-z0-9-]+$/, "use lowercase letters, numbers and dashes only");
/** A key from src/content/media.generated.json (built by `npm run media`), e.g. "projects/fa-avenue-1/tile". */
const mediaId = z.string().regex(/^[a-z0-9/@-]+$/, "must be a media id like projects/<slug>/tile");
/** The one Drive folder allowed: the portfolio folder. Any other folder link is refused. */
export const ALLOWED_DRIVE_FOLDER = "1mQkZ0MWUa1Gh4jjPMZGz8N5Pdt3R_9bO";
/** Drive links: a single file, or the portfolio folder — never any other folder. */
const driveUrl = z
  .string()
  .url("must be a full https:// link")
  .refine((u) => !u.includes("/folders/") || u.includes(`/folders/${ALLOWED_DRIVE_FOLDER}`), "must link to a single file or the portfolio folder, not another Drive folder")
  .optional();

export const Organisation = z.object({
  slug,
  name: z.string(),
  /** Two or three letters for the monogram badge */
  short: z.string().min(1).max(3),
  track: Track,
});
export type Organisation = z.infer<typeof Organisation>;

export const Role = z.object({
  slug,
  track: Track,
  title: z.string(),
  org: slug, // Organisation slug
  orgName: z.string(), // name exactly as the site shows it for this role
  project: z.string().optional(),
  location: z.string(),
  start: z.string(), // "Mar 2026"
  end: z.union([z.literal("present"), z.string()]),
  summary: z.string().optional(), // e.g. the promotion note
  bullets: z.array(z.string()),
  note: z.string().optional(), // letter-based note in small print
  ...Provenance,
});
export type Role = z.infer<typeof Role>;

export const ProjectCategory = z.enum(["Master Planning", "Industrial Planning", "Urban Design", "Housing Scheme", "GIS & Mapping", "Architectural CAD"]);
export type ProjectCategory = z.infer<typeof ProjectCategory>;

export const Project = z.object({
  slug,
  title: z.string(),
  category: ProjectCategory,
  location: z.string().optional(),
  year: z.string().optional(),
  summary: z.string(),
  contribution: z.string().optional(),
  keyFacts: z.array(z.string()),
  credit: z.string().optional(),
  tools: z.array(z.string()),
  /** Tile image (4:3 crop) and what it shows, for screen readers */
  cover: mediaId,
  coverAlt: z.string().min(10, "describe what the drawing shows"),
  /** Full sheets for the gallery, each with its own description */
  pages: z.array(z.object({ image: mediaId, alt: z.string().min(10) })).min(1),
  driveUrl,
  featured: z.boolean().optional(),
  ...Provenance,
});
export type Project = z.infer<typeof Project>;

export const Research = z.object({
  slug,
  category: z.enum(["Transit & TOD", "Heritage & Conservation", "Environmental Planning", "Transportation"]),
  title: z.string(),
  topic: z.string(),
  pages: z.number().int().positive(),
  year: z.string().optional(),
  summary: z.string(),
  course: z.string(),
  authors: z.string().optional(),
  figure: z.object({ image: mediaId, alt: z.string().min(10) }).optional(),
  driveUrl,
  ...Provenance,
});
export type Research = z.infer<typeof Research>;

export const Certificate = z
  .object({
    slug,
    title: z.string(),
    issuer: z.string(),
    /** short issuer label for the badge */
    issuerShort: z.string().min(1).max(3),
    date: z.string(),
    kind: z.enum(["award", "certificate", "letter", "recognition"]),
    track: Track,
    topic: z.string(),
    description: z.string().optional(),
    /** media id of the full image; the "-tile" version is used in rows */
    image: mediaId.optional(),
    imageAlt: z.string().optional(),
    /** false for documents that show a national ID number: never previewed or linked */
    publicPreview: z.boolean(),
    driveUrl,
    featured: z.boolean().optional(),
    ...Provenance,
  })
  .refine((c) => c.publicPreview || (!c.image && !c.driveUrl), {
    message: "has publicPreview: false, so it must not have an image or a link",
    path: ["publicPreview"],
  })
  .refine((c) => !c.image || (c.imageAlt && c.imageAlt.length > 10), { message: "needs imageAlt describing the document", path: ["imageAlt"] });
export type Certificate = z.infer<typeof Certificate>;

export const Metric = z.object({
  slug,
  value: z.string(), // rendered as-is, e.g. "100+", "138%", "2,828"
  label: z.string(),
  qualifier: z.string(),
  track: Track,
  /** Where the number comes from, shown in Meta under the tile */
  sourceLabel: z.string(),
  /** Opens the fact's context: an item slug (sheet) or an in-site href */
  opens: z.object({ item: slug.optional(), href: z.string().optional() }),
  ...Provenance,
});
export type Metric = z.infer<typeof Metric>;

export const Attainment = z.object({
  title: z.string(),
  period: z.string(),
  currency: z.literal("USD"),
  sourceLabel: z.string(),
  months: z.array(z.object({ month: z.string(), target: z.number(), locked: z.number() })).length(6),
  ...Provenance,
});
export type Attainment = z.infer<typeof Attainment>;

export const Engagement = z.object({
  slug,
  descriptor: z.string(),
  value: z.string(),
  title: z.string(),
  how: z.string(),
  terms: z.string(),
  ...Provenance,
});
export type Engagement = z.infer<typeof Engagement>;

export const Environment = z.object({
  /** "*" = every route without its own photo */
  route: z.string(),
  image: mediaId, // base id; -desktop, -desktop-blur, -mobile, -mobile-blur are derived
  place: z.string(),
  credit: z.object({ name: z.string(), url: z.string().url(), platform: z.string() }).optional(),
});
export type Environment = z.infer<typeof Environment>;

// ───────────────────────── validation ─────────────────────────

function explain(file: string, error: z.ZodError, items?: unknown[]): string {
  return error.issues
    .map((issue) => {
      const [index, ...rest] = issue.path;
      const item = typeof index === "number" && items ? (items[index] as { slug?: string } | undefined) : undefined;
      const where = item?.slug ? `item "${item.slug}"` : typeof index === "number" ? `item #${index + 1}` : "";
      const field = (typeof index === "number" ? rest : issue.path).join(".") || "(whole item)";
      return `  ✗ src/content/${file} → ${where ? where + " → " : ""}field "${field}": ${issue.message}`;
    })
    .join("\n");
}

export function defineList<S extends z.ZodTypeAny>(file: string, schema: S, items: z.input<S>[]): z.output<S>[] {
  const result = z.array(schema).safeParse(items);
  if (!result.success) throw new Error(`Content problem — fix and rebuild:\n${explain(file, result.error, items)}`);
  const slugs = new Set<string>();
  for (const item of result.data as { slug?: string }[]) {
    if (!item.slug) continue;
    if (slugs.has(item.slug)) throw new Error(`Content problem:\n  ✗ src/content/${file} → slug "${item.slug}" is used twice`);
    slugs.add(item.slug);
  }
  return result.data;
}

export function defineOne<S extends z.ZodTypeAny>(file: string, schema: S, value: z.input<S>): z.output<S> {
  const result = schema.safeParse(value);
  if (!result.success) throw new Error(`Content problem — fix and rebuild:\n${explain(file, result.error)}`);
  return result.data;
}
