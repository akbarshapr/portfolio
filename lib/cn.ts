// Joins class names, skipping empty values:
// cn("px-4", isActive && "bg-accent", className)
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
