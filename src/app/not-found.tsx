import Link from "next/link";

import { primaryButton, StatusShell } from "@/components/status-shell";

// Written to out/404.html, which static hosts serve as their not-found page.
export default function NotFound() {
  return (
    <StatusShell
      code="404"
      title="Page not found."
      detail="The page you're looking for doesn't exist, or it moved somewhere else."
    >
      <Link href="/" className={primaryButton}>
        Go home
      </Link>
    </StatusShell>
  );
}
