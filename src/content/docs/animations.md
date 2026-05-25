---
title: Animations
description: Define typed @keyframes and stagger sequences with the keyframes() function in Salty CSS.
preHeadline:
  react: Typed Keyframes and Stagger Sequences — Ergonomic Animation Hooks Compiled Ahead of Bundle Time
  next: RSC-Safe @keyframes and Stagger Choreography — No FOUC on Hydration, Streamable From the Server
  astro: Compile @keyframes Directly Into Island Components — No Client JS Cost for Pure CSS Motion
visibleHeading:
  react: Keyframes and Animations in React Components
  next: Keyframes and Animations in Server and Client Components
  astro: Keyframes and Animations in .astro Pages and Islands
topic: Animations
category: guide
schemaType: TechArticle
keywords: [animations, keyframes, stagger, transitions]
intent: Define typed @keyframes and stagger animations using Salty CSS's build-time keyframes() function.
proficiencyLevel: Intermediate
priority: 0.7
apiReferences: [api/styled, api/classname]
externalLinks:
  MDN · @keyframes: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
  MDN · CSS animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations
  Web.dev · CSS transitions: https://web.dev/learn/css/animations
---

Salty CSS provides a typed, ergonomic way to author CSS `@keyframes` and reuse them across styled components. Keyframes are defined with the `keyframes` function, which returns a value you can drop directly into the `animation` property of any styled component, class name, or `css` block.

## Creating Keyframes

Define an animation with the `keyframes` function. The keys of the object are standard CSS keyframe selectors (`from`, `to`, percentage strings like `'0%'`, `'50%'`, `'100%'`, or plain numbers like `0`, `50`, `100`) and the values are normal Salty CSS style objects.

```ts
// /styles/animations.css.ts
import { keyframes } from "{{keyframesImport}}";

// Simple from/to animation
export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

// Multi-step animation using percentage keys
export const animateText = keyframes({
  "0%": {
    transform: "translateY(100%)",
    opacity: 0,
  },
  "50%": {
    opacity: 0.5,
  },
  "100%": {
    transform: "translateY(0)",
    opacity: 1,
  },
});

// Numeric keys work too — they’re treated as percentages
export const pulse = keyframes({
  0: { transform: "scale(1)" },
  50: { transform: "scale(1.05)" },
  100: { transform: "scale(1)" },
});
```

> **Note**: `keyframes` files conventionally end in `.css.ts` so they’re picked up by the Salty CSS build pipeline.

## Configuration Options

Alongside the keyframe selectors, the `keyframes` function accepts three configuration options that control how the animation is named, applied, and parameterised.

```ts
// /styles/animations.css.ts
import { keyframes } from "{{keyframesImport}}";

export const fadeIn = keyframes({
  // 1. Give the @keyframes rule a stable, readable name in the CSS output.
  //    If omitted, Salty CSS generates a hash-based name.
  animationName: "fadeIn",

  // 2. Inline the starting frame's styles on the element so it doesn't flash
  //    in its un-animated state before the animation begins. This is
  //    especially useful when combined with `delay`.
  appendInitialStyles: true,

  // 3. Default animation parameters. These can be overridden at the call site.
  params: {
    duration: "500ms",
    delay: "250ms",
    easing: "ease-in-out",
    fillMode: "forwards",
  },

  from: { opacity: 0 },
  to: { opacity: 1 },
});
```

### `appendInitialStyles` in practice

Without `appendInitialStyles`, an element that uses `fadeIn` with a `delay` would render fully visible (its natural state) for 250ms, then snap to `opacity: 0` when the animation kicks in. With `appendInitialStyles: true`, Salty CSS appends the styles from the `from` (or `0%`) frame directly onto the element so the initial state is applied immediately, producing a smooth animation from the very first paint.

## Using Keyframes in Styled Components

