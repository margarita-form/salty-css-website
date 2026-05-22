```ts
// /components/button.css.ts
import { styled } from "{{styledImport}}";

// Lives in @layer l0 — `color: red` for any plain <Button />.
export const Button = styled("button", {
  base: { color: "red", padding: "0.5rem 1rem" },
});

// /components/primary-button.css.ts
import { styled } from "{{styledImport}}";
import { Button } from "./button.css";

// styled(Button, …) auto-bumps priority to 1, so this rule lives in
// @layer l1. Both rules have identical selector specificity, but
// l1 sits later in the cascade than l0 — `color: blue` wins.
export const PrimaryButton = styled(Button, {
  base: { color: "blue" },
});
```

Salty CSS does not rely on source order to decide ties — only layer order. Wrap a component to win; don't reach for `!important` or more specific selectors.
