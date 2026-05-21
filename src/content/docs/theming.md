---
title: Theming
description: Add dark mode and multi-theme support to your app with conditional CSS variables — no React provider, no context, no flash on hydration. Just flip an attribute.
topic: Theming
category: guide
schemaType: TechArticle
keywords: [theming, dark mode, multi-theme, color scheme, conditional CSS variables, no theme provider, no context, data-theme attribute, prefers-color-scheme, no flash dark mode, Salty CSS dark mode]
intent: Build dark mode and multi-theme support with conditional CSS variables, a theme toggle, and the OS preference — no provider, no flash on hydration.
proficiencyLevel: Intermediate
priority: 0.8
---

# Theming

Salty CSS themes are plain CSS custom properties scoped to a parent selector. You declare two (or more) value sets under [`defineVariables`](/docs/variables/)' `conditional` scope, flip an attribute on an ancestor element (usually `<html>`), and every consumer of those tokens updates instantly.

That means **no theme provider, no React context, no `<ThemeProvider>` wrapper, no re-render on switch, and no flash on hydration** (with the inline-script pattern lower on this page). The same mechanism powers dark mode, high-contrast modes, brand themes — anything you can name with an attribute.

> **Theming vs. variables:** In many CSS-in-JS libraries (Emotion, styled-components, Stitches) the word "theme" means the global design-token object — colors, spacing, typography. In Salty CSS, that concept is called [**variables**](/docs/variables/). *Theming* in Salty CSS specifically refers to the runtime system described here: swapping named token sets by toggling an attribute on an ancestor element.

## 1. Declare the themes

Group your themed tokens under `conditional.theme` (the group name is yours to pick; `theme` is conventional). Each child key is one mode, and each mode declares the same set of token names.

```ts
// /styles/themes.css.ts
import { defineVariables } from "@salty-css/core/factories";

export const themes = defineVariables({
  conditional: {
    theme: {
      dark: {
        background: "{colors.black}",
        altBackground: "{colors.altBlack}",
        terminalBackground: "{colors.terminalBlack}",
        color: "{colors.white}",
        altColor: "{colors.altWhite}",
        highlight: "{colors.highlight}",
      },
      light: {
        background: "{colors.white}",
        altBackground: "{colors.altWhite}",
        terminalBackground: "{colors.terminalWhite}",
        color: "{colors.black}",
        altColor: "{colors.altBlack}",
        highlight: "{colors.highlight}",
      },
      brand: {
        background: "{colors.brand.main}",
        altBackground: "{colors.brand.muted}",
        terminalBackground: "{colors.brand.muted}",
        color: "{colors.white}",
        altColor: "{colors.altWhite}",
        highlight: "{colors.highlight}",
      },
    },
  },
});
```

