import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  // Prettier runs as a lint rule, as it did in the old build — so `npm run lint`
  // fails on formatting. It must stay last to switch off conflicting stylistic
  // rules from the configs above.
  prettierRecommended,

  {
    rules: {
      /*
       * The About portrait is a plain <img> deliberately. A static export has
       * no server to optimise images on demand, so next/image would add API
       * surface and buy nothing. Leaving this rule on would flag a considered
       * decision on every single run.
       */
      "@next/next/no-img-element": "off",

      // Matches the old config: unused locals are tsc's business, not lint's,
      // and both noUnusedLocals/noUnusedParameters are off in tsconfig.
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default config;
