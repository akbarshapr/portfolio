import { Section } from "./section";
import { Bullets, TechTags } from "./primitives";
import { portfolio } from "@/lib/portfolio";

export function Experience() {
  if (portfolio.experience.length === 0) return null;

  return (
    <Section id="experience" title="Professional" accentWord="journey">
      <ol className="space-y-8">
        {portfolio.experience.map((e) => (
          <li key={`${e.company}-${e.role}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-lead text-foreground">{e.role}</h3>
              <span className="micro-label text-muted-foreground">{e.period}</span>
            </div>

            <p className="mt-1 text-muted-foreground">
              {e.company}
              {e.location ? ` · ${e.location}` : ""}
            </p>

            <Bullets items={e.contributions} className="mt-4 text-muted-foreground" />
            <TechTags items={e.tech} className="mt-3" />
          </li>
        ))}
      </ol>
    </Section>
  );
}
