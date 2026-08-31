import { ArrowUpRight } from "lucide-react";
import { Section } from "./section";
import { portfolio } from "@/lib/portfolio";

export function Certs() {
  if (portfolio.certs.length === 0) return null;

  return (
    <Section id="certs" title="Papers and" accentWord="proof">
      <ul className="divide-y divide-border border-y border-border">
        {portfolio.certs.map((c) => {
          const row = (
            <>
              <span className="flex min-w-0 flex-wrap items-baseline gap-x-3">
                <span className="text-foreground">{c.name}</span>
                <span className="text-micro text-muted-foreground">{c.issuer}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                {c.year ? (
                  <span className="micro-label text-muted-foreground">{c.year}</span>
                ) : null}
                {c.credentialUrl ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /> : null}
              </span>
            </>
          );

          return (
            <li key={c.name}>
              {c.credentialUrl ? (
                <a
                  href={c.credentialUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover-accent flex items-center justify-between gap-4 py-3"
                >
                  {row}
                </a>
              ) : (
                <div className="flex items-center justify-between gap-4 py-3">{row}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