A keyframe value works as a drop-in for the CSS `animation` shorthand. When Salty CSS resolves it, it expands into the full `animation: <name> <duration> <easing> <delay> <iteration-count> <direction> <fill-mode> <play-state>` string for you.

```ts
// /components/wrapper/wrapper.styled.ts
import { styled } from "{{styledImport}}";
import { fadeIn, animateText } from "../../styles/animations.css";

export const Wrapper = styled("div", {
  base: {
    display: "block",
    animation: fadeIn,
    backgroundColor: "{theme.background.color}",
    padding: "{spacings.screen.small}",
  },
});

export const AnimatedText = styled("p", {
  base: {
    animation: animateText,
  },
});
```

## Overriding Parameters at the Call Site

The value returned by `keyframes` is callable. Call it with a `KeyframesParams` object to override any of the defaults you set under `params` — useful for reusing one keyframe definition with different timings.

```ts
// /components/list-item/list-item.styled.ts
import { styled } from "{{styledImport}}";
import { fadeIn } from "../../styles/animations.css";

export const FastFadeIn = styled("div", {
  base: {
    animation: fadeIn({ duration: "200ms", easing: "ease-out" }),
  },
});

export const SlowLoopFadeIn = styled("div", {
  base: {
    animation: fadeIn({
      duration: "2s",
      iterationCount: "infinite",
      direction: "alternate",
    }),
  },
});
```

## Conditional Animation with Variants

Animations compose cleanly with variants — toggle them on, swap them out, or layer them with other styles.

```ts
// /components/animated-button.css.ts
import { styled } from "{{styledImport}}";
import { fadeIn, pulse } from "../styles/animations.css";

export const AnimatedButton = styled("button", {
  base: {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "blue",
    color: "white",
  },
  variants: {
    entrance: {
      fade: { animation: fadeIn },
      pulse: { animation: pulse({ iterationCount: "infinite" }) },
      none: {},
    },
  },
  defaultVariants: {
    entrance: "fade",
  },
});
```

## Staggered Animations with Delays

To stagger a list, combine a single keyframe with per-index `animationDelay` variants:

```ts
// /components/staggered-items.css.ts
import { styled } from "{{styledImport}}";
import { fadeIn } from "../styles/animations.css";

export const StaggeredItem = styled("li", {
  base: {
    animation: fadeIn,
  },
  variants: {
    index: {
      0: { animationDelay: "0s" },
      1: { animationDelay: "0.1s" },
      2: { animationDelay: "0.2s" },
      3: { animationDelay: "0.3s" },
      4: { animationDelay: "0.4s" },
    },
  },
});
```

{{fw-snippet:animations-stagger}}

> **Tip**: For the cleanest result, set `appendInitialStyles: true` on `fadeIn` so each item stays in its starting state until its delayed animation begins.

## Pausing and resuming with `playState`

Every `keyframes` value accepts a `playState` override (mapped to CSS `animation-play-state`). Use it to pause an animation declaratively — useful for hover-pausing carousels, scrubbing through a state machine, or freezing things when the user prefers reduced motion:

```ts
// /components/marquee.css.ts
import { styled } from "{{styledImport}}";
import { fadeIn } from "../styles/animations.css";

export const Marquee = styled("div", {
  base: {
    animation: fadeIn({ iterationCount: "infinite", duration: "10s" }),

    // Stop the animation when the user hovers the element.
    "&:hover": {
      animation: fadeIn({
        iterationCount: "infinite",
        duration: "10s",
        playState: "paused",
      }),
    },
  },
});
```

Pair this with [`prefers-reduced-motion`](/docs/media-queries/) — and with [theming](/docs/theming/) generally — to avoid animations that surprise users who've opted out of motion:

```ts
styled("div", {
  base: {
    animation: fadeIn,
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
```

## Sharing Keyframe Definitions

Because Salty CSS extracts styles at build time, **every keyframe must be a top-level export of a `*.css.ts` (or `*.css.tsx`) file**. Calling `keyframes(...)` lazily at runtime from a non-`.css.ts` file won't produce a `@keyframes` rule in the generated CSS.

