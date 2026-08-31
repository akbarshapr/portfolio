import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Required by `output: "export"` — a metadata route has to declare itself
// static, or the build refuses to collect it.
export const dynamic = "force-static";

/*
 * Generated into out/robots.txt at build time.
 *
 * This replaces the static public/robots.txt, which could not import SITE_URL
 * and so had to be hand-edited whenever the origin changed — a documented drift
 * risk in the old build. It now reads the same constant as everything else.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
