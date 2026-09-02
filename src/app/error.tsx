"use client";

import { useEffect } from "react";

import { primaryButton, secondaryButton, StatusShell } from "@/components/status-shell";

// Must be a Client Component — a route error boundary receives `reset` as a
// callback, so this is a framework requirement rather than a choice.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        A plain <a>, not next/link: this renders after the React tree has
        failed, so a full document load is the reliable way out — a client-side
        navigation would reuse the runtime that just broke.
      */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/" className={secondaryButton}>
        Go home
      </a>
    </StatusShell>
  );
}
