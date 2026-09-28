import ArrowIcon from "@/components/ui/ArrowIcon";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Label from "@/components/ui/Label";
import ListRow from "@/components/ui/ListRow";
import Pill from "@/components/ui/Pill";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";
import type {
  Cert,
  Education,
  Experience,
  Portfolio,
  Project,
  Skill,
  Win,
} from "@/lib/portfolio";

// Each section receives only the slice of data it needs as props.
// These are Server Components (no "use client"), so they render to HTML on
// the server and ship no JavaScript to the browser.

export function Hero({ data }: { data: Portfolio }) {
  return (
    <section className="pt-10 pb-section sm:pt-16">
      <Container>
        <Pill className="gap-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          {data.availability}
        </Pill>
        <Heading as="h1" size="display" className="mt-8">
          {data.name}
        </Heading>
        <div className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-2 md:gap-12">
          <p className="text-lead font-medium tracking-tight">{data.title}</p>
          <div>
            <p className="text-subtle">{data.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#contact" arrow>
                Get in touch
              </ButtonLink>
              <ButtonLink href={data.social.github} variant="outline" external>
                GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// The first paragraph is shown large; any others sit beside it as body text.
export function About({ paragraphs }: { paragraphs: string[] }) {
  const [first, ...rest] = paragraphs;
  return (
    <Section id="about" title="About">
      <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-12">
        <p className="text-lead md:col-span-8">{first}</p>
        {rest.length > 0 && (
          <div className="space-y-4 text-subtle md:col-span-4">
            {rest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

export function Wins({ wins }: { wins: Win[] }) {
  return (
    <Section id="wins" title="Highlights">
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {wins.map((win) => (
          <Stat key={win.label} {...win} />
        ))}
      </div>
    </Section>
  );
}

export function ExperienceList({ jobs }: { jobs: Experience[] }) {
  return (
    <Section id="experience" title="Experience">
      <ol className="border-b border-line">
        {jobs.map((job) => (
          <ListRow
            key={`${job.company}-${job.role}`}
            title={job.role}
            subtitle={job.company}
            meta={job.period}
          >
            <ul className="max-w-3xl list-disc space-y-2 pl-5 text-subtle marker:text-muted">
              {job.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </ListRow>
        ))}
      </ol>
    </Section>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" title="Projects" heading="Selected work">
      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Skills({ skills }: { skills: Skill[] }) {
  return (
    <Section id="skills" title="Skills" tone="dark">
      <dl className="border-b border-line">
        {skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-4 border-t border-line py-6 md:grid-cols-[14rem_1fr] md:gap-12"
          >
            <Label as="dt" className="md:pt-2">
              {group.category}
            </Label>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

// Certifications and education share one section, continuing the dark band
// started by Skills (hence `pt-0`).
export function Credentials({
  certs,
  education,
}: {
  certs: Cert[];
  education: Education[];
}) {
  return (
    <Section
      id="credentials"
      title="Certifications & education"
      tone="dark"
      className="pt-0"
    >
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <Label as="h3" className="mb-2">
            Certifications
          </Label>
          <ul className="border-b border-line">
            {certs.map((cert) => (
              <ListRow
                key={cert.name}
                title={cert.name}
                subtitle={cert.issuer}
                headingAs="h4"
              >
                <p className="text-sm text-subtle">{cert.description}</p>
              </ListRow>
            ))}
          </ul>
        </div>
        <div>
          <Label as="h3" className="mb-2">
            Education
          </Label>
          <ul className="border-b border-line">
            {education.map((edu) => (
              <ListRow
                key={edu.institution}
                title={edu.credential}
                subtitle={`${edu.institution}, ${edu.university}`}
                meta={edu.status}
                headingAs="h4"
              >
                <p className="text-sm text-subtle">{edu.location}</p>
              </ListRow>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function Contact({ data }: { data: Portfolio }) {
  return (
    <Section id="contact" title="Contact">
      <Heading as="p" size="display">
        Let’s talk
      </Heading>
      <p className="mt-8 max-w-2xl text-lead">“{data.contactQuote}”</p>
      <p className="mt-4 max-w-xl text-subtle">{data.contactIntro}</p>
      <Divider className="my-10 sm:my-14" />
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <a
          href={data.social.email}
          className="group inline-flex items-center gap-3 text-lead font-medium tracking-tight break-all transition hover:text-accent sm:text-heading"
        >
          {data.email}
          <ArrowIcon className="size-8 transition group-hover:rotate-45 sm:size-12" />
        </a>
        <ul className="flex gap-6">
          <li>
            <ButtonLink href={data.social.github} variant="text" external>
              GitHub
            </ButtonLink>
          </li>
          <li>
            <ButtonLink href={data.social.linkedin} variant="text" external>
              LinkedIn
            </ButtonLink>
          </li>
        </ul>
      </div>
    </Section>
  );
}

export function Footer({ name }: { name: string }) {
  return (
    <footer className="overflow-hidden pb-6">
      <Container>
        <div className="flex items-center justify-between border-t border-line pt-6 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
          <a href="#top" className="transition hover:text-foreground">
            Back to top
          </a>
        </div>
        {/* Decorative repeat of the name, so screen readers skip it. */}
        <p
          aria-hidden="true"
          className="mt-10 font-medium tracking-tighter whitespace-nowrap text-line select-none text-giant"
        >
          {name}
        </p>
      </Container>
    </footer>
  );
}
