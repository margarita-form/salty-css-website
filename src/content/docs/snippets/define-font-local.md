```ts
// /styles/fonts.css.ts
import { defineFont } from "@salty-css/core/factories";

export const inter = defineFont({
  name: "Inter",
  fallback: "system-ui, sans-serif",
  display: "swap",
  variants: [
    { src: "/fonts/Inter-Regular.woff2", weight: 400, style: "normal" },
    { src: "/fonts/Inter-Italic.woff2", weight: 400, style: "italic" },
    { src: "/fonts/Inter-Bold.woff2", weight: 700, style: "normal" },
  ],
});
```
