import type { ReactNode } from "react";

// Rounded tag for skills and project tech. Colors come from the tokens, so it
// works on both light and `theme-dark` backgrounds.
export default function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 text-sm text-subtle">
      {children}
    </span>
  );
}
