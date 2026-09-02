import type { CSSProperties } from "react";

import { portfolio } from "@/lib/portfolio";

/**
 * The section registry — one source of truth for what renders, what the nav
 * links to, which rail number a section carries, and which accent it uses.
 *
 * `id` is the anchor target and must match what the section passes to
 * `<Section>`. `show` is derived from the data, so an empty array in
 * portfolio.json drops the section, its link and its number together, and the
 * numbering closes up. `inNav` only hides a link — never use it to hide a
 * section. The first `tone: "warm"` entry is where the page turns.
 */
type SectionMeta = {
  id: string;
  label: string;
  show: boolean;
  inNav: boolean;
  tone: "cool" | "warm";
};

const ALL: SectionMeta[] = [
  { id: "about", label: "About", show: portfolio.about.length > 0, inNav: true, tone: "cool" },
  { id: "skills", label: "Skills", show: portfolio.skills.length > 0, inNav: false, tone: "cool" },
  { id: "work", label: "Work", show: portfolio.projects.length > 0, inNav: true, tone: "cool" },
  {
    id: "experience",
    label: "Experience",
    show: portfolio.experience.length > 0,
    inNav: true,
    tone: "cool",
  },
  {
    id: "education",
    label: "Education",
    show: portfolio.education.length > 0,
    inNav: false,
    tone: "cool",
  },
  {
    id: "certs",
    label: "Certifications",
    show: portfolio.certs.length > 0,
    inNav: false,
    tone: "cool",
  },
  // The page turns warm here.
  { id: "wins", label: "Results", show: portfolio.wins.length > 0, inNav: false, tone: "warm" },
  {
    id: "worklog",
    label: "Notes",
    show: portfolio.worklog.length > 0,
    inNav: false,
    tone: "warm",
  },
  { id: "beyond", label: "Beyond", show: portfolio.beyond.length > 0, inNav: false, tone: "warm" },
  { id: "contact", label: "Contact", show: true, inNav: true, tone: "warm" },
];

/**
 * Rebinding --accent on the <section> recolours everything inside at once,
 * because Tailwind's accent utilities resolve var(--accent) at the element.
 * The custom utilities must read var(--accent) too — var(--color-accent)
 * resolves on :root and would not follow.
 */
const WARM = { "--accent": "var(--accent-warm)" } as CSSProperties;

export function sectionToneStyle(id: string): CSSProperties | undefined {
  return SECTIONS.find((s) => s.id === id)?.tone === "warm" ? WARM : undefined;
}

/** Everything that renders. Drives the rail numbering. */
export const SECTIONS = ALL.filter((s) => s.show);

/** The subset the header links to. */
export const NAV_SECTIONS = SECTIONS.filter((s) => s.inNav);

/** Zero-padded position on the rail, e.g. "03". Empty if the section is hidden. */
export function sectionIndex(id: string): string {
  const i = SECTIONS.findIndex((s) => s.id === id);
  return i < 0 ? "" : String(i + 1).padStart(2, "0");
}

export function sectionLabel(id: string): string {
  return SECTIONS.find((s) => s.id === id)?.label ?? "";
}
