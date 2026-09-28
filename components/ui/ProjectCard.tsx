import ArrowIcon from "@/components/ui/ArrowIcon";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Pill from "@/components/ui/Pill";

// A project on a surface card. With a `url`, the title link is stretched over
// the whole card (the `after:` overlay) so the entire card is clickable.
export default function ProjectCard({
  title,
  blurb,
  tags,
  url,
  linkLabel = "View project",
}: {
  title: string;
  blurb: string;
  tags: string[];
  url?: string;
  linkLabel?: string;
}) {
  return (
    <Card
      as="article"
      className="group relative flex h-full flex-col transition hover:bg-line/60"
    >
      <Heading as="h3" size="title">
        {url ? (
          <a
            href={url}
            className="after:absolute after:inset-0 after:rounded-card"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </Heading>
      <p className="mt-3 text-subtle">{blurb}</p>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
        {url && (
          <span className="inline-flex items-center gap-2 text-sm font-medium transition group-hover:text-accent">
            {linkLabel}
            <ArrowIcon className="size-7" />
          </span>
        )}
      </div>
    </Card>
  );
}
