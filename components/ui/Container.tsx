import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Centers content and applies the page gutters. Use it inside every
// full-width band so text lines up down the page.
export default function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-8", className)}>
      {children}
    </div>
  );
}
