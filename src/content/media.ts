// Looks up images built by `npm run media` (src/content/media.generated.json).
import manifest from "./media.generated.json";

export type MediaImage = { src: string; avif: string; width: number; height: number };

const table = manifest as unknown as Record<string, MediaImage | undefined>;

export function media(id: string): MediaImage {
  const entry = table[id];
  if (!entry || typeof entry !== "object" || !("src" in entry)) {
    throw new Error(`Image "${id}" is missing — add it to scripts/media.config.mjs and run \`npm run media\`.`);
  }
  return entry;
}

export const hasMedia = (id: string) => !!table[id] && typeof table[id] === "object" && "src" in table[id]!;
