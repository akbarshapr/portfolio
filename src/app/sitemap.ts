import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Required by `output: "export"` — a metadata route has to declare itself
// static, or the build refuses to collect it.
export const dynamic = "force-static";

// Generated into out/sitemap.xml at build time. Replaces the hand-rolled
// server handler at routes/sitemap[.]xml.ts — same output, no route needed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
