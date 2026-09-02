import { Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { portfolio } from "@/lib/portfolio";
import { NAV_SECTIONS, SECTIONS } from "@/lib/sections";
import { BrandMark } from "./diagram";

/**
 * The header: one row of mark, links and controls. It does not stick.
 *
 * The name is deliberately absent — the hero states it just below, so a second
 * copy was read once and never again. That leaves the mark carrying identity,
 * which is why it is the `#top` anchor and why its aria-label is the link's
 * only accessible name.
 *
 * Navigation swaps at `lg`: above it the links are the nav and the menu button
 * is hidden; below it the links are hidden and the sheet is the nav, which is
 * why the sheet lists every section rather than the four. Never hide both.
 */
export function SiteNav() {
  return (
    <header className="page-shell pt-10 pb-16 sm:pt-14 sm:pb-20">
      <nav aria-label="Primary" className="intro-lift">
        <div className="rail-lead">
          {/* rail-slot centres the mark on the rail's axis. */}
          <a
            href="#top"
            className="rail-slot hover-accent text-accent"
            aria-label={`${portfolio.name} — top of page`}
          >
            <BrandMark className="intro-mark h-8 w-8" />
          </a>

          <ul className="hidden flex-wrap items-center divide-x divide-border text-micro lg:flex">
            {NAV_SECTIONS.map((l) => (
              <li key={l.id} className="px-2.5 first:ps-0 last:pe-0">
                <a href={`#${l.id}`} className="hover-accent text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ms-auto flex shrink-0 items-center gap-1">
            <Sheet>
              <SheetTrigger
                className="hover-accent inline-flex h-10 w-10 items-center justify-center rounded text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                aria-label="All sections"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </SheetTrigger>
              <SheetContent side="right" className="w-64" aria-describedby={undefined}>
                <SheetTitle className="font-serif text-lead text-foreground">
                  All sections
                </SheetTitle>
                <ul className="mt-6 space-y-1">
                  {SECTIONS.map((l) => (
                    <li key={l.id}>
                      <SheetClose asChild>
                        <a
                          href={`#${l.id}`}
                          className="hover-accent block rounded px-2 py-2 text-muted-foreground"
                        >
                          <span className="me-3 text-nano text-muted-foreground/70">
                            {String(SECTIONS.indexOf(l) + 1).padStart(2, "0")}
                          </span>
                          {l.label}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>

            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
