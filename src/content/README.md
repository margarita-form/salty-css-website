# `src/content/` — docs content pipeline

This directory is the **single source of truth** for everything rendered under
`/docs/<framework>/<slug>/`. One canonical markdown file per topic is rendered
N times — once per supported framework — through a small templating engine.
No CMS, no duplicates, no per-framework forks unless absolutely necessary.

```
src/content/
├── docs/                      # one .md per docs slug
│   ├── installation.md
│   ├── api-styled.md          # slug "api/styled" (flat-hyphenated filename)
│   ├── installation.astro.md  # optional whole-page override for one framework
│   └── snippets/              # reusable fragments (shared + per-framework)
│       ├── install-cli.md
│       ├── ssr-note/
│       │   ├── react.md       # exact match: <topic>/<frameworkId>.md
│       │   ├── next.md
│       │   └── astro.md
│       └── component-render/
│           ├── _react.md      # family fallback: <topic>/_<family>.md
│           └── _astro.md      # — used when no per-id file is present
└── readme.md                  # upstream Salty CSS package readme (reference only)
```

> `src/content/readme.md` is unrelated — it's a copy of the public package
> README kept as reference content. This file (`README.md`) is the one that
> documents the pipeline.

---

## How a page becomes HTML

1. `src/app/docs/[framework]/[[...slug]]/page.tsx` calls
   `loadDocSource(slug, framework)` from `src/lib/docs-content.ts`.
2. That helper tries `<slug>.<framework>.md` first (whole-page override),
   then falls back to `<slug>.md`.
3. `parseFrontmatter()` splits the YAML-ish header from the body.
4. `applicableFrameworks(data)` decides whether this slug exists for this
   framework. Missing → 404.
5. `docsParser({ body }, { variables: frameworkData(fw), loadSnippet })` runs
   the templating engine (`src/lib/docs-parser.ts`).
6. `<Markdown />` renders the result with `react-markdown` + `remark-gfm` +
   syntax highlighting.

The same engine runs ahead of `npm run dev` / `npm run build` via
`scripts/build-docs-index.mjs` to emit:

- `src/app/docs/data/docs-index.json` — search corpus (Fuse.js)
- `public/sitemap.xml` — every `(framework, slug)` URL

Both artifacts are gitignored. Don't hand-edit them.

---

## Frontmatter

Every `.md` in `docs/` starts with a small block:

```md
---
title: How to Install Salty CSS
description: Learn how to install Salty CSS in your project.
frameworks: [react, next]   # optional — defaults to all supported frameworks
priority: 0.8               # optional — sitemap priority (defaults per slug)
---
```

- `title`, `description` — **required**. Drive `<title>`, meta description,
  search-result entry, and nav label.
- `frameworks` — restricts which frameworks render this slug. Omit for
  framework-agnostic pages.
- `priority` — sitemap weight (0.0–1.0). Falls back to
  `DEFAULT_PRIORITIES` in `src/app/docs/data/docs-order.ts`.

Unknown keys are rejected to catch typos.

---

## Templating syntax

The engine in `src/lib/docs-parser.ts` runs up to four passes over the body
and supports four token forms:

| Syntax                          | Resolves to                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `{{installCli}}`                | `frameworkData(fw).installCli`                               |
| `{{ssrNote \|\| "no note"}}`    | the variable, or the quoted fallback if empty/missing        |
| `{{snippet:install-cli}}`       | content of `snippets/install-cli.md`                         |
| `{{fw-snippet:ssr-note}}`       | content of `snippets/ssr-note/<frameworkId>.md`, falling back to `snippets/ssr-note/_<family>.md` |

Snippet bodies are themselves run through the engine, so a snippet can
reference variables or other snippets. Missing snippets resolve to `""` (no
throw) — useful when only some frameworks have a fragment for a given topic.

### Family fallback for `fw-snippet`

Frameworks declare a `family` in `src/lib/frameworks.ts`: `react` and `next`
both belong to family `react`; `astro` is its own family. When the engine
resolves `{{fw-snippet:topic}}`, it tries `snippets/topic/<frameworkId>.md`
first, and on a miss (or empty file) falls back to
`snippets/topic/_<family>.md` — the leading underscore marks the file as a
family-level default. This lets the JSX-flavored frameworks share a single
snippet without forcing per-id duplication. Reach for a per-id file only when
that one framework genuinely diverges from its family.

### Where the variables come from

`src/lib/frameworks.ts` is the canonical per-framework data table:

