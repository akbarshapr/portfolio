import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The rail: one hairline spanning every section, joining them into a single
 * unbroken line, with a numbered node where each section starts.
 *
 * The line is absolutely positioned, so it is not a grid item and never
 * disturbs the two-column track. Layout lives in the `rail-*` utilities.
 */
export function RailRow({
  index,
  intro,
  reveal,
  className,
  children,
}: {
  /** Zero-padded position, e.g. "03". Omit for the hero, which sits above the count. */
  index?: string;
  /** Plays the load-in. HERO ONLY — every other row is below the fold while it runs. */
  intro?: boolean;
  /**
   * Marks the content column for the scroll reveal. Deliberately not on the
   * <section>: the hairline is a child of it, so fading whole sections would
   * break the line into patches at the boundaries.
   */
  reveal?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rail-grid", className)}>
      <span aria-hidden className={cn("rail-line", intro && "intro-rail")} />

      <div className={cn("flex justify-center pt-12 sm:pt-16", intro && "intro-node")}>
        {index ? (
          <span
            aria-hidden
            // bg-background punches a hole in the line so the number reads as a
            // node on the rail rather than crossed out by it.
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

      <div
        className={cn("min-w-0 py-12 sm:py-16", intro && "intro-stagger")}
        data-reveal={reveal ? "" : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/** The short connector from the rail into a section's eyebrow label. */
export function RailLabel({ label }: { label: string }) {
  if (!label) return null;

  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-px w-4 bg-border sm:w-6" />
      <p className="micro-label text-muted-foreground">{label}</p>
    </div>
  );
}
