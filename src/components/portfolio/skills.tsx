import { Section } from "./section";
import { portfolio } from "@/lib/portfolio";

/**
 * A label column and a dot-separated list, nothing else.
 *
 * The lucide glyph beside each skill went with the cards — the reference
 * carries no iconography at all, and twenty icons in a column this narrow read
 * as clutter rather than as logos. The mapping is recoverable from git if it
 * is ever wanted back.
 */
export function Skills() {
  if (portfolio.skills.length === 0) return null;

  return (
    <Section id="skills" title="What I reach" accentWord="for" trailing=".">
      <dl className="space-y-5">
        {portfolio.skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-1 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="micro-label text-muted-foreground sm:pt-0.5">{group.category}</dt>
            <dd>{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
