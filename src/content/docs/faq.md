---
title: Frequently Asked Questions
description: Short answers about Salty CSS — what it is, how the build works, theming without a provider, React Server Components, fonts, TypeScript, and incremental adoption.
preHeadline:
  react: Zero Runtime CSS-in-TS Without a Provider — Common Questions From React Teams and Library Authors
  next: Does Salty Work in RSC? Will It Hydrate? Honest Answers About Next.js Compatibility and Performance
  astro: How Does Build-Time CSS-in-TS Fit Astro's Zero-JS Default? Common Questions From Island Adopters
visibleHeading:
  react: Common Questions From React Teams
  next: Common Questions From Next.js Teams
  astro: Common Questions From Astro Teams
topic: FAQ
category: faq
schemaType: FAQPage
keywords: [Salty CSS FAQ, is Salty CSS zero-runtime, CSS-in-TS, TypeScript CSS-in-JS, React Server Components, Next.js static export, dark mode without provider, build-time CSS, incremental adoption, Salty CSS performance, salty.config.ts, saltygen folder]
intent: Read the most common questions about Salty CSS — what it is, how it compiles, how it fits your framework, and how to do common things.
proficiencyLevel: Beginner
priority: 0.7
---

## About Salty CSS

### What is Salty CSS?

Salty CSS is a TypeScript-first, build-time CSS-in-TS library for React, Next.js and Astro. You author styles in `.css.ts` files using a typed `styled()` API, and the compiler turns them into real CSS at build time. The runtime ships with no styling engine — your components just render with the generated class names.

### Is Salty CSS zero-runtime?

The styling layer is. Styles, variants, templates, and tokens are resolved by the build, so the only thing that ships at runtime is a small helper that maps your variant props to class names. There is no runtime style serializer, no in-DOM `<style>` injection, and no client-side theme provider needed for static theming.

### Is Salty CSS production-ready?

Salty CSS is published on npm and used in production. The package is pre-1.0 (alpha tags exist) so minor APIs can still move between releases — pin your version, watch the changelog, and you'll be fine. The CLI's `salty-css up` command bumps every Salty package in lockstep.

### Which frameworks are supported?

- **Next.js** — App Router and Pages Router (15 and 16 supported, Webpack or Turbopack), with React Server Component support and full static-export (`output: "export"`) compatibility, via `@salty-css/next`.
- **React + Vite** — via `@salty-css/vite`.
- **React + Webpack** — via `@salty-css/webpack`.
- **Astro** — via `@salty-css/astro`.

The CLI picks the right one when you run `npx salty-css init`. See [Installation](/docs/installation/).

### What does the name "Salty CSS" mean?

Mostly that the author thought it sounded fun. The Salt prefix is also a small reminder that we lean on typed primitives ("a pinch of salt") rather than runtime CSS-in-JS engines. That's it. Meow.

## How it works

### How are styles compiled?

The build plugin (`@salty-css/next`, `@salty-css/vite`, etc.) watches for files matching `*.css.ts`, `*.css.tsx`, `*.salty.ts`, `*.styled.ts`, or `*.styles.ts`. It evaluates each one with esbuild, picks up every `styled()`, `className()`, `defineTemplates()`, etc. call, and writes the resulting CSS into a `saltygen/` folder that the framework imports globally. The generated CSS is a single, cacheable artifact.

### Why are my styles not appearing?

Walk this list in order — first hit is the answer 99% of the time:

