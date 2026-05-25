---
title: defineConfig API
description: Full reference for defineConfig — variables, global, reset, templates, modifiers, importStrategy, externalModules, strict, and defaultUnit.
preHeadline:
  react: defineConfig for React Apps — Wire Variables, Templates, Modifiers, and Resets in salty.config.ts
  next: defineConfig for Next.js — Set Up Tokens, Modifiers, and Strict Mode Once for Server and Client
  astro: defineConfig in Astro Integration — Tokens, Modifiers, and Strict Mode for Compile-Time CSS
visibleHeading:
  react: defineConfig for React Apps
  next: defineConfig for the Next.js App Router
  astro: defineConfig for Astro Integration
topic: defineConfig
category: api-reference
schemaType: APIReference
keywords: [defineConfig, salty.config, configuration, reset, modifiers, importStrategy, strict]
intent: Reference for defineConfig — every option that lives in salty.config.ts.
proficiencyLevel: Expert
priority: 0.7
apiReferences: [api/define-factories, api/styled, api/classname]
---

`defineConfig` is the entry point for your project's Salty CSS configuration. It accepts a single config object and returns it unchanged — its only job is to give you TypeScript inference for every field. The file is conventionally named `salty.config.ts` and lives next to your bundler config (`next.config.ts`, `vite.config.ts`, `astro.config.mjs`).

For per-feature deep dives see the linked pages; this page is the single-stop reference.

## Import

```ts
import { defineConfig } from "{{configImport}}";
```

The shape is the same across all framework subpaths — pick whichever matches your runtime.

## Minimal config

A blank config is valid; Salty CSS will use defaults for everything:

```ts
// /salty.config.ts
import { defineConfig } from "{{configImport}}";

export const config = defineConfig({});
```

## Full reference

```ts
defineConfig({
  variables?: SaltyVariables,
  global?: GlobalStyles,
  reset?: 'default' | 'none' | GlobalStyles,
  templates?: CssTemplates,
  modifiers?: CssModifiers,
  importStrategy?: 'root' | 'component',
  externalModules?: string[],
  strict?: boolean | 'warn',
  defaultUnit?: 'px' | 'rem' | 'em' | 'vh' | 'vw' | string,
})
```

### `variables`

Design tokens applied to `:root`. Identical to passing the same object to [`defineVariables`](/docs/variables/) in a `.css.ts` file — use whichever fits your project layout. Tokens defined here become reachable from every style with `{token.path}` syntax.

```ts
defineConfig({
  variables: {
    colors: { brand: { main: "#0070f3" } },
    spacing: { small: "8px", large: "32px" },
  },
});
```

For responsive and conditional tokens (`responsive: { ... }`, `conditional: { ... }`), see [Variables](/docs/variables/).

### `global`

Styles applied to bare HTML selectors (`html`, `body`, `a`, etc.). Same shape as [`defineGlobalStyles`](/docs/basics/#global-styles).

```ts
defineConfig({
  global: {
    html: { fontFamily: "var(--font-family-main, sans-serif)" },
    body: { margin: 0 },
    a: { color: "currentcolor" },
  },
});
```

### `reset`

Controls the built-in CSS reset.

| Value          | Behaviour                                                        |
| -------------- | ---------------------------------------------------------------- |
| `'default'`    | Salty CSS's built-in reset is applied. (Default if omitted.)     |
| `'none'`       | No reset — useful when you import a third-party reset yourself.  |
| `GlobalStyles` | A custom reset object — same shape as `global`.                  |

```ts
defineConfig({ reset: "none" });
```

```ts
defineConfig({
  reset: {
    "*": { boxSizing: "border-box" },
    "body, html": { margin: 0, padding: 0 },
  },
});
```

### `templates`

Reusable style bundles. Identical to passing the same object to [`defineTemplates`](/docs/templates/).

```ts
defineConfig({
  templates: {
    textStyle: {
      body: { fontSize: "16px", lineHeight: "1.5" },
      heading: { fontSize: "32px", fontWeight: 700 },
    },
  },
});
```

### `modifiers`

Custom value transformers — pattern + transform function. Use them when you want a shorthand syntax that Salty rewrites into real CSS at build time (e.g. a `px → rem` modifier or a token-shorthand). Full guide: [Modifiers](/docs/modifiers/).

```ts
defineConfig({
  modifiers: {
    pxToRem: {
      pattern: /^(\d+)px$/,
      transform: (match) => ({ value: `${Number(match.match(/\d+/))/16}rem` }),
    },
  },
});
```

### `importStrategy`

Where the generated CSS is imported from at runtime.

| Value         | Behaviour                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `'root'`      | One stylesheet imported once at the app root. Smaller per-route HTML, larger initial CSS. (Default.)                                       |
| `'component'` | A per-component stylesheet is imported alongside the module. Better for code-splitting and route-level CSS, slightly more `<link>` tags.   |

```ts
defineConfig({ importStrategy: "component" });
```

### `externalModules`

Package names that should **not** be bundled when Salty CSS imports your `.css.ts` files at build time. Useful when a third-party module pulls in something that doesn't run in Node (browser globals, native modules) but you still want it imported in the same file.

```ts
defineConfig({
  externalModules: ["react", "react-dom", "some-browser-only-lib"],
});
```

`react` and `react-dom` are already marked external by Salty's own internals; list them explicitly only if you've overridden them.

### `strict`

How the parser reacts to suspicious input — typos in token references, malformed selectors, unknown CSS properties, etc.

| Value         | Behaviour                                                                       |
| ------------- | ------------------------------------------------------------------------------- |
| `true`        | Throw on issues. Recommended for new projects — catches bugs at build time.     |
| `'warn'`      | Log a warning and continue. Useful when migrating an existing codebase.         |
| `false` / omitted | Silent. Matches pre-strict behaviour.                                       |

```ts
defineConfig({ strict: true });
```

### `defaultUnit`

Default unit for numeric values on px-style properties (width, padding, font-size, etc.). When you write `padding: 16`, Salty CSS appends the unit you set here.

Accepts: `'px'` (default), `'rem'`, `'em'`, `'vh'`, `'vw'`, `'vmin'`, `'vmax'`, `'cm'`, `'mm'`, `'in'`, `'pt'`, `'pc'`, `'ch'`, `'ex'`, `'fr'`, `'percent'`, `` `viewport-clamp:${number}` ``, or any custom string.

```ts
defineConfig({ defaultUnit: "rem" });
```

The `viewport-clamp:<size>` form turns bare numbers into `clamp()` expressions against the given reference width — handy for fluid type without per-property `viewportClamp()` calls.

## Putting it all together

A realistic config with most options set:

{{snippet:salty-config-full}}

## Where else can these options live?

Several keys are intentionally also exposed as standalone factories — pass them via the config object, declare them in a `.css.ts` file, or both. Salty CSS merges:

| `defineConfig` key | Standalone factory                                                  |
| ------------------ | ------------------------------------------------------------------- |
| `variables`        | [`defineVariables`](/docs/variables/)                               |
| `global`           | [`defineGlobalStyles`](/docs/basics/#global-styles)                 |
| `templates`        | [`defineTemplates`](/docs/templates/)                               |

Media queries live exclusively in `*.css.ts` files via [`defineMediaQuery`](/docs/media-queries/) — there's no `mediaQueries` key on the config.

## See also

- [Variables](/docs/variables/) · [Theming](/docs/theming/) · [Templates](/docs/templates/) · [Modifiers](/docs/modifiers/)
- [`define*` factories index](/docs/api/define-factories/) — one-page index of every factory.
- [CLI](/docs/cli/) — `npx salty-css init` scaffolds the config for you.
