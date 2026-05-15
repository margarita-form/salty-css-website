# Documentation

Salty CSS is a zero-runtime, build-time CSS-in-TS library for React, Next.js and Astro. These docs cover everything from a one-minute install to the full styling API.

## TL;DR — get started

Inside any React, Next.js or Astro project, run:

```bash
npx salty-css init
```

Then create a component in a `*.css.ts` file:

```ts
// /components/my-button.css.ts
import { styled } from "@salty-css/react/styled";

export const Button = styled("button", {
  base: {
    padding: "0.75rem 1.25rem",
    borderRadius: "6px",
    background: "{theme.color}",
    color: "white",
  },
});
```

…and use it like any other React component. For the full walkthrough see [Quick Start](/docs/quick-start/) and [Installation](/docs/installation/).

## Search the docs

Don't scroll through the sidebar — hit `Ctrl + K` (or `⌘ + K` on macOS) anywhere in the docs to open the search modal. You can also click the **Search** button at the top of the sidebar.

Search is fuzzy: it matches page titles, descriptions and slugs, so partial terms like `variant`, `media` or `clamp` are enough to find the right page.

## What's in the docs

### Getting Started

- [Quick Start](/docs/quick-start/) — get to know the basics of Salty CSS.
- [Installation](/docs/installation/) — install Salty CSS in your project.
- [Usage](/docs/usage/) — how to use Salty CSS in your project.
- [CLI](/docs/cli/) — use Salty CSS from the command line.
- [FAQ](/docs/faq/) — answers to common questions.

### Styling

- [Component styles](/docs/basics/) — the basics of styling components with Salty CSS.
- [Class styles](/docs/classnames/) — use the `classNames` function for plain class-based styles.
- [Variants](/docs/variants/) — prop-driven variants and compound variants.
- [Overrides](/docs/overrides/) — override component styles per-instance.
- [Media queries](/docs/media-queries/) — media queries and breakpoints.
- [Animations](/docs/animations/) — keyframes and animations.
- [Templates](/docs/templates/) — reusable styles with `defineTemplates`.

### Utilities

- [Viewport clamp](/docs/viewport-clamp/) — add a viewport clamp to your project.
- [Color function](/docs/color-function/) — manipulate colors at build time.

### API reference

- [`styled` function](/docs/api/styled/) — the full API for the `styled` component factory.
- [`classNames` function](/docs/api/classname/) — the full API for class-based styles.

## Get support

Join the [Salty CSS Discord server](https://discord.gg/R6kr4KxMhP) for help, or check the [GitHub repository](https://github.com/margarita-form/salty-css) for source code and issues.