1. The file is named `*.css.ts` / `*.css.tsx` / `*.salty.ts` / `*.styled.ts` / `*.styles.ts`. A plain `.ts` file is invisible to the compiler.
2. The build step has run — `npx salty-css build` (or your framework's dev server, which runs it automatically).
3. Global styles, fonts, and resets that live in `*.css.ts` files are imported at least once somewhere the build reaches.

If all three are true and you still see nothing, see [Troubleshooting](/docs/troubleshooting/).

### How do I debug a missing or wrong style?

Every styled component renders with a `data-component-name` attribute in development. Open DevTools, find the element, and the class on it is the Salty-generated hash (something like `s_abc1234`). Searching the Styles panel for that hash takes you to the matching rule. If the hash is missing entirely, the source file probably didn't get picked up (see the question above).

### How are class names generated?

By hashing the resolved style block. Class names are stable across builds as long as the styles don't change — handy for cache keys. In development the generated CSS also includes friendly `data-component-name` attributes derived from the export name (or the explicit `displayName`), so you can read DevTools without squinting at hashes.

### Where does the generated CSS live?

In `saltygen/index.css` at the project root. It's overwritten on every build. **Don't edit it by hand** — your edits will be lost the next time the compiler runs. Treat it as a build artifact.

### Should I commit the `saltygen/` folder?

No. Add it to `.gitignore`. Some test apps in the monorepo commit it for convenience, but for production projects it's a build output.

## Styling APIs

### What's the difference between `styled` and `className`?

`styled(tag, params)` returns a typed {{componentNoun}} — variants become typed props, refs forward through, and `passProps`/`element` control what reaches the DOM. `className({ ... })` returns a string (plus a typed `.variant()` selector) that you apply yourself with `class={...}` or `className={...}`. Reach for `styled` when you want a component; reach for `className` when you already have markup or want a class string to apply yourself.

### How do I create dynamic styles based on props?

Use variants:

```ts
export const Button = styled("button", {
  variants: {
    size: {
      small: { fontSize: "12px" },
      large: { fontSize: "18px" },
    },
  },
});

// Usage
<Button size="small">Small Button</Button>;
```

For "apply when any of these branches match" rules, use `anyOfVariants`. For "apply when all of these match" rules, use `compoundVariants`. See the [`styled` API reference](/docs/api/styled/) for both.

### What's the difference between `compoundVariants` and `anyOfVariants`?

`compoundVariants` is **AND**: the rule applies only when every listed variant value is active. `anyOfVariants` is **OR**: it applies when any one of them is. `anyOfVariants` is emitted with `:where()` so it carries zero specificity — a regular variant rule always wins against it. See [api-styled.md → anyOfVariants](/docs/api/styled/#anyofvariants--any-of-these-is-true-rules).

### Can I extend non-Salty components?

Yes — as long as the wrapped component accepts a `className` prop. Salty applies its generated class via that prop and forwards the rest. See [Overrides](/docs/overrides/).

### How do I create responsive styles?

Three options, depending on how often you reach for the breakpoint:

1. **Inline** — write `"@media (min-width: 640px)": { ... }` directly in a style object.
2. **Named query** — define it once with `defineMediaQuery` and reference it by name (`"@mobile": { ... }`).
3. **Responsive variables** — declare entire token sets per breakpoint with `defineVariables({ responsive: { ... } })` so values update by breakpoint without per-property `@media` blocks.

The fluent `media` builder reads like English: `media.minWidth(720).and.dark` resolves to `@media (min-width: 720px) and (prefers-color-scheme: dark)`. See [Media queries](/docs/media-queries/).

### Does Salty CSS support container queries?

Yes — container queries are written the same way as media queries. You can name them with `defineMediaQuery` using `media.custom('container (min-width: 320px)')` or write them inline. See [Media queries → Container queries](/docs/media-queries/).

### Can I write global styles?

Yes — use `defineGlobalStyles` in a `*.css.ts` file. The compiler emits the result into the `globals` layer so it sits below your component styles in the cascade. See [Component styles → Global styles](/docs/basics/).

## Theming and tokens

### Do I need a context provider for theming?

No. Salty themes are CSS custom properties scoped to a parent selector. You flip a `data-theme` attribute on `<html>` (or any ancestor), and every consumer of `{theme.color}` updates without re-rendering. No `<ThemeProvider>`, no React context, no prop drilling. See [Theming](/docs/theming/).

### How do I avoid the dark-mode flash on first paint?

Render a tiny inline script on `<html>` that reads `localStorage` and sets `data-theme` before the body hydrates. The toggle snippet in [Theming](/docs/theming/) includes the pattern for Next.js App Router.

### Can I have more than one theme group at the same time?

Yes. `conditional` groups are independent — you can add `data-density="compact"` alongside `data-theme="dark"` and toggle them separately. See [Theming → Multiple, independent groups](/docs/theming/#multiple-independent-groups).

### How do I share a token system across apps?

Tokens are plain TypeScript exports. Put your `defineVariables(...)` calls in a package, publish it (privately or publicly), and import the variable factories into each consumer's `*.css.ts` files. Salty picks them up at build time the same way it picks up tokens defined in-app.

## React, Next.js, RSC, SSR

### Does Salty CSS work with React Server Components?

Yes. Styles are extracted at build time, so the component you get back from `styled()` has no runtime CSS-in-JS dependency — it renders fine in a server component. You only need `"use client"` for things that use state, effects, or event handlers (a theme toggle, a popover), and the styled components those client components render can stay in server land.

### Does Salty CSS work with Next.js static export (`output: "export"`)?

Yes. The CSS is generated at build time and imported as a static asset, so static export works without extra config. The website you're reading right now uses it.

### Do I need server-side style extraction for SSR?

No. There is no client-side style runtime to extract from — the CSS is already a static file by the time SSR runs.

### Can I use Salty CSS with TypeScript?

Yes — Salty CSS is built for TypeScript. Variant props, token paths, template references, and `defineConfig` options are all typed end-to-end. Type errors at the call site are part of the value proposition.

## Working with files

### How do I share values between `.css.ts` files?

Just `import` them like any other module. `.css.ts` files are evaluated through TypeScript at build time, so a token, helper, or template defined in one file can be imported in another. The only constraint: cycles between `.css.ts` files don't compile well — keep the dependency graph one-directional.

### What happens if I import heavy libraries in a `.css.ts` file?

Salty CSS evaluates `.css.ts` files at build time using esbuild. Importing heavyweight runtime libraries — especially ones that touch `window` or assume a browser — can slow down compilation noticeably (the import is parsed on every change) or fail outright if the library throws when loaded in Node. Keep `.css.ts` files style-focused; derive any heavy value once in a lightweight helper file and import that.

### Can I import third-party CSS?

Yes — use `defineImport(...)` for `@import` rules. They land in the `imports` layer below your component styles, so external CSS can't accidentally beat your own selectors. See [Imports](/docs/imports/).

### How do I use fonts with Salty CSS?

`defineFont` registers a font and gives you back something you can use as a `font-family` value, a CSS variable, a class name, or a `style` prop spread. It generates `@font-face` rules for local variants, `@import` lines for remote stylesheets, and a `:root` CSS variable for either. See [Fonts](/docs/fonts/).

## Adoption and migration

### Can I adopt Salty CSS incrementally?

Yes. Salty's generated CSS is regular CSS that lives in its own `@layer` set, so it sits alongside whatever you already have (CSS modules, hand-written `.css` files, a utility framework, etc.) without fighting them. Add the plugin, write your first `*.css.ts` file, and migrate the rest at your own pace.

### How do I migrate styles in chunks?

Move one component at a time. Rename `Foo.module.css` → `Foo.css.ts`, rewrite the rules as a `styled()` (or `className()`) call, and update the import. Repeat. There's no flag day required — the old and new styles coexist.

### Does it play nicely with utility CSS frameworks?

Yes — the generated CSS lives in dedicated `@layer`s, so utility classes from another framework will continue to win/lose by their own usual rules. If you need a specific override order, see the [`priority` option](/docs/api/styled/#priority) and Salty's layer ordering in the same section.

## Performance

### Does Salty CSS affect runtime performance?

The expensive work happens at build time. At runtime, components just concat class names from their variant props — there's no style serialization, no in-DOM `<style>` injection, and no CSSOM mutation per render.

### How big is the runtime footprint?

Small. The runtime is responsible for variant-prop → class-name lookup and the `passProps` / `element` forwarding logic; everything style-related is already in the generated CSS file.

### Does the generated CSS scale to large apps?

Class names are content-hashed and de-duplicated — two components with identical styles share the same class. Variants, templates, and conditional tokens all serialise into the same CSS file, so you pay one HTTP request for the entire surface and rely on the browser's normal caching for incremental loads.

## Getting help

### Where can I get help?

- Join the [Salty CSS Discord](https://discord.gg/R6kr4KxMhP) for community support.
- File issues or read the source on the [GitHub repository](https://github.com/margarita-form/salty-css).
- Browse the rest of these docs at [salty-css.dev](https://salty-css.dev/).
