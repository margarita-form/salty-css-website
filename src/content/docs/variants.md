# Variant Styles

Variants in Salty CSS allow you to create components with conditional styling based on props. This is a powerful way to build versatile UI components.

## Basic Variant Usage

Variants are defined within the `variants` object of a styled component:

```ts
// /components/button/button.css.ts
import { styled } from "@salty-css/react/styled";

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

## Using Variants in React

```tsx
import { Button } from "./button/button.css";

export const MyComponent = () => {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="solid">Solid Button</Button>
      <Button variant="outlined" size="large">
        Large Outlined Button
      </Button>
    </div>
  );
};
```

## Compound Variants

Compound variants let you apply styles when multiple variant conditions are met simultaneously:

```ts
import { styled } from "@salty-css/react/styled";

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
import { styled } from "@salty-css/react/styled";

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
