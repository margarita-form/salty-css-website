---
title: Variants
description: Compose variant, compound, and default styles to build adaptable components in Salty CSS.
preHeadline:
  react: Prop-Driven Variants and Compound Variants for Typed React Components — Default Variants Included
  next: RSC-Safe Variants for the App Router — Prop-Driven Style Branching Without 'use client' Boundaries
  astro: Compose Variant Styles in .astro and .tsx Components — Compound Variants Compiled at Build Step
visibleHeading:
  react: Variants for React Components
  next: Variants in the App Router
  astro: Variants in .astro and .tsx Components
topic: Variants
category: guide
schemaType: TechArticle
keywords: [variants, compound variants, default variants, props]
intent: Add prop-driven variants, compound variants, and default variants to your styled components.
proficiencyLevel: Intermediate
priority: 0.7
apiReferences: [api/styled, api/classname]
externalLinks:
  MDN · CSS selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors
  MDN · Pseudo-classes: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
---

Variants in Salty CSS allow you to create components with conditional styling based on props. This is a powerful way to build versatile UI components.

## Basic Variant Usage

Variants are defined within the `variants` object of a styled component:

```ts
// /components/button/button.css.ts
import { styled } from "{{styledImport}}";

export const Button = styled("button", {
  base: {
    display: "block",
    padding: "0.6em 1.2em",
    border: "1px solid currentColor",
    background: "transparent",
    color: "currentColor",
    cursor: "pointer",
    transition: "200ms",
  },
  variants: {
    // Define a "variant" property with different values
    variant: {
      outlined: {
        // Default styles
      },
      solid: {
        "&:not(:hover)": {
          background: "black",
          borderColor: "black",
          color: "white",
        },
        "&:hover": {
          background: "transparent",
          borderColor: "currentColor",
          color: "currentColor",
        },
      },
    },
    // Define a "size" property with different values
    size: {
      small: {
        fontSize: "0.8em",
        padding: "0.4em 0.8em",
      },
      medium: {
        fontSize: "1em",
        padding: "0.6em 1.2em",
      },
      large: {
        fontSize: "1.2em",
        padding: "0.8em 1.6em",
      },
    },
  },
});
```

## Using Variants

{{fw-snippet:variants-render}}

## Compound Variants

Compound variants let you apply styles when multiple variant conditions are met simultaneously:

```ts
import { styled } from "{{styledImport}}";

export const Button = styled("button", {
  base: {
    // ... base styles
  },
  variants: {
    variant: {
      outlined: {
        /* ... */
      },
      solid: {
        /* ... */
      },
    },
    size: {
      small: {
        /* ... */
      },
      large: {
        /* ... */
      },
    },
  },
  compoundVariants: [
    {
      // Apply these styles when both conditions are true
      variant: "solid",
      size: "large",
      css: {
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
  ],
});
```

## Default Variants

You can set default values for your variants:

```ts
import { styled } from "{{styledImport}}";

export const Button = styled("button", {
  base: {
    // ... base styles
  },
  variants: {
    variant: {
      outlined: {
        /* ... */
      },
      solid: {
        /* ... */
      },
    },
    size: {
      small: {
        /* ... */
      },
      medium: {
        /* ... */
      },
      large: {
        /* ... */
      },
    },
  },
  defaultVariants: {
    variant: "outlined",
    size: "medium",
  },
});
```

With default variants, you don't need to specify these props every time, as they'll be applied automatically.

## Boolean variants

For toggle-style props, declare a variant whose values are `true` / `false`:

```ts
export const Button = styled("button", {
  base: { padding: "0.5rem 1rem" },
  variants: {
    loading: {
      true: { opacity: 0.6, pointerEvents: "none" },
    },
  },
});
```

{{fw-snippet:boolean-variant-render}}

The variant only needs entries for the values you want to style — there's no requirement to declare both `true` and `false`.

## anyOf variants — OR logic

`compoundVariants` requires **all** listed values to be active. `anyOfVariants` flips that to "any of these" — useful when several variants should share a small rule without duplicating the CSS.

```ts
export const Badge = styled("span", {
  base: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "999px",
  },
  variants: {
    tone: {
      success: { background: "#16a34a", color: "white" },
      warning: { background: "#eab308", color: "black" },
      danger: { background: "#dc2626", color: "white" },
      neutral: { background: "#e5e7eb", color: "#111" },
    },
  },
  anyOfVariants: [
    { tone: "success", css: { fontWeight: 700 } },
    { tone: "warning", css: { fontWeight: 700 } },
    { tone: "danger", css: { fontWeight: 700 } },
  ],
});
```

`anyOfVariants` rules are generated with `:where()`, so they have **zero specificity**. A regular variant rule on the same property will win — by design. If you want the shared rule to override the per-variant one, move it into `compoundVariants` or `base`.

{{fw-snippet:any-of-variants}}

## Variant props on the rendered component

Every variant name you declare becomes a typed prop on the component:

{{fw-snippet:variant-props-render}}

If the consumer omits a variant prop and you declared a `defaultVariants` entry for it, the default applies. Variant props are consumed by Salty and **do not** reach the underlying DOM element by default — see [`passProps`](/docs/overrides/#passprops) when you need them forwarded (e.g. wrapping a third-party link component).
