```ts
// /salty.config.ts
import { defineConfig } from "@salty-css/core/config";

export const config = defineConfig({
  modifiers: {
    // Shorthand: write `space:3` and get `12px` (3 × 4px base unit).
    spaceShorthand: {
      pattern: /^space:(\d+)$/,
      transform: (match) => {
        const n = Number(match.replace("space:", ""));
        return { value: `${n * 4}px` };
      },
    },

    // Inject extra CSS alongside the rewritten value:
    elevation: {
      pattern: /^elevation:(\d+)$/,
      transform: (match) => {
        const level = Number(match.replace("elevation:", ""));
        return {
          value: `${level * 2}px ${level * 4}px ${level * 6}px rgba(0,0,0,0.12)`,
          css: { transform: "translateZ(0)" }, // emitted alongside
        };
      },
    },
  },
});
```

Use the shorthand at the call site:

```ts
styled("div", {
  base: {
    padding: "space:3",       // → 12px
    boxShadow: "elevation:2", // → 4px 8px 12px rgba(0,0,0,0.12)
  },
});
```
