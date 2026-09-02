import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { sectionIndex, sectionLabel, sectionToneStyle } from "@/lib/sections";
import { RailLabel, RailRow } from "./rail";

const channels = [
  { label: "Email", value: portfolio.email, href: portfolio.social.email, Icon: Mail },
  {
    label: "LinkedIn",
    value: portfolio.handles.linkedin,
    href: portfolio.social.linkedin,
    Icon: Linkedin,
  },
  { label: "GitHub", value: portfolio.handles.github, href: portfolio.social.github, Icon: Github },
];

// Not the shared `Section` wrapper: this one closes the page, so it carries the
// footer as well as its own content.
export function Contact() {
  return (
    <section id="contact" style={sectionToneStyle("contact")}>
      <RailRow index={sectionIndex("contact")} reveal>
        <RailLabel label={sectionLabel("contact")} />

        <h2 className="mt-4 text-balance font-serif text-section text-foreground">
          Have a project in mind? Let&apos;s <em className="italic text-accent">build</em>{" "}
          something.
        </h2>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {channels.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="hover-accent flex items-center justify-between gap-4 py-3"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                  {/* w-20, not w-16: "LinkedIn" measures 68px and spilled out of a 64px box. */}
                  <span className="micro-label w-20 shrink-0 text-muted-foreground">{label}</span>
                  <span className="truncate">{value}</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 text-micro text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {portfolio.name}
          </p>
          <p className="uppercase tracking-label">Made quietly</p>
        </footer>
      </RailRow>
    </section>
  );
}
