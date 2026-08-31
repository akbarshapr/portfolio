import { Section } from "./section";
import { portfolio } from "@/lib/portfolio";

export function About() {
  if (portfolio.about.length === 0) return null;

  return (
    <Section id="about" title="A short story, well" accentWord="paced" trailing=".">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-10">
        <img
          src={portfolio.portrait}
          width={320}
          height={400}
          loading="lazy"
          decoding="async"
          alt={`${portfolio.name}, ${portfolio.title}`}
          className="w-full border border-border object-cover object-top"
        />

        <div className="space-y-4 text-muted-foreground">
          {portfolio.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
