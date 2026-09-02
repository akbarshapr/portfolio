# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio for **Akbar Sha** (SFCC / Salesforce B2C Commerce developer) — nav, hero, about, skills, projects, experience, education, certs, wins, worklog, "beyond development", contact/footer. Built on **Next.js 16 (App Router) + React 19 + Tailwind v4**, exported as a fully static site, with one shadcn/ui component. The visual design follows `https://astro-cactus.chriswilliams.dev/` — see **The design reference**.

**Migrated on 2026-08-31 from a Lovable-scaffolded TanStack Start app.** The previous tree still exists at `../portfolio-dev`, with its pre-migration state committed there as `b1a93ef`. Nothing here talks to Lovable any more: the vite config wrapper, `componentTagger`, and the `window.__lovableEvents` error reporting are all gone. That also means **this project is no longer deployed by Lovable** — see **Deploying**.

## Commands

```bash
npm run dev            # next dev
npm run build          # next build → static export into out/
npm run lint           # eslint (prettier runs as a lint rule)
npm run format         # prettier --write .
npm run typecheck      # tsc --noEmit
```

There is no `npm start`: `output: "export"` produces static files, so `next start` does not apply. To preview a build, serve `out/` with any static server.

No test runner is configured; there are no tests. Since prettier runs as an ESLint rule, format before linting or formatting shows up as lint errors.

### Running it from a Windows session

`node_modules/` is installed from Linux, so **anything that builds or serves must run inside WSL**. A Windows session can drive WSL via `wsl.exe -e bash -lc '...'`, with two traps:

- **Node is not on the PATH** of a non-interactive WSL shell. It is installed through nvm and `.bashrc` bails before sourcing it, so every command needs the prefix `export PATH="$HOME/.nvm/versions/node/v24.17.0/bin:$PATH"`. Without it, bare `node` is "command not found" and bare `npm` silently resolves to **Windows** `npm.exe` through interop, which then fails on the UNC path.
- **Background jobs die when `wsl.exe` returns.** `nohup … &` is not enough. Use tmux, which is installed: `tmux new-session -d -s dev "cd … && npm run dev 2>&1 | tee /tmp/dev.log"`. The session survives across invocations; read progress from the log.

`/tmp` persists across `wsl.exe` calls. Occasional `cygheap read copy failed` / `fork: retry` errors from the Git-Bash side are environmental — just retry. Long heredocs sent through the Windows shell are fragile; prefer writing files directly.

Pure-JS tools work from a Windows session, but `npm run <script>` and `npx` still fail there (`CMD.EXE ... UNC paths are not supported`). Invoke those through node directly:

```bash
node node_modules/eslint/bin/eslint.js .          # add --fix to autofix
node node_modules/prettier/bin/prettier.cjs --write .
node node_modules/typescript/bin/tsc --noEmit
```

### Seeing the page

The design can be checked visually, and should be — several claims in this file's ancestor were wrong until they were looked at. Chrome and Edge are both installed on the Windows side, and Windows reaches a WSL server on `localhost` directly. Windows node's global `WebSocket` is enough to drive Chrome over CDP with no npm dependency:

```
chrome.exe --headless --disable-gpu --hide-scrollbars \
           --remote-debugging-port=9222 --user-data-dir=<tmp> about:blank
```

Then `PUT /json/new`, connect to `webSocketDebuggerUrl`, and use `Emulation.setEmulatedMedia` with `prefers-color-scheme` to force either theme — that is the only way to see dark mode, since the toggle needs a click and the init script otherwise follows the host.

Three CDP behaviours will waste time if you rediscover them:

- **`window.scrollTo` is inert** once `Emulation.setDeviceMetricsOverride` is active. `scrollY` stays 0 and `scrollIntoView` does nothing.
- **`Page.captureScreenshot`'s `clip.y` is ignored**, with or without `captureBeyondViewport`. It always renders from the top of the document. To shoot a section below the fold, move the page with **layout** instead: measure the element, set `document.body.style.marginTop` to minus its offset, size the viewport to the element's height, and capture with no clip. Assert afterwards that `getBoundingClientRect().top` is where you expect — a silently wrong offset otherwise looks like a real screenshot of the wrong thing.
- **`Runtime.evaluate` needs `awaitPromise: true`** for an async expression, or you silently get `{}` back.

Note `--headless=new` fails here and `--blink-settings=preferredColorScheme=…` makes Chrome exit without writing a file; use the old `--headless` and CDP for theming.

## Deploying

`npm run build` writes a complete static site to `out/` — HTML, CSS, JS, self-hosted fonts, plus generated `robots.txt` and `sitemap.xml`. Any static host serves it with no configuration: Cloudflare Pages, Netlify, GitHub Pages, Vercel. There is no server component and nothing to run.

`SITE_URL` in `src/lib/site.ts` still points at `https://akbarsha.lovable.app`. **That is stale** — it is the origin the old Lovable deployment used. Change it there and the whole meta surface follows: canonical, og/twitter, JSON-LD, sitemap, robots. Only `public/llms.txt` needs a separate look, and it currently contains no absolute URLs.

