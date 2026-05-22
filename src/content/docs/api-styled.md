---
title: Styled Function API
description: API reference for styled() in Salty CSS — typed components with base styles, variants, anyOfVariants, defaultVariants, passProps, element override, and priority.
topic: Styled Function
category: api-reference
schemaType: APIReference
keywords: [styled, api reference, TypeScript styled components, typed variants, anyOfVariants, defaultVariants, passProps, element override, polymorphic component, CSS-in-TS, build-time CSS]
intent: Reference for the styled() function — signature, options, variant semantics, extension behaviour, and edge cases.
proficiencyLevel: Expert
priority: 0.7
---

# `styled` API reference

`styled` is the main way to create a {{componentNoun}} with Salty CSS. It takes an HTML tag name **or** another component, plus a Salty options object, and returns a {{componentNoun}} you can use {{usageContext}}. All styled definitions must live in `*.css.ts`, `*.css.tsx`, `*.salty.ts`, `*.styled.ts`, or `*.styles.ts` files so the build-time compiler can pick them up.

For runnable examples, see [Variants](/docs/variants/) and [Overrides](/docs/overrides/).

## When to reach for `styled`

Three Salty APIs end up doing similar things; the question is mostly "how much component machinery do I want?".

- **`styled(tag, params)`** — you want a typed component. Variants become typed props, refs are forwarded, `passProps` and `element` give you fine control over what reaches the DOM. The everyday choice.
- **[`className({ ... })`](/docs/api/classname/)** — you want the same style superpowers but you want a class string to apply to your own markup rather than a component wrapper. Returns a string + a typed `.variant()` selector.
- **[`defineTemplates({ ... })`](/docs/templates/)** — you want a library of style bundles (with their own variants) that several `styled` / `className` consumers reach for. Templates compose into styles, not into components.

If you're not sure, start with `styled`. Switch to `className` or templates only when the component wrapper stops earning its keep.

## Import

```ts
import { styled } from "{{styledImport}}";
```

## Signature

```ts
styled(tag: string | ComponentType, params: StyledParams): StyledComponent
```

- `tag` — an HTML tag name (`"div"`, `"button"`, `"a"`, …) **or** another component (Salty-created or third-party). When you pass a component, that component is wrapped — Salty applies its className/styles and forwards the rest.
- `params` — the options object documented below.
- Returns a {{componentNoun}} accepting:
  - all the variant props you declared, plus
  - the native HTML attributes of the underlying element, plus
  - `className`, `style`, `as`, `children`, and (when the wrapped target supports it) `ref`.

## Options

| Key                | Type                                     | Description                                                                                                                                                                                       |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`             | `CSSinJS`                                | Base styles applied to every instance. Full Salty style-object syntax — pseudos, nested selectors, media queries, tokens, templates, modifiers, function values.                                  |
| `variants`         | `{ [name]: { [value]: CSSinJS } }`       | Named, prop-driven style branches. Each variant becomes a prop on the rendered component.                                                                                                          |
| `compoundVariants` | `Array<{ [name]: value, css: CSSinJS }>` | Extra styles applied only when **all** listed variant values are active.                                                                                                                           |
| `anyOfVariants`    | `Array<{ [name]: value, css: CSSinJS }>` | Extra styles applied when **any** listed variant value is active. Generated with `:where()` — zero specificity, loses to regular variant rules.                                                    |
| `defaultVariants`  | `{ [name]: value }`                      | Default values for variant props. Used automatically at render time when the consumer doesn't pass that prop.                                                                                       |
| `defaultProps`     | `Record<string, unknown>`                | Default HTML attributes / DOM props (`id`, `type`, `target`, …). Differs from `defaultVariants` — these are passed straight through to the underlying element, not consumed as variant lookups.   |
| `element`          | `string`                                 | Override the rendered HTML tag while keeping the styling. Useful for semantic swaps (`element: 'section'` on a `styled('div', { … })`).                                                            |
| `passProps`        | `boolean \| string \| string[]`          | Forward variant props to the underlying element/component. Required when wrapping components that consume specific props (e.g. `next/link`'s `href`). See below.                                   |
| `className`        | `string \| string[]`                     | Custom class name(s) appended to the generated hash. Handy for stable selectors and DevTools visibility.                                                                                            |
| `displayName`      | `string`                                 | Label used by the build output and `data-component-name` dev attribute.                                                                                                                            |
| `priority`         | `number` (0–8)                           | CSS layer priority. Higher numbers land later in the cascade and win conflicts at equal specificity. Defaults to `0` for a plain `styled('div', …)`; **extending another component (`styled(Component, …)`) bumps it by 1** automatically so the wrapper always wins over what it wraps. |

### `element`

Renders a different tag without writing a second styled definition. The original tag argument keeps the variants and base styles; `element` only changes the DOM element that gets rendered:

```ts
import { styled } from "{{styledImport}}";

