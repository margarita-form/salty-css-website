---
title: Quick Start
description: Set up Salty CSS in ~15 minutes — install with the CLI, write your first typed component, add variants, ship dark mode, and register a custom font.
preHeadline:
  react: Ship a Typed Component, Variants, Dark Mode, and a Custom Font in Your First React Session
  next: Bootstrap @salty-css/next in App Router — First Variants, Dark Mode, and a Font in Twenty Minutes
  astro: First Typed Variants and Dark Mode in an Astro Project — Zero Client JS Added to Your Bundle
visibleHeading:
  react: Quick Start for React
  next: Quick Start for the Next.js App Router
  astro: Quick Start for Astro
topic: Quick Start
category: tutorial
schemaType: HowTo
keywords: [Salty CSS quick start, getting started, install CSS-in-TS, TypeScript styled components, first component, add dark mode, defineFont, variants, npx salty-css init, Next.js setup, Vite setup, Astro setup]
intent: Install Salty CSS, ship your first typed component, add variants, wire up dark mode, and register a custom font.
proficiencyLevel: Beginner
priority: 0.9
---

Goal: by the end of this page you have Salty CSS installed, a typed component on screen, prop-driven variants, dark mode that flips without a provider, and a custom font registered. Budget about 15 minutes.

## 1. Install

Inside any React, Next.js, Vite, or Astro project, run:

```bash
npx salty-css init
```

The CLI detects your framework, adds the right plugin (`@salty-css/next`, `@salty-css/vite`, `@salty-css/webpack`, or `@salty-css/astro`), drops a `salty.config.ts` in the project root, and wires up the build. If you'd rather wire it up yourself, see [Installation](/docs/installation/).

## 2. Your first component

All Salty definitions live in files matching `*.css.ts`, `*.css.tsx`, `*.salty.ts`, `*.styled.ts`, or `*.styles.ts` — the suffix is how the compiler picks them up at build time.

```ts
// /components/card.css.ts
import { styled } from "{{styledImport}}";

export const Card = styled("section", {
  base: {
    padding: "1.5rem",
    borderRadius: "12px",
    background: "{theme.background}",
    color: "{theme.color}",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
  },
});
```

Use it like any other {{componentNoun}}:

{{fw-snippet:component-render}}

Note the `{theme.background}` / `{theme.color}` tokens — we'll define those in step 4.

## 3. Add variants

Variants turn props into typed style branches. Add a `size` axis and a `tone` axis:

```ts
// /components/card.css.ts
import { styled } from "{{styledImport}}";

export const Card = styled("section", {
  defaultVariants: { size: "medium", tone: "neutral" },
  base: {
    padding: "1.5rem",
    borderRadius: "12px",
    background: "{theme.background}",
    color: "{theme.color}",
  },
  variants: {
    size: {
      small: { padding: "1rem", borderRadius: "8px" },
      medium: { padding: "1.5rem" },
      large: { padding: "2.5rem", borderRadius: "16px" },
    },
    tone: {
      neutral: {},
      brand: { background: "{theme.highlight}", color: "{theme.background}" },
      muted: { background: "{theme.altBackground}" },
    },
  },
  compoundVariants: [
    { size: "large", tone: "brand", css: { fontWeight: 600 } },
  ],
});
```

`size` and `tone` are now typed props. Render with:

{{fw-snippet:variants-render}}

For more on variants — including `anyOfVariants` for "any of these branches matches" rules — see [Variants](/docs/variants/).

## 4. Add design tokens and dark mode

Salty themes are CSS variables under the hood. You declare two (or more) value sets under `conditional.theme`, and the active set is picked by an attribute on an ancestor — usually `<html>`. No provider, no context.

