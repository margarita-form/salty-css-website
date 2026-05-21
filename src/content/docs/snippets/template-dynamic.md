```ts
// /styles/templates.css.ts
import { defineTemplates } from "@salty-css/core/factories";

export default defineTemplates({
  // Function templates accept any value at the call site and return a style object.
  card: (padding: string) => ({
    padding,
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "{theme.background}",
  }),

  // The argument can be a more structured object too.
  surface: ({ tone, elevated }: { tone: "muted" | "loud"; elevated?: boolean }) => ({
    background: tone === "loud" ? "{colors.brand.main}" : "{theme.altBackground}",
    color: tone === "loud" ? "white" : "{theme.color}",
    boxShadow: elevated ? "0 4px 12px rgba(0,0,0,0.12)" : "none",
  }),
});
```

Call sites pass the argument straight through:

```ts
import { styled } from "{{styledImport}}";

export const Card = styled("div", {
  base: {
    card: "2rem",
    surface: { tone: "muted", elevated: true },
  },
});
```
