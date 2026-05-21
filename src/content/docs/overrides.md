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

## `passProps` — forwarding variant props to the wrapped element

By default, variant props (anything you declare under `variants`) are **consumed by Salty** and don't reach the underlying element. That's the right default for most components, but it breaks when you're wrapping something that needs specific props to function — `next/link` needs `href`, a router link needs `to`, etc.

`passProps` controls which variant-style props get forwarded:

| Value                | Behaviour                                                              |
| -------------------- | ---------------------------------------------------------------------- |
| `false` (default)    | Variant props stay with Salty; only native HTML attributes pass through. |
| `true`               | All variant props are forwarded to the underlying element/component.   |
| `'href'`             | Only the named prop is forwarded.                                       |
| `['href', 'target']` | Forward the listed props.                                               |

{{fw-snippet:pass-props}}

The single most common reason to reach for `passProps` is extending a router/link component:

```ts
// Without passProps, NextLink never sees `href` because Salty consumed it.
export const Link = styled(NextLink, {
  passProps: ["href", "prefetch"],
  base: { color: "{colors.brand.main}" },
});
```

## Element Override (`element` vs `styled(Component, …)`)

There are two ways to change what gets rendered, and they do different things:

- **`element: 'h2'`** changes the **HTML tag** while keeping the styled component as a thin wrapper. Use it when you want semantic flexibility without writing a new component.
- **`styled(MyComponent, …)`** **wraps another component** — Salty merges its base + variants on top of the wrapped component's existing styles. Use it when you want to extend behaviour, not just swap tags.

```ts
import { styled } from "{{styledImport}}";

// Tag-only swap — still a wrapper around `<h2>`.
export const Heading = styled("div", {
  element: "h2",
  base: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
});

// Wrapping a component — base styles merge with whatever Heading already had.
export const SectionHeading = styled(Heading, {
  base: {
    color: "{colors.brand.main}",
    borderBottom: "1px solid currentColor",
  },
});
```

Per-instance override at the call site uses the `as` prop:

{{fw-snippet:overrides-as-prop}}

## Overriding Styles with Props

You can pass CSS styles directly via props to override the base styles:

{{fw-snippet:overrides-style-prop}}

## CSS Custom Properties

CSS custom properties (variables) give consumers a way to override individual styles per-instance without needing a variant for every knob.

### A themeable surface

Declare the variables with sensible fallbacks in the styled component, and let consumers set them via the `style` prop or a parent rule:

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

### Runtime-tunable spacing

When a layout needs a knob you don't want to make into a variant, expose it as a variable:

```ts
export const Stack = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--stack-gap, 1rem)",
  },
});
```

{{fw-snippet:stack-gap-render}}

### Reading a themed token

Combine custom properties with [conditional variables](/docs/theming/) for theme-aware values that flip when the parent theme attribute changes:

```ts
export const Panel = styled("section", {
  base: {
    background: "{theme.background}",
    color: "{theme.color}",
    "--panel-accent": "{theme.highlight}",
    borderLeft: "4px solid var(--panel-accent)",
  },
});
```

The `--panel-accent` variable resolves to whatever `{theme.highlight}` is at runtime, so child elements can read `var(--panel-accent)` without re-resolving the theme themselves.
