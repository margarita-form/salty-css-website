---
title: Fonts
description: Register web fonts with defineFont — local files, remote stylesheets, and CSS-variable exports for Salty CSS styles.
preHeadline:
  react: Register Web Fonts With defineFont() — Local Files, Remote Stylesheets, Typed CSS-Variable Exports
  next: Register Self-Hosted and Remote Fonts in App Router Layouts Without Render-Blocking Hydration
  astro: defineFont() in .astro Pages — Embed Local Files or Google Fonts Without Client JS Penalty
visibleHeading:
  react: Web Fonts in React Apps
  next: Web Fonts in App Router Layouts
  astro: Web Fonts in .astro Pages
topic: Fonts
category: guide
schemaType: TechArticle
keywords: [fonts, defineFont, font-face, web fonts, typography]
intent: Register local and remote fonts with defineFont and reference them from Salty CSS styles.
proficiencyLevel: Intermediate
priority: 0.7
---

`defineFont` is a framework-agnostic way to register fonts inside Salty CSS. It writes the `@font-face` rules into your build output, exposes the font as a CSS custom property, and returns a small object that can be used as a class, a CSS variable, or an inline style.

It's the right tool when you want fonts to live alongside the rest of your design tokens — same `*.css.ts` files, same build pipeline, no extra plugin.

> **Already using `next/font`?** That's fine. `next/font` integrates with Next.js's build optimisations (subsetting, automatic preload) and Salty CSS happily reads the CSS variable it exposes (`var(--font-family-…)`). Use `defineFont` when you want a single registration path that works the same way across React, Vite, and Astro, or when you need finer control over the generated `@font-face`.

## Local font files

Pass a `variants` array. Each variant has its own `src`, optional `weight`, `style`, and the usual `@font-face` descriptors:

```ts
// /styles/fonts.css.ts
import { defineFont } from "@salty-css/core/factories";

export const inter = defineFont({
  name: "Inter",
  fallback: "system-ui, sans-serif",
  display: "swap",
  variants: [
    {
      src: "/fonts/Inter-Regular.woff2",
      weight: 400,
      style: "normal",
    },
    {
      src: "/fonts/Inter-Italic.woff2",
      weight: 400,
      style: "italic",
    },
    {
      src: "/fonts/Inter-Bold.woff2",
      weight: 700,
      style: "normal",
    },
  ],
});
```

A few things to know:

- `src` accepts a string URL, a `{ url, format, tech? }` object, or an array mixing the two. When you pass a string, Salty CSS detects the `format()` from the file extension (`woff2`, `woff`, `ttf`, `otf`, `eot`, `svg`, `ttc`).
- Paths starting with `/` resolve against your app's public asset root; relative paths (`./fonts/Inter.woff2`) resolve against the location of the rule emitted in your build output. Pick one convention and stick with it.
- `display` defaults to `'swap'` if you don't set it per-variant and don't set it on the parent.
- The `fallback` string is appended to the generated `font-family` value, so you get FOUT-safe rendering for free.

## Remote stylesheets (Google Fonts, etc.)

Use `import` instead of `variants` when the font is hosted somewhere that already provides a `@font-face` stylesheet:

```ts
// /styles/fonts.css.ts
import { defineFont } from "@salty-css/core/factories";

export const outfit = defineFont({
  name: "Outfit",
  fallback: "system-ui, sans-serif",
  import: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap",
});
```

Salty CSS emits an `@import url(...)` at the top of the stylesheet (above any `@layer`) so the remote rules load correctly.

`variants` and `import` are mutually exclusive — pass one or the other, not both.

## Using the returned value

Calling `defineFont(...)` returns an object with four members. Use whichever fits the situation:

| Member        | Type                       | Use when…                                                                                                |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `.fontFamily` | `string`                   | You want the raw `font-family` value (with the fallback already appended).                               |
| `.variable`   | `string` (e.g. `--font-inter-abc123`) | You want to read it from `var(--font-inter-…)` so it can be themed or overridden downstream.  |
| `.className`  | `string` (e.g. `font-inter`)         | You want to apply the font to a subtree by toggling a class.                                  |
| `.style`      | `Record<string, string>`   | You want to set the font inline on a single element (spread onto a `style` prop).                        |