The tokens reference [static variables](/docs/variables/#static-variables) defined elsewhere (`{colors.black}`, `{colors.white}`, …) so the palette stays in one place. You're free to inline raw values too.

## 2. Consume the tokens

Reference them with the `{theme.xxx}` path — the group name becomes the namespace:

```ts
import { styled } from "{{styledImport}}";

export const Surface = styled("section", {
  base: {
    background: "{theme.background}",
    color: "{theme.color}",
    borderColor: "{theme.altBackground}",
  },
});
```

You can use the same tokens inside [`defineGlobalStyles`](/docs/basics/#global-styles), [`defineTemplates`](/docs/templates/), `className` — anywhere a Salty style accepts a value.

## 3. Activate a theme

Set the matching attribute on an ancestor. The attribute name mirrors the group key (`theme`) and the value mirrors the mode key (`dark` or `light`):

```html
<html data-theme="dark">
  ...
</html>
```

Every element under `<html data-theme="dark">` now reads the dark values. Salty CSS emits the underlying rules (roughly `[data-theme="dark"] { ... }`) for you; you only need to set the attribute.

There are two common activation patterns — pick the one that fits your site:

## 4. Design-themed sections

Some sites use themes as a design tool rather than a user preference: a dark hero section, a light editorial body, a brand-colored CTA strip. For this pattern, set `data-theme` directly in your markup — **no JavaScript required**.

```html
<section data-theme="dark">
  <!-- dark hero -->
</section>

<section data-theme="light">
  <!-- light content area -->
</section>

<section data-theme="brand">
  <!-- brand-colored strip -->
</section>
```

Attributes compose freely and can be nested. An element reads the nearest ancestor that carries a `data-theme` attribute, so a light page can contain a dark card, which can contain a light tooltip — each picks up the right values automatically.

This is the right choice when theming is a design decision driven by page structure, not a user preference. You wire up the markup once and the CSS does the rest.

## 5. OS preference and user toggle

When you want a site-wide dark/light mode that users can control, combine the `data-theme` attribute with a small script that reads the OS preference and persists the user's choice.

### Toggle

A theme toggle reads and writes a single attribute — here's a version that seeds from the OS preference and persists to `localStorage`:

{{fw-snippet:theme-toggle}}

### OS-only (no toggle)

If you don't need a user-facing toggle and just want to follow the system preference automatically, use the simpler auto-theme helper:

{{fw-snippet:auto-theme}}

Note: `useEffect` (React) and a regular `<script>` (Astro) both run after the initial paint, so this approach will produce a brief flash without a pre-hydration inline script. See [Avoiding the flash on first paint](#avoiding-the-flash-on-first-paint) below.

### Pure CSS — no JavaScript at all

If you never need a user override, you can skip the `conditional` group entirely and define the themed tokens as `responsive` variables scoped to `prefers-color-scheme`. The values swap at the variable level — every consumer updates automatically, with zero JavaScript and no `data-theme` attribute to manage.

First, define the named media queries:

```ts
// /styles/media.css.ts
import { defineMediaQuery } from "{{configImport}}";

export const prefersDark = defineMediaQuery((media) => media.dark);
```

Then declare the themed tokens under `responsive`:

```ts
// /styles/themes.css.ts
import { defineVariables } from "@salty-css/core/factories";

export const themes = defineVariables({
  responsive: {
    base: {
      theme: {
        background: "{colors.white}",
        color: "{colors.black}",
        altBackground: "{colors.altWhite}",
      },
    },
    "@prefersDark": {
      theme: {
        background: "{colors.black}",
        color: "{colors.white}",
        altBackground: "{colors.altBlack}",
      },
    },
  },
});
```

Consume them exactly like conditional theme tokens — the browser swaps the underlying values when the OS preference flips:

```ts
styled("section", {
  base: {
    background: "{theme.background}",
    color: "{theme.color}",
  },
});
```

The trade-off: there is no way to override the OS preference (no toggle, no `data-theme="brand"` sections). Reach for the `conditional` approach above as soon as you need either.

## Theme-aware compound states

Use the same conditional tokens for interactive states so hover, focus, and disabled colors stay in sync with the active theme automatically:

```ts
import { styled } from "{{styledImport}}";

export const Button = styled("button", {
  base: {
    background: "{theme.background}",
    color: "{theme.color}",

    "&:hover": {
      background: "{theme.altBackground}",
    },

    "&:disabled": {
      color: "{theme.altColor}",
      opacity: 0.5,
    },
  },
});
```

Declare the extra variants (`altBackground`, `altColor`) in your `conditional` group alongside the base tokens — the browser resolves the right value for whatever theme is active.

## Multiple, independent groups

Conditional groups are independent. Add a `density` group alongside `theme` and toggle the two attributes separately:

```ts
defineVariables({
  conditional: {
    theme: {
      dark: { background: "#0a0a0a" },
      light: { background: "#fafafa" },
    },
    density: {
      compact: { gap: "8px" },
      spacious: { gap: "24px" },
    },
  },
});
```

```html
<html data-theme="dark" data-density="compact">
  ...
</html>
```

The two attributes compose freely — four combinations from two groups, with no extra config.

## Avoiding the flash on first paint

When the theme is applied by client-side JS, users can briefly see the wrong theme before the script runs. The goal is to have the correct `data-theme` attribute on `<html>` before the browser paints the first pixel.

### Best: SSR with a cookie (zero flash)

Store the user's preference in a cookie rather than `localStorage`. Cookies are sent with every request, so your server-side framework can read the preference and set `data-theme` in the rendered HTML before the page leaves the server — no client JS required, no flash ever.

{{fw-snippet:flash-fix-ssr}}

When the user toggles, update both the DOM attribute and the cookie so the server picks it up on the next request:

```ts
document.documentElement.dataset.theme = next;
document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
```

### Good: Inline script (static or SPA sites)

When SSR isn't available, inject a small synchronous script as early as possible in `<head>`. Because it's inline, the browser executes it before rendering anything.

The toggle snippets above already include this pattern: the Astro snippet uses `is:inline`, and the Next.js/React snippet includes a `dangerouslySetInnerHTML` pre-hydration script in the root layout.

**Avoid** initializing theme inside `useEffect` or a deferred `<script>` — both run after paint and will produce a visible flash.

## See also

- [Variables](/docs/variables/) — the foundation that `conditional` is part of.
- [Color function](/docs/color-function/) — derive shades from static color tokens.
- [Media queries](/docs/media-queries/) — `prefers-color-scheme` and `prefers-reduced-motion`.
