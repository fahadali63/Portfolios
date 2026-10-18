import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to out/ for Netlify.
// All image optimisation happens ahead of time in `npm run media`.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
