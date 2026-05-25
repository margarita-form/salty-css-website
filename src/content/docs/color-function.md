---
title: Color Function
description: Chain color transforms — lighten, darken, alpha, mix — with the Salty CSS color helper.
preHeadline:
  react: Chain Lighten, Darken, Alpha, and Mix on a Single Color Helper — No Runtime Cost in React
  next: Color Transforms Compiled Ahead of Render — Lighten, Darken, Mix, and Alpha for Server Components
  astro: Color Helper for .astro and Island Components — Lighten, Darken, Mix Compiled at Build Step
visibleHeading:
  react: Color Helper for React Styles
  next: Color Helper Across Server and Client Components
  astro: Color Helper for .astro Components
topic: Color Function
category: utility
schemaType: TechArticle
keywords: [color, lighten, darken, alpha, color manipulation]
intent: Manipulate colors with the chainable color helper — lighten, darken, alpha, mix, and more.
proficiencyLevel: Intermediate
priority: 0.6
apiReferences: [api/styled, api/classname]
externalLinks:
  MDN · <color>: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
  MDN · color-mix(): https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
  Color library by Qix: https://github.com/Qix-/color
---

The Color utility provides a powerful way to manipulate colors in your Salty CSS styles. It allows you to transform, adjust, and derive new colors from existing ones without having to calculate color values manually.

## Implementation Note

The Salty CSS color function is built on top of the [color](https://github.com/Qix-/color) library by Qix, providing a robust and well-tested foundation for color manipulation.

### When transformations happen

`color()` runs at **build time**. The transformed value (e.g. `rgba(0, 0, 0, 0.5)`) lands in the generated CSS as a static string — there is no runtime cost and no JS bundle bloat at render time. The trade-off: you can only transform values that are knowable at build time, which includes raw colors and **static** token references like `{colors.brand.primary}`. Values that change at runtime (responsive or conditional tokens, plus anything computed via `{props.X}`) are passed through unchanged because there's no way to derive a shade from a value that doesn't exist yet.

For runtime-derived shades on themed tokens, declare the shade variants directly under [`conditional` variables](/docs/theming/) instead.

### Color spaces and inputs

`color()` parses sRGB by default — the same color space the browser uses for `#rrggbb`, `rgb()`, `hsl()`, and named CSS colors. Transformations are computed in HSL space internally, which is why `.lighten()` / `.darken()` / `.saturate()` operate on perceptual axes rather than raw channels. The output is always returned as a CSS-compatible string in the format you asked for (`.hex()`, `.rgb()`, etc.) — default is `rgb()` / `rgba()`.

Wide-gamut color (P3, oklch, etc.) is **not** part of the input parser today; if you need it, ship the wide-gamut value as a raw string and gate it behind `@supports (color(display-p3 1 1 1))`.

### Errors and invalid input

If `color()` can't parse the input (e.g. you reference a token path that doesn't exist, or pass a malformed string), the call throws at build time. With `defineConfig({ strict: 'warn' })` you'll get a warning instead and the original value passes through. Either way, the failure surfaces in your terminal — it doesn't reach the browser as silent fallback.

## Basic Usage

The `color` function provides a chainable API for color manipulation:

```ts
// /components/my-component.css.ts
import { styled } from "{{styledImport}}";
import { color } from "@salty-css/core/helpers";

export const Card = styled("div", {
  base: {
    // Create semi-transparent black background
    backgroundColor: color("#000000").alpha(0.5),

    // Create a lighter version of a color
    borderColor: color("#0070f3").lighten(0.2),

    // Create a darker text color
    color: color("#ffffff").darken(0.1),
  },
});
```

## Color Sources

The `color` function accepts various input formats:

```ts
// Hex color strings
color("#ff0000");
color("#f00");

// RGB/RGBA strings
color("rgb(255, 0, 0)");
color("rgba(255, 0, 0, 0.5)");

// HSL/HSLA strings — useful when you want predictable lighten/darken behaviour.
color("hsl(0, 100%, 50%)");
color("hsla(0, 100%, 50%, 0.5)");
color("hsl(210, 60%, 45%)").darken(0.1); // → hsl(210, 60%, ~40%)

// Named CSS colors
color("red");
color("steelblue");

// Static CSS variables (responsive or conditional variables are not supported)
color("{colors.brand.primary}");
color("{theme.accentColor}");
```