```ts
// /styles/themes.css.ts
import { defineVariables } from "@salty-css/core/factories";

export const palette = defineVariables({
  colors: {
    ink: "#0d1117",
    paper: "#ffffff",
    sand: "#f5f1e8",
    coral: "#ff6b5a",
  },
});

export const themes = defineVariables({
  conditional: {
    theme: {
      light: {
        background: "{colors.paper}",
        altBackground: "{colors.sand}",
        color: "{colors.ink}",
        highlight: "{colors.coral}",
      },
      dark: {
        background: "{colors.ink}",
        altBackground: "#1c2128",
        color: "{colors.paper}",
        highlight: "{colors.coral}",
      },
    },
  },
});
```

Activate a theme by setting the attribute on any ancestor — usually the root:

```html
<html data-theme="dark">
  ...
</html>
```

That's the whole switch. Every `{theme.background}` / `{theme.color}` reference in your styles now reads the dark values. Flip the attribute back to `light` and it all updates again. For a working toggle that persists the choice in `localStorage` and avoids the first-paint flash:

{{fw-snippet:theme-toggle}}

See [Theming](/docs/theming/) for the deeper guide (system preference, multiple independent groups, deriving shades with `color()`).

## 5. Register a custom font

`defineFont` registers a font and gives you back something you can use as a `font-family` value, a CSS variable, a class name, or a `style` spread.

```ts
// /styles/fonts.css.ts
import { defineFont } from "@salty-css/core/factories";

export const display = defineFont({
  name: "Mona Sans",
  fallback: "system-ui, -apple-system, sans-serif",
  variants: [
    {
      src: "/fonts/Mona-Sans.woff2",
      weight: "200 900",
      style: "normal",
      display: "swap",
    },
  ],
});
```

Use it in a styled component:

```ts
import { styled } from "{{styledImport}}";
import { display } from "../styles/fonts.css";

export const Title = styled("h1", {
  base: {
    fontFamily: display,
    fontSize: "clamp(2rem, 4vw, 3.5rem)",
    color: "{theme.color}",
  },
});
```

`display` stringifies to its `font-family` value, so it works inline. You can also read `display.variable` (the CSS custom property), `display.className`, or `display.style` (an object you can spread onto a `style` prop). See [Fonts](/docs/fonts/) for remote fonts (`import`) and per-variant overrides.

## What you have now

A typed component with variants, a theme that flips on a single attribute, and a custom font registered through `defineFont`. That's the everyday Salty CSS surface.

## Where to go next

- **Variants in depth** → [Variants](/docs/variants/) (compound, `anyOfVariants`, defaults).
- **Reusable style bundles** → [Templates](/docs/templates/).
- **Fluid type / spacing** → [Viewport clamp](/docs/viewport-clamp/).
- **Media queries and breakpoints** → [Media queries](/docs/media-queries/).
- **Full reference** → [`styled`](/docs/api/styled/), [`className`](/docs/api/classname/), [`defineConfig`](/docs/api/config/).

## Use the CLI

- Scaffold a component: `npx salty-css generate [filePath]`
- Force a CSS build: `npx salty-css build [directory]`
- Bump packages: `npx salty-css up`

## Good to know

1. All Salty CSS definitions (`styled`, `className`, `keyframes`, `defineFont`, etc.) must live in `*.css.ts` / `*.css.tsx` (or `.salty.ts`, `.styled.ts`, `.styles.ts`). The suffix is the contract — that's how the compiler knows to evaluate the file.
2. `styled` can extend non-Salty components (`styled(ThirdPartyLink, { ... })`), but the wrapped component must accept a `className` prop. See [Overrides](/docs/overrides/).
3. CSS-in-JS values can be `string`, `number`, **function**, or **promise** — but importing heavy runtime libraries into a `*.css.ts` file will slow your build (and may crash if the library assumes a browser). Keep these files style-focused.

## If something didn't work

→ [Troubleshooting](/docs/troubleshooting/). The most common cause (a wrong filename suffix) is the very first entry.

## Get support

Stuck? Drop into the [Salty CSS Discord](https://discord.gg/R6kr4KxMhP) and someone will untangle it with you.
