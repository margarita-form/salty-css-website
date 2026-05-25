---
title: Variables
description: Define design tokens with defineVariables — static, responsive, and conditional scopes for theming and responsive design.
preHeadline:
  react: Typed Design Tokens With defineVariables — Static, Responsive, and Conditional Scopes for React Apps
  next: Design Tokens That Render Inside RSC Trees — defineVariables Conditional Scopes for Multi-Theme Layouts
  astro: defineVariables Tokens Compiled Into .astro Stylesheet Output — Responsive, Conditional, Theme-Aware
visibleHeading:
  react: Design Tokens and Variables for React
  next: Design Tokens for Server and Client Components
  astro: Design Tokens for .astro Pages
topic: Variables
category: guide
schemaType: TechArticle
keywords: [variables, tokens, design tokens, defineVariables, theming, responsive]
intent: Define and use design tokens with defineVariables — including responsive and conditional scopes.
proficiencyLevel: Beginner
priority: 0.8
apiReferences: [api/config, api/define-factories]
externalLinks:
  react:
    MDN · CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
    React docs · Reusing styles: https://react.dev/learn/reusing-logic-with-custom-hooks
  next:
    MDN · CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
    Next.js · CSS-in-JS: https://nextjs.org/docs/app/guides/css-in-js
  astro:
    MDN · CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
    Astro · Styles & CSS: https://docs.astro.build/en/guides/styling/
---

`defineVariables` is how you register design tokens — colors, spacing, font sizes, anything you want to reuse — so the rest of your styles can reference them with `{token.path}` syntax. Tokens become CSS custom properties on `:root`, so you keep the runtime cost of regular CSS variables while writing them in TypeScript with autocomplete and build-time validation.

It has three scopes:

| Scope         | What it does                                                                                                                | Use it for                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Static (root) | Top-level keys land on `:root` once and never change.                                                                       | Brand colors, fixed spacing, anything that doesn't depend on state. |
| `responsive`  | Sub-trees keyed by a defined media query — the same token name swaps value automatically when the media query matches.      | Fluid type scales, breakpoint-sensitive spacing.                    |
| `conditional` | Sub-trees keyed by a parent selector (e.g. `data-theme="dark"`) — the value flips when an ancestor selector matches.        | Theming and dark mode. See [Theming](/docs/theming/).               |

## Static variables

Pass a plain object. Keys nest as deeply as you like; the path becomes the token reference.

```ts
// /styles/variables.css.ts
import { defineVariables } from "@salty-css/core/factories";

export default defineVariables({
  colors: {
    black: "#0a0a0a",
    white: "#f0f0f0",
    highlight: "aqua",
    brand: {
      main: "#0070f3",
      muted: "#6699cc",
    },
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
  fontFamily: {
    heading: "var(--font-family-logo)",
    body: "var(--font-family-main, helvetica, sans-serif)",
  },
});
```

Reference tokens from anywhere a Salty style object accepts a value:

```ts
import { styled } from "{{styledImport}}";

export const Card = styled("div", {
  base: {
    background: "{colors.brand.main}",
    color: "{colors.white}",
    padding: "{spacing.large}",
    fontFamily: "{fontFamily.body}",
  },
});
```

Token paths are validated at build time, so a typo like `{colros.brand.main}` surfaces in compiler output rather than as an unstyled element in the browser.

## Responsive variables

Variables nested under `responsive.base` are the defaults. Adding a key like `'@largeMobileDown'` (the name of a media query you defined with [`defineMediaQuery`](/docs/media-queries/)) overrides any matching token name when that query matches.

