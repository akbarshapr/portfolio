import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Label from "@/components/ui/Label";

// Shared wrapper so every section has the same spacing and header.
// - `title` is the small label ("Projects"); `heading` is an optional big line.
// - `aside` is a short note shown on the right of the header on wide screens.
// - `tone="dark"` flips the section to the dark palette. Two dark sections in
//   a row read as one band if the second gets `className="pt-0"`.
export default function Section({
  id,
  title,
  heading,
  aside,
  tone = "light",
  className,
  children,
}: {
  id: string;
  title: string;
  heading?: string;
  aside?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-section", tone === "dark" && "theme-dark", className)}
    >
      <Container>
        <header className="mb-10 grid gap-4 sm:mb-14 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <div className="space-y-3">
            <Label as="h2">{title}</Label>
            {heading && (
              <Heading as="p" size="heading" className="max-w-3xl">
                {heading}
              </Heading>
            )}
          </div>
          {aside && (
            <div className="max-w-xs text-sm text-subtle md:text-right">
              {aside}
            </div>
          )}
        </header>
        {children}
      </Container>
    </section>
  );
}
