---
title: Quick Start
description: Bootstrap a Salty CSS project in one command and ship your first styled component.
topic: Quick Start
category: tutorial
schemaType: TechArticle
keywords: [quick start, getting started, install, cli, first component]
intent: Bootstrap a Salty CSS project with the CLI and create your first styled component in minutes.
proficiencyLevel: Beginner
priority: 0.9
---

# Get started

Fastest way to get started with any framework is

```bash
npx salty-css init
```

## Create components

### Styled function

Styled function is the main way to use Salty CSS in {{frameworkRuntime}}. Styled function creates a {{componentNoun}} that then can be used {{usageContext}}. All styled functions must be created in `.css.ts` or `.css.tsx` files.

→ [Read more about styled function](/docs/api/styled/)

```ts
// /components/my-component.css.ts
import { styled } from "{{styledImport}}";

export const Component = styled("div", {
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

## Use the CLI

- Create component: `npx salty-css generate [filePath]`
- Build: `npx salty-css build [directory]`
- Update Salty CSS packages: `npx salty-css up`

## Good to know

1. All Salty CSS functions (`styled`, `classNames`, `keyframes`, etc.) must be created in `*.css.ts` or `*.css.tsx` files. This is to ensure best build performance.
2. Salty CSS components created with styled function can extend non Salty CSS components (`export const CustomLink = styled(ThirdPartyLink, { ... });`) but those components must take in `className` prop for styles to apply. See [Overrides](/docs/overrides/) for framework-specific examples.
3. Among common types like `string` and `number`, CSS-in-JS properties in Salty CSS do support `functions` and `promises` as values (`styled('span', { base: { color: async () => 'red' } });`) but running asynchronous tasks or importing heavy 3rd party libraries into `*.css.ts` or `*.css.tsx` files can cause longer build times.

## Get support

To get help with problems, [Join Salty CSS Discord server](https://discord.gg/R6kr4KxMhP).
