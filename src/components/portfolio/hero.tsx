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
          so the line runs unbroken from the top of the page. */}
      <RailRow>
        {/* Mono, not serif — the reference's own h1 is monospace, and this is
            the block that was pointed at. Section headings stay serif. */}
        <h1 className="text-display font-bold text-foreground">{portfolio.name}</h1>
        <p className="mt-1 text-title text-accent">{portfolio.title}</p>

        {/* The eyebrow the reference opens with. micro-label uppercases it, so
            the copy stays sentence case here. */}
        <p className="micro-label mt-10 text-muted-foreground">Hello world</p>

        {/*
          ONE COLOUR, deliberately. This paragraph used to run four phrases
          through a `linkify` pass that turned them into accented anchors into
          the page; it was removed because a coloured word in the opening
          sentence reads as decoration rather than as structure. The accent has
          to be a thing the page arrives at. Plain text — do not re-highlight it.
        */}
        <p className="mt-4 max-w-prose text-muted-foreground">{portfolio.intro}</p>

        {/*
          Icons only, no captions and no "Find me on" label above them. With the
          visible text gone the anchor has no accessible name of its own, so
          aria-label is doing real work here — it is not decoration, and it must
          not be dropped alongside the caption it replaced.
        */}
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
