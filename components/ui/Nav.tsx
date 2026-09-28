import Container from "@/components/ui/Container";

// Top bar: name on the left, in-page anchor links on the right. It scrolls
// away with the page, so it needs no JavaScript.
export default function Nav({
  name,
  links,
}: {
  name: string;
  links: { href: string; label: string }[];
}) {
  return (
    <header id="top">
      <Container className="flex items-center justify-between py-6">
        <a href="#top" className="font-medium tracking-tight">
          {name}
        </a>
        <nav aria-label="Main">
          <ul className="flex gap-5 text-sm text-subtle sm:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
