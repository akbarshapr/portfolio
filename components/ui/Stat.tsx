import Label from "@/components/ui/Label";

// One highlight: a big number with a category, a caption and a short note.
export default function Stat({
  category,
  metric,
  label,
  body,
}: {
  category: string;
  metric: string;
  label: string;
  body: string;
}) {
  return (
    <div className="border-t border-line pt-6">
      <Label>{category}</Label>
      <p className="mt-4 text-heading font-medium tracking-tight">{metric}</p>
      <p className="mt-2 font-medium">{label}</p>
      <p className="mt-2 text-sm text-subtle">{body}</p>
    </div>
  );
}
