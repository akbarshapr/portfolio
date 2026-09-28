import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Small uppercase monospace caption: section eyebrows, dates, categories.
export default function Label({
  as: Tag = "p",
  className,
  children,
}: {
  as?: "p" | "span" | "h2" | "h3" | "dt";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-label uppercase tracking-widest text-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
