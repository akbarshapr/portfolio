import type { NextConfig } from "next";

/*
 * Static export. The site has zero data fetching and no server behaviour, so
 * `next build` writes plain HTML/CSS/JS into out/ that any static host serves —
 * Cloudflare Pages, Netlify, GitHub Pages. Nothing here needs a running Node
 * process, which is the whole reason the old SSR error pipeline could go.
 *
 * The trade-off, and it is the only one: no ISR, no middleware, no route
 * handlers. None of which this page has ever used.
 */
const nextConfig: NextConfig = {
  output: "export",

  images: {
    // A static export has no server to optimise on demand. The page uses a
    // plain <img> anyway; this keeps next/image from erroring if one is added.
    unoptimized: true,
  },
};

export default nextConfig;
