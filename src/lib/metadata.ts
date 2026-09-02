import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "./site";

/**
 * Shared Open Graph fields.
 *
 * Next merges `metadata` shallowly: an `openGraph` exported from a page
 * replaces the layout's outright, silently dropping og:image and og:site_name.
 * Both call sites spread this in — add here, never at one of them.
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