## Dependency policy

`package.json` lists **only what `src/` imports**. What is here and why:

- `@radix-ui/react-dialog` + `class-variance-authority` — required by the one shadcn component, `src/components/ui/sheet.tsx` (the nav sheet).
- `clsx` + `tailwind-merge` — `cn()`.
- `lucide-react`, `react`, `react-dom`, `next`, Tailwind, `tw-animate-css`.

To bring a shadcn component back, add whatever radix package it imports. Do **not** re-add a package speculatively.

**`lucide-react` is pinned to `^0.575.0` deliberately.** Version 1.x removed every brand icon for trademark reasons — `Github` and `Linkedin` do not exist there at any casing, and the build fails with `Export Linkedin doesn't exist in target module`. Upgrading means sourcing those two marks elsewhere (inline SVG, or simple-icons), which is a design decision, not a maintenance one.

There is deliberately **no data-fetching library**. The site is one static page with zero data fetching.

`package-lock.json` is the only lockfile. There is no `bun.lock` and no `bunfig.toml`; bun is installed nowhere on this machine.

## Architecture

### Static export, and what it rules out

`next.config.ts` sets `output: "export"`. `next build` emits `out/` and nothing runs at request time. The consequences worth knowing:

- **No ISR, no middleware, no route handlers, no server actions.** None of which this page has ever used.
- **`images.unoptimized: true`** is required, since there is no server to optimise on demand. The About portrait is a plain `<img>`; `@next/next/no-img-element` is switched off in `eslint.config.mjs` with that reasoning recorded there.
- **A metadata route must declare `export const dynamic = "force-static"`** or the build fails collecting it. Both `sitemap.ts` and `robots.ts` do.
- **`new Date()` is evaluated at build time.** The footer copyright year in `contact.tsx` freezes at whatever year you last built. Rebuild annually, or move it client-side.

This replaced a four-file SSR error pipeline (`server.ts`, `start.ts`, `lib/error-capture.ts`, `lib/error-page.ts`) that existed only because h3 swallowed in-handler throws into a JSON 500 a try/catch never saw. With no request handler there is nothing to throw from, so all four are gone. `app/error.tsx` and `app/not-found.tsx` cover what is left.

### Routing

App Router, `src/app/`. Everything lives under `src/`, so the `@/*` alias means `./src/*` and every import survived the migration unchanged.

```
src/app/layout.tsx     the only layout — <html>/<head>/<body>, metadata, theme script, font
src/app/page.tsx       the page ("/"), plus its JSON-LD
src/app/not-found.tsx  → out/404.html
src/app/error.tsx      route error boundary; MUST be a Client Component
src/app/sitemap.ts     → out/sitemap.xml
src/app/robots.ts      → out/robots.txt
```

Do not create `src/pages/` (that is the old Pages Router) or `src/routes/` (that was the TanStack convention this replaced).

Nav is anchor-based scrolling, not routing. The `Section id` **is** the anchor target (note `Projects` uses `id="work"`, not `"projects"`) — renaming an id silently breaks the nav _and_ the rail numbering.

### Server and Client Components

**Sixteen of the eighteen components are Server Components and ship no JavaScript.** None of them uses a hook. Only two files carry `"use client"`:

- `src/components/theme-toggle.tsx` — reads and flips the theme.
- `src/components/ui/sheet.tsx` — the Radix dialog.

`nav.tsx` stays a Server Component even though it renders both of them: a Server Component may render Client Components and pass them server-rendered children. Do not add `"use client"` to it, or the whole nav tree joins the client bundle for nothing.

`src/components/status-shell.tsx` carries no directive on purpose. `not-found.tsx` renders it on the server; `error.tsx` (a Client Component) pulls it into the client graph. It works in both because it holds no state.

### Metadata merges SHALLOWLY — this has already bitten once

Next replaces a nested `metadata` object rather than deep-merging it. An `openGraph` exported from a page **replaces** the layout's outright, silently dropping `og:image`, `og:site_name` and `og:type`, with no warning and no build error.

`src/lib/metadata.ts` exists for exactly this: `OG_BASE` holds everything that must appear on every page, and both `layout.tsx` and `page.tsx` spread it. **Add to `OG_BASE`, never to one call site.** After changing metadata, check the built HTML rather than trusting it:

```bash
grep -oE '<meta property="og:[^>]*>' out/index.html
```

### Content is JSON, schema is TypeScript

`src/content/portfolio.json` holds every editable value — identity, `avatar`, `portrait`, `social` URLs, `handles`, `currentlyInto`, `about`, `skills`, `projects`, `experience`, `education`, `certs`, `wins`, `stats`, `worklog`, `beyond`. **Copy changes go there and nowhere else.**

`src/lib/portfolio.ts` declares the types and does one thing with them:

