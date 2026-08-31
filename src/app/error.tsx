"use client";

import { useEffect } from "react";

import { primaryButton, secondaryButton, StatusShell } from "@/components/status-shell";

/**
 * The route error boundary. It must be a Client Component — that is a framework
 * requirement, not a choice, since it receives `reset` as a callback.
 *
 * This replaces the whole four-file SSR error pipeline the TanStack build
 * needed (server.ts, start.ts, error-capture.ts, error-page.ts). Those existed
 * because h3 swallowed in-handler throws into a JSON 500 that a try/catch never
 * saw. A static export has no request handler to throw from, so the problem
 * they solved no longer exists.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Logging is a side effect — keeping it out of the render body means a
  // double-render in StrictMode doesn't double-report.
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusShell
      code="500"
      title="This page didn't load."
      detail="Something went wrong on our end. Try again, or head back to the start."
    >
      <button type="button" onClick={reset} className={primaryButton}>
        Try again
      </button>
      {/*
        A plain <a>, not next/link, and the rule below is disabled deliberately:
        this boundary renders when the React tree has already failed, so a full
        document load is the reliable way out. A client-side navigation would
        reuse the runtime that just broke.
      */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/" className={secondaryButton}>
        Go home
      </a>
    </StatusShell>
  );
}
