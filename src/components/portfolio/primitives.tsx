import { cn } from "@/lib/utils";

/**
 * The tech line under a project or an experience entry.
 *
 * Dot-separated plain text rather than bordered chips: the reference design
 * carries no filled or outlined pills anywhere, and a list of twenty of them
 * was most of what made the old page feel busy.
 */
export function TechTags({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return <p className={cn("text-micro text-muted-foreground", className)}>{items.join(" · ")}</p>;
}

/**
 * The dash-marked list used for contributions and course highlights. The marker
 * is decorative, so it is hidden from assistive tech and the list reads as
 * plain items.
 */
export function Bullets({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-px shrink-0 text-accent" aria-hidden>
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
