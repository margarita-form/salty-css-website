---
title: Classnames
description: Generate reusable Salty CSS class strings with the className function for any element.
topic: Classnames
category: guide
schemaType: TechArticle
keywords: [classname, class names, classes, clsx, composition]
intent: Use the className function to generate reusable CSS classes without wrapping elements in styled components.
proficiencyLevel: Beginner
priority: 0.7
---

# Class Name Function

The `className` function creates a reusable CSS class without rendering a {{componentNoun}}. It's the right tool when you want Salty CSS's variant system, nesting, tokens, and media queries, but you'd rather attach the class to your own markup than wrap an element with `styled`. The result behaves like a string, so it composes with `clsx`, template literals, or any class-combining utility you already use.

For the full options table and return-value reference, see [`Classname API`](/docs/api/classname/).

## Basic usage

Define a class in a `*.css.ts` file:

```ts
// /styles/card.css.ts
import { className } from "{{classNameImport}}";

export const card = className({
  base: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
});
```

Use it like any other class string:

```tsx
import { card } from "./styles/card.css";

export const Card = ({ children }) => <div className={card}>{children}</div>;
```

## Variants

Declare named variants under `variants`, then activate them at the call site with `.variant(name, value)`:

```ts
// /styles/button.css.ts
import { className } from "{{classNameImport}}";

export const buttonClass = className({
  base: {
    padding: "0.5rem 1rem",
    border: "1px solid transparent",
    borderRadius: "4px",
    cursor: "pointer",
  },
  variants: {
    color: {
      primary: { backgroundColor: "blue", color: "white", borderColor: "blue" },
      secondary: {
        backgroundColor: "gray",
        color: "white",
        borderColor: "gray",
      },
      danger: { backgroundColor: "red", color: "white", borderColor: "red" },
    },
    size: {
      small: { fontSize: "0.8rem", padding: "0.25rem 0.5rem" },
      large: { fontSize: "1.2rem", padding: "0.75rem 1.5rem" },
    },
  },
});
```

`.variant()` returns a **new** instance with `"<name>-<value>"` appended to the class string, so it's safe to chain:

{{fw-snippet:classname-typed-props}}

## Boolean variants

A variant whose values are `true` / `false` lets you toggle a style on:

```ts
export const buttonClass = className({
  base: { padding: "0.5rem 1rem" },
  variants: {
    warning: {
      true: {
        outline: "2px solid transparent",
        outlineOffset: "0px",
        "&:hover": {
          outlineColor: "red",
          outlineOffset: "2px",
        },
      },
    },
  },
});
```

Activate it by passing the value as a string:

```tsx
buttonClass.variant("warning", "true");
```

## Default variants

`defaultVariants` is accepted on the options object, but with `className` it does **not** apply automatically at runtime — `.variant()` is what actually appends classes to the output. If you want defaults, wrap the class in a small helper that fills them in:

```ts
// /styles/button.css.ts
export const buttonClass = className({
  base: { padding: "0.5rem 1rem" },
  variants: {
    color: {
      primary: { backgroundColor: "blue" },
      danger: { backgroundColor: "red" },
    },
    size: { small: { fontSize: "0.8rem" }, large: { fontSize: "1.2rem" } },
  },
  defaultVariants: { color: "primary", size: "small" },
});

export const button = ({
  color = "primary",
  size = "small",
}: {
  color?: "primary" | "danger";
  size?: "small" | "large";
} = {}) => buttonClass.variant("color", color).variant("size", size);
```

```tsx
<button className={button()}>Default</button>
<button className={button({ color: "danger" })}>Danger</button>
```

## Compound variants

`compoundVariants` applies extra styles only when **all** of the listed variant values are active:

```ts
export const buttonClass = className({
  base: { padding: "0.5rem 1rem" },
  variants: {
    variant: {
      solid: { background: "black", color: "white" },
      outlined: { background: "transparent", border: "1px solid currentColor" },
    },
    borderRadius: {
      regular: { borderRadius: "0.6em" },
      circular: { borderRadius: "50em" },
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      borderRadius: "circular",
      css: {
        paddingInline: "{spacings.emExtraLarge}",
      },
    },
  ],
});
```

