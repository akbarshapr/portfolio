/*
 * Tailwind v4 runs as a PostCSS plugin here rather than the Vite plugin the
 * old build used. Same compiler, same tokens, same output — only the host
 * changes. The stylesheet entry stays src/styles.css.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