export const Heading = styled("div", {
  element: "h2",
  base: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
});
```

For semantic flexibility at the call site, consumers can pass the `as` prop on the rendered component to override `element` per instance.

### Extending a component (`styled(Component, …)`)

Pass another component as the first argument to wrap it. Both Salty components and third-party components are supported — the only requirement for non-Salty components is that they accept a `className` prop.

```ts
import { styled } from "{{styledImport}}";
import { Button } from "./button.css";

// Extend a Salty component — base merges, variants merge, priority bumps.
export const PrimaryButton = styled(Button, {
  base: {
    background: "{colors.brand.main}",
    color: "white",
  },
});
```

When you wrap another component:

- The wrapped component's class is preserved alongside the new one.
- The new `base` styles win against the wrapped `base` (Salty bumps the wrapper's priority automatically).
- Variants from both layers coexist; if a variant name collides, the outer (wrapping) layer wins.
- Calling `styled(PrimaryButton, …)` again is fine — chains compose cleanly.

For third-party components, see [Overrides](/docs/overrides/#extending-third-party-components).

### `passProps`

Variant props (anything declared under `variants`) are consumed by Salty by default — they don't reach the underlying DOM element. `passProps` opts them back into the forwarded set:

| Value             | Behaviour                                                                       |
| ----------------- | ------------------------------------------------------------------------------- |
| `false` (default) | Variant props stay with Salty; only native HTML attributes reach the element.   |
| `true`            | All variant props are also forwarded to the underlying element/component.       |
| `'href'`          | Only the named prop is forwarded (others are consumed normally).                 |
| `['href', 'target']` | Forward the listed props.                                                    |

The common case is extending a component that **needs** specific props to function — `next/link`'s `href`, a router-link's `to`, an `<input>`'s `value`:

{{fw-snippet:pass-props}}

### `anyOfVariants` — "any of these is true" rules

`compoundVariants` applies styles when **every** listed variant value is active. `anyOfVariants` applies styles when **any** of them are. It's useful for "treat these N branches the same" rules where listing each compound combo individually would get repetitive.

```ts
styled("button", {
  base: { borderRadius: "6px", padding: "0.5rem 1rem" },
  variants: {
    tone: {
      brand: { background: "{theme.highlight}" },
      danger: { background: "{theme.danger}" },
      neutral: { background: "{theme.altBackground}" },
    },
    emphasis: {
      strong: { fontWeight: 600 },
      subtle: { fontWeight: 400 },
    },
  },
  anyOfVariants: [
    // Bold border whenever the button has loud intent —
    // regardless of emphasis. One rule, two matching tone values.
    { tone: "brand", css: { border: "2px solid currentColor" } },
    { tone: "danger", css: { border: "2px solid currentColor" } },
  ],
});
```

Under the hood, `anyOfVariants` rules are emitted with `:where()`, so they carry zero specificity. That means a regular `variants` rule (or a `compoundVariants` rule) always wins against an `anyOfVariants` rule for the same property — you can layer them safely without worrying about override fights.

For a fuller worked example, see [Variants → anyOfVariants](/docs/variants/#anyofvariants):

{{fw-snippet:any-of-variants}}

### `defaultProps` vs `defaultVariants`

They look similar but do different things:

- `defaultVariants` sets the default for a **variant** prop. The value is used as a lookup into the `variants` object to pick which style branch applies — applied at render time when the consumer doesn't pass that prop.
- `defaultProps` sets the default for an **HTML / DOM** prop. The value is passed straight through to the rendered element.

```ts
styled("button", {
  defaultProps: { type: "button" }, // <button type="button"> by default
  defaultVariants: {
    size: "medium", // applies variants.size.medium styles
    tone: "neutral", // applies variants.tone.neutral styles
  },
  variants: {
    size: { small: { padding: "0.25rem" }, medium: { padding: "0.5rem" } },
    tone: {
      neutral: { background: "{theme.altBackground}" },
      brand: { background: "{theme.highlight}" },
    },
  },
});
```

A consumer that renders `<Button>Hi</Button>` (no `size` or `tone` prop) now gets the medium-neutral branch. Passing `<Button tone="brand">Hi</Button>` keeps the default `size: "medium"` but switches `tone` to `brand`.

If a variant name collides with an HTML attribute name (e.g. a variant called `disabled`), make sure to mark it in `passProps` if you also want the DOM `disabled` attribute to fire.

### `priority`

Salty CSS uses `@layer` internally to make the cascade predictable:

| Layer        | Typical contents                                                                          |
| ------------ | ----------------------------------------------------------------------------------------- |
| `imports`    | Anything pulled in via [`defineImport`](/docs/imports/).                                  |
| `reset`      | Built-in reset or your `defineConfig({ reset })`.                                         |
| `globals`    | `defineGlobalStyles` declarations.                                                        |
| `templates`  | `defineTemplates` bundles.                                                                |
| `components` | Base `className` / `styled` rules (`priority: 0`).                                        |
| `priorities` | Anything with `priority > 0` — your explicit overrides and auto-bumped extension wrappers. |

Range is 0–8. Bumping `priority` is the right tool when a wrapping component should override a wrapped one (and it happens automatically for `styled(Component, …)`); it doesn't fix specificity issues caused by overly broad selectors.

For worked examples of setting `priority` manually, equal-specificity tie-breaking, and how `!important` and inline `style` interact with the layer system, see [Overrides → Priority & cascade in depth](/docs/overrides/#priority--cascade-in-depth).

### `className`

Appends one or more custom class names to the generated hash. Useful for:

- Targeting from external CSS (e.g. a legacy stylesheet).
- Making the element easy to spot in DevTools.
- Co-locating with third-party CSS frameworks that key off class names.

```ts
styled("div", {
  className: "card",
  base: { padding: "1rem" },
});
```

The rendered element ends up with both the hash class and `card`. A global `.card { … }` rule will match it.

### `displayName`

Overrides the auto-derived name used in build output and the `data-component-name` attribute that ships in dev builds. Handy when a wrapped component would otherwise show up with an opaque name in DevTools:

```ts
export const Card = styled("div", {
  displayName: "Card",
  base: { padding: "1rem" },
});
```

## The rendered component

The component returned by `styled` accepts:

- All the variant prop names you declared (typed from `variants`).
- All the native props of the underlying element (`button` gets `type`, `disabled`; `a` gets `href`, `target`; …).
- `className` — appended to the generated class.
- `style` — inline overrides, merged onto the element.
- `as` — per-instance element override (analogous to the `element` option).
- `children` — as usual.

{{fw-snippet:ref-forwarding}}

## Example

```ts
// /components/button/button.css.ts
import { styled } from "{{styledImport}}";

