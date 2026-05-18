---
title: Overrides
description: Extend styled components, swap elements, and override styles with props in Salty CSS.
topic: Overrides
category: guide
schemaType: TechArticle
keywords: [overrides, extend, style props, third-party]
intent: Extend Salty CSS components, override styles, integrate third-party components, and use style props.
proficiencyLevel: Intermediate
priority: 0.7
---

# Extending and Overriding

Salty CSS offers powerful ways to extend components and override styles, allowing you to build complex component systems while maintaining consistency.

## Extending Components

You can extend existing components to create new ones with additional styles or functionality:

```ts
// /components/button.css.ts
import { styled } from "{{styledImport}}";

export const Button = styled("button", {
  base: {
    padding: "0.6em 1.2em",
    border: "1px solid currentColor",
    borderRadius: "4px",
    cursor: "pointer",
  },
});

// /components/primary-button.css.ts
import { styled } from "{{styledImport}}";
import { Button } from "./button.css";

// Extend the Button component with new styles
export const PrimaryButton = styled(Button, {
  base: {
    backgroundColor: "blue",
    color: "white",
    borderColor: "blue",
  },
});
```

## Extending Third-Party Components

You can also extend non-Salty CSS components, like those from UI libraries:

{{fw-snippet:overrides-link}}

> Note: Third-party components must accept a `className` prop for the styles to be applied correctly.

## Element Override

You can override the HTML element that's rendered by a styled component:

```ts
import { styled } from "{{styledImport}}";

export const Heading = styled("div", {
  element: "h2", // This will render as an h2 instead of a div
  base: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
});
```

## Overriding Styles with Props

You can pass CSS styles directly via props to override the base styles:

{{fw-snippet:overrides-style-prop}}

## CSS Custom Properties

Use CSS variables to create components that can be easily themed:

```ts
// /components/themed-box.css.ts
import { styled } from "{{styledImport}}";

export const ThemedBox = styled("div", {
  base: {
    backgroundColor: "var(--box-bg, white)",
    color: "var(--box-text, black)",
    padding: "var(--box-padding, 1rem)",
    borderRadius: "var(--box-radius, 4px)",
  },
});
```

Usage with CSS custom properties:

{{fw-snippet:overrides-css-vars}}