```ts
// /styles/variables.css.ts
import { defineVariables } from "@salty-css/core/factories";
import { HDClamp, MobileClamp } from "./helpers.css";

export default defineVariables({
  responsive: {
    base: {
      spacing: {
        small: HDClamp(8),
        medium: HDClamp(20),
        large: HDClamp(36),
        pageMargin: HDClamp(120),
      },
      fontSize: {
        headline: {
          small: HDClamp(24),
          regular: HDClamp(36),
          large: HDClamp(64),
        },
        body: {
          regular: HDClamp(16),
          large: HDClamp(24),
        },
      },
    },
    "@largeMobileDown": {
      spacing: {
        pageMargin: MobileClamp(30),
      },
      fontSize: {
        headline: {
          small: MobileClamp(24),
          regular: MobileClamp(32),
          large: MobileClamp(42),
        },
      },
    },
  },
});
```

Consume the tokens the same way you would static ones — the browser swaps the value when the breakpoint matches.

```ts
styled("h1", {
  base: {
    fontSize: "{fontSize.headline.large}", // 64 → 42 below 900px
    paddingInline: "{spacing.pageMargin}", // 120 → 30 below 900px
  },
});
```

You only need to redeclare the tokens that actually change at the breakpoint. Anything you leave out keeps its `base` value.

## Conditional variables

`conditional` lets you swap tokens based on an ancestor selector — typically a `data-theme` attribute or a class name. The structure is `conditional[group][value]: { ...tokens }`. Salty CSS emits rules like `[data-theme="dark"] { ... }` so you can flip the whole theme by toggling one attribute.

```ts
// /styles/themes.css.ts
import { defineVariables } from "@salty-css/core/factories";

export const themes = defineVariables({
  conditional: {
    theme: {
      dark: {
        background: "{colors.black}",
        color: "{colors.white}",
      },
      light: {
        background: "{colors.white}",
        color: "{colors.black}",
      },
    },
  },
});
```

Activate a theme by setting the corresponding attribute on an ancestor:

```html
<html data-theme="dark">
  ...
</html>
```

Then use the tokens like any other:

```ts
styled("section", {
  base: {
    background: "{theme.background}",
    color: "{theme.color}",
  },
});
```

For a full dark-mode walkthrough (toggle wiring, `prefers-color-scheme` integration, derived shades) see [Theming](/docs/theming/).

## Mixing all three scopes

Static, responsive, and conditional variables can coexist in one file (or be split across many — they all merge into the same `:root` namespace at build time):

```ts
defineVariables({
  // Static
  colors: { brand: { main: "#0070f3" } },

  // Responsive
  responsive: {
    base: { spacing: { gutter: "32px" } },
    "@largeMobileDown": { spacing: { gutter: "16px" } },
  },

  // Conditional
  conditional: {
    theme: {
      dark: { surface: "#111" },
      light: { surface: "#fafafa" },
    },
  },
});
```

## Inspecting generated variables in DevTools

Every token becomes a CSS custom property on `:root` (or on the conditional selector). The property name is derived from the token path with dashes — `colors.brand.main` becomes `--colors-brand-main`, `spacing.pageMargin` becomes `--spacing-page-margin`, and so on. Inspect `:root` in DevTools to see all of them at once, or use Computed → Show all to confirm what a specific element resolves to.

## Best practices

1. **Pick a flat-ish naming structure.** Two to three levels deep is comfortable to type and read. Anything deeper tends to read as noise at the call site.
2. **Group by purpose, not by raw value.** Prefer `spacing.pageMargin` over `spacing.px-120` — the value can change later without rippling through your call sites.
3. **Token first, then inline.** If the same value shows up in two components, promote it to a variable; if it shows up once, leave it inline.
4. **Keep conditional groups orthogonal.** A `theme` group and a `density` group can be toggled independently. Don't multiplex unrelated concerns into one group.
5. **Use `responsive` for values that should swap, not just shrink.** For fluid scaling without a hard breakpoint, reach for [Viewport clamp](/docs/viewport-clamp/) instead.

## See also

- [Theming](/docs/theming/) — dark-mode patterns built on `conditional`.
- [Media queries](/docs/media-queries/) — define the names used as `responsive` keys.
- [Viewport clamp](/docs/viewport-clamp/) — fluid sizing without breakpoints.
- [`defineConfig` reference](/docs/api/config/) — wire variables into your Salty config.
