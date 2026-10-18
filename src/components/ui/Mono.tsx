import type { Track } from "@/content/schema";

/** Circular organisation monogram with a track-coloured ring (the reference's avatar slot). */
export function Mono({ short, track, size }: { short: string; track: Track; size?: number }) {
  return (
    <span className="mono" data-track={track} aria-hidden="true" style={size ? { ["--size" as string]: `${size}px` } : undefined}>
      {short}
    </span>
  );
}
