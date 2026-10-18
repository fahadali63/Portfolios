/** LinkedIn's "in" mark as an outline-weight glyph (Lucide no longer ships brand icons). */
export function LinkedInGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="4.5" />
      <path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-6M11.5 13c0-1.5 1-2.5 2.4-2.5 1.5 0 2.6 1 2.6 2.8v3.2" />
    </svg>
  );
}
