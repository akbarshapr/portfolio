import { getPortfolio } from "@/lib/portfolio";
import Container from "@/components/ui/Container";
import {
  About,
  Certifications,
  Contact,
  EducationList,
  ExperienceList,
  Hero,
  Projects,
  Skills,
  Wins,
} from "@/components/Sections";

// An async Server Component: it awaits the data on the server, then passes
// pieces of it down to each section as props.
export default async function Home() {
  const data = await getPortfolio();

  return (
    <main>
      <Container>
        <Hero data={data} />
      </Container>
      <About paragraphs={data.about} />
      <Wins wins={data.wins} />
      <Skills skills={data.skills} />
      <ExperienceList jobs={data.experience} />
      <Projects projects={data.projects} />
      <Certifications certs={data.certs} />
      <EducationList items={data.education} />
      <Contact data={data} />
      <Container>
        <footer className="py-10 text-center text-sm text-muted">
          © {new Date().getFullYear()} {data.name}
        </footer>
      </Container>
    </main>
  );
}
