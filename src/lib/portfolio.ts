import data from "@/content/portfolio.json";

/**
 * Content schema. Values live in src/content/portfolio.json — edit them there.
 *
 * `portfolio` is annotated rather than inferred: that is what makes tsc reject
 * a missing or mistyped key, and what keeps optional fields optional instead of
 * narrowing them away. Components guard on those, so omitting one drops its
 * markup. An empty array hides its whole section (see lib/sections.ts).
 *
 * Imported JSON is not a fresh object literal, so an EXTRA key is not flagged.
 * If content doesn't appear, check the spelling of its key first.
 */

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  challenge: string;
  /** Real, measured result only — omit rather than estimating. */
  outcome?: string;
  github?: string;
  demo?: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  location?: string;
  period: string;
  contributions: string[];
  tech: string[];
};

export type EducationEntry = {
  institution: string;
  location?: string;
  /** e.g. "BCA", "B.E. Computer Science" */
  credential: string;
  /** Short badge text, e.g. "STUDYING" or "2019 — 2022" */
  status: string;
  highlights: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
};

export type Win = {
  /** Rendered as [CATEGORY]. */
  category: string;
  /** The headline figure, e.g. "40%". */
  metric: string;
  /** What the figure measures. */
  label: string;
  body: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type WorklogEntry = {
  /** Stable key, not displayed. */
  id: string;
  /** ISO date string. */
  date: string;
  question: string;
  answer: string;
  tag: string;
};

export type BeyondItem = {
  title: string;
  body: string;
};

export type Portfolio = {
  name: string;
  title: string;
  intro: string;
  email: string;
  /** Square image, used for og:image / twitter:image / JSON-LD only. */
  avatar: string;
  /** Public path to the ~4:5 image beside the About copy. */
  portrait: string;
  social: { github: string; linkedin: string; email: string };
  /** Display labels for the contact list — keep in sync with `social`. */
  handles: { github: string; linkedin: string };
  currentlyInto: string[];
  about: string[];
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certs: Certification[];
  wins: Win[];
  stats: Stat[];
  worklog: WorklogEntry[];
  beyond: BeyondItem[];
};

export const portfolio: Portfolio = data;
