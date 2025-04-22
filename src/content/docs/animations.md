# Keyframes & Animations

Salty CSS provides a straightforward way to create and use CSS animations through keyframes.

## Creating Keyframes

You can define keyframe animations using the `keyframes` function:

```ts
// /styles/animations.css.ts
import { keyframes } from "@salty-css/react/keyframes";

// Define a fade-in animation
export const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

// Define a more complex animation with multiple steps
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
```

## Using Keyframes in Styled Components

Once you've defined your keyframes, you can use them in your styled components:

```ts
// /components/animated-element.css.ts
import { styled } from "@salty-css/react/styled";
import { fadeIn, animateText } from "../styles/animations.css";

export const FadeInElement = styled("div", {
  base: {
    opacity: 0,
    animation: fadeIn
});

export const AnimatedText = styled("p", {
  base: {
    animation: animateText,
  },
});
```

## Conditional Animation with Variants

You can conditionally apply animations using variants:

```ts
// /components/animated-button.css.ts
import { styled } from "@salty-css/react/styled";
import { fadeIn } from "../styles/animations.css";

export const AnimatedButton = styled("button", {
  base: {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "blue",
    color: "white",
  },
  variants: {
    animated: {
      true: {
        animation: fadeIn,
      },
    },
  },
});
```

## Using Animation Delays

You can create staggered animations by combining keyframes with delays:

```ts
// /components/staggered-items.css.ts
import { styled } from "@salty-css/react/styled";
import { fadeIn } from "../styles/animations.css";

export const StaggeredItem = styled("li", {
  base: {
    opacity: 0,
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

Usage example:

```tsx
import { StaggeredItem } from "./staggered-items.css";

export const ItemsList = () => {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  return (
    <ul>
      {items.map((item, index) => (
        <StaggeredItem key={item} index={index > 4 ? 4 : index}>
          {item}
        </StaggeredItem>
      ))}
    </ul>
  );
};
```

## Animation Utilities

You can also create reusable animation templates:

```ts
// /styles/animation-templates.css.ts
import { keyframes } from "@salty-css/react/keyframes";

export const createPulse = (scale = 1.05) =>
  keyframes({
    "0%": { transform: "scale(1)" },
    "50%": { transform: `scale(${scale})` },
    "100%": { transform: "scale(1)" },
  });

export const createBlink = (from = "transparent", to = "currentColor") =>
  keyframes({
    "0%": { borderColor: from },
    "50%": { borderColor: to },
    "100%": { borderColor: from },
  });
```
