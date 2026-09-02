import { portfolio } from "@/lib/portfolio";
import { Section } from "./section";

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