## Available Methods

The color utility offers numerous chainable methods:

### Transparency

```ts
// Set specific alpha/opacity value (0-1)
color("#ff0000").alpha(0.5); // 50% opacity red

// Fade by a relative amount
color("#ff0000").fade(0.2); // Reduce opacity by 20%

// Make fully opaque
color("rgba(255, 0, 0, 0.5)").opaque(); // Remove transparency
```

### Lightness Adjustments

```ts
// Lighten by a relative amount (0-1)
color("#ff0000").lighten(0.2); // 20% lighter red

// Darken by a relative amount (0-1)
color("#ff0000").darken(0.2); // 20% darker red

// Set absolute lightness (0-1)
color("#ff0000").lightness(0.8); // Set to 80% lightness
```

### Saturation Adjustments

```ts
// Increase saturation by a relative amount (0-1)
color("#ff0000").saturate(0.2); // 20% more saturated

// Decrease saturation by a relative amount (0-1)
color("#ff0000").desaturate(0.2); // 20% less saturated

// Remove all saturation (create grayscale)
color("#ff0000").grayscale(); // Convert to grayscale
```

### Hue Adjustments

```ts
// Rotate hue by a specific amount in degrees
color("#ff0000").rotate(90); // Rotate hue by 90 degrees

// Set absolute hue (0-360)
color("#ff0000").hue(180); // Set hue to 180 degrees
```

### Color Blending

```ts
// Mix with another color (second parameter is mix percentage, 0-1)
color("#ff0000").mix("#0000ff", 0.5); // 50% mix of red and blue

// Get complementary color (opposite on color wheel)
color("#ff0000").negate(); // Complementary color
```

## Format Conversion

You can output colors in different formats:

```ts
// Get color as hex
color("rgb(255, 0, 0)").hex(); // Returns "#ff0000"

// Get color as RGB string
color("#ff0000").rgb(); // Returns "rgb(255, 0, 0)"

// Get color as RGBA string
color("#ff0000").alpha(0.5).rgba(); // Returns "rgba(255, 0, 0, 0.5)"

// Get color as HSL string
color("#ff0000").hsl(); // Returns "hsl(0, 100%, 50%)"

// Get color as HSLA string
color("#ff0000").alpha(0.5).hsla(); // Returns "hsla(0, 100%, 50%, 0.5)"
```

## Advanced Examples

### Creating a Color Palette

```ts
import { styled } from "{{styledImport}}";
import { color } from "@salty-css/core/helpers";

// Define a single brand color and derive a palette
const brandColor = "#0070f3";

export const ColorPalette = styled("div", {
  base: {
    // Main brand color
    "--color-brand-main": brandColor,

    // Lighter variants
    "--color-brand-light": color(brandColor).lighten(0.2),
    "--color-brand-lighter": color(brandColor).lighten(0.4),

    // Darker variants
    "--color-brand-dark": color(brandColor).darken(0.2),
    "--color-brand-darker": color(brandColor).darken(0.4),

    // Desaturated variants
    "--color-brand-muted": color(brandColor).desaturate(0.3),

    // Transparent variants
    "--color-brand-transparent": color(brandColor).alpha(0.2),
  },
});
```

### Interactive Element States

```ts
import { styled } from "{{styledImport}}";
import { color } from "@salty-css/core/helpers";

export const Button = styled("button", {
  base: {
    backgroundColor: "{colors.brand.primary}",
    color: "#ffffff",
    transition: "background-color 0.2s ease",

    "&:hover": {
      // Lighten on hover
      backgroundColor: color("{colors.brand.primary}").lighten(0.1),
    },

    "&:active": {
      // Darken on press
      backgroundColor: color("{colors.brand.primary}").darken(0.1),
    },

    "&:disabled": {
      // Desaturate and reduce opacity when disabled
      backgroundColor: color("{colors.brand.primary}")
        .desaturate(0.5)
        .alpha(0.6),
    },
  },
});
```
