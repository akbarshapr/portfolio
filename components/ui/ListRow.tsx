import type { ReactNode } from "react";
import Label from "@/components/ui/Label";

// A row in a list separated by thin lines: title and subtitle on the left, a
// small mono note (usually a date) on the right, optional details below.
// Put rows in a <ul>/<ol> with `border-b border-line` to close the last one.
export default function ListRow({
  title,
  subtitle,
  meta,
  headingAs: Heading = "h3",
  children,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  headingAs?: "h3" | "h4";
  children?: ReactNode;
}) {
  return (
    <li className="border-t border-line py-6 sm:py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <div>
          <Heading className="text-lg font-medium tracking-tight">
            {title}
          </Heading>
          {subtitle && <p className="text-subtle">{subtitle}</p>}
        </div>
        {meta && <Label className="shrink-0">{meta}</Label>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </li>
  );
}
