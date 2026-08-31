import { ArrowUpRight, Github } from "lucide-react";
import { Section } from "./section";
import { TechTags } from "./primitives";
import { portfolio } from "@/lib/portfolio";

export function Projects() {
  if (portfolio.projects.length === 0) return null;

  return (
    <Section id="work" title="Things I've built and" accentWord="shipped" trailing=".">
      <ul className="divide-y divide-border border-y border-border">
        {portfolio.projects.map((p) => (
          <li key={p.title} className="py-6 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-lead text-foreground">{p.title}</h3>

              <div className="flex items-center gap-4 text-micro">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${p.title} on GitHub`}
                    className="hover-accent inline-flex items-center gap-1 text-muted-foreground"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden /> code
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${p.title} live site`}
                    className="hover-accent inline-flex items-center gap-1 text-accent"
                  >
                    live <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-2 text-muted-foreground">{p.description}</p>

            <dl className="mt-3 space-y-2">
              <div className="sm:flex sm:gap-3">
                <dt className="micro-label shrink-0 text-muted-foreground sm:w-24 sm:pt-1">
                  Challenge
                </dt>
                <dd className="text-muted-foreground">{p.challenge}</dd>
              </div>
              {p.outcome && (
                <div className="sm:flex sm:gap-3">
                  <dt className="micro-label shrink-0 text-muted-foreground sm:w-24 sm:pt-1">
                    Outcome
                  </dt>
                  <dd className="text-muted-foreground">{p.outcome}</dd>
                </div>
              )}
            </dl>

            <TechTags items={p.tech} className="mt-3" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