```ts
import data from "@/content/portfolio.json";
export const portfolio: Portfolio = data;
```

The annotation is load-bearing. It is what makes `tsc` reject a missing or mistyped field in the JSON, and it is why optional keys (`Project.outcome`/`.github`/`.demo`, `Certification.year`/`.credentialUrl`, `EducationEntry.location`, `ExperienceEntry.location`) stay optional instead of being narrowed away — the components guard on those fields, so omitting a key just drops its markup. Requires `resolveJsonModule`.

One thing the annotation does _not_ catch: an **extra** key. Imported JSON isn't a fresh object literal, so excess-property checking doesn't apply and a typo'd key is silently ignored rather than flagged. If content doesn't appear, check the spelling of its key first.

**Empty arrays are a feature.** Each section component early-returns `null` when its array is empty, and `sections.ts` filters by the same check — so an unfilled section leaves no dead anchor, no rail number, and no placeholder on the page, and the numbering closes up rather than skipping. Fill the array and the section, its nav entry and its number all appear together. Never fill one with sample data to "see the layout".

Only `worklog` is currently empty; it needs prose written in the first person, which is not something to generate.

**Every claim on this page traces to the CV at `C:\Users\akbarsha.r\Documents\My Docs\Akbarsha_PR_Resume.pdf`.** The employer (Tryzens Global), the numbers (3 enterprise clients, 5–6 storefronts, sub-5% defect rate, 3–4 MuleSoft OMS builds), the certifications, the education, and all three project entries come from it. An earlier iteration carried invented projects and invented metrics; they were removed. Do not add a project, a metric, a client, or a credential that is not in that document or supplied directly by Akbar.

Specifically: leave a project's `outcome` out rather than filling it with an estimate — `wins` exists to hold the defensible numbers, and all three current projects deliberately omit `outcome` because the CV states no per-project result.

Note the site name is **Akbar Sha** while the CV reads **Akbarsha PR**. That is a deliberate choice, not drift — leave it.

Assets: the avatar is served from `public/avatar.jpg` and referenced by public path. It is used only for `og:image`/`twitter:image`/JSON-LD — it is not rendered on the page — so it is not an LCP concern. `portrait` is the ~4:5 image beside the About copy; it ships as `/portrait-placeholder.svg`, a deliberately obvious grey stand-in, so a real photo can be dropped into `public/` and pointed at without touching a component. There is no `src/assets/`.

### Page composition and anchors

`src/app/page.tsx` renders `SiteNav` + `<main id="main">` with the section components in order: Hero, About, Skills, Projects, Experience, Education, Certs, Wins, Worklog, Beyond, Contact.

**Sections flow; they do not snap.** Each one is separated by the `RailRow`'s own `py-12 sm:py-16`, so the page scrolls as a continuous document. There is no `min-height` and no viewport centring. `html { scroll-padding-top: var(--header-height) }` is the **only** anchor offset; sections carry no `scroll-margin`, because the two would add up.

### The design reference

The layout was built against `https://astro-cactus.chriswilliams.dev/`. What that means concretely, and what must not quietly creep back:

- **No cards.** Nothing on the page has a filled background, a shadow, or a box outline. Grouping is done with `divide-y` rules, label columns, and whitespace. There is no `--card` token, so reaching for `bg-card` will not compile.
- **No pills or chips.** `TechTags` renders dot-separated plain text. The bordered uppercase chip row it used to render was most of what made the page feel busy.
- **No iconography beyond navigation affordances.** What is left is the `BrandMark`, the three social icons, and the arrow/menu/theme glyphs — all of which do a job.
- **Two accents, and the split is structural.** A component cannot pick a colour; the page opens cobalt and closes red, on a boundary declared once in `sections.ts`. See **The two accents**.
- **The largest text on the page is 32px.** See **Typography**.

There is **no code-styled text anywhere on the page.** Nav links read `About`/`Work`/`Notes`, not `~/about`; the footer shows a plain copyright, not `$ echo`. The body voice is monospace, but that is a typographic choice, not a terminal affectation. If you are adding UI, do not write shell prompts, file paths, `//` comment prefixes, or `const x = "..."` lines as visible copy.

### The rail

The page's one structural motif. A single hairline runs the full height of **every** section, so consecutive sections join into one unbroken line down the page, with a numbered node where each section begins and a short connector running into its label.

Three pieces hold it up:

- **`src/lib/sections.ts`** — the registry. One array of `{ id, label, show, inNav, tone }` drives the nav links, the rail numbers, each section's eyebrow label, and which of the two accents it carries. `show` is derived from the data: a section with no content is filtered out of `SECTIONS`, so it loses its link _and_ its number. Never hardcode a section number. `inNav` is narrower — it drops a link from the header without hiding the section, and `NAV_SECTIONS` is that subset. **Do not use `inNav: false` to hide a section**; an empty array in `portfolio.json` is what does that.
- **`src/components/portfolio/rail.tsx`** — `RailRow` (the two-column layout plus the line and node) and `RailLabel` (the connector and eyebrow). Hero passes no `index`, so it gets a plain marker rather than a number; the line still starts there.
- **The `rail-*` utilities and tokens.** `--page-pad` / `--rail-width` / `--rail-gap` live in `tokens.css` with one `sm` media query. The line is positioned at `calc(var(--page-pad) + var(--rail-width) / 2)` — the centre of the rail column — so **`--page-pad` must equal the padding `rail-grid` applies, or the line drifts off its column.** The line is absolutely positioned and therefore not a grid item.

