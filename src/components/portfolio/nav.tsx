import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { portfolio } from "@/lib/portfolio";
import { NAV_SECTIONS, SECTIONS } from "@/lib/sections";
import { BrandMark } from "./diagram";

/**
 * The header, in two rows.
 *
 * Row one is the identity line: the mark, the name, and the controls, all on
 * one line at every width. Row two is the links, indented past the rail column
 * so they sit under the name rather than under the mark.
 *
 * The two rows swap responsibilities at `lg`. Above it the links are the
 * navigation and the menu button is hidden; below it the links are hidden and
 * the sheet IS the navigation — which is why the sheet lists every section
 * rather than the four the header shows. Never hide both.
 *
 * It does NOT stick. The reference's scrolls away, and a header pinned to the
 * top of a 768px column eats too much of the viewport. `--header-height`
 * survives only as the scroll-padding above an anchor target.
 */
export function SiteNav() {
  return (
    <header className="page-shell pt-10 pb-16 sm:pt-14 sm:pb-20">
      <nav aria-label="Primary" className="intro-lift">
        <div className="rail-lead">
          <span className="rail-slot">
            {/* The mark is currentColor; this is where its colour is chosen. */}
            <BrandMark className="intro-mark h-8 w-8 text-accent" />
          </span>

          <a
            href="#top"
            className="hover-accent min-w-0 truncate text-title font-bold text-foreground"
            aria-label={`${portfolio.name} — top of page`}
          >
            {portfolio.name}
          </a>

          <div className="ms-auto flex shrink-0 items-center gap-1">
            {/* Below lg only: above it the link row below is the navigation. */}
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

        {/* Row two. The wrapper carries the breakpoint so `hidden` never has to
            argue with rail-lead's own display: flex. */}
        <div className="mt-3 hidden lg:block">
          <div className="rail-lead">
            {/* Empty, and the same width as the rail column, so the links line
                up with the name above rather than with the mark. */}
            <span aria-hidden className="rail-slot" />

            <ul className="flex flex-wrap items-center divide-x divide-border text-micro">
              {NAV_SECTIONS.map((l) => (
                <li key={l.id} className="px-2.5 first:ps-0 last:pe-0">
                  <a href={`#${l.id}`} className="hover-accent text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
