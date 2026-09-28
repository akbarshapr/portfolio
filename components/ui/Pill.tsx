import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Rounded tag for skills and project tech. Colors come from the tokens, so it
// works on both light and `theme-dark` backgrounds.
export default function Pill({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-3 py-1 text-sm text-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}
