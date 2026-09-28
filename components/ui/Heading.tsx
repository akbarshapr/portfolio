import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// The heading level (h1–h3) is for document structure; `size` is for looks.
// Keeping them separate lets an h2 be large or small as the layout needs.
const sizes = {
  display: "text-display font-medium tracking-tighter",
  heading: "text-heading font-medium tracking-tight",
  title: "text-lead font-medium tracking-tight",
};

export default function Heading({
  as: Tag = "h2",
  size = "heading",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(sizes[size], className)}>{children}</Tag>;
}
