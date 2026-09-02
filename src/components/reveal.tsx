"use client";

import { useEffect } from "react";

type RevealWindow = Window & { __revealHold?: () => void };

/**
 * Reveals each `[data-reveal]` block as it scrolls into view, continuing the
 * hero's intro down the page.
 *
 * This is the THIRD client component on the site, and it was added because the
 * intro alone left a seam: the About section begins at 584px on every viewport
 * measured, desktop and mobile alike, so it is never below the fold. It sat
 * fully painted and motionless while the hero assembled above it, which read as
 * a broken animation rather than a restrained one.
 *
 * It renders nothing and holds no state — it is a single IntersectionObserver
 * over every marked block, so the count of observers does not grow with the
 * page. The sections themselves stay Server Components.
 *
 * Two behaviours are deliberate:
 *
 * - Blocks already on screen at load are staggered from 900ms, which is where
 *   the hero's own stagger is finishing. Anything scrolled to later arrives
 *   immediately, because a delay you have to wait through after scrolling reads
 *   as lag rather than as choreography.
 * - Reduced motion, or a browser with no IntersectionObserver, reveals
 *   everything at once and drops `reveal-armed` — the hidden state is a plain
 *   CSS rule, not an animation, so the media query in base.css cannot undo it.
 *   That branch is the only thing standing between those users and a blank page.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;

    // Alive: cancel the init script's failsafe. Had this never mounted, that
    // timer would have unhidden the page by itself.
    (window as RevealWindow).__revealHold?.();

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const show = (el: HTMLElement, delay: number) => {
      if (delay > 0) el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.dataset.reveal = "shown";
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => show(el, 0));
      root.classList.remove("reveal-armed");
      return;
    }

    // The first callback carries everything already on screen; those pick up
    // where the hero leaves off. Later ones are being scrolled to, so they land
    // without delay.
    let atLoad = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries.filter((entry) => entry.isIntersecting);

        arriving.forEach((entry, i) => {
          show(entry.target as HTMLElement, atLoad ? 900 + i * 120 : 0);
          observer.unobserve(entry.target);
        });

        if (arriving.length > 0) atLoad = false;
      },
      // Bottom inset so a block starts moving once it is properly in the
      // viewport rather than the instant its first pixel clears the edge.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
