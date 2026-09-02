"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const root = () => document.documentElement;

/*
 * The toggle owns the flip, not the initial value — themeInitScript already put
 * the class on <html> before first paint. Reading it back through
 * useSyncExternalStore keeps server and client in agreement without a `mounted`
 * flag or a setState inside an effect.
 */
function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (root().classList.contains("dark") ? "dark" : "light");

// Used for SSR and for the hydration pass, so both agree. The observer corrects
// it immediately afterwards.
const getServerSnapshot = (): Theme => "light";

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

        // Arm the crossfade BEFORE flipping: a transition only runs if the
        // property is already declared when the value changes. Both class
        // writes land in one style recalculation.
        el.classList.add("theme-switching");
        window.clearTimeout(fadeTimer);
        fadeTimer = window.setTimeout(() => el.classList.remove("theme-switching"), FADE_MS);

        el.classList.toggle("dark", next === "dark");

        // Persisted here and nowhere else: writing on mount would pin a visitor
        // who never touched the toggle to their first-visit system preference.
        try {
          window.localStorage.setItem("theme", next);
        } catch {
          // Blocked storage — the toggle still works, it just isn't remembered.
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
