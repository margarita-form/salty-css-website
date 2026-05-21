```ts
// /src/components/badge.css.ts
import { styled } from "{{styledImport}}";

export const Badge = styled("span", {
  base: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "999px",
    fontSize: "0.75rem",
  },
  variants: {
    tone: {
      success: { background: "#16a34a", color: "white" },
      warning: { background: "#eab308", color: "black" },
      danger: { background: "#dc2626", color: "white" },
      neutral: { background: "#e5e7eb", color: "#111" },
    },
  },
  anyOfVariants: [
    { tone: "success", css: { fontWeight: 700 } },
    { tone: "warning", css: { fontWeight: 700 } },
    { tone: "danger", css: { fontWeight: 700 } },
  ],
});
```

```astro
---
import { Badge } from "./badge.css";
---

<Badge tone="success">Saved</Badge>
<Badge tone="neutral">Idle</Badge>
```
