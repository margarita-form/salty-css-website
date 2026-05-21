---
title: define* factories index
description: One-page index of every define* helper in Salty CSS — signature, role, and links to the deep-dive.
topic: define factories
category: api-reference
schemaType: APIReference
keywords: [define, factories, defineVariables, defineFont, defineImport, defineTemplates, defineMediaQuery, defineGlobalStyles, defineConfig, keyframes, defineViewportClamp]
intent: Look up the signature, purpose, and deep-dive link for every Salty CSS define* factory in one place.
proficiencyLevel: Expert
priority: 0.6
---

# `define*` factories — index

Salty CSS's public surface is a handful of small factories. Each one returns a typed configuration object that the build picks up automatically when it's exported (or passed to `defineConfig`).

This page is the at-a-glance index. Click through for the deep-dive.

## Configuration factory

### `defineConfig(config)`

```ts
import { defineConfig } from "{{configImport}}";

defineConfig({
  variables?: SaltyVariables,
  global?: GlobalStyles,
  reset?: 'default' | 'none' | GlobalStyles,
  templates?: CssTemplates,
  modifiers?: CssModifiers,
  importStrategy?: 'root' | 'component',
  externalModules?: string[],
  strict?: boolean | 'warn',
  defaultUnit?: string,
});
```

Top-level project configuration. → [`defineConfig` reference](/docs/api/config/).

## Variable factories

### `defineVariables(variables)`

```ts
import { defineVariables } from "@salty-css/core/factories";

defineVariables({
  colors: { brand: { main: "#0070f3" } },
  responsive: { base: { spacing: { gutter: "32px" } } },
  conditional: { theme: { dark: { ... }, light: { ... } } },
});
```

Design tokens — static, responsive, and conditional. → [Variables](/docs/variables/) · [Theming](/docs/theming/).

## Style-system factories

### `defineGlobalStyles(styles)`

```ts
import { defineGlobalStyles } from "@salty-css/core/factories";

defineGlobalStyles({
  html: { scrollBehavior: "smooth" },
  body: { margin: 0 },
});
```

Bare-selector global styles (resets, base typography, etc.). Same shape as `defineConfig({ global })`. → [Basics: global styles](/docs/basics/#global-styles).

### `defineTemplates(templates)`

```ts
import { defineTemplates } from "@salty-css/core/factories";

defineTemplates({
  textStyle: {
    body: { fontSize: "16px", lineHeight: "1.5" },
    heading: { fontSize: "32px", fontWeight: 700 },
  },
  card: (padding: string) => ({ padding, borderRadius: "8px" }),
});
```

Reusable style bundles — static or function-based. Supports `base` / `variants` / `compoundVariants` / `anyOfVariants` per node. → [Templates](/docs/templates/).

## Loading & registration factories

### `defineFont(options)`

```ts
import { defineFont } from "@salty-css/core/factories";

defineFont({
  name: "Inter",
  fallback: "system-ui, sans-serif",
  variants: [{ src: "/fonts/Inter-Regular.woff2", weight: 400 }],
});
```

Registers a font as `@font-face` (or via `@import` for remote stylesheets) and returns `{ variable, fontFamily, className, style }`. → [Fonts](/docs/fonts/).

### `defineImport(...specs)`

```ts
import { defineImport } from "@salty-css/core/factories";

defineImport(
  "modern-normalize/modern-normalize.css",
  { url: "./print.css", media: "print" },
);
```

Pulls external CSS into your build. Specs can be strings (relative, npm, public, URL) or `{ url, media?, supports? }` objects. → [Imports](/docs/imports/).

## Responsive & animation factories

### `defineMediaQuery(callback)`

```ts
import { defineMediaQuery } from "{{configImport}}";

export const tabletDown = defineMediaQuery((media) => media.maxWidth(900));
```

Named, reusable media queries. Use the export name with an `@` prefix in styles: `'@tabletDown': { ... }`. → [Media queries](/docs/media-queries/).

### `defineViewportClamp(options)`

```ts
import { defineViewportClamp } from "@salty-css/core/helpers";

export const fhdClamp = defineViewportClamp({
  screenSize: 1920,
  minMultiplier: 1,
  maxMultiplier: 1.25,
});
```

Returns a function that generates `clamp(min, vw, max)` expressions tuned to a reference screen size. → [Viewport clamp](/docs/viewport-clamp/).

### `keyframes(options)`

```ts
import { keyframes } from "{{keyframesImport}}";

export const fadeIn = keyframes({
  animationName: "fadeIn",
  appendInitialStyles: true,
  params: { duration: "500ms", easing: "ease-out" },
  from: { opacity: 0 },
  to: { opacity: 1 },
});
```

Typed `@keyframes` rules with overridable defaults. The return value drops into the `animation` shorthand. → [Animations](/docs/animations/).

## Where the imports live

| Factory                | Import path                                  |
| ---------------------- | -------------------------------------------- |
| `defineConfig`         | `{{configImport}}`                           |
| `defineVariables`      | `@salty-css/core/factories`                  |
| `defineGlobalStyles`   | `@salty-css/core/factories`                  |
| `defineTemplates`      | `@salty-css/core/factories`                  |
| `defineFont`           | `@salty-css/core/factories`                  |
| `defineImport`         | `@salty-css/core/factories`                  |
| `defineMediaQuery`     | `{{configImport}}`                           |
| `defineViewportClamp`  | `@salty-css/core/helpers`                    |
| `keyframes`            | `{{keyframesImport}}`                        |

## See also

- [`defineConfig` reference](/docs/api/config/) — the project-wide config object.
- [`styled` API](/docs/api/styled/) · [`className` API](/docs/api/classname/) — the component factories.
