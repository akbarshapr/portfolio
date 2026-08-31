# Portfolio — Akbar Sha

A single-page personal site for a Salesforce B2C Commerce (SFCC) developer. Static, fast, and deliberately quiet: no cards, no chips, two accent colours, and nothing on the page larger than 28px.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · static export

## Running it

```bash
npm install
npm run dev            # http://localhost:3000
```

```bash
npm run build          # static export into out/
npm run lint           # eslint (prettier runs as a lint rule)
npm run typecheck      # tsc --noEmit
npm run format         # prettier --write .
```

There is no `npm start` — `output: "export"` produces static files, so serve `out/` with any static server to preview a build.

## Editing content

**All copy lives in `src/content/portfolio.json`.** Nothing else needs touching to change what the page says.

`src/lib/portfolio.ts` types that file, so a missing or mistyped field fails `npm run typecheck` rather than rendering blank. Note that an _extra_ key is silently ignored — imported JSON isn't checked for excess properties — so if new content doesn't appear, check the spelling of its key first.

**Empty arrays hide their section.** A section whose array is empty renders nothing, drops out of the nav, and loses its number on the rail, with the remaining numbers closing up. Fill the array and the section, its nav entry and its number all come back together.

## Structure

```
src/app/          layout, page, error/404, generated sitemap + robots
src/components/   portfolio/ (16 section components) · ui/ · theme-toggle
src/content/      portfolio.json — all copy
src/lib/          types, section registry, site identity, theme script
src/styles/       design tokens, base styles, custom utilities
```

Two of the eighteen components are Client Components (the theme toggle and the nav sheet). The rest are Server Components and ship no JavaScript.

## Deploying

`npm run build` writes a complete static site to `out/` — including generated `robots.txt` and `sitemap.xml`. Any static host serves it with no configuration.

The origin is set in one place, `src/lib/site.ts`. Change `SITE_URL` there and the canonical, Open Graph and Twitter tags, JSON-LD, sitemap and robots all follow.

## Notes for contributors

`CLAUDE.md` documents the design constraints in detail — the rail, the two-accent system, the token palette, and the things that look like cleanup but will quietly break the page. Read it before changing anything visual.
