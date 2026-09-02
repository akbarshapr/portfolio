import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  // Runs prettier as a lint rule, so `npm run lint` fails on formatting. Must
  // stay last to switch off conflicting stylistic rules from the configs above.
  prettierRecommended,

  {
    rules: {
      // The About portrait is a plain <img> deliberately: a static export has
      // no server to optimise on demand, so next/image would buy nothing.
      "@next/next/no-img-element": "off",

      // Unused locals are tsc's business; noUnusedLocals is off in tsconfig too.
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default config;
