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
      {/* `intro` is the load-in: the rail draws down and these children
          stagger in behind it. See the intro block in styles/utilities.css. */}
      <RailRow intro>
        {/* The page's third family, and this is the ONLY place it appears —
            Space Grotesk 700, a geometric grotesque against the mono body. The
            serif stays with the section headings. font-bold is real weight
            here, not synthesised: 700 is the weight layout.tsx downloads. */}
        <h1 className="font-display text-display font-bold tracking-display text-foreground">
          {portfolio.name}
        </h1>
        <p className="mt-1 text-title text-accent">{portfolio.title}</p>

        {/*
          ONE COLOUR, deliberately. This paragraph used to run four phrases
          through a `linkify` pass that turned them into accented anchors into
          the page; it was removed because a coloured word in the opening
          sentence reads as decoration rather than as structure. The accent has
          to be a thing the page arrives at. Plain text — do not re-highlight it.
        */}
        <p className="mt-6 max-w-measure text-muted-foreground">{portfolio.intro}</p>

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