Everything except `hero`, `contact`, and `nav` renders through the shared `Section` wrapper, which composes `RailRow` + `RailLabel` above a serif heading whose last word is italic and accented. `Contact` builds its own `RailRow` because it also contains the footer.

Shared pieces:

- `primitives.tsx` — `TechTags` (the dot-separated tech line) and `Bullets` (the em-dash list). Both were duplicated verbatim across projects/experience/education; add to this file when a third component wants the same markup.
- `diagram.tsx` — one export, `BrandMark`: a **torii**, two uprights and two crossbeams drawn as hairlines so it belongs to the same family as the rail. It is a gateway, which is a fair description of the work. Because `rail-slot` centres it, the mark sits on the **same vertical axis** as the rail line — verified in the browser at x = 308.00 (mark) against 308.50 (the line, a 1px rule straddling the axis) at a 1280px viewport. The line does not pass _through_ the gate: it starts at the hero's `RailRow`, below the header, so a deliberate gap sits between the two. They share the axis, not the stroke.

  **Five strokes, no fills, no second colour — that is the budget**, and it is what keeps the mark legible at 16px. The shimaki, the kusabi and a plinth are all correct on a real torii and all turn to mush below 24px. **Every path is `currentColor`**: the mark takes the text colour it sits in, so one file serves both themes with no `.dark` variant and no second asset. **Never hardcode a hex in it** — a fixed white disappears on the light background and a fixed dark one disappears at night. Set the colour on the parent, which is `text-accent` in the nav.

  **`public/favicon.svg` is the same five paths with the palette hardcoded** — a favicon has no CSS context, so `currentColor` there resolves to the browser default rather than ours. It sits on a solid accent tile so it survives 16px, currently `#0061d8` with `#f8f8f8` marks; **if `--accent` changes, this file must change with it.** One thing differs from the component, and only for legibility at 16px: `stroke-width` 2 rather than 1.5. The 24-unit artwork is inset into the 32-unit tile with `translate(4 4)`.

### The header

**Two rows.** Row one is the identity line — the mark, the name, and the controls (menu + theme), all on one line at every width, with the controls pushed right by `ms-auto`. Row two is the links, divided by hairlines and indented past the rail column by an empty `rail-slot` so they sit under the name rather than under the mark. The row-two wrapper carries the breakpoint (`hidden lg:block`) rather than the `rail-lead` element itself, because `hidden` and `rail-lead`'s own `display: flex` are both utilities and would fight.

The header name is **monospace**; the hero `h1` is **Space Grotesk 700** at `--text-display`, the page's third family and the only place it appears. The serif belongs to the section headings and starts at section 01.

**The header does not stick.** The reference's scrolls away, and a two-line header pinned to the top of a 768px column eats too much of the viewport. `--header-height` survives only as the scroll-padding above an anchor target, which is why it is 2rem and no longer describes a height.

**The two rows swap responsibilities at `lg`, and exactly one is ever the navigation.** At `lg` and above the link row shows **four** links — About, Work, Experience, Contact, from `NAV_SECTIONS` — and the menu button is hidden. Below `lg` the links are hidden and the `Sheet` **is** the navigation, which is why it lists **every** section with its rail number rather than the four. Never hide both, and do not hide the menu button below `lg` "for symmetry" — that strands nine sections behind scrolling alone.

The hero intro is **plain text in one colour**, and it opens straight on the name — there is no eyebrow above it.

The three social links below it are **icons with no captions**, and no "Find me on" label above them. With the visible text gone, each anchor's only accessible name is its `aria-label` — that attribute is load-bearing, not decoration, and must not be dropped as tidy-up.

### Theming — split across four places

