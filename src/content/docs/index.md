---
title: Documentation
description: Salty CSS is a TypeScript-first, build-time CSS-in-TS library for React, Next.js, and Astro — typed styles, design tokens, theming, and zero runtime.
topic: Documentation
category: overview
schemaType: TechArticle
keywords: [Salty CSS, CSS-in-TS, TypeScript CSS-in-JS, build-time CSS, zero-runtime styling, design tokens, styled components TypeScript, React, Next.js, Astro, dark mode]
intent: Find everything you need to ship Salty CSS — styled and className APIs, design tokens, theming, templates, fluid sizing, and CLI tooling.
proficiencyLevel: Beginner
priority: 0.9
---

# Documentation

Salty CSS is a build-time CSS-in-**TS** library for React, Next.js and Astro. You author styles in `.css.ts` files, the compiler turns them into real CSS, and your runtime ships with no styling engine attached. Meow.

It's a good fit when you want **typed styles, real design tokens, and theming that doesn't need a React provider** — without giving up on the developer experience of writing CSS next to your component.

## What you get

- **Typed styles** — `styled("button", { ... })` returns a typed component; variants become typed props.
- **Design tokens** — `defineVariables` for static, **responsive**, and **conditional** tokens (the conditional ones are how theming works).
- **Theming without a provider** — flip a `data-theme` attribute on `<html>` and every consumer of `{theme.color}` updates.
- **Templates** — `defineTemplates` for reusable style bundles with their own variants.
- **Media queries that read like English** — `media.minWidth(720).and.dark`.
- **Fluid sizing** — `defineViewportClamp` for `clamp()`-based values that scale with the viewport.
- **Type-safe class names** — `className({ ... })` when you want the styles without the component wrapper.
- **A CLI** — `npx salty-css init` / `generate` / `build` / `up` for the boring bits.

## TL;DR — install it

Inside any React, Next.js or Astro project:

```bash
npx salty-css init
```

Then create a component in a `*.css.ts` file:

```ts
// /components/my-button.css.ts
import { styled } from "{{styledImport}}";

export const Button = styled("button", {
  base: {
    padding: "0.75rem 1.25rem",
    borderRadius: "6px",
    background: "{theme.color}",
    color: "{theme.background}",
  },
});
```

…and use it like any other {{componentNoun}}.

## Where to go next

- **New here?** → [Quick Start](/docs/quick-start/) walks you from `init` to a themed component with variants in about 15 minutes.
- **Adding it to a project?** → [Installation](/docs/installation/) covers the per-framework wiring.
- **Need the reference?** → [`styled`](/docs/api/styled/), [`className`](/docs/api/classname/), [`defineConfig`](/docs/api/config/).

## Search the docs

Hit `Ctrl + K` (or `⌘ + K` on macOS) anywhere in the docs to open the search modal — or click **Search** at the top of the sidebar. Matching is fuzzy: partial terms like `variant`, `media` or `clamp` are usually enough.

## What's in the docs

### Getting Started

- [Quick Start](/docs/quick-start/) — install, your first component, variants, theming, fonts.
- [Installation](/docs/installation/) — per-framework setup (Next.js, Vite, Webpack, Astro).
- [Usage](/docs/usage/) — file suffixes, dev-time naming, DevTools.
- [Troubleshooting](/docs/troubleshooting/) — the fix list for the most common issues.
- [CLI](/docs/cli/) — use Salty CSS from the command line.
- [FAQ](/docs/faq/) — short answers to the things people ask first.

### Styling

- [Component styles](/docs/basics/) — `styled`, `className`, and where each one fits.
- [Variables](/docs/variables/) — design tokens with `defineVariables` (static, responsive, conditional).
- [Theming](/docs/theming/) — dark mode and multi-theme without a provider.
- [Fonts](/docs/fonts/) — `defineFont` for local files and remote stylesheets.
- [Imports](/docs/imports/) — pull in external CSS with `defineImport`.
- [Class styles](/docs/classnames/) — `className` for plain class-based styles.
- [Variants](/docs/variants/) — prop-driven variants, compound, and `anyOfVariants`.
- [Overrides](/docs/overrides/) — extend components, swap elements, forward props with `passProps`.
- [Media queries](/docs/media-queries/) — media queries, container queries, breakpoints.
- [Animations](/docs/animations/) — keyframes, stagger, pause/resume.
- [Templates](/docs/templates/) — reusable styles with `defineTemplates`.

### Utilities

- [Viewport clamp](/docs/viewport-clamp/) — fluid responsive sizing.
- [Color function](/docs/color-function/) — manipulate colors at build time.
- [Modifiers](/docs/modifiers/) — custom value transformers.

### API reference

- [`styled` function](/docs/api/styled/) — full API for the `styled` component factory.
- [`className` function](/docs/api/classname/) — full API for class-based styles.
- [`defineConfig`](/docs/api/config/) — every option that lives in `salty.config.ts`.
- [`define*` factories index](/docs/api/define-factories/) — one-page index of every factory.

## Get support

Join the [Salty CSS Discord server](https://discord.gg/R6kr4KxMhP) for help, or check the [GitHub repository](https://github.com/margarita-form/salty-css) for source and issues.
