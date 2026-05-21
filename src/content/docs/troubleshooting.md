---
title: Troubleshooting
description: Diagnose common Salty CSS issues — missing styles, build errors, framework-detection mistakes, and SSR caveats.
topic: Troubleshooting
category: guide
schemaType: TechArticle
keywords: [troubleshooting, debugging, errors, missing styles, ssr, server components]
intent: Diagnose common Salty CSS issues quickly and find the right fix or escape hatch.
proficiencyLevel: Beginner
priority: 0.7
---

# Troubleshooting

A short, opinionated checklist for the issues we see most often. If your symptom isn't here, the [Discord server](https://discord.gg/R6kr4KxMhP) is the fastest way to get unstuck.

## My styles aren't appearing

Work through these in order — the first one is the cause about 80% of the time.

1. **Wrong filename suffix.** Salty CSS only picks up `*.css.ts`, `*.css.tsx`, `*.salty.ts`, `*.styled.ts`, or `*.styles.ts`. A file named `my-component.ts` will type-check fine but produce no CSS. Rename it.
2. **`saltygen/index.css` is stale or missing.** Restart the dev server. If you're not using a dev server, run `npx salty-css build` to regenerate it.
3. **Plugin not wired up.** Confirm `withSaltyCss` (Next.js), `saltyPlugin` (Vite), or the Astro integration appears in your bundler config. Without the plugin, the compiler never runs.
4. **Importing `saltygen/index.css` is missed.** With `importStrategy: 'root'` (the default), the generated stylesheet must be imported once at the root of your app. Frameworks like Next.js do this for you; check the install snippet for your stack if you set things up manually.
5. **The component isn't actually used.** Salty CSS tree-shakes unused exports — if no module imports the styled component, no CSS is emitted for it. Make sure the export reaches a rendered tree.

## I can see the class but the rule isn't applying

- **Specificity conflict.** A higher-specificity rule from another stylesheet may be winning. Inspect the element in DevTools and look at the cascade. Bump the Salty rule's `priority` (see [`styled` API](/docs/api/styled/)) or scope your override more tightly.
- **Order of cascade layers.** Salty CSS uses `@layer` internally. Anything you import with [`defineImport`](/docs/imports/) lives in the earliest layer, so it always loses to your own styles — and vice versa, your imports won't override Salty rules.
- **`anyOfVariants` losing to a regular variant.** `anyOfVariants` uses `:where()` and has zero specificity by design. If you need it to win, move the rule into a regular variant or a `compoundVariants` entry.

## A token reference shows up literally as `{colors.brand}` in the browser

That's the parser refusing to resolve an unknown path:

- Typo? Check `defineVariables({ colors: { ... } })` matches the path exactly.
- Did you forget to register the variables file? With `defineVariables` in a `*.css.ts` file, the file just needs to be imported somewhere in your build graph (typically you re-export it from a styles barrel).
- Variables defined inside [`defineConfig`](/docs/api/config/) are picked up automatically; the file imports apply only to standalone `defineVariables` calls.

Turn on `strict: true` (or `'warn'`) in `defineConfig` to surface these as build errors instead of silently passing them through.

## Build error: "Unknown frontmatter key"

The website docs parser validates frontmatter against a fixed allowlist. If you added a custom key to a doc page, either remove it or extend [`docs-content.ts`](https://github.com/margarita-form/salty-css-website/blob/main/src/lib/docs-content.ts) to accept it.

## `npx salty-css init` picked the wrong framework

Re-run with the framework set explicitly via the package manager — `init` looks at the dependencies it can see. If you're in a monorepo, run it from the package's own root, not the workspace root.

If it already wrote the wrong config, deleting `salty.config.ts` and re-running is the cleanest fix.

## React Server Components / SSR

- Salty CSS works in **server components** — styles are emitted at build time, so there's no runtime dependency to ship to the server. The `styled` function returns a regular React component you can render anywhere.
- Where you do need `"use client"`: any component that uses runtime React features (state, effects, event handlers) — including a theme toggle — must be a client component, but the styled component it uses can stay in server land.
- Hydration mismatches around theming are usually a flash-of-wrong-theme issue: the server renders one theme attribute, the client toggle script applies another. See the [Theming](/docs/theming/) page for the inline pre-hydration script pattern.

## Finding a generated class in DevTools

Every styled component emits a `data-component-name` attribute in development. Open the element inspector, find the attribute (e.g. `data-component-name="Button"`), and the class name on that element is the Salty-generated hash. Searching the Styles panel for that hash takes you straight to the rule.

## Importing heavy modules in a `.css.ts` file

Salty CSS evaluates `.css.ts` files at build time, so importing big runtime libraries (or anything that touches `window`) can slow down compilation or fail outright. Keep `.css.ts` files focused on style definitions; if you need a value from a heavy module, derive it once and re-export it from a lightweight intermediate file.

For modules you genuinely need at build time but want excluded from the Salty bundle, add them to `externalModules` in [`defineConfig`](/docs/api/config/#externalmodules).

## Still stuck?

- [Discord](https://discord.gg/R6kr4KxMhP) — community + maintainers.
- [GitHub issues](https://github.com/margarita-form/salty-css/issues) — for confirmed bugs and feature requests.
