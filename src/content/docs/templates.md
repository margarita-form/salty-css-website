---
title: Templates
description: Build reusable style patterns with defineTemplates for cross-component consistency in Salty CSS.
topic: Templates
category: guide
schemaType: TechArticle
keywords: [templates, defineTemplates, design system, reuse]
intent: Define reusable style templates with defineTemplates to share patterns across components.
proficiencyLevel: Intermediate
priority: 0.8
---

# Templates

Templates allow you to create reusable style patterns that can be applied across multiple components, promoting consistency and reducing repetition in your codebase.

## Creating Templates

You can define templates using the `defineTemplates` function:

```ts
// /styles/templates.css.ts
import { defineTemplates } from "@salty-css/core/factories";

export default defineTemplates({
  // Static templates for text styles
  textStyle: {
    headline: {
      small: {
        fontSize: "{fontSize.heading.small}",
        fontWeight: "600",
        lineHeight: "1.2",
      },
      regular: {
        fontSize: "{fontSize.heading.regular}",
        fontWeight: "600",
        lineHeight: "1.2",
      },
      large: {
        fontSize: "{fontSize.heading.large}",
        fontWeight: "700",
        lineHeight: "1.1",
      },
    },
    body: {
      small: {
        fontSize: "{fontSize.body.small}",
        lineHeight: "1.5",
      },
      regular: {
        fontSize: "{fontSize.body.regular}",
        lineHeight: "1.4",
      },
    },
  },

  // Dynamic function templates
  card: (padding: string) => {
    return {
      padding,
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
    };
  },
});
```

## Using Templates in Components

Templates are applied by using the template name as a property in your component styles:

```ts
import { styled } from "{{styledImport}}";

// Using static templates
export const Heading = styled("h1", {
  base: {
    textStyle: "headline.large", // Apply the headline.large template
  },
});

export const Paragraph = styled("p", {
  base: {
    textStyle: "body.regular", // Apply the body.regular template
  },
});

// Using dynamic function templates
export const CardComponent = styled("div", {
  base: {
    card: "2rem", // Pass "2rem" to the card template function
  },
  variants: {
    compact: {
      true: {
        card: "1rem", // Pass "1rem" to the card template function
      },
    },
  },
});
```

## Nesting Templates

Templates can be nested to create more complex reusable patterns:

```ts
export default defineTemplates({
  surface: {
    primary: {
      backgroundColor: "{colors.background.primary}",
      color: "{colors.text.primary}",
    },
    secondary: {
      backgroundColor: "{colors.background.secondary}",
      color: "{colors.text.secondary}",
    },
  },

  panel: (variant: "default" | "elevated") => {
    return {
      surface: "primary", // Apply the surface.primary template
      borderRadius: "8px",
      ...(variant === "elevated"
        ? {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }
        : {}),
    };
  },
});
```

## Template variants

Template nodes can declare named variant bundles — the same ergonomic as `styled({ variants })`, but reusable across components. A node becomes "rich" the moment it has a `base` or `variants` key; otherwise the existing flat shape (above) keeps working untouched.

```ts
// /styles/templates.css.ts
import { defineTemplates } from "@salty-css/core/factories";

export default defineTemplates({
  textStyle: {
    heading: {
      base: {
        fontFamily: "{fonts.heading}",
        lineHeight: "1.2",
      },
      variants: {
        weight: {
          light: { fontWeight: "300" },
          regular: { fontWeight: "600" },
          heavy: { fontWeight: "900" },
        },
        emphasis: {
          muted: { color: "{colors.text.muted}" },
          loud: { color: "{colors.brand.primary}", textTransform: "uppercase" },
        },
        italic: {
          true: { fontStyle: "italic" },
        },
      },
      defaultVariants: { weight: "regular" },
      compoundVariants: [
        { weight: "heavy", italic: true, css: { letterSpacing: "-0.005em" } },
      ],

      // Descendants — declare only what's different about them.
      small: { base: { fontSize: "{fontSize.heading.small}" } },
      large: {
        base: { fontSize: "{fontSize.heading.large}", lineHeight: "1.1" },
        defaultVariants: { weight: "heavy" },
      },
    },
  },
});
```

Call sites pick a path and (optionally) one variant value per axis. Two equivalent forms:

```ts
// String form — compact, ideal for one or two axes:
styled("h1", {
  base: {
    textStyle: "heading.large@weight=light",
  },
});

styled("h2", {
  base: {
    textStyle: "heading.large@weight=heavy&emphasis=loud&italic",
  },
});

// Object form — best with multiple axes / boolean variants:
styled("h1", {
  base: {
    textStyle: {
      name: "heading.large",
      weight: "heavy",
      emphasis: "loud",
      italic: true,
    },
  },
});

// Parent ref — picks up `heading.base` only, no size leaf:
styled("h2", { base: { textStyle: "heading" } });
```

A leaf inherits its parent's `base`, `variants`, `defaultVariants`, `compoundVariants`, and `anyOfVariants`. When a leaf re-declares an axis value (e.g., `heading.large.variants.weight.heavy`), it **replaces** the parent's bundle for that axis-value rather than merging — restate any properties you want to keep. The full resolution algorithm, edge cases, and design rationale live in [docs/template-variants-spec.md](./template-variants-spec.md).

## Best Practices

1. **Organize by purpose**: Group related templates together in a logical structure.
2. **Use descriptive names**: Choose template names that clearly describe their function.
3. **Leverage variables**: Reference CSS variables within templates to ensure consistency with your design system.
4. **Consider type safety**: Use Static templates if you know possible outcomes or at least add TypeScript type definitions for function parameters to improve developer experience.
5. **Avoid over-nesting**: Keep template hierarchies reasonably flat for better maintainability.
6. **Prefer variants over leaf duplication**: When an axis has 2+ values (e.g., a `weight` that varies independently of size), declare a named variant on a parent node instead of materializing every combination as its own leaf.

## When to Use Templates

Templates are particularly useful for:

- **Typography systems**: Defining consistent text styles across your application
- **Common UI patterns**: Cards, panels, buttons, and other repeated UI elements
- **Brand-specific styling**: Ensuring consistent application of brand colors and spacing
- **Responsive patterns**: Creating consistent responsive behaviors
