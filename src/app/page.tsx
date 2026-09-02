import type { Metadata } from "next";

import { About } from "@/components/portfolio/about";
import { Beyond } from "@/components/portfolio/beyond";
import { Certs } from "@/components/portfolio/certs";
import { Contact } from "@/components/portfolio/contact";
import { Education } from "@/components/portfolio/education";
import { Experience } from "@/components/portfolio/experience";
import { Hero } from "@/components/portfolio/hero";
import { SiteNav } from "@/components/portfolio/nav";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { Wins } from "@/components/portfolio/wins";
import { Worklog } from "@/components/portfolio/worklog";
import { Reveal } from "@/components/reveal";
import { OG_BASE } from "@/lib/metadata";
import { portfolio } from "@/lib/portfolio";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE_TITLE = `${SITE_NAME} — Software Developer · SFCC Specialist`;

const PAGE_DESCRIPTION = "Portfolio of Akbar Sha";

const OG_DESCRIPTION =
  "SFCC storefronts, MuleSoft integrations, and React front-ends — built across three enterprise clients at a sub-5% post-release defect rate.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: SITE_URL + "/" },
  openGraph: {
    ...OG_BASE,
    title: PAGE_TITLE,
    description: OG_DESCRIPTION,
  },
};

// One @graph rather than two <script> tags: same statements, one parse, and the
// Person/WebSite nodes can reference each other. `sameAs` is derived from the
// social links so the two can't drift.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      jobTitle: portfolio.title,
      description: "",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}${portfolio.avatar}`,
      sameAs: [portfolio.social.github, portfolio.social.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      about: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-dvh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-micro focus:text-background"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certs />
        <Wins />
        <Worklog />
        <Beyond />
        <Contact />
      </main>

      {/* Renders nothing: one IntersectionObserver that reveals each section as
          it arrives. Everything above stays a Server Component. */}
      <Reveal />
    </div>
  );
}
