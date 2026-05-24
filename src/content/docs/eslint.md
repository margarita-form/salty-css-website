---
title: ESLint
description: Catch missing exports and misplaced variants in Salty CSS files with the official ESLint plugin and shareable config.
preHeadline:
  react: ESLint Plugin That Catches Missing Exports in .css.ts Files Across Your React Component Tree
  next: ESLint Plugin for Next.js Codebases — Catch Misplaced Variants Before They Reach the App Router
  astro: ESLint Rules That Spot Variants Outside the Right Block in .css.ts Files for Astro Projects
visibleHeading:
  react: ESLint Plugin for React Projects
  next: ESLint Plugin for Next.js Codebases
  astro: ESLint Plugin for Astro Projects
topic: ESLint
category: tutorial
schemaType: TechArticle
keywords: [eslint, lint, plugin, config, must-be-exported, no-variants-in-base, autofix]
intent: Install the Salty CSS ESLint plugin and shareable config so the linter catches missing exports and misplaced variants in `.css.ts` files.
proficiencyLevel: Beginner
priority: 0.7
---

Salty CSS ships a small ESLint plugin and a matching shareable config. Two rules; both are autofixable; both only run on Salty files (`.css.ts`, `.css.tsx`, `.salty.ts`, `.styles.ts`, `.styled.ts`).

## Why

The build-time compiler has two blind spots a linter can fix:

1. **It only picks up `export`s.** A `styled(...)` (or `className`, `keyframes`, any `defineX(...)`) call that isn't exported is invisible dead code — you'll wonder why your component has no styles. The plugin catches it.
2. **`variants` must be a sibling of `base`, not nested inside it.** Nesting compiles to something — just not what you wanted. The plugin catches that too.

## Install

```bash
npm i -D @salty-css/eslint-plugin-core @salty-css/eslint-config-core
```

## Set it up

### Flat config (ESLint 9+, recommended)

```js
// eslint.config.mjs
import saltyConfig from "@salty-css/eslint-config-core/flat";

export default [
  saltyConfig,
  // ...your other configs
];
```

The flat config imports the plugin internally — you don't need to register `@salty-css/core` yourself.

### Legacy config (ESLint 8 and older)

```js
// .eslintrc.js
module.exports = {
  extends: ["@salty-css/eslint-config-core"],
};
```

The legacy config declares `plugins: ['@salty-css/core']`. ESLint resolves that to `@salty-css/eslint-plugin-core`, which is why you install both packages.

Both shapes enable both rules at `'error'` severity for `.ts` and `.tsx` files. The rules themselves check the filename before running, so non-Salty TypeScript files aren't affected.

## Rules

### `@salty-css/core/must-be-exported`

- **Default severity:** `error`
- **Autofixable:** yes (`eslint --fix` inserts `export` or `export default`)
- **Scope:** `.css.ts`, `.css.tsx`, `.salty.ts`, `.styles.ts`, `.styled.ts`

Flags any `styled`, `className`, `keyframes`, or `defineX*` call that isn't exported.

✗ Bad

```ts
// components/button.css.ts
import { styled } from "@salty-css/react/styled";

const Button = styled("button", { base: { padding: "1rem" } }); // ← unexported, compiler ignores it
```

✓ Good

```ts
// components/button.css.ts
import { styled } from "@salty-css/react/styled";

export const Button = styled("button", { base: { padding: "1rem" } });
```

The same applies to top-level `defineGlobalStyles`, `defineVariables`, `defineTemplates`, `defineFont`, `defineImport`, `defineMediaQuery`, etc. If you don't want a name, the autofix inserts `export default`.

### `@salty-css/core/no-variants-in-base`

- **Default severity:** `error`
- **Autofixable:** yes (the fix lifts `variants` out of `base`)
- **Scope:** same as above

Flags `variants` declared inside `base`. The compiler expects `variants` as a sibling.

✗ Bad

```ts
export const Card = styled("div", {
  base: {
    padding: "1rem",
    variants: {
      // ← wrong: nested inside base
      tone: { brand: { background: "{colors.brand.main}" } },
    },
  },
});
```

✓ Good

```ts
export const Card = styled("div", {
  base: {
    padding: "1rem",
  },
  variants: {
    tone: { brand: { background: "{colors.brand.main}" } },
  },
});
```

## Overriding severity

Drop a rule to a warning, or turn it off entirely, the same way you'd override any ESLint rule:

```js
// eslint.config.mjs (flat)
import saltyConfig from "@salty-css/eslint-config-core/flat";

export default [
  saltyConfig,
  {
    rules: {
      "@salty-css/core/no-variants-in-base": "warn",
      "@salty-css/core/must-be-exported": "off",
    },
  },
];
```

## Troubleshooting

If the rules don't fire on a file you expect them to, check the **filename suffix** — the plugin only inspects files matching the Salty extensions. Renaming `my-component.ts` to `my-component.css.ts` makes both the compiler and the linter pick it up. See [Troubleshooting](/docs/troubleshooting/) for the broader file-extension story.
