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
import { styled } from "@salty-css/react/styled";

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

## Best Practices

1. **Organize by purpose**: Group related templates together in a logical structure.
2. **Use descriptive names**: Choose template names that clearly describe their function.
3. **Leverage variables**: Reference CSS variables within templates to ensure consistency with your design system.
4. **Consider type safety**: Use Static templates if you know possible outcomes or at least add TypeScript type definitions for function parameters to improve developer experience.
5. **Avoid over-nesting**: Keep template hierarchies reasonably flat for better maintainability.

## When to Use Templates

Templates are particularly useful for:

- **Typography systems**: Defining consistent text styles across your application
- **Common UI patterns**: Cards, panels, buttons, and other repeated UI elements
- **Brand-specific styling**: Ensuring consistent application of brand colors and spacing
- **Responsive patterns**: Creating consistent responsive behaviors
