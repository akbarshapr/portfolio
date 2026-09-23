import data from "@/data/portfolio.json";

// Types describe the shape of data/portfolio.json. If you add a field to the
// JSON, add it here too so TypeScript can check every component that uses it.
export type Skill = { category: string; items: string[] };

export type Experience = {
  role: string;
  company: string;
  period: string;
  contributions: string[];
};

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  linkLabel?: string;
  url?: string;
};

export type Education = {
  institution: string;
  credential: string;
  status: string;
  highlights: string[];
  location: string;
  university: string;
};

export type Cert = {
  name: string;
  issuer: string;
  logo?: string;
  description: string;
};

export type Win = {
  category: string;
  metric: string;
  label: string;
  body: string;
};

export type Portfolio = {
  name: string;
  title: string;
  availability: string;
  contactForm: { accessKey: string };
  intro: string;
  email: string;
  avatar: string;
  portrait: string;
  social: { github: string; linkedin: string; email: string };
  handles: { github: string; linkedin: string };
  about: string[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certs: Cert[];
  wins: Win[];
  worklog: unknown[];
  personalSite: { url: string; label: string; blurb: string };
  contactIntro: string;
  contactQuote: string;
};

// The one place the rest of the app gets its data from. It is `async` even
// though it just returns a local import, so that switching to a real source
// (fetch, a CMS, a database) later only changes this function body.
export async function getPortfolio(): Promise<Portfolio> {
  return data satisfies Portfolio;
}
