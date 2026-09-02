/**
 * Blocking script injected into <head> alongside themeInitScript, and it exists
 * for one reason: to make the scroll reveal SAFE.
 *
 * The reveal hides each section until it scrolls into view. Hiding content is
 * the dangerous half of that idea — if the hidden state were a plain CSS rule,
 * then JavaScript disabled, a bundle that 404s, or a hydration error would each
 * leave a permanently blank portfolio. So the hidden state in styles/base.css is
 * scoped to `.reveal-armed`, and that class is only ever added HERE, by script.
 * No script, no hiding: the page renders in full.
 *
 * That still leaves the case where JS runs but the Reveal component never
 * mounts. Hence the timer: 2.5s after paint the class drops on its own and
 * everything becomes visible. Reveal cancels it via `__revealHold` as soon as it
 * mounts, so on a healthy page the timer never fires.
 *
 * Kept as a string for the same reason as themeInitScript — it has to execute
 * ahead of React, so it cannot be a component.
 */
export const revealInitScript = `(function(){try{var d=document.documentElement;d.classList.add("reveal-armed");var t=setTimeout(function(){d.classList.remove("reveal-armed")},2500);window.__revealHold=function(){clearTimeout(t)}}catch(e){}})();`;
