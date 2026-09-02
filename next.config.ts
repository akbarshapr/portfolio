import type { NextConfig } from "next";

/*
 * Static export: `next build` writes plain HTML/CSS/JS into out/, which any
 * static host serves. The trade-off is no ISR, no middleware and no route
 * handlers — none of which this page uses.
 */
const nextConfig: NextConfig = {
  output: "export",

  images: {
    // No server to optimise on demand. The page uses a plain <img>; this keeps
    // next/image from erroring if one is ever added.
    unoptimized: true,
  },
};

export default nextConfig;
