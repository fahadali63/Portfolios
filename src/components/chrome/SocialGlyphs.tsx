/** Outline glyphs for brands Lucide no longer ships, drawn at Lucide's 24-unit grid and stroke weight. */
type P = { size?: number };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true });

export function InstagramGlyph({ size = 20 }: P) {
  return (
    <svg {...base(size)}>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppGlyph({ size = 20 }: P) {
  return (
    <svg {...base(size)}>
      <path d="M3.6 20.4l1.2-4.1A8.6 8.6 0 1 1 8 19.5z" />
      <path d="M9.1 8.4c.2-.4.6-.5.9-.3l.9 1.6c.1.3 0 .6-.2.8l-.5.5c.5 1.1 1.4 2 2.6 2.6l.5-.5c.2-.2.5-.3.8-.2l1.6.9c.3.2.4.6.2.9-.5.9-1.3 1.4-2.3 1.2-2.6-.6-4.6-2.6-5.2-5.2-.2-1 .2-1.8.7-2.3z" />
    </svg>
  );
}