```ts
{ id: "next",
  label: "Next.js",
  data: {
    installCli:      "npm i @salty-css/next @salty-css/react",
    bundler:         "Webpack (Turbopack not yet)",
    ssrNote:         "Next App Router supports RSC out of the box.",
    packageRoot:     "@salty-css/react",
    styledImport:    "@salty-css/react/styled",
    classNameImport: "@salty-css/react/class-name",
    keyframesImport: "@salty-css/react/keyframes",
    configImport:    "@salty-css/react/config",
    helpersImport:   "@salty-css/react/helpers",
  } }
```

`frameworkData(id)` returns that `data` block plus `frameworkId`,
`frameworkLabel`, and `frameworkFamily`. **Add new variables here**, not in
markdown files — any key set on `data` is immediately usable as
`{{yourKey}}` in every page and snippet.

---

## When to use which mechanism

| Difference between frameworks         | Use                                          |
| ------------------------------------- | -------------------------------------------- |
| One word or one command               | `{{variable}}`                               |
| One paragraph, shared verbatim        | `{{snippet:name}}` + `snippets/name.md`      |
| One paragraph, shared by a framework family | `{{fw-snippet:topic}}` + `snippets/topic/_<family>.md` (e.g. `_react.md` covers react+next) |
| One paragraph, framework-specific     | `{{fw-snippet:topic}}` + `snippets/topic/<fw>.md` (takes precedence over the family default) |
| Whole page differs structurally       | `<slug>.<fw>.md` override file               |
| Page should only exist for some frameworks | `frameworks: [...]` in frontmatter      |

Prefer the lightest mechanism that works. Override files exist for the
genuinely-irreducible 1-in-10 case; reach for them last.

---

## Adding a new docs page

1. Create `src/content/docs/<slug>.md` (flat-hyphenated; e.g. `api/styled` →
   `api-styled.md`).
2. Add frontmatter with at least `title` and `description`.
3. Append the slug to `DOC_ORDER` in `src/app/docs/data/docs-order.ts`
   (this controls both nav order and the build matrix).
4. Optionally add an entry to `DEFAULT_PRIORITIES` in the same file.
5. Restart dev — `predev` regenerates the search index and sitemap.

To restrict the page to a subset of frameworks, add
`frameworks: [react, next]` to the frontmatter.

---

## Adding a new framework

1. Append it to `FRAMEWORKS` in `src/lib/frameworks.ts` with its own `data`
   block (every variable referenced by any `.md` must have a value here) and
   a `family` (reuse an existing family like `"react"` if the new framework
   shares its idioms, or introduce a new family otherwise).
2. Mirror the framework entry — including `family` — in `FRAMEWORKS` of
   `scripts/build-docs-index.mjs` (the build script duplicates this for
   isolation from the bundler).
3. Add per-framework `fw-snippet` files only where the framework actually
   diverges from its family. Every existing `_<family>.md` is the default
   for free.
4. The page route and `generateStaticParams` pick it up automatically — no
   route file changes needed.

---

## Build script parity

`scripts/build-docs-index.mjs` runs in plain Node (no webpack), so it can't
import from `src/`. It intentionally duplicates:

- the templating engine (kept in sync with `src/lib/docs-parser.ts`),
- the per-framework data (kept in sync with `src/lib/frameworks.ts`),
- the slug list (kept in sync with `src/app/docs/data/docs-order.ts`).

If you change variables, templating semantics, or the slug list, update
**both** sides. The build will surface drift quickly because rendered HTML
and the search index will disagree.

`lastmod` in the sitemap is content-hash based: each URL's rendered output
(post-template, after snippets/variables/`fw-snippet` fallbacks resolve) is
hashed and compared against the prior build's manifest at
`.next/cache/sitemap-hashes.json`. Matching hash → previous `lastmod` is
reused. Differing hash → `lastmod` stamps the current build time. Any change
that affects what a visitor sees — a snippet edit, a `frameworks.ts`
variable change, a new override file being picked up — bumps `lastmod`;
unrelated commits that don't change rendered output do not.

The manifest lives under `.next/cache/` so Vercel and most CI providers
preserve it between builds automatically. On a cold build (missing or
unparseable manifest) every URL stamps `lastmod = now` and a warning prints;
the next build self-heals. Top-level routes (`/`, `/react/`, `/next/`,
`/astro/`, `/docs/`) hash their `page.tsx` source (or `docs-order.ts` for
`/docs/`), which catches direct edits but not deep import-graph changes.
