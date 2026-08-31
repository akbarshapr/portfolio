/**
 * Canonical site identity. The production origin used to live inline in four
 * places (root meta, index canonical/JSON-LD, the sitemap route, robots.txt) and
 * drifted apart. Everything in src/ now reads it from here.
 *
 * CONFIRM THIS AFTER THE FIRST DEPLOY. Vercel derives the default origin from
 * the project name, so this is only correct if the Vercel project is called
 * "akbarsha-portfolio". If it lands on a different subdomain, change it here —
 * app/robots.ts, app/sitemap.ts, the canonical, og/twitter and the JSON-LD all
 * read it, so this line is the only edit. A custom domain is the same one line.
 */
export const SITE_URL = "https://akbarsha-portfolio.vercel.app";

export const SITE_NAME = "Akbar Sha";

export const SITE_DESCRIPTION =
  "Akbar Sha is a software developer specialising in Salesforce B2C Commerce, MuleSoft integrations, and React — building and connecting enterprise commerce systems.";
