```ts
// /salty.config.ts
import { defineConfig } from "@salty-css/core/config";

export const config = defineConfig({
  importStrategy: "root",
  strict: true,
  defaultUnit: "px",

  variables: {
    colors: {
      brand: { main: "#0070f3", muted: "#6699cc" },
      neutral: { white: "#f0f0f0", black: "#0a0a0a" },
    },
    spacing: { small: "8px", medium: "16px", large: "32px" },

    conditional: {
      theme: {
        dark: { background: "{colors.neutral.black}", color: "{colors.neutral.white}" },
        light: { background: "{colors.neutral.white}", color: "{colors.neutral.black}" },
      },
    },
  },

  global: {
    body: { margin: 0, fontFamily: "var(--font-family-main, sans-serif)" },
    a: { color: "currentcolor" },
  },

  templates: {
    textStyle: {
      body: { fontSize: "16px", lineHeight: "1.5" },
      heading: { fontSize: "32px", fontWeight: 700, lineHeight: "1.2" },
    },
  },

  externalModules: ["react", "react-dom"],
});
```
