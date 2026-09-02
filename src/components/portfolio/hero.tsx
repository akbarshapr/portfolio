import { Github, Linkedin, Mail } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { RailRow } from "./rail";

const socials = [
  { href: portfolio.social.github, label: "GitHub", Icon: Github },
  { href: portfolio.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: portfolio.social.email, label: "Email", Icon: Mail },
];

export function Hero() {
  return (
    <section id="top">
      {/* No index: the hero sits above the numbering, but the rail starts here
          so the line runs unbroken from the top. `intro` plays the load-in. */}
      <RailRow intro>
        {/* Space Grotesk 700, the page's third family and its only use.
            font-bold is a real weight here — layout.tsx downloads 700. */}
        <h1 className="font-display text-display font-bold tracking-display text-foreground">
          {portfolio.name}
        </h1>
        <p className="mt-1 text-title text-accent">{portfolio.title}</p>

        {/* One colour, deliberately: a coloured word in the opening sentence
            reads as decoration rather than structure. Do not re-highlight it. */}
        <p className="mt-6 max-w-measure text-muted-foreground">{portfolio.intro}</p>

        {/* Icons with no captions, so each anchor's aria-label is its only
            accessible name. It is load-bearing, not decoration. */}
        <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="hover-accent inline-flex text-muted-foreground"
                aria-label={label}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </RailRow>
    </section>
  );
}
