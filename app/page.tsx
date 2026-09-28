import { getPortfolio } from "@/lib/portfolio";
import Nav from "@/components/ui/Nav";
import {
  About,
  Contact,
  Credentials,
  ExperienceList,
  Footer,
  Hero,
  Projects,
  Skills,
  Wins,
} from "@/components/Sections";

const links = [
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// An async Server Component: it awaits the data on the server, then passes
// pieces of it down to each section as props.
export default async function Home() {
  const data = await getPortfolio();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Nav name={data.name} links={links} />
      <main id="main">
        <Hero data={data} />
        <About paragraphs={data.about} />
        <Wins wins={data.wins} />
        <ExperienceList jobs={data.experience} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Credentials certs={data.certs} education={data.education} />
        <Contact data={data} />
      </main>
      <Footer name={data.name} />
    </>
  );
}
