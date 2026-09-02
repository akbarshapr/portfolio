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

// Module scope, because there is one toggle and one <html>. Holds the handle
// that takes the crossfade class back off again.
let fadeTimer: number | undefined;

/** Matches the duration in the `theme-switching` utility, plus a little slack. */
const FADE_MS = 400;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} mode`}
      onClick={() => {
        const el = root();

        // Arm the crossfade BEFORE flipping the palette: a transition only runs
        // if the property is already declared when the value changes. Both
        // class writes land in the same style recalculation, so this is one
        // frame, not two. The class comes off again afterwards — leaving a
        // standing transition on every element would drag every hover and
        // focus change through it too.
        el.classList.add("theme-switching");
        window.clearTimeout(fadeTimer);
        fadeTimer = window.setTimeout(() => el.classList.remove("theme-switching"), FADE_MS);

        // Mutating the class is what drives the re-render, via the observer.
        el.classList.toggle("dark", next === "dark");

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
      className="hover-accent inline-flex h-10 w-10 items-center justify-center rounded text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : (
        <Moon className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