- `src/lib/theme.ts` exports `themeInitScript`, a stringified blocking script that `layout.tsx` injects into `<head>`. It resolves saved preference → system preference and sets the `.dark` class pre-paint. It must stay first in `<head>`, and it must stay a string — it has to run ahead of React, so it cannot be a component.
- `<html>` carries **`suppressHydrationWarning`**, and that is load-bearing, not noise suppression: the init script mutates `className` before React hydrates, so server and client markup differ there by design. It is scoped to that one element and does not reach anything inside.
- `src/components/theme-toggle.tsx` owns the flip but **not** the initial value. It reads the applied class through **`useSyncExternalStore`**, with a `MutationObserver` subscription and a separate server snapshot. That is what keeps hydration consistent without a `mounted` flag or a `setState` inside an effect — both of which React 19's lint rules now reject. There is no `ThemeProvider` and no `next-themes`.
- The flip is a **crossfade**, not a cut. The click handler adds `theme-switching` to `<html>`, flips `.dark`, and takes the class off again 400ms later. It has to be added **before** the flip — a transition only runs if the property is already declared when the value changes — and both class writes land in one style recalculation, so it is one frame. It is a class rather than a standing rule on `*` because a permanent transition would drag every hover and focus change through it too. Specificity carries it: `.theme-switching *` is (0,1,1) and outranks `hover-accent`'s own transition at (0,1,0) inside the utilities layer. Reduced motion needs nothing extra — `base.css` collapses `transition-duration` with `!important`, and an important declaration in an earlier cascade layer outranks a later one.
- It writes `localStorage` **only in the click handler** — persisting on mount would pin a visitor who never touched the toggle to whatever their system said on their first visit, and they'd stop following system changes afterwards.
- The `theme-color` entries in `layout.tsx`'s `viewport` export use `prefers-color-scheme` media queries, so they follow the **system** preference only. A meta query cannot observe the `.dark` class the in-page toggle sets; this is a known, accepted limitation affecting only mobile browser chrome.

### Stylesheet layout

Tailwind v4 runs through **PostCSS** here (`postcss.config.mjs` → `@tailwindcss/postcss`), not the Vite plugin the old build used. Same compiler, same tokens, same output.

`src/styles.css` is a 14-line entry point and nothing else. `@import` rules must come first in a CSS file, so its order is fixed:

```
@import "tailwindcss" source(none);   -> Tailwind, with auto content-detection off
@import "tw-animate-css";             -> the animate-in/slide-in-from-* utilities sheet.tsx uses
@import "./styles/tokens.css";        -> @theme inline + :root + .dark
@import "./styles/base.css";          -> @layer base
@import "./styles/utilities.css";     -> custom @utility blocks
@source "../src";                     -> explicit scan root (relative to styles.css)
@custom-variant dark (&:is(.dark *)); -> class-based dark mode, not media-based
```

`styles.css` must stay at `src/styles.css`: `@source "../src"` resolves relative to the stylesheet, so moving the file silently changes what Tailwind scans.

**`src/styles/tokens.css`** is the only file allowed to contain a raw value.

- `@theme inline` maps custom properties to Tailwind namespaces: `--color-*` → `bg-*`/`text-*`/`border-*`, `--text-*` → `text-*`, `--tracking-*` → `tracking-*`, `--container-*` → `max-w-*`, `--font-*` → `font-*`.
- **The palette is nine tokens and that is deliberate.** `--background`, `--foreground`, `--muted-foreground`, `--secondary` (only the nav sheet uses it), `--accent`, `--accent-warm`, `--accent-foreground`, `--border`, `--ring`. The accent is **cobalt** — `oklch(0.52 0.2 258)` light, `oklch(0.72 0.15 258)` dark. `--accent-warm` is the red that closes the page. **All colors must be oklch.**
- Adding a semantic color means three edits: `:root`, `.dark`, **and** `@theme inline` as `--color-<name>`. A token defined only in `:root` silently keeps its light value in dark mode — there is no error, just a wrong color.
- **Both palettes are near-neutral.** Light is `oklch(0.98 0 0)` — literally zero chroma, a plain sheet rather than warm paper. Dark is `oklch(0.2364 0.0045 248)`.
- Two rules survive from the palette work and still apply. If you darken `--background` in dark mode, raise `--border` with it or the hairlines vanish — and the rail _is_ hairlines. And keep dark-mode chroma at or below ~0.006: a large field is far more sensitive to a hue cast than a small swatch suggests.
- **`--font-serif` reads `var(--font-dm-serif)` and `--font-display` reads `var(--font-space-grotesk)`**, both of which `next/font` defines on `<html>` via the classes applied in `layout.tsx`. Do not put either family name back as a literal — the fonts are self-hosted and their generated names are not stable. `--font-display` keeps a real system-sans fallback behind it, so dropping the download degrades the name rather than breaking it.
- Non-colour tokens: `--container-page` (48rem/768px), `--container-measure` (80ch, the measure for running copy), `--header-height` (2rem — scroll-padding above an anchor, **not** a header height; the header does not stick), `--page-pad`/`--rail-width`/`--rail-gap` (rail geometry, with one `sm` media query), the seven type steps `--text-nano` → `--text-display`, `--tracking-label`/`--tracking-caption`/`--tracking-display` (the last is negative and belongs to `--text-display` alone), `--radius`.
- **An arbitrary value in a component is a smell.** `text-[11px]`, `tracking-[0.16em]`, `leading-[1.9]` and friends were all replaced by tokens. If you need one, add the token here first — unless it genuinely occurs once. The same goes for a raw Tailwind size like `text-lg`: the token scale replaced all of them, and reintroducing one breaks the page's one-class-per-element rule.

