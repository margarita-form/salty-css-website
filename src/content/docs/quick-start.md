# Get started

Fastest way to get started with any framework is

```bash
npx salty-css init
```

# API

## Component styling

- [styled](#styled-function) (react only) - create React components that can be used anywhere easily
- [className](#class-name-function) (framework agnostic) - create a CSS class string that can be applied to any element

## Global styling

- [defineGlobalStyles](#global-styles) - set global styles like `html` and `body`
- [defineVariables](#variables) - create CSS variables (tokens) that can be used in any styling function
- [defineMediaQuery](#media-queries) - create CSS media queries and use them in any styling function
- [defineTemplates](#templates) - create reusable templates that can be applied when same styles are used over and over again
- [keyframes](#keyframes-animations) - create CSS keyframes animation that can be used and imported in any styling function

## Styling helpers & utility

- [defineViewportClamp](#viewport-clamp) - create CSS clamp functions that are based on user's viewport and can calculate relative values easily
- [color](#color-function) - transform any valid color code or variable to be darker, lighter etc. easily (uses [color library by Qix-](https://github.com/Qix-/color))

# Useful commands

- Create component: `npx salty-css generate [filePath]`
- Build: `npx salty-css build [directory]`
- Update Salty CSS packages: `npx salty-css up`

# Good to know

1. All Salty CSS functions (`styled`, `classNames`, `keyframes`, etc.) must be created in `*.css.ts` or `*.css.tsx` files. This is to ensure best build performance.
2. Salty CSS components created with styled function can extend non Salty CSS components (`export const CustomLink = styled(NextJSLink, { ... });`) but those components must take in `className` prop for styles to apply.
3. Among common types like `string` and `number`, CSS-in-JS properties in Salty CSS do support `functions` and `promises` as values (`styled('span', { base: { color: async () => 'red' } });`) but running asynchronous tasks or importing heavy 3rd party libraries into `*.css.ts` or `*.css.tsx` files can cause longer build times.

# Get support

To get help with problems, [Join Salty CSS Discord server](https://discord.gg/R6kr4KxMhP).
