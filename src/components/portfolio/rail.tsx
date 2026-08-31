import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The rail — the page's one structural motif, and the only thing kept from the
 * previous design.
 *
 * A single hairline runs the full height of every section, so consecutive
 * sections join into one unbroken line down the page, with a numbered node
 * where each section begins.
 *
 * Layout lives in the `rail-grid` / `rail-line` utilities so the responsive
 * track widths stay in tokens. The line is absolutely positioned, so it is not
 * a grid item and never disturbs the two-column track.
 */
export function RailRow({
  index,
  className,
  children,
}: {
  /** Zero-padded position, e.g. "03". Omit for the hero, which sits above the count. */
  index?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rail-grid", className)}>
      <span aria-hidden className="rail-line" />

      <div className="flex justify-center pt-12 sm:pt-16">
        {index ? (
          <span
            aria-hidden
            // bg-background punches a hole in the line so the number reads as a
            // node sitting on the rail rather than crossed out by it.
            className="-mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-nano text-muted-foreground"
          >
            {index}
          </span>
        ) : (
          <span
            aria-hidden
            className="-mt-1 h-2 w-2 shrink-0 rounded-full border border-accent bg-background"
          />
        )}
      </div>

      <div className="min-w-0 py-12 sm:py-16">{children}</div>
    </div>
  );
}

/**
 * The short connector that runs from the rail into a section's eyebrow label,
 * completing the `01 ─── ABOUT` reading.
 */
export function RailLabel({ label }: { label: string }) {
  if (!label) return null;

  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-px w-4 bg-border sm:w-6" />
      <p className="micro-label text-muted-foreground">{label}</p>
    </div>
  );
}
