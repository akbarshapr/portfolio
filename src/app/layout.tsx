import type { Metadata, Viewport } from "next";
import { DM_Serif_Text, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { OG_BASE } from "@/lib/metadata";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { revealInitScript } from "@/lib/reveal";
import { themeInitScript } from "@/lib/theme";
import "@/styles.css";

/*
 * TWO downloaded faces, and that is the whole budget. Body text is the system
 * mono stack and downloads nothing.
 *
 * next/font self-hosts both at build time and inlines their @font-face. That is
 * why there are no <link rel="preconnect"> tags to fonts.googleapis.com /
 * fonts.gstatic.com any more, and no render-blocking stylesheet request: the
 * fonts are served from our own origin. Adding a weight or a style that nothing
 * uses costs a download for nothing — each of these is used, and only just.
 *
 * `variable` exposes each as a custom property that styles/tokens.css reads.
 */

/* Section headings and the italic accent word. 400 is all it ships. */
const dmSerifText = DM_Serif_Text({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

/*
 * The hero name, and NOTHING else — one word, one weight. It earns the download
 * by being the first thing on the page: a geometric grotesque sits better
 * against a monospace body than a neutral like Inter, and it keeps the name out
 * of the serif that the section headings own.
 *
 * If this ever needs to go, `font-display` falls back to the system sans stack
 * declared alongside it in tokens.css and the page still reads correctly.
 */
const spaceGrotesk = Space_Grotesk({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  // Every relative URL below resolves against this. Change the origin in
  // lib/site.ts and the whole meta surface follows.
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — Software Developer`,
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    ...OG_BASE,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    // The avatar is square (400×400), so `summary` frames it correctly —
    // `summary_large_image` would crop it into a letterbox.
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/avatar.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Paints the mobile browser chrome to match the palette. Follows the SYSTEM
  // preference only — the in-page toggle sets a class, and a meta media query
  // cannot observe a class. Known, accepted limitation.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1f20" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    /*
     * suppressHydrationWarning is load-bearing, not noise suppression:
     * themeInitScript adds `.dark` to this element before React hydrates, so
     * server and client markup differ on className BY DESIGN. It is scoped to
     * this one element and does not reach anything inside.
     */
    <html
      lang="en"
      className={`${dmSerifText.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Must run before first paint. Without it the export always ships the
          light palette and a visitor with a saved dark preference sees a white
          flash. It stays a raw string for exactly that reason — it has to
          execute ahead of React, so it cannot be a component.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/*
          Arms the scroll reveal. It must also run before first paint, or the
          sections paint once at full opacity and are then hidden — a flash of
          content, which is worse than no animation. See lib/reveal.ts for why
          the hidden state is gated on this class rather than written plainly.
        */}
        <script dangerouslySetInnerHTML={{ __html: revealInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