**`src/styles/base.css`** holds element defaults: the border-colour reset, `scroll-padding-top`, the body font and colour, `::selection`, and a `prefers-reduced-motion: reduce` block. That block reaches CSS animations only — SMIL and JS-driven motion would each need their own check.

**`src/styles/utilities.css`** holds the custom `@utility` blocks: `font-serif` (_overridden_ to carry font-feature-settings with the family), `micro-label`, `link-underline`, `hover-accent`, `theme-switching`, and the layout set (`page-shell`, `rail-grid`, `rail-line`, `rail-slot`, `rail-lead`). A pattern earns a place here once a second component wants it.

**An `@utility` block cannot always beat a built-in.** `font-serif` overrides cleanly because Tailwind generates it from `--font-serif`, so redefining the token redefines the utility. `max-w-prose` does **not**: v4 ships it as a static `65ch` rule outside the `--container-*` scale, and an `@utility max-w-prose` is merged _into_ that same rule with the built-in `65ch` last, so it silently loses. That is why running copy uses **`max-w-measure`** (from `--container-measure`) — a name Tailwind does not already own generates cleanly and simply wins. Check the compiled CSS before assuming an override took: `grep -A3 'max-w-' out/_next/static/**/*.css`.

**`hover-accent` is the page's only hover treatment.** Nothing lifts, translates, or casts a shadow — with no cards there is nothing to raise, so hover is a colour change and a border tint, matching the reference's `.cactus-link`. Use `hover-accent` rather than writing a new `hover:text-accent`, so everything responds identically.

### The two accents

The page opens **cobalt** and closes **red**. Both sit at matched lightness and chroma about 234° apart in hue, so neither outweighs the other where they meet.

The switch happens **once**, in `sections.ts`: every entry carries `tone: "cool" | "warm"`, and the first `"warm"` in that array is the boundary. Moving it is a one-word edit. Results, Notes, Beyond, and Contact are warm today; everything above them is cool.

It is applied by **rebinding `--accent` on the `<section>` element**, not by swapping classes:

```ts
const WARM = { "--accent": "var(--accent-warm)" } as CSSProperties;
```

`sectionToneStyle(id)` returns that object for a warm section and `undefined` otherwise, and `Section` (plus `Contact`, which builds its own `RailRow`) spreads it onto `style`. Every `text-accent` / `border-accent` / `stroke-accent` inside then recolours at once — headings, list markers, metrics, hover states — with no component knowing which half of the page it is in.

**This only works because everything resolves `var(--accent)` at the element.** Tailwind's generated utilities already do, because `@theme inline` compiles `.text-accent` to `color: var(--accent)`. The hand-written `@utility` blocks had to match: `hover-accent`, `link-underline`, and `::selection` read `var(--accent)`, not `var(--color-accent)`, which resolves **once on `:root`** and inherits as a fixed value — so it would stay cobalt inside a warm section. **Never write `var(--color-accent)` in `utilities.css` or `base.css`** — the two names are not interchangeable.

**The hero intro carries no accent at all.** The paragraph is one flat `text-muted-foreground`. Colouring the phrase that points at Results was tried and pulled back out: a coloured word in the opening sentence reads as decoration rather than as structure, and the accent is meant to be something the page arrives at. The only accent above the fold is the role line and the nav.

### Typography — two voices, seven sizes

| Family            | Token            | Used for                            |
| ----------------- | ---------------- | ----------------------------------- |
| System mono       | `--font-mono`    | everything. **The `body` default.** |
| DM Serif Text     | `--font-serif`   | section headings and entry titles   |
| Space Grotesk 700 | `--font-display` | the hero name, and nothing else     |

**Mono is the body voice and it costs nothing** — `ui-monospace, SFMono-Regular, Menlo, …`, resolved from the system. The other two are downloaded, self-hosted by `next/font`. Before adding a fourth, price it.

**Three families for one page is the ceiling, and the third one earns it by a hair.** Space Grotesk exists to give the first thing a visitor reads a voice that is neither the body mono nor the heading serif. It ships one weight, is used on one element, and `unicode-range` means only the latin subset is actually fetched — **12.8 KB over the wire**, of the 29.1 KB the three subsets occupy in `out/`. Widen its usage and that arithmetic stops holding.

**Seven fixed sizes, no `clamp()`, no `sm:text-*`.** One class per element, and it should stay that way.

| token            | px   | used by                                         |
| ---------------- | ---- | ----------------------------------------------- |
| `--text-nano`    | 11px | rail numbers                                    |
| `--text-micro`   | 12px | uppercase labels, dates, nav, tech lines        |
| `--text-prose`   | 14px | body copy. The `body` default.                  |
| `--text-lead`    | 16px | entry titles                                    |
| `--text-title`   | 20px | the nav brand, hero role line, Results metrics  |
| `--text-section` | 24px | every section heading                           |
| `--text-display` | 32px | the hero name (Space Grotesk 700), nothing else |

