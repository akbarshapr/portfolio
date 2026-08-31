import { Section } from "./section";
import { portfolio } from "@/lib/portfolio";

export function Wins() {
  if (portfolio.wins.length === 0) return null;

  return (
    <Section id="wins" title="Numbers that" accentWord="shipped" trailing=".">
      <ul className="space-y-6">
        {portfolio.wins.map((w) => (
          <li key={`${w.category}-${w.metric}-${w.label}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-title text-accent">{w.metric}</span>
              <span className="text-foreground">{w.label}</span>
              <span className="micro-label ms-auto text-muted-foreground">{w.category}</span>
            </div>
            <p className="mt-1 text-muted-foreground">{w.body}</p>
          </li>
        ))}
      </ul>

      {portfolio.stats.length > 0 && (
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {portfolio.stats.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between gap-4 py-2.5">
              <dt className="micro-label text-muted-foreground">{s.label}</dt>
              <dd className="text-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}
