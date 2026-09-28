import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import ArrowIcon from "@/components/ui/ArrowIcon";

// A link styled as a button. Portfolio "buttons" all go somewhere (email,
// GitHub, a project), so they are <a> elements, not <button>s.
const variants = {
  solid: "bg-accent text-accent-foreground hover:opacity-90",
  outline: "border border-line hover:border-foreground",
  text: "px-0 hover:text-accent",
};

export default function ButtonLink({
  href,
  variant = "solid",
  arrow = false,
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && <ArrowIcon className="size-5" />}
    </a>
  );
}