It also stringifies to `.fontFamily`, so you can drop the object straight into a style object:

```ts
import { styled } from "{{styledImport}}";
import { inter } from "../styles/fonts.css";

export const Heading = styled("h1", {
  base: {
    fontFamily: inter, // → "Inter, system-ui, sans-serif"
    fontWeight: 700,
  },
});
```

Read the variable when you want themed overrides:

```ts
import { styled } from "{{styledImport}}";
import { inter } from "../styles/fonts.css";

export const Body = styled("p", {
  base: {
    fontFamily: `var(${inter.variable})`,
  },
});
```

Apply the class when you want to scope the font to a subtree without touching individual components:

{{fw-snippet:font-class-usage}}

## A pragmatic font-family token

Pair `defineFont` with [`defineVariables`](/docs/variables/) so call sites reference a token, not a specific font import:

```ts
// /styles/fonts.css.ts
import { defineFont } from "@salty-css/core/factories";
import { defineVariables } from "@salty-css/core/factories";

export const inter = defineFont({
  name: "Inter",
  fallback: "system-ui, sans-serif",
  variants: [{ src: "/fonts/Inter-Regular.woff2", weight: 400 }],
});

export default defineVariables({
  fontFamily: {
    body: inter.fontFamily,
    heading: inter.fontFamily,
  },
});
```

```ts
styled("p", { base: { fontFamily: "{fontFamily.body}" } });
```

Swap fonts later by changing the variable definition — every call site updates.

## Configuration reference

The full option shape (see [`define-font.ts`](https://github.com/margarita-form/salty-css) for the type):

| Option     | Type                                                | Description                                                                                                                                          |
| ---------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string`                                            | Required. The CSS `font-family` value users will see in styles.                                                                                      |
| `fallback` | `string`                                            | Optional. One or more fallback family names appended after `name` (e.g. `"system-ui, sans-serif"`).                                                  |
| `variable` | `string`                                            | Optional. CSS variable name (accepts `--font-inter` or `font-inter`). Defaults to a deterministic `--font-<name>-<hash>` derived from your config.   |
| `display`  | `'auto' \| 'block' \| 'swap' \| 'fallback' \| 'optional'` | Optional. Default `font-display` for variants that don't set their own. Defaults to `'swap'`.                                                  |
| `variants` | `FontVariant[]`                                     | Either this or `import` is required. One entry per `@font-face`. See _Variant shape_ below.                                                          |
| `import`   | `string`                                            | Either this or `variants` is required. URL of a remote stylesheet — emitted as `@import url(...)`.                                                   |

### Variant shape

| Field             | Type                                  | Notes                                                                                                            |
| ----------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `src`             | `string \| FontSrc \| (string \| FontSrc)[]` | One or more sources. Strings are URLs; format is auto-detected from the file extension when possible.     |
| `weight`          | `number \| string`                    | `font-weight` for this variant.                                                                                  |
| `style`           | `'normal' \| 'italic' \| 'oblique' \| string` | `font-style`.                                                                                            |
| `stretch`         | `string`                              | `font-stretch`.                                                                                                  |
| `display`         | `FontDisplay`                         | Per-variant override of `display`.                                                                               |
| `unicodeRange`    | `string`                              | `unicode-range`.                                                                                                 |
| `ascentOverride`  | `string`                              | `ascent-override`.                                                                                               |
| `descentOverride` | `string`                              | `descent-override`.                                                                                              |
| `lineGapOverride` | `string`                              | `line-gap-override`.                                                                                             |
| `sizeAdjust`      | `string`                              | `size-adjust`.                                                                                                   |

`FontSrc` is `{ url: string; format?: FontFormat; tech?: string }`.

## See also

- [Variables](/docs/variables/) — use `defineFont` output as a token.
- [Templates](/docs/templates/) — bundle font + weight + line-height into reusable text styles.
- [Imports](/docs/imports/) — use `defineImport` for stylesheet-level imports that aren't font-specific.
