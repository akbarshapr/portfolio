import type { Metadata, Viewport } from "next";
import { DM_Serif_Text, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { OG_BASE } from "@/lib/metadata";
import { revealInitScript } from "@/lib/reveal";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "@/styles.css";

/*
 * Two downloaded faces, both self-hosted by next/font at build time — no
 * fonts.googleapis.com stylesheet and no third-party round trip. Body text is
 * the system mono stack and downloads nothing. Adding a weight or style that
 * nothing uses costs a download for nothing.
 */

/** Section headings and the italic accent word. 400 is all it ships. */
const dmSerifText = DM_Serif_Text({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

/** The hero name, and nothing else. */
const spaceGrotesk = Space_Grotesk({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  // Every relative URL below resolves against this.
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
    // The avatar is square, so `summary` frames it correctly —
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
  // Follows the SYSTEM preference only: a meta media query cannot observe the
  // class the in-page toggle sets. Known, accepted limitation.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1f20" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning is load-bearing: themeInitScript changes this
    // element's className before React hydrates, so the two differ by design.
    // It is scoped here and does not reach anything inside.
    <html
      lang="en"
      className={`${dmSerifText.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Both must run before first paint, so both stay raw strings. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: revealInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
