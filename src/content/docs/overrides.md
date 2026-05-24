---
title: Overrides
description: Extend styled components, swap elements, and override styles with props in Salty CSS.
preHeadline:
  react: Extend Typed Components, Swap Elements, and Pass Style Props Through Third-Party React Libraries
  next: Override Styles in Server Components Without 'use client' — Element Swap and Style-Prop Passthrough
  astro: Extend Styled Primitives in .astro and .tsx Islands — Element Override Plus Style-Prop Passthrough
visibleHeading:
  react: Extending React Styled Components
  next: Extending Styled Components in Server and Client Routes
  astro: Extending Styled Components in .astro Islands
topic: Overrides
category: guide
schemaType: TechArticle
keywords: [overrides, extend, style props, third-party]
intent: Extend Salty CSS components, override styles, integrate third-party components, and use style props.
proficiencyLevel: Intermediate
priority: 0.7
---

Salty CSS offers powerful ways to extend components and override styles, allowing you to build complex component systems while maintaining consistency.

## Extending Components

You can extend existing components to create new ones with additional styles or functionality:

```ts
// /components/button.css.ts
import { styled } from "{{styledImport}}";

export const Button = styled("button", {
  base: {
    padding: "0.6em 1.2em",
    border: "1px solid currentColor",
    borderRadius: "4px",
    cursor: "pointer",
  },
});

// /components/primary-button.css.ts
import { styled } from "{{styledImport}}";
import { Button } from "./button.css";

// Extend the Button component with new styles
export const PrimaryButton = styled(Button, {
  base: {
    backgroundColor: "blue",
    color: "white",
    borderColor: "blue",
  },
});
```

## Extending Third-Party Components

You can also extend non-Salty CSS components, like those from UI libraries:

{{fw-snippet:overrides-link}}

> Note: Third-party components must accept a `className` prop for the styles to be applied correctly.

## `passProps` — forwarding variant props to the wrapped element

By default, variant props (anything you declare under `variants`) are **consumed by Salty** and don't reach the underlying element. That's the right default for most components, but it breaks when you're wrapping something that needs specific props to function — `next/link` needs `href`, a router link needs `to`, etc.

`passProps` controls which variant-style props get forwarded:

| Value                | Behaviour                                                              |
| -------------------- | ---------------------------------------------------------------------- |
| `false` (default)    | Variant props stay with Salty; only native HTML attributes pass through. |
| `true`               | All variant props are forwarded to the underlying element/component.   |
| `'href'`             | Only the named prop is forwarded.                                       |
| `['href', 'target']` | Forward the listed props.                                               |

{{fw-snippet:pass-props}}

The single most common reason to reach for `passProps` is extending a router/link component:

```ts
// Without passProps, NextLink never sees `href` because Salty consumed it.
export const Link = styled(NextLink, {
  passProps: ["href", "prefetch"],
  base: { color: "{colors.brand.main}" },
});
```

## Element Override (`element` vs `styled(Component, …)`)

There are two ways to change what gets rendered, and they do different things:

- **`element: 'h2'`** changes the **HTML tag** while keeping the styled component as a thin wrapper. Use it when you want semantic flexibility without writing a new component.
- **`styled(MyComponent, …)`** **wraps another component** — Salty merges its base + variants on top of the wrapped component's existing styles. Use it when you want to extend behaviour, not just swap tags.

```ts
import { styled } from "{{styledImport}}";

// Tag-only swap — still a wrapper around `<h2>`.
export const Heading = styled("div", {
  element: "h2",
  base: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
});

// Wrapping a component — base styles merge with whatever Heading already had.
export const SectionHeading = styled(Heading, {
  base: {
    color: "{colors.brand.main}",
    borderBottom: "1px solid currentColor",
  },
});
```

Per-instance override at the call site uses the `as` prop:

{{fw-snippet:overrides-as-prop}}

## Overriding Styles with Props

You can pass CSS styles directly via props to override the base styles:

{{fw-snippet:overrides-style-prop}}

## CSS Custom Properties

CSS custom properties (variables) give consumers a way to override individual styles per-instance without needing a variant for every knob. The framework-native way to set them is the React `style` prop (or the `style` attribute in Astro/HTML): any `--foo: value` you put there lands as an inline declaration on the element and can be read from styled rules via `var(--foo)`. If you'd rather expose a typed, discoverable API instead of asking consumers to know the variable name, see [Typed prop tokens](#typed-prop-tokens-css--props) below.

### A themeable surface

Declare the variables with sensible fallbacks in the styled component, and let consumers set them via the `style` prop or a parent rule:

```ts
// /components/themed-box.css.ts
import { styled } from "{{styledImport}}";

export const ThemedBox = styled("div", {
  base: {
    backgroundColor: "var(--box-bg, white)",
    color: "var(--box-text, black)",
    padding: "var(--box-padding, 1rem)",
    borderRadius: "var(--box-radius, 4px)",
  },
});
```

Usage with CSS custom properties:

{{fw-snippet:overrides-css-vars}}

### Runtime-tunable spacing

When a layout needs a knob you don't want to make into a variant, expose it as a variable:

```ts
export const Stack = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--stack-gap, 1rem)",
  },
});
```

