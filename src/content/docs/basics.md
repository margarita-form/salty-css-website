---
title: Styling Basics
description: Understand styled components, className, tokens, and global styles in Salty CSS.
preHeadline:
  react: Styled, className, Tokens, and Globals — Four Building Blocks of Ergonomic Client-Side Authoring
  next: Styled, className, Tokens, and Globals — Four Building Blocks That Work in RSC and Server Components
  astro: Styled, className, Tokens, and Globals — Four Concepts for Authoring Island-Friendly Components
visibleHeading:
  react: Salty CSS Basics for React
  next: Salty CSS Basics for the Next.js App Router
  astro: Salty CSS Basics for Astro
topic: Styling Basics
category: guide
schemaType: TechArticle
keywords: [basics, styled, classname, tokens, globals]
intent: Learn the fundamental building blocks of Salty CSS — styled, className, tokens, and global styles.
proficiencyLevel: Beginner
priority: 0.8
apiReferences: [api/styled, api/classname, api/config]
externalLinks:
  react:
    MDN · CSS Syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax
    React docs · Tutorial: https://react.dev/learn/tutorial-tic-tac-toe
  next:
    MDN · CSS Syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax
    Next.js · CSS-in-JS: https://nextjs.org/docs/app/guides/css-in-js
  astro:
    MDN · CSS Syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax
---

This guide explains the fundamental concepts of styling with Salty CSS.

## Styled Function

The `styled` function is the main way to use Salty CSS in {{frameworkRuntime}}. It creates a {{componentNoun}} that can be used {{usageContext}}.

```ts
// /components/my-component.css.ts
import { styled } from "{{styledImport}}";

export const Component = styled("div", {
  className: "wrapper", // Define optional custom class name that will be included for this component
  element: "section", // Override the html element that will be rendered for this component
  base: {
    display: "flex",
    padding: "1rem",
    // Add your CSS-in-JS base styles here
  },
});
```

## Class Name Function

The `className` function creates CSS class names with the possibility to add scope and media queries. It's similar to `styled` but doesn't allow extending components or classes.

```ts
// /components/my-class.css.ts
import { className } from "{{classNameImport}}";

export const myClass = className({
  className: "wrapper", // Define optional custom class name that will be included to the scope
  base: {
    display: "flex",
    padding: "1rem",
    // Add your CSS-in-JS base styles here
  },
});
```

Usage example:

{{fw-snippet:classname-hello}}

## Global Styles

Global styles target bare HTML selectors — anything not scoped to a single component. Use them for resets, base typography, anchor colors, or anything else you'd otherwise stuff into a top-level CSS file. Define them in a `.css.ts` file and export the result so the build picks them up:

```ts
// /styles/global.css.ts
import { defineGlobalStyles } from "@salty-css/core/factories";

export const globalStyles = defineGlobalStyles({
  html: {
    scrollBehavior: "smooth",
    scrollPaddingTop: "5vh",
  },
  body: {
    margin: 0,
    fontFamily: "var(--font-family-main, helvetica, sans-serif)",
    overflowY: "scroll",
  },
  a: {
    color: "currentcolor",
  },
  // Nested objects work — selectors compose with the parent.
  "pre:has(code)": {
    background: "{theme.terminalBackground}",
    overflow: "auto",
    border: "1px solid {theme.altBackground}",
    "& pre": {
      padding: "0 1em",
      border: "none",
    },
  },
});
```

Token references (`{theme.terminalBackground}`) and nested selectors (`& pre`) work here exactly as they do inside `styled` and `className`. The same options are also accepted by [`defineConfig({ global })`](/docs/api/config/#global) — pick whichever fits your project layout.

For the built-in reset and how to opt out of it, see [`defineConfig.reset`](/docs/api/config/#reset).

## CSS Variables (Tokens)

CSS variables create design tokens that can be reused throughout your application. Salty CSS supports static, responsive (breakpoint-aware), and conditional (theme-aware) tokens — this section covers the static case; for the rest, see [Variables](/docs/variables/) and [Theming](/docs/theming/).

```ts
// /styles/variables.css.ts
import { defineVariables } from "@salty-css/core/factories";

export default defineVariables({
  colors: {
    dark: "#111",
    light: "#fefefe",
    brand: {
      main: "#0070f3",
      highlight: "#ff4081",
    },
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
  fontFamily: {
    heading: "Arial, sans-serif",
    body: "Georgia, serif",
  },
});
```

Reference tokens with `{path.to.token}` syntax from any style object:

```ts
styled("span", {
  base: {
    fontFamily: "{fontFamily.heading}",
    color: "{colors.brand.main}",
    padding: "{spacing.medium}",
  },
});
```

Token paths are validated at build time — typos surface as compiler output rather than as silent fallbacks in the browser.

## Where to go next

- [Variables](/docs/variables/) — responsive and conditional token scopes.
- [Theming](/docs/theming/) — dark mode in a few lines.
- [Fonts](/docs/fonts/) — register web fonts with `defineFont`.
- [Imports](/docs/imports/) — pull in external CSS.
- [Templates](/docs/templates/) — bundle reusable style patterns.
