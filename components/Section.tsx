import type { ReactNode } from "react";

// Shared wrapper so every section has the same spacing and heading style.
export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-foreground/10 py-12">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-foreground/60">
        {title}
      </h2>
      {children}
    </section>
  );
}