**32px is the ceiling and it is the point.** The reference tops out at 24px with `h1`–`h6` reset to `font-size: inherit`, and the restraint is most of why it reads the way it does. Two rounds were already spent bringing a fluid scale down from 83px to 50px; do not drift back up. The hero name's `font-bold` is a **real** weight — `layout.tsx` downloads Space Grotesk 700. Anything set in `--font-serif` must not carry `font-bold`: DM Serif Text ships 400 only, so a weight class there synthesises a fake bold rather than loading one.

**To make a step fluid again**, swap its value for `clamp(min, intercept + slope·vw, max)` where `slope = (max − min) / 1065 × 100` and `intercept = (min − slope/100 × 375) / 16`, with min/max in px and the results in rem. That is the Utopia method across a 375 → 1440px viewport, precomputed rather than derived at runtime.

Line-height travels with each step as `--text-*--line-height`. Headings carry `text-balance` so a wrapped headline breaks into even lines rather than leaving one orphaned word.

### The intro

The page assembles itself on load. There is **no splash, no overlay and no
spinner** — this is a static export, so nothing is genuinely loading and a
progress indicator would be theatre. A full-screen greeting is also the exact
character the Cactus pass removed when it deleted the old `intro-veil.tsx`; this
is deliberately not a revival of that.

What runs instead is one ~1.3s gesture assembled from the motifs the page
already owns: **the torii strokes itself in, the rail descends out of it, and
the hero's four lines arrive underneath.** The intro itself costs **299 bytes gzipped and zero JavaScript** (measured: CSS 6564 → 6863 gz, JS unchanged at 646,976). The scroll reveal below adds the only JavaScript in this feature.

It lives almost entirely in the intro block at the bottom of
`styles/utilities.css` — four utilities (`intro-lift`, `intro-mark`,
`intro-rail`, `intro-node`, plus `intro-stagger`) over four keyframes. Only five
lines of TSX opt into it:

| Where         | What                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `nav.tsx`     | `intro-lift` on `<nav>`, `intro-mark` on the `BrandMark`                                               |
| `rail.tsx`    | an `intro` prop → `intro-rail` on the line, `intro-node` on the marker, `intro-stagger` on the content |
| `hero.tsx`    | `<RailRow intro>`                                                                                      |
| `diagram.tsx` | `pathLength="1"` on all five paths                                                                     |

Four things here are load-bearing:

- **The start state lives inside the keyframe, never on the element.** Every
  animation declares only `from`, and `animation-fill-mode: backwards` holds
  that frame through the delay. Nothing is ever set to `opacity: 0` in a base
  rule, so a stylesheet that fails to arrive yields a plain page rather than a
  blank one. Do not "make it explicit" by lifting those into the element — that
  edit turns a slow network into an invisible portfolio.
- **`pathLength="1"` is what makes one keyframe draw five strokes.** It
  normalises each path to a single unit so a shared `stroke-dashoffset: 1`
  works regardless of a stroke's real length. It changes no geometry and does
  nothing when the animation is not running, so `public/favicon.svg` does not
  need it.
- **Only the hero's `RailRow` passes `intro`.** Every row would animate
  identically, but the rest are far below the fold while it plays, so animating
  them is motion nobody sees.
- **The reduced-motion block in `base.css` collapses `animation-delay` as well
  as `animation-duration`.** Both are required. With the delays left alone, a
  reader who asked for stillness gets a blank page for the length of the longest
  delay and then a snap — worse than the animation. That is why the rule is
  there; do not prune it as redundant.

Timings overlap on purpose — header 0s, mark 0.22s, rail 0.38s, hero 0.45s. A
strictly sequential version reads as a machine taking its turns. The overlap is
what makes it one movement.

The rail **node** is included (`intro-node`) because without it the numbered
marker is the one element with nothing to attach to: a lone circle sitting in
empty space for the full 0.38s before the line reaches it, which reads as a
rendering fault. It fades rather than rises — a translate on an 8px circle only
advertises it moving back into place.

#### The scroll reveal

The intro alone left a seam. **The About section starts at 584px on every
viewport measured — 1440x780, 1920x1080, 390x844 — so it is never below the
fold.** It sat fully painted and motionless while the hero assembled above it,
which read as a broken animation rather than a restrained one. Measure before
assuming a section is below the fold; an earlier draft of this file asserted it
was, and was wrong.

So `components/reveal.tsx` — the THIRD client component — reveals each
`[data-reveal]` block as it enters view, on the same `intro-rise` curve. It is
one `IntersectionObserver` over every marked block, renders `null`, and holds no
state; the sections themselves stay Server Components. Cost: **+766 bytes of JS,
+72 bytes gzipped CSS, and a 212-byte inline script.**

`data-reveal` goes on the **content column**, via `RailRow`'s `reveal` prop —
NOT on the `<section>`. The hairline is a child of the section, so fading whole
sections would break the rail into per-section patches at the boundaries. Only
the content moves; the spine stays continuous.

