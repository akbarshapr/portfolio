import { cn } from "@/lib/utils";

/** The tech line under a project or experience entry. Dot-separated, no chips. */
export function TechTags({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return <p className={cn("text-micro text-muted-foreground", className)}>{items.join(" · ")}</p>;
}

/** The dash-marked list used for contributions and highlights. */
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
