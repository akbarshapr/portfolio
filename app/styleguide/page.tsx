import type { Metadata } from "next";
import ArrowIcon from "@/components/ui/ArrowIcon";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Label from "@/components/ui/Label";
import Pill from "@/components/ui/Pill";
import Section from "@/components/ui/Section";

// A page for checking the design tokens and UI components in one place.
// Not linked from the site and hidden from search engines.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
};

const colors = [
  "background",
  "foreground",
  "muted",
  "subtle",
  "line",
  "surface",
  "accent",
];

// Tailwind only generates classes it can find written out in full, so the
// swatch classes are listed here instead of built with `bg-${name}`.
const swatch: Record<string, string> = {
  background: "bg-background",
  foreground: "bg-foreground",
  muted: "bg-muted",
  subtle: "bg-subtle",
  line: "bg-line",
  surface: "bg-surface",
  accent: "bg-accent",
};

function Samples() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {colors.map((name) => (
          <div key={name} className="space-y-2">
            <div
              className={`h-16 rounded-xl border border-line ${swatch[name]}`}
            />
            <Label>{name}</Label>
          </div>
        ))}
      </div>

      <Divider />

      <div className="space-y-6">
        <Label>Label — 12px mono</Label>
        <Heading as="p" size="display">
          Display
        </Heading>
        <Heading as="p" size="heading">
          Heading for a section
        </Heading>
        <Heading as="p" size="title">
          Title for a card or role
        </Heading>
        <p className="text-lead text-subtle">
          Lead text, for an intro or a short statement.
        </p>
        <p className="max-w-prose">
          Body text. The quick brown fox jumps over the lazy dog, and keeps
          going for a second line so the line height is visible.
        </p>
      </div>

      <Divider />

      <div className="flex flex-wrap items-center gap-4">
        <ButtonLink href="#">Solid</ButtonLink>
        <ButtonLink href="#" variant="outline">
          Outline
        </ButtonLink>
        <ButtonLink href="#" variant="text" arrow>
          Text with arrow
        </ButtonLink>
        <ArrowIcon />
        <ArrowIcon direction="right" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill>TypeScript</Pill>
        <Pill>Next.js</Pill>
        <Pill>Tailwind</Pill>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <Label>Card</Label>
          <Heading as="h3" size="title" className="mt-2">
            On the surface color
          </Heading>
          <p className="mt-2 text-subtle">Rounded, padded, no border.</p>
        </Card>
        <Card as="article">
          <Label>Card</Label>
          <Heading as="h3" size="title" className="mt-2">
            As an article
          </Heading>
          <p className="mt-2 text-subtle">Same look, different element.</p>
        </Card>
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main>
      <Section
        id="light"
        title="Styleguide · light"
        heading="Tokens and components"
        aside="Every section header uses this layout: label, optional heading, optional note."
      >
        <Samples />
      </Section>
      <Section id="dark" title="Styleguide · dark" tone="dark">
        <Samples />
      </Section>
    </main>
  );
}
