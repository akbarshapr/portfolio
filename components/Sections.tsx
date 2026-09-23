import Section from "@/components/Section";
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
    <header className="py-16">
      <p className="mb-4 inline-block rounded-full border border-foreground/20 px-3 py-1 text-xs">
        {data.availability}
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {data.name}
      </h1>
      <p className="mt-2 text-xl text-foreground/70">{data.title}</p>
      <p className="mt-6 max-w-2xl leading-7 text-foreground/80">{data.intro}</p>
      <nav className="mt-6 flex flex-wrap gap-4 text-sm underline underline-offset-4">
        <a href={data.social.github}>GitHub {data.handles.github}</a>
        <a href={data.social.linkedin}>LinkedIn {data.handles.linkedin}</a>
        <a href={data.social.email}>{data.email}</a>
      </nav>
    </header>
  );
}

export function About({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Section id="about" title="About">
      <div className="max-w-2xl space-y-4 leading-7">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}

export function Wins({ wins }: { wins: Win[] }) {
  return (
    <Section id="wins" title="Highlights">
      <div className="grid gap-6 sm:grid-cols-3">
        {wins.map((win) => (
          <div key={win.label}>
            <p className="text-xs uppercase text-foreground/60">
              {win.category}
            </p>
            <p className="mt-1 text-3xl font-bold">{win.metric}</p>
            <p className="font-medium">{win.label}</p>
            <p className="mt-2 text-sm text-foreground/70">{win.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Skills({ skills }: { skills: Skill[] }) {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <dt className="font-medium">{group.category}</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded bg-foreground/5 px-2 py-1 text-sm"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function ExperienceList({ jobs }: { jobs: Experience[] }) {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-10">
        {jobs.map((job) => (
          <li key={`${job.company}-${job.role}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">
                {job.role} · {job.company}
              </h3>
              <span className="text-sm text-foreground/60">{job.period}</span>
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/80">
              {job.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-lg border border-foreground/10 p-5"
          >
            <h3 className="font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-foreground/80">{project.blurb}</p>
            <p className="mt-4 text-xs text-foreground/60">
              {project.tags.join(" · ")}
            </p>
            {/* Only render a link when the JSON actually has a url. */}
            {project.url && (
              <a
                href={project.url}
                className="mt-3 inline-block text-sm underline"
              >
                {project.linkLabel ?? "View"}
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Certifications({ certs }: { certs: Cert[] }) {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="grid gap-4 sm:grid-cols-2">
        {certs.map((cert) => (
          <li key={cert.name}>
            <p className="font-medium">{cert.name}</p>
            <p className="text-sm text-foreground/60">{cert.issuer}</p>
            <p className="mt-1 text-sm text-foreground/80">
              {cert.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function EducationList({ items }: { items: Education[] }) {
  return (
    <Section id="education" title="Education">
      {items.map((edu) => (
        <div key={edu.institution}>
          <h3 className="font-semibold">{edu.credential}</h3>
          <p>{edu.institution}</p>
          <p className="text-sm text-foreground/60">
            {edu.university} · {edu.location} · {edu.status}
          </p>
        </div>
      ))}
    </Section>
  );
}

export function Contact({ data }: { data: Portfolio }) {
  return (
    <Section id="contact" title="Contact">
      <blockquote className="text-2xl font-semibold">
        “{data.contactQuote}”
      </blockquote>
      <p className="mt-4 max-w-2xl text-foreground/80">{data.contactIntro}</p>
      <a
        href={data.social.email}
        className="mt-6 inline-block rounded bg-foreground px-4 py-2 text-background"
      >
        Email me
      </a>
    </Section>
  );
}
