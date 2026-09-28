import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Rounded panel on the surface color: skill groups, projects, stats.
export default function Card({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "article" | "li";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("rounded-card bg-surface p-6 sm:p-8", className)}>
      {children}
    </Tag>
  );
}