**The safety argument is the important part of this feature.** Hiding content is
the dangerous half of a scroll reveal: if the hidden state were a plain CSS rule,
then JavaScript disabled, a bundle that 404s, or a hydration error would each
leave a permanently blank portfolio. Two mechanisms prevent that, and **neither
is optional**:

1. The hidden rule in `base.css` is scoped to `.reveal-armed`, and that class is
   only ever added by `lib/reveal.ts`, a blocking inline script. **No script, no
   hiding.** Do not simplify the selector to a bare `[data-reveal]`.
2. That same script drops the class again after 2.5s. If `Reveal` never mounts,
   the page unhides itself. `Reveal` cancels the timer via `__revealHold` on
   mount, so it never fires on a healthy page.

Reduced motion is handled in the component, not in CSS: the hidden state is a
plain rule rather than an animation, so the `prefers-reduced-motion` block in
`base.css` cannot undo it. That branch reveals everything at once and drops
`reveal-armed`. It is the only thing between those readers and a blank page.

All four failure modes were verified in a real browser — normal load, JS
disabled, bundle blocked, reduced motion — 18 assertions. Re-run them if you
touch any of this.

Blocks already on screen at load are staggered from 900ms, where the hero's own
stagger is finishing, so the page reads as one movement. Anything scrolled to
later arrives with **no** delay — a delay you have to sit through after
scrolling reads as lag, not choreography.

### Performance constraints worth preserving

- **Fonts.** `layout.tsx` requests two families through `next/font/google`: DM Serif Text 400 + 400 italic, and Space Grotesk 700. Both are **self-hosted at build time**, so there is no `fonts.googleapis.com` stylesheet, no `preconnect` pair, and no render-blocking third-party round trip — all of which the previous build carried. next/font also emits a metric-adjusted `… Fallback` face per family, which is why each computed fallback stack shows two names. Adding a weight or style to either call without using it costs a download for nothing. `out/` holds seven `.woff2` files totalling 77,848 bytes, but `unicode-range` gates them: a latin-only visitor fetches the two latin subsets, not all seven.
- Body text is the system mono stack and downloads nothing.
- `page.tsx` emits a single JSON-LD `@graph` (Person + WebSite), not two script tags.
- The bundle carries no data-fetching library, no chart library, and one Radix primitive. Keep it that way unless something on the page actually needs it.

**Measured payload of `out/`, modern browser.** `0cz1d0mv5g_q7.js` is a `noModule` legacy chunk that modern browsers skip, so it is excluded here — counting it overstates the total by 112 KB raw / 39 KB gz:

| build                          | JS raw  | JS gz   | CSS raw | CSS gz | total gz    |
| ------------------------------ | ------- | ------- | ------- | ------ | ----------- |
| this one                       | 534,382 | 162,107 | 28,173  | 6,564  | **168,671** |
| the TanStack build it replaced | 411,310 | 130,451 | 25,992  | 5,808  | 136,259     |

**This build ships ~23% more gzipped JS+CSS than the one it replaced.** That is inherent to the App Router: it ships React plus a full client router and RSC runtime whether or not the page navigates, and this page never does. Sixteen of eighteen components contribute nothing to that number — the floor is the framework, not the code. `index.html` is also larger (90.9 KB raw / 14.6 KB gz) because it carries an inlined RSC flight payload.

If that number ever needs to come down, the only real levers are: drop the Radix `Sheet` for a `<details>`-based menu (removing `@radix-ui/react-dialog` and `class-variance-authority`), or move off the App Router entirely. Nothing in `src/components/portfolio/` is worth optimising — it already costs zero.

### SEO surface

Everything under `src/` reads the origin from `SITE_URL` in `src/lib/site.ts`.

- `layout.tsx` carries `metadataBase`, the default title/description, the `/favicon.svg` icon link, `theme-color`, and og/twitter tags pointing at the self-hosted `/avatar.jpg` (square 400×400, hence `twitter:card: summary` rather than `summary_large_image`).
- `page.tsx` overrides title/description, sets the canonical, and adds the JSON-LD, deriving `sameAs` from the social links so the two can't drift.
- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` and `sitemap.xml` from `SITE_URL`. The old build had a static `public/robots.txt` that could not import it and had to be hand-edited; that file is deliberately **not** in `public/` any more. Do not re-add it — it would shadow the generated route.
- `public/llms.txt` is still hand-maintained, but currently holds no absolute URLs.

## Conventions

- Prettier: `printWidth: 100`, double quotes, semicolons, trailing commas everywhere. Prettier runs as an ESLint rule, so `npm run lint` fails on formatting.
- `@typescript-eslint/no-unused-vars` is off, and so are the `noUnusedLocals`/`noUnusedParameters` tsconfig flags; `strict` is on.
- Path alias `@/*` → `./src/*`.
- JSX comment placement bites often here: `{/* */}` is valid only in children position, `//` only inside expression parens, and neither is valid inside an opening tag's attribute list.
