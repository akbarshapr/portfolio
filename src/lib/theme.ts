/**
 * Applies the saved or system theme before first paint, so a visitor with a
 * dark preference never sees a white flash.
 *
 * Stays a string because it has to run ahead of React — it cannot be a
 * component. ThemeToggle reads back the class it sets.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("theme");var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark")}}catch(e){}})();`;