{{fw-snippet:stack-gap-render}}

### Reading a themed token

Combine custom properties with [conditional variables](/docs/theming/) for theme-aware values that flip when the parent theme attribute changes:

```ts
export const Panel = styled("section", {
  base: {
    background: "{theme.background}",
    color: "{theme.color}",
    "--panel-accent": "{theme.highlight}",
    borderLeft: "4px solid var(--panel-accent)",
  },
});
```

The `--panel-accent` variable resolves to whatever `{theme.highlight}` is at runtime, so child elements can read `var(--panel-accent)` without re-resolving the theme themselves.

### Typed prop tokens (`css-*` props)

When you want a per-instance knob that is **typed and discoverable** — without asking consumers to remember the underlying variable name — reach for a prop token. Reference the value in your styles as `{props.X}` and the compiler registers the key at build time, exposing a `css-X` prop on the rendered component. At render time Salty intercepts that prop and writes its value to the element's inline `style` as `--props-X`, which your generated CSS already references via `var(--props-X)`.

```ts
// /components/box.css.ts
import { styled } from "{{styledImport}}";

export const Box = styled("div", {
  base: {
    padding: "1rem",
    color: "{props.color}",
    backgroundColor: "{props.bgColor}",
  },
});
```

{{fw-snippet:prop-tokens}}

A few rules worth knowing:

- Tokens are authored in camelCase (`{props.bgColor}`); the JSX prop is the dash-cased equivalent (`css-bg-color`), and the resulting CSS variable on the element is `--props-bg-color`.
- An unset prop writes nothing — pair the token with a fallback (`var(--props-color, currentColor)`) when you need a default.
- `css-*` props are stripped before forwarding, so they never leak to the DOM as unknown attributes.

Reach for prop tokens when the component owns the contract and wants type-checked overrides at the call site. Stick with the plain `style={{ "--foo": … }}` pattern from the previous section when the variable name itself is the contract — e.g. theming variables that several components share, or values set by a parent wrapper rather than the component's own consumer.

## Priority & cascade in depth

Salty CSS settles override conflicts through CSS cascade layers, not source order or selector specificity tricks. Every component rule lands in a layer named `lN` where `N` is the component's priority; the declared order is `imports, reset, global, templates, fonts, l0, l1, …, l8`, so a higher layer always wins regardless of selector specificity. See the [layer table](/docs/api/styled/#priority) in the `styled` API reference for what lives where.

### Setting `priority` manually

Most components stay at the default `priority: 0` (layer `l0`). Raise it when you want a rule to win against other rules that share its selector specificity — for example a utility component meant to override the components it sits on:

{{fw-snippet:priority-manual}}

Setting `priority` explicitly turns off the auto-bump that `styled(Component, …)` would otherwise apply. If you write `styled(Button, { priority: 0, base: {…} })`, the wrapper now lives in `l0` alongside `Button` and will not automatically win the tie. Set `priority` only when you mean to override the default.

### Equal-specificity tie-breaking

When two Salty rules target the same property with the same selector specificity, the one in the higher layer wins. This is the only tie-break Salty applies — source order does not matter, and `styled(...)` does not generate more specific selectors to force overrides.

{{fw-snippet:priority-tiebreak}}

If you find yourself wanting "just a bit more" specificity, wrap the component (auto-bump) or set `priority` — don't add chained class selectors or `!important`.

### `!important` is preserved verbatim

Salty CSS does not strip, warn on, or rewrite `!important`. Whatever you put in a value string is what ends up in the emitted CSS:

{{fw-snippet:overrides-important}}

Prefer raising `priority`. Inside CSS cascade layers, `!important` declarations follow an inverted layer order (earlier layers win over later ones), which interacts badly with the layered priority system Salty already gives you.

### Inline `style` always wins

The `style` prop generates an inline declaration on the element, and inline declarations sit above all stylesheet rules in the CSS cascade — including the highest priority layer. A consumer's `style={{ color: "green" }}` will beat any Salty rule for the same property:

{{fw-snippet:overrides-style-prop}}

If you need an override path from outside the component without giving up the cascade, expose a CSS custom property (see [Custom Properties](#css-custom-properties) above) or bump `priority` on a wrapping component. Reach for `style` only when you actually want inline-wins-everything semantics.

### Modifiers and the cascade

[Modifiers](/docs/api/config/) declared in `defineConfig({ modifiers })` are value-transformation functions: when a pattern matches a value, the modifier can emit additional CSS blocks that are prepended to the component's declaration. The extra CSS lives in the **same layer** as the component that triggered it, so a wrapping component still wins against its modifiers via the auto-bump:

```ts
// Button — modifier-driven rules live in l0 alongside the base.
export const Button = styled("button", {
  base: { color: "red /* maybe rewritten by a modifier */" },
});

// PrimaryButton — auto-bumped to l1, so it wins against Button's
// base and against any modifier-emitted rules attached to Button.
export const PrimaryButton = styled(Button, {
  base: { color: "blue" },
});
```

Modifiers never change a component's effective priority. If you need a modifier-driven rule to win across the wrap boundary, raise the wrapping component's `priority` instead.
