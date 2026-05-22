```ts
// src/components/callout.css.ts
import { styled } from "{{styledImport}}";

// Lifts these rules into @layer l2, so they beat any l0/l1 rule
// at equal selector specificity — without changing the selector itself.
export const Callout = styled("div", {
  priority: 2,
  base: {
    background: "{colors.brand.main}",
    color: "white",
    padding: "1rem",
  },
});
```

The emitted CSS lands inside `@layer l2 { ... }`. Layers are declared in cascade order `l0, l1, …, l8`, so a higher number always wins.
