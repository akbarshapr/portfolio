import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared frame for the 404 and error screens.
 *
 * They use the page's own typography and rules rather than sitting in a
 * bordered panel, so an interrupted visit still looks like the same site. They
 * used to be stock shadcn and read as a different product.
 *
 * No "use client" here: this is pure presentation, so not-found.tsx renders it
 * on the server while error.tsx (which must be a Client Component) pulls it
 * into the client graph. It works in both because it holds no state.
 */

const buttonBase =
  "inline-flex items-center justify-center rounded border px-3 py-2 text-micro transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export const primaryButton = cn(
  buttonBase,
  "border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground",
);

export const secondaryButton = cn(buttonBase, "hover-accent border-border text-muted-foreground");

export function StatusShell({
  code,
  title,
  detail,
  children,
}: {
  code: string;
  title: string;
  detail: string;
  children: ReactNode;
}) {
  return (
    <div className="page-shell flex min-h-dvh flex-col justify-center py-16">
      <p className="micro-label text-accent">Error {code}</p>

      <h1 className="mt-3 font-serif text-section text-foreground">{title}</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">{detail}</p>

      <div className="mt-8 flex flex-wrap gap-3">{children}</div>
    </div>
  );
}
