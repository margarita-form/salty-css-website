```ts
// /styles/imports.css.ts
import { defineImport } from "@salty-css/core/factories";

export default defineImport(
  "./vendor/legacy.css",                          // relative to this file
  "../shared/print.css",                          // parent directory
  "modern-normalize/modern-normalize.css",        // npm package
  "/styles/legacy-public.css",                    // public/asset root
  "https://example.com/lib.css",                  // remote URL
  { url: "./print.css", media: "print" },         // conditional import
  { url: "./oklch.css", supports: "color(display-p3 1 1 1)" },
);
```
