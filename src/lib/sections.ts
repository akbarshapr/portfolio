import type { CSSProperties } from "react";
import { portfolio } from "@/lib/portfolio";

/**
 * The page's section registry — the single source of truth for what renders,
 * what the nav links to, and what number each section carries on the rail.
 *
 * `id` is the anchor target and must match the `id` a section passes to
 * `<Section>`. `label` is plain English and deliberately differs from the id in
 * two places (Projects lives at #work, Worklog reads as "Notes").
 *
 * `show` keeps the three in step: a section with no data renders nothing, so it
 * gets no nav link and no rail number, and the numbering closes up rather than
 * skipping. Fill the array in portfolio.json and all three appear together.
 *
 * `inNav` is narrower — it hides a link without hiding the section. The header
 * carries four links; everything else is still on the page, still numbered on
 * the rail, and still reachable by scrolling. Do NOT use `inNav: false` to hide
 * a section; that is what an empty array in portfolio.json is for.
 *
 * `tone` picks which of the two accents the section carries. The page opens
 * cool and closes warm; the boundary is wherever "warm" first appears below, so
 * moving it is a one-word edit. See sectionToneStyle for how it is applied.
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
 * Rebinding --accent, rather than swapping a class, is what makes the warm half
 * work: every text-accent / border-accent / stroke-accent inside the section
 * resolves var(--accent) at the element, so a single declaration on the
 * <section> recolours headings, list markers, metrics and hover states at once.
 *
 * This only holds because the custom utilities in styles/utilities.css read
 * var(--accent) too — var(--color-accent) resolves on :root and would not
 * follow. Returns undefined for a cool section so React writes no style at all.
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
