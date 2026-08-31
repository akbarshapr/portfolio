"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const root = () => document.documentElement;

/**
 * The toggle owns the flip, not the initial value.
 *
 * themeInitScript (lib/theme.ts) has already resolved saved-preference →
 * system-preference and put the class on <html> before first paint. That class
 * is external state, which is exactly what useSyncExternalStore is for: it
 * reads the live DOM on the client, takes a separate snapshot on the server,
 * and reconciles the two without a `mounted` flag or a setState inside an
 * effect. The button therefore can never disagree with what is on screen.
 */
function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (root().classList.contains("dark") ? "dark" : "light");

// Used for SSR *and* for the hydration pass, so the server HTML and React's
// first client render agree. The observer corrects it immediately afterwards.
const getServerSnapshot = (): Theme => "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} mode`}
      onClick={() => {
        // Mutating the class is what drives the re-render, via the observer.
        root().classList.toggle("dark", next === "dark");

        // Persistence happens HERE and nowhere else, on purpose. Writing
        // localStorage on mount would pin a visitor who never touched the
        // toggle to whatever their system said on their first visit, and they
        // would stop following system changes from then on.
        try {
          window.localStorage.setItem("theme", next);
        } catch {
          // Private mode or blocked storage — the toggle still works for this
          // page view, it just won't be remembered.
        }
      }}
      className="hover-accent inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
