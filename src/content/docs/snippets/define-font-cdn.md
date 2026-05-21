```ts
// /styles/fonts.css.ts
import { defineFont } from "@salty-css/core/factories";

export const outfit = defineFont({
  name: "Outfit",
  fallback: "system-ui, sans-serif",
  import:
    "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap",
});
```

`import` and `variants` are mutually exclusive — pick one per font.