That said, you can still use a local helper function to factor out shared keyframe shapes — as long as the helper is _called_ at the top level of a `.css.ts` file and the result is what gets exported:

```ts
// /styles/animation-templates.css.ts
import { keyframes } from "{{keyframesImport}}";

// Helper kept private to this file — not exported.
const buildPulse = (scale: number) =>
  keyframes({
    animationName: `pulse-${String(scale).replace(".", "_")}`,
    params: { duration: "1s", iterationCount: "infinite" },
    "0%": { transform: "scale(1)" },
    "50%": { transform: `scale(${scale})` },
    "100%": { transform: "scale(1)" },
  });

// These exports are concrete keyframe values, so the build picks them up.
export const pulseSmall = buildPulse(1.05);
export const pulseLarge = buildPulse(1.2);
```

If you only need a few variants of the same animation, prefer overriding `params` at the call site (see _Overriding Parameters at the Call Site_) instead of creating multiple keyframes — it reuses the same `@keyframes` rule and produces less CSS.

## API Reference

### `keyframes(options)`

Defines a CSS `@keyframes` rule and returns a callable value usable as the `animation` property in any Salty CSS styles.

```ts
import { keyframes } from "{{keyframesImport}}";

const myAnimation = keyframes({
  animationName?: string;
  appendInitialStyles?: boolean;
  params?: KeyframesParams;
  // Keyframe selectors:
  from?: CssStyles;
  to?: CssStyles;
  [percentage: `${number}%`]?: CssStyles;
  [step: number]?: CssStyles;
});
```

#### Configuration options

| Option                | Type              | Default               | Description                                                                                                                                                               |
| --------------------- | ----------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animationName`       | `string`          | hash of the keyframes | Custom name for the generated `@keyframes` rule. Useful for readable CSS output and DevTools inspection.                                                                  |
| `appendInitialStyles` | `boolean`         | `false`               | When `true`, appends the styles from the `from` (or `0%`) frame inline on the element so it doesn't flash in its un-animated state before the animation begins.           |
| `params`              | `KeyframesParams` | see below             | Default animation parameters used to build the `animation` shorthand. Each property maps to its respective CSS animation-\* longhand. Can be overridden at the call site. |

#### `KeyframesParams`

| Param            | Type                                    | Default         | CSS property                |
| ---------------- | --------------------------------------- | --------------- | --------------------------- |
| `duration`       | `string`                                | `'500ms'`       | `animation-duration`        |
| `delay`          | `string`                                | `'0s'`          | `animation-delay`           |
| `iterationCount` | `string \| number`                      | `'1'`           | `animation-iteration-count` |
| `easing`         | `StyleValue<'animationTimingFunction'>` | `'ease-in-out'` | `animation-timing-function` |
| `direction`      | `StyleValue<'animationDirection'>`      | `'normal'`      | `animation-direction`       |
| `fillMode`       | `StyleValue<'animationFillMode'>`       | `'forwards'`    | `animation-fill-mode`       |
| `playState`      | `StyleValue<'animationPlayState'>`      | `'running'`     | `animation-play-state`      |

#### Keyframe selectors

| Key               | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| `from`            | Equivalent to `0%`.                                                    |
| `to`              | Equivalent to `100%`.                                                  |
| `'0%'` … `'100%'` | Percentage selector as a string.                                       |
| `0` … `100`       | Numeric selector — Salty CSS converts it to the matching `%` selector. |

#### Return value

The returned value is a callable: invoke it with an optional `KeyframesParams` object to override the defaults set in `params`. Used directly (without invocation), it resolves with the configured defaults.

```ts
// Uses defaults from `params`
animation: fadeIn,

// Overrides defaults
animation: fadeIn({ duration: "1s", iterationCount: "infinite" }),
```
