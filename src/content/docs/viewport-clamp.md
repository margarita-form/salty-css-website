# Viewport Clamp

The Viewport Clamp utility creates responsive sizing values that scale smoothly with the viewport size, producing more fluid responsive designs without requiring multiple breakpoints.

## Creating Viewport Clamps

You can define viewport clamps with different reference screen sizes using the `defineViewportClamp` function:

```ts
// /styles/helpers.css.ts
import { defineViewportClamp } from "@salty-css/core/helpers";

// Clamp function optimized for desktop/HD-sized screens (1920px reference)
export const fhdClamp = defineViewportClamp({
  screenSize: 1920,
  minMultiplier: 1,
  maxMultiplier: 1.25,
});

// Clamp function optimized for mobile-sized screens (640px reference)
export const mobileClamp = defineViewportClamp({
  screenSize: 640,
  minMultiplier: 0.75,
  maxMultiplier: 1,
});

// Clamp function for mobile portrait orientation (uses vertical axis)
export const mobilePortraitClamp = defineViewportClamp({
  screenSize: 375,
  minMultiplier: 0.75,
  maxMultiplier: 1,
  axis: "vertical",
});
```

## Using Viewport Clamps in Components

Once defined, you can use clamp functions in your component styles to create fluid typography and spacing:

```ts
import { styled } from "@salty-css/react/styled";
import { fhdClamp, mobileClamp } from "../styles/helpers.css";

export const ResponsiveText = styled("div", {
  base: {
    // Font size will scale fluidly based on viewport width relative to 1920px
    fontSize: fhdClamp(96), // At 1920px wide viewport, this will be 96px

    // Clamp can be applied to any CSS property that accepts size values
    padding: fhdClamp(32),
    borderRadius: fhdClamp(8),

    // Combine with media queries for more complex responsive designs
    "@largeMobileDown": {
      // For mobile, use the mobile-optimized clamp
      fontSize: mobileClamp(48), // At 640px wide viewport, this will be 48px
    },
  },
});
```

## How Viewport Clamp Works

The viewport clamp function creates a CSS `clamp()` function that:

1. Sets a minimum size based on the `minMultiplier`
2. Applies a fluid formula that scales linearly with the viewport width
3. Sets a maximum size based on the `maxMultiplier`

For example, a call to `fhdClamp(96)` with `minMultiplier: 1` and `maxMultiplier: 1.25` would ensure that:

- The value will be at least 96px (or the specified value)
- The value can grow up to 120px (96px × 1.25) on larger screens
- The value scales proportionally with the screen width between these bounds

## Configuration Options

When creating a viewport clamp with `defineViewportClamp`, you can provide several options:

| Option          | Description                                                     | Default      |
| --------------- | --------------------------------------------------------------- | ------------ |
| `screenSize`    | Reference screen width/height in pixels                         | Required     |
| `minMultiplier` | Multiplier for minimum output size (e.g., 0.75 = 75% of value)  | Optional     |
| `maxMultiplier` | Multiplier for maximum output size (e.g., 1.25 = 125% of value) | Optional     |
| `axis`          | Axis to use for responsive scaling ('horizontal' or 'vertical') | 'horizontal' |

## Best Practices

1. **Define different clamps for different device targets**: As shown in the example, create separate clamp functions for HD screens, mobile devices, etc.
2. **Consider breakpoints and orientation**: For certain layouts, you might want to use clamps that are same as your breakpoints are or even use the vertical axis (like `mobilePortraitClamp` does).
3. **Set appropriate multipliers**: Use `minMultiplier` and `maxMultiplier` to control how much the values can shrink or grow.
4. **Be consistent**: Use the same clamp functions throughout your design for consistent scaling behavior.
5. **Apply to more than just font sizes**: Use viewport clamps for margins, padding, positioning, and other size values.

## Examples

### Real-world Usage From This Website

In the website's styles, viewport clamps are used for typography scales:

- https://github.com/margarita-form/salty-css-website/blob/main/src/styles/helpers.css.ts
- https://github.com/margarita-form/salty-css-website/blob/main/src/styles/variables.css.ts

### Responsive Spacing

```ts
import { styled } from "@salty-css/react/styled";
import { fhdClamp, mobileClamp } from "../styles/helpers.css";

export const Container = styled("div", {
  base: {
    padding: fhdClamp(24),
    gap: fhdClamp(16),
    marginBottom: fhdClamp(40),

    "@largeMobileDown": {
      padding: mobileClamp(16),
      gap: mobileClamp(12),
      marginBottom: mobileClamp(24),
    },
  },
});
```

### Creating Responsive Design Tokens

Viewport clamps are particularly powerful when used to create responsive design tokens that can be reused throughout your application:

```ts
// /styles/variables.css.ts
import { defineVariables } from "@salty-css/core/factories";
import { fhdClamp, mobileClamp } from "./helpers.css";

export default defineVariables({
  // Token with breakpoint-specific values
  responsive: {
    base: {
      spacing: {
        small: fhdClamp(8),
        medium: fhdClamp(20),
        large: fhdClamp(36),
        pageMargin: fhdClamp(120),
        blockMargin: fhdClamp(160),
      },
      fontSize: {
        headline: {
          small: fhdClamp(24),
          regular: fhdClamp(36),
          large: fhdClamp(64),
        },
        body: {
          small: fhdClamp(14),
          regular: fhdClamp(16),
          large: fhdClamp(24),
        },
      },
    },
    "@largeMobileDown": {
      spacing: {
        pageMargin: mobileClamp(30),
        blockMargin: mobileClamp(80),
      },
      fontSize: {
        headline: {
          small: mobileClamp(24),
          regular: mobileClamp(32),
          large: mobileClamp(42),
        },
      },
    },
  },
});
```

Then use these tokens directly in your component styles:

```ts
import { styled } from "@salty-css/react/styled";

export const Card = styled("header", {
  base: {
    // Tokens are referenced using curly braces
    padding: "{spacing.large}",
    fontSize: "{body.regular}",
    background: "#fff",
  },
});
```

This approach creates a consistent design system where all spacing, sizing, and other dimensions scale proportionally across different viewport sizes. The responsive tokens automatically adapt to different screen sizes based on the media query breakpoints you define.
