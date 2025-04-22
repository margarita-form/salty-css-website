# Frequently Asked Questions

## General Questions

### What is Salty CSS?

Salty CSS is a CSS-in-JS library that provides excellent developer experience with features like build-time compilation, type safety, and token management, all while maintaining great runtime performance.

### How does Salty CSS compare to other CSS-in-JS solutions?

Salty CSS focuses on build-time compilation to offer better runtime performance than many runtime CSS-in-JS libraries. It's designed to work well with modern frameworks like React, Next.js, and Vite, with full support for server components.

### Which frameworks are supported?

Salty CSS works with:

- Next.js (App and Pages Router with RSC support)
- React + Vite
- React + Webpack
- Astro

## Technical Questions

### Why are my styles not appearing?

Ensure that:

1. Your styled components are defined in files with the correct extensions (`.css.ts` or `.css.tsx`)
2. You've imported global styles correctly
3. The build step has run (`npx salty-css build` or through your framework's plugin)

### How do I debug Salty CSS?

Look at the generated files in the `saltygen` directory. These files contain the compiled CSS and JavaScript, which can help identify issues.

### Can I use Salty CSS with TypeScript?

Yes! Salty CSS has been built with TypeScript support in mind, providing type safety for props, variants, and style objects.

### How do I use fonts with Salty CSS?

You can define font families in your variables file and then reference them in your styles:

```ts
// variables.css.ts
import { defineVariables } from "@salty-css/core/factories";

export default defineVariables({
  fontFamily: {
    heading: "'Roboto', sans-serif",
    body: "'Open Sans', sans-serif",
  },
});

// component.css.ts
import { styled } from "@salty-css/react/styled";

export const Heading = styled("h1", {
  base: {
    fontFamily: "{fontFamily.heading}",
  },
});
```

## Working with Components

### Can I extend non-Salty components?

Yes, but the component must accept a `className` prop for styles to be applied correctly.

### How do I create responsive styles?

Use media queries defined with `defineMediaQuery` or responsive variables:

```ts
// media.css.ts
import { defineMediaQuery } from "@salty-css/react/config";

export const mobile = defineMediaQuery((media) => media.maxWidth(640));

// component.css.ts
import { styled } from "@salty-css/react/styled";

export const Box = styled("div", {
  base: {
    padding: "2rem",
    "@mobile": {
      padding: "1rem",
    },
  },
});
```

### How do I create dynamic styles based on props?

Use variants:

```ts
export const Button = styled("button", {
  variants: {
    size: {
      small: { fontSize: "12px" },
      large: { fontSize: "18px" },
    },
  },
});

// Usage
<Button size="small">Small Button</Button>
```

## Performance Questions

### Does Salty CSS affect runtime performance?

Salty CSS compiles during build time, resulting in minimal runtime overhead. It generates optimized CSS and avoids runtime style calculations.

### How big is the runtime footprint?

The runtime bundle is very small as most of the heavy lifting happens during build time.

## Getting Help

If you have questions not covered here, you can:

- Join our [Discord server](https://discord.gg/R6kr4KxMhP) for community support
- Check the [GitHub repository](https://github.com/margarita-form/salty-css) for issues and updates
- Visit the [Salty CSS website](https://salty-css.dev/) for more documentation
