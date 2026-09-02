import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { portfolio } from "@/lib/portfolio";
import { NAV_SECTIONS, SECTIONS } from "@/lib/sections";
import { BrandMark } from "./diagram";

/**
 * The header. One row: the mark, the links, and the controls.
 *
 * THE NAME IS DELIBERATELY ABSENT. The hero states it 40px below in Space
 * Grotesk at 32px, and the header does not stick — it scrolls away like the
 * reference's — so a second copy was read once and never again. Nothing
 * replaced it: a tagline or a tech line here is a badge competing with the
 * hero's own role line one line further down, and the page already decided
 * against that kind of ornament when it dropped the chip row.
 *
 * That leaves the mark carrying identity alone, which is why it is now the
 * `#top` anchor and why its `aria-label` is load-bearing — with the visible
 * name gone, that attribute is the link's only accessible name.
 *
 * The row still swaps navigation at `lg`: above it the links are the
 * navigation and the menu button is hidden; below it the links are hidden and
 * the sheet IS the navigation, which is why the sheet lists every section
 * rather than the four the header shows. Never hide both.
 */
export function SiteNav() {
  return (
    <header className="page-shell pt-10 pb-16 sm:pt-14 sm:pb-20">
      <nav aria-label="Primary" className="intro-lift">
        <div className="rail-lead">
          {/* rail-slot centres the mark on the rail's axis; text-accent is
              where its currentColor is chosen. */}
          <a
            href="#top"
            className="rail-slot hover-accent text-accent"
            aria-label={`${portfolio.name} — top of page`}
          >
            <BrandMark className="intro-mark h-8 w-8" />
          </a>

          {/* Starts at the same x as the hero name below, because rail-lead's
              gap matches the rail grid's column gap. */}
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
            {/* Below lg only: above it the link row is the navigation. */}
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
