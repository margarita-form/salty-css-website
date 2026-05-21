```ts
// /styles/variables.css.ts
import { defineVariables } from "@salty-css/core/factories";

export default defineVariables({
  colors: {
    black: "#0a0a0a",
    white: "#f0f0f0",
    highlight: "aqua",
    brand: {
      main: "#0070f3",
      muted: "#6699cc",
    },
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
});
```
