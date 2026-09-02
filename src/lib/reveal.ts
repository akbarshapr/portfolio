/**
 * Arms the scroll reveal before first paint.
 *
 * Two guards keep it from ever blanking the page, and both are required:
 * the hidden rule in styles/base.css is scoped to `.reveal-armed`, which only
 * this script adds (no script, no hiding), and the 2.5s timer drops the class
 * again if the Reveal component never mounts. Reveal cancels the timer through
 * `__revealHold`.
 *
 * Stays a string for the same reason as themeInitScript.
 */
export const revealInitScript = `(function(){try{var d=document.documentElement;d.classList.add("reveal-armed");var t=setTimeout(function(){d.classList.remove("reveal-armed")},2500);window.__revealHold=function(){clearTimeout(t)}}catch(e){}})();`;
