---
title: Modifiers
description: Define custom value transformers with the modifiers config — pattern + transform function for shorthand syntaxes.
topic: Modifiers
category: utility
schemaType: TechArticle
keywords: [modifiers, shorthand, transform, custom values, defineConfig]
intent: Define custom value transformers — a regex pattern plus a transform function — to add shorthand syntax to your styles.
proficiencyLevel: Expert
priority: 0.6
---

# Modifiers

Modifiers are custom value transformers. Each one is a `{ pattern, transform }` pair on [`defineConfig`](/docs/api/config/#modifiers): when Salty CSS sees a style value matching `pattern`, it runs `transform` and uses the returned value (and optional extra CSS) in place of the original.

Think of them as user-defined shorthand: write `padding: "space:3"` and have Salty rewrite it to `padding: "12px"` at build time, with no runtime cost.

## When to reach for a modifier vs. an alternative

| You want…                                              | Use…                                                                 |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| A reusable design token (one value, many call sites)   | [`defineVariables`](/docs/variables/) and `{token.path}` references. |
| A reusable bundle of CSS properties                    | [`defineTemplates`](/docs/templates/).                               |
| A new value syntax that rewrites into one or more CSS properties | Modifiers (this page).                                     |

A token gives you `'{spacing.medium}'` → `'16px'`. A modifier gives you `'space:3'` → `'12px'`, plus the freedom to inject extra CSS alongside it.

## Defining a modifier

Modifiers live on `defineConfig`:

```ts
// /salty.config.ts
import { defineConfig } from "@salty-css/core/config";

export const config = defineConfig({
  modifiers: {
    // The name is for your reference; what matters is the pattern.
    spaceShorthand: {
      pattern: /^space:(\d+)$/,
      transform: (match) => {
        const n = Number(match.replace("space:", ""));
        return { value: `${n * 4}px` };
      },
    },
  },
});
```

The `transform` function receives the matched string and returns `{ value, css? }`:

- `value` — the replacement value used in place of the original. Required.
- `css` — an optional object of additional CSS properties emitted on the same selector as the property being transformed. Useful when a shorthand needs to set more than one property.

## Example: shorthand with side effects

```ts
defineConfig({
  modifiers: {
    elevation: {
      pattern: /^elevation:(\d+)$/,
      transform: (match) => {
        const level = Number(match.replace("elevation:", ""));
        return {
          value: `${level * 2}px ${level * 4}px ${level * 6}px rgba(0,0,0,0.12)`,
          css: { transform: "translateZ(0)" }, // emitted alongside box-shadow
        };
      },
    },
  },
});
```

At the call site:

```ts
styled("div", {
  base: {
    padding: "space:3",         // → 12px
    boxShadow: "elevation:2",   // → 4px 8px 12px rgba(0,0,0,0.12)
                                //   plus { transform: "translateZ(0)" }
  },
});
```

## Pattern matching

The `pattern` is a regular CSS-value regex. Salty CSS runs it against the **string value** assigned to a property (numeric values aren't matched). Use anchors (`^` / `$`) to avoid accidental matches and keep the pattern as specific as you can — a too-broad pattern will catch values you didn't intend to transform.

The argument to `transform` is the full matched string, not the capture groups. Re-parse the matched string inside `transform` to extract any numeric or named pieces.

## A few practical recipes

### `px → rem` for design-system consistency

```ts
modifiers: {
  pxToRem: {
    pattern: /^\d+px$/,
    transform: (match) => {
      const px = Number(match.replace("px", ""));
      return { value: `${px / 16}rem` };
    },
  },
},
```

Then `padding: "16px"` ends up as `1rem` in the generated CSS. Or use [`defaultUnit: 'rem'`](/docs/api/config/#defaultunit) and write `padding: 16` — same result, no modifier needed.

### Token-shorthand

```ts
modifiers: {
  brandColor: {
    pattern: /^brand:(\w+)$/,
    transform: (match) => {
      const tone = match.replace("brand:", "");
      return { value: `var(--colors-brand-${tone})` };
    },
  },
},
```

Lets you write `background: "brand:main"` instead of `background: "{colors.brand.main}"`. Comes down to taste — tokens are usually clearer.

## See also

- [`defineConfig` reference](/docs/api/config/#modifiers) — where modifiers are registered.
- [Variables](/docs/variables/) — for value reuse without shorthand.
- [Templates](/docs/templates/) — for property-bundle reuse.

Full snippet:

{{snippet:modifier-custom}}
