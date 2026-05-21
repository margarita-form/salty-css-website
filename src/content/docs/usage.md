---
title: Usage
description: Build and consume Salty CSS components inside your application code.
topic: Usage
category: guide
schemaType: TechArticle
keywords: [usage, components, styled, css.ts]
intent: Author components in .css.ts files with Salty CSS and use them across your app.
proficiencyLevel: Beginner
priority: 0.8
---

# Usage

This guide covers the basic usage of Salty CSS components and features across different frameworks.

## Create components

Salty CSS only picks up files whose names end with one of these suffixes:

| Suffix       | When to use it                                                       |
| ------------ | -------------------------------------------------------------------- |
| `.css.ts`    | Default for any style or component file. Works everywhere.           |
| `.css.tsx`   | Same as `.css.ts`, but JSX is allowed in the file.                   |
| `.salty.ts`  | Alias of `.css.ts` — pick whichever reads better in your project.    |
| `.styled.ts` | Alias of `.css.ts`, conventionally used for `styled` factories.      |
| `.styles.ts` | Alias of `.css.ts`, conventionally used for `defineTemplates` etc.   |

A `.ts` file with the same content but missing the right suffix will type-check fine but produce **no CSS** at build time — this is the single most common "my styles aren't appearing" cause. See [Troubleshooting](/docs/troubleshooting/) if you hit it.

## Basic Component Structure

```ts
// /components/my-component.css.ts
import { styled } from "{{styledImport}}";

export const Component = styled("div", {
  className: "wrapper", // Optional custom class name
  element: "section", // Optional override for the rendered HTML element
  base: {
    // Base styles that are always applied
    display: "flex",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
  },
  variants: {
    // Conditional styles based on props
    size: {
      small: { padding: "0.5rem" },
      large: { padding: "2rem" },
    },
    color: {
      primary: { backgroundColor: "blue", color: "white" },
      secondary: { backgroundColor: "gray", color: "black" },
    },
  },
  compoundVariants: [
    // Styles applied when multiple variant conditions are met
    {
      size: "small",
      color: "primary",
      css: { borderRadius: "4px" },
    },
  ],
});
```

## Using Components

{{fw-snippet:component-render}}

## Naming components in DevTools

In development builds, every styled component renders with a `data-component-name` attribute matching its export name. Search for `[data-component-name="Button"]` in the elements panel to jump straight to it. You can override the label with the `displayName` option on the styled definition:

```ts
export const PrimaryButton = styled("button", {
  displayName: "PrimaryButton",
  base: { /* … */ },
});
```

In production builds the attribute is stripped, so it's a debugging aid only.

## Where to go next

- **Add prop-driven styles** → [Variants](/docs/variants/) (and [`anyOfVariants`](/docs/variants/#anyof-variants---or-logic) for OR-logic).
- **Share style bundles across components** → [Templates](/docs/templates/).
- **Add design tokens** → [Variables](/docs/variables/).
- **Add dark mode** → [Theming](/docs/theming/).
- **Extend a third-party component** → [Overrides](/docs/overrides/).
- **API reference** → [`styled`](/docs/api/styled/) · [`className`](/docs/api/classname/) · [`defineConfig`](/docs/api/config/).

## Demo Projects

- **Next.js Demo Project**: [View on GitHub](https://github.com/margarita-form/salty-css-website)
- **React + Vite Demo**: [View on GitHub](https://github.com/margarita-form/salty-css-react-vite-demo)
- **CodeSandbox Demo**: [![Edit margarita-form/salty-css-react-vite-demo/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/margarita-form/salty-css-react-vite-demo/main?import=true&embed=1)