export const Button = styled("button", {
  displayName: "Button",
  defaultProps: { type: "button" },
  defaultVariants: { variant: "solid", size: "medium" },
  base: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid transparent",
    borderRadius: "6px",
    cursor: "pointer",
    "&:disabled": { opacity: 0.5, pointerEvents: "none" },
  },
  variants: {
    variant: {
      solid: { background: "{theme.color}", color: "{theme.background}" },
      outlined: {
        background: "transparent",
        borderColor: "currentColor",
        color: "{theme.color}",
      },
    },
    size: {
      small: { padding: "0.25rem 0.5rem", fontSize: "0.8rem" },
      medium: { padding: "0.5rem 1rem", fontSize: "1rem" },
      large: { padding: "0.75rem 1.5rem", fontSize: "1.25rem" },
    },
  },
  compoundVariants: [
    { variant: "solid", size: "large", css: { fontWeight: 700 } },
  ],
});
```

{{fw-snippet:styled-hello}}

## See also

- [Variants](/docs/variants/) · [Overrides](/docs/overrides/) · [Templates](/docs/templates/)
- [`className` API](/docs/api/classname/) — the lighter-weight cousin.
- [`defineConfig` reference](/docs/api/config/) — modifiers, `defaultUnit`, `importStrategy`, and other build-wide knobs.
