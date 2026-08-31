import { Section } from "./section";
import { Bullets } from "./primitives";
import { portfolio } from "@/lib/portfolio";

export function Education() {
  if (portfolio.education.length === 0) return null;

  return (
    <Section id="education" title="Academic" accentWord="background">
      <ul className="space-y-8">
        {portfolio.education.map((e) => (
          <li key={e.institution}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-lead text-foreground">{e.credential}</h3>
              <span className="micro-label text-muted-foreground">{e.status}</span>
            </div>

            <p className="mt-1 text-muted-foreground">
              {e.institution}
              {e.location ? ` · ${e.location}` : ""}
            </p>

            <Bullets items={e.highlights} className="mt-4 text-muted-foreground" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
