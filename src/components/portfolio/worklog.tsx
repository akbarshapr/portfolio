import { Section } from "./section";
import { portfolio } from "@/lib/portfolio";

export function Worklog() {
  if (portfolio.worklog.length === 0) return null;

  return (
    <Section id="worklog" title="Notes on the" accentWord="craft" trailing=".">
      <ul className="divide-y divide-border border-y border-border">
        {portfolio.worklog.map((w) => (
          <li key={w.id} className="py-5 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-lead text-foreground">{w.question}</h3>
              <span className="micro-label text-muted-foreground">{w.date}</span>
            </div>
            <p className="micro-label mt-1 text-accent">{w.tag}</p>
            <p className="mt-2 text-muted-foreground">{w.answer}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
