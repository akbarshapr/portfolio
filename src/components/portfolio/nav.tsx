import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { portfolio } from "@/lib/portfolio";
import { NAV_SECTIONS, SECTIONS } from "@/lib/sections";
import { BrandMark } from "./diagram";

/**
 * The header, arranged like the reference's: the mark on the left, and the name
 * stacked ABOVE the links rather than sitting beside them. The links are
 * divided by hairlines, which is the reference's one piece of nav texture.
 *
 * It does NOT stick. The reference's scrolls away, and a two-line header pinned
 * to the top of a 768px column eats too much of the viewport. `--header-height`
 * survives only as the scroll-padding above an anchor target.
 *
 * The header shows four links; the sheet behind the menu button lists every
 * section, at every width. That keeps the header quiet without stranding the
 * sections it leaves out.
 */
export function SiteNav() {
  return (
    <header className="page-shell pt-10 pb-16 sm:pt-14 sm:pb-20">
      <nav aria-label="Primary" className="flex items-start justify-between gap-4">
        <div className="rail-lead min-w-0">
          <span className="rail-slot">
            {/* The mark is currentColor; this is where its colour is chosen. */}
            <BrandMark className="h-8 w-8 text-accent" />
          </span>

          <div className="min-w-0">
            <a
              href="#top"
              className="hover-accent text-title font-bold text-foreground"
              aria-label={`${portfolio.name} — top of page`}
            >
              {portfolio.name}
            </a>

            <ul className="mt-1 flex flex-wrap items-center divide-x divide-border text-micro">
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

        <div className="flex shrink-0 items-center gap-1">
          <Sheet>
            <SheetTrigger
              className="hover-accent inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="All sections"
            >
              <Menu className="h-4 w-4" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-64" aria-describedby={undefined}>
              <SheetTitle className="font-serif text-lead text-foreground">All sections</SheetTitle>
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
      </nav>
    </header>
  );
}
