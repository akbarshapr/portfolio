import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "./site";

/**
 * Shared Open Graph base.
 *
 * Next merges `metadata` SHALLOWLY: an `openGraph` object exported from a page
 * REPLACES the layout's outright — it does not deep-merge into it. Defining
 * only `title`/`description` on the page therefore silently drops og:image,
 * og:site_name and og:type from that page, with no warning and no build error.
 *
 * So anything that must appear on every page is spread in explicitly rather
 * than inherited. Add to this object, never to one call site.
 */
export const OG_BASE = {
  siteName: SITE_NAME,
  type: "website",
  url: `${SITE_URL}/`,
  images: [
    {
      url: "/avatar.jpg",
      width: 400,
      height: 400,
      alt: `Portrait of ${SITE_NAME}`,
    },
  ],
} satisfies Metadata["openGraph"];
