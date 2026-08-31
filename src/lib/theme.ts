/**
 * Blocking script injected into <head> *before* <HeadContent />, so it runs
 * before first paint. Without it, SSR always emits the light palette and a
 * visitor with a saved dark preference sees a white flash before hydration.
 *
 * Kept as a plain string on purpose: it must execute ahead of React, so it
 * cannot be a component. ThemeToggle reads back the class this applies rather
 * than recomputing the preference itself.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("theme");var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark")}}catch(e){}})();`;
