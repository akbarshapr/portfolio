"use client";

import { useEffect } from "react";

type RevealWindow = Window & { __revealHold?: () => void };

/**
 * Reveals each `[data-reveal]` block as it scrolls into view, continuing the
 * hero's intro down the page. Renders nothing and holds no state, so the
 * sections themselves stay Server Components.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;

    // Alive: cancel the init script's failsafe timer.
    (window as RevealWindow).__revealHold?.();

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const show = (el: HTMLElement, delay: number) => {
      if (delay > 0) el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.dataset.reveal = "shown";
    };

    // The hidden state is a plain CSS rule, not an animation, so the
    // reduced-motion block in base.css cannot undo it. This branch is the only
    // thing between those readers and a blank page.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => show(el, 0));
      root.classList.remove("reveal-armed");
      return;
    }

    // Blocks on screen at load pick up where the hero's stagger finishes.
    // Later ones are being scrolled to, so they land with no delay — a wait
    // after scrolling reads as lag rather than choreography.
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
