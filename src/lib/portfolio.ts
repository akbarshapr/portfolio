/**
 * Portfolio content — schema here, values in `src/content/portfolio.json`.
 *
 * The split is deliberate: every editable string lives in one JSON file that
 * needs no TypeScript knowledge to edit, while the shapes below keep the
 * components honest. `portfolio` is annotated (not inferred) so a missing
 * required key or a mistyped value fails `tsc`, and so optional keys such as
 * `Project.github` stay optional instead of being narrowed away.
 *
 * EMPTY ARRAYS ARE INTENTIONAL. `education`, `certs`, `wins`, `stats`, and
 * `worklog` ship empty. Each section early-returns `null` while its array is
 * empty and `nav.tsx` filters its links by the same check — so an unfilled
 * section leaves no placeholder on the page and no dead anchor in the nav.
 * Fill them with real content; never with samples "to see the layout".
 */
import data from "@/content/portfolio.json";

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  challenge: string;
  /** Real, measured result only — omit the key rather than estimating. */
  outcome?: string;
  /** Repo URL. Omit when the code isn't public; the "code" link then won't render. */
  github?: string;
  /** Live URL. Omit when there's nothing to link; the "live" link then won't render. */
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
  /** City/state. Omit rather than guessing; the line then doesn't render. */
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
  /** Year awarded. Omit rather than guessing; the badge then doesn't render. */
  year?: string;
  /** Verification link, if the credential has a public one. */
  credentialUrl?: string;
};

export type Win = {
  /** Rendered as [CATEGORY] — e.g. "PERFORMANCE", "CRAFT", "OSS". */
  category: string;
  /** The headline figure, e.g. "40%", "1st", "0 → 1". */
  metric: string;
  /** What the figure measures, e.g. "FASTER LOAD TIMES". */
  label: string;
  body: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type WorklogEntry = {
  /** Stable unique key for the entry, e.g. "sfcc-isml-perf". Not displayed. */
  id: string;
  /** ISO date string, shown right-aligned in the title bar. */
  date: string;
  question: string;
  answer: string;
  /** Rendered as #tag in the card footer. */
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
  /** Square image used for og:image / twitter:image / JSON-LD only. */
  avatar: string;
  /**
   * Portrait shown beside the About copy. Public path, roughly 4:5.
   * Ships as /portrait-placeholder.svg — drop a real file into public/ and
   * point this at it; nothing else needs to change.
   */
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
