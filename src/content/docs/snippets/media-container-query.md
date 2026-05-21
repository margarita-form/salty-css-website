```ts
// /components/card.css.ts
import { styled } from "{{styledImport}}";

export const Card = styled("article", {
  base: {
    containerType: "inline-size", // marks this element as a container
    padding: "1rem",

    // Style the children based on the container's width, not the viewport's.
    "@container (min-width: 480px)": {
      padding: "2rem",
      "& > *": { fontSize: "1.125rem" },
    },

    "@container (min-width: 768px)": {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: "1.5rem",
    },
  },
});
```

Container queries respond to the size of the element that declares `container-type`, so the same `Card` can lay out differently in a sidebar (narrow container) versus a main column (wide container) — no JS measurement required.
