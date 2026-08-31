import { Section } from "./section";
import { portfolio } from "@/lib/portfolio";

export function Beyond() {
  if (portfolio.beyond.length === 0) return null;

  return (
    <Section id="beyond" title="The rest of the" accentWord="picture" trailing=".">
      <dl className="space-y-5">
        {portfolio.beyond.map((b) => (
          <div
            key={b.title}
            className="grid gap-1 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="micro-label text-muted-foreground sm:pt-0.5">{b.title}</dt>
            <dd className="text-muted-foreground">{b.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