The extra `paddingInline` only applies when both `.variant("variant", "solid")` and `.variant("borderRadius", "circular")` are chained.

## anyOf variants

`anyOfVariants` applies extra styles when **any** of the listed values is active. The rule is generated with `:where()`, so it has zero specificity — a more specific variant rule on the same property will win.

```ts
export const buttonClass = className({
  base: { padding: "0.5rem 1rem" },
  variants: {
    variant: {
      solid: { background: "black", color: "white" },
      danger: { background: "red", color: "white" },
    },
  },
  anyOfVariants: [
    {
      variant: "solid",
      css: { fontWeight: 600 },
    },
    {
      variant: "danger",
      css: { fontWeight: 600 },
    },
  ],
});
```

## Pseudo-selectors and nested selectors

Reference the class itself with `&`. Pseudo-classes, pseudo-elements, combinators, and nested object selectors all work inside `base` and inside variant style objects:

```ts
export const buttonClass = className({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5em",
    "&:hover": { background: "black", color: "white" },
    "&:disabled": { opacity: 0.25, pointerEvents: "none" },
    "& > svg": { width: "1em", height: "1em" },
    "& + &": { marginLeft: "0.5rem" },
  },
});
```

Grouped selectors (`'&:hover, &:focus'`) and chained pseudos (`'&:not(:hover)'`) are both supported.

## Media queries

Media queries are nested style objects keyed by the at-rule:

```ts
export const card = className({
  base: {
    padding: "1rem",
    "@media (min-width: 600px)": {
      padding: "2rem",
    },
  },
});
```

If your Salty config defines media-query aliases, you can use them directly: `'@tablet': { ... }`. Container queries follow the same pattern with `'@container (...)'`.

## Token references

Reference design tokens defined via `defineVariables` with `{path.to.token}` syntax:

```ts
export const card = className({
  base: {
    color: "{colors.text}",
    background: "{colors.surface}",
    padding: "{spacings.large}",
    borderRadius: "{radii.medium}",
  },
});
```

Tokens resolve at build time, so typos surface as missing values during compilation rather than at runtime.

## Templates

If your config defines templates (for example a `textStyle` template that bundles `font-family`, `font-size`, and `line-height`), you can apply one by setting its key:

```ts
export const heading = className({
  base: {
    textStyle: "body.small",
    color: "{colors.text}",
  },
});
```

## Combining with other classes

Because the value is a string, you can combine it with any class-combining utility:

```tsx
import { card } from "./styles/card.css";
import { buttonClass } from "./styles/button.css";
import clsx from "clsx";

export const CardWithButton = ({ children }) => (
  <div className={card}>
    {children}
    <button
      className={clsx(
        buttonClass.variant("color", "primary"),
        "my-other-class",
      )}
    >
      Click me
    </button>
  </div>
);
```

## Custom `className` option

Pass a `className` (or array of class names) on the options object to attach a stable selector alongside the generated hash. Handy for targeting from external CSS or for spotting the element in DevTools:

```ts
export const card = className({
  className: "card",
  base: { padding: "1rem", borderRadius: "8px" },
});
```

The rendered element ends up with both the generated hash and `card` in its class list, so a global `.card { ... }` rule will match it.

## Priority

`priority` controls which CSS layer the rule lands in. Higher numbers come later in the cascade and therefore win conflicts at equal specificity. `className` defaults to `0`; raise it when you need a class to override a baseline:

```ts
export const baseInput = className({
  base: { border: "1px solid gray" },
});

export const errorOutline = className({
  priority: 1,
  base: { border: "1px solid red" },
});
```

```tsx
<input className={`${baseInput} ${errorOutline}`} />
```

## Limitations vs `styled`

`className` is intentionally smaller than `styled`. It cannot:

- extend another component or another Salty class (no `styled(MyComponent, ...)` equivalent),
- render a {{componentNoun}} (no element override via `element`, no `passProps`, no `defaultProps`),
- auto-apply `defaultVariants` at runtime — chain `.variant()` yourself or wrap in a helper as shown above.

If you need any of these, reach for [`styled`](https://github.com/margarita-form/salty-css) instead.

## See also

- [`Classname API`](/docs/api/classname/) — full options table and return-value reference.
