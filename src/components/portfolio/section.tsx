import type { ReactNode } from "react";

import { sectionIndex, sectionLabel, sectionToneStyle } from "@/lib/sections";
import { RailLabel, RailRow } from "./rail";

type Props = {
  /** Anchor target. Must match an entry in lib/sections.ts, or the number is blank. */
  id: string;
  /** Roman part of the display heading. */
  title: string;
  /** Italic, accented word that closes the heading. */
  accentWord: string;
  /** Trailing punctuation after the italic word, e.g. "." */
  trailing?: string;
  children: ReactNode;
};

/**
 * Shared wrapper for every section except hero, contact and nav. The number,
 * label and accent all come from lib/sections.ts keyed on `id`, so they cannot
 * drift from the nav.
 */
export function Section({ id, title, accentWord, trailing, children }: Props) {
  return (
    <section id={id} style={sectionToneStyle(id)}>
      <RailRow index={sectionIndex(id)} reveal>
        <RailLabel label={sectionLabel(id)} />

        <h2 className="mt-4 text-balance font-serif text-section text-foreground">
          {title} <em className="italic text-accent">{accentWord}</em>
          {trailing}
        </h2>

        <div className="mt-8">{children}</div>
      </RailRow>
    </section>
  );
}
