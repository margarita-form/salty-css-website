In Astro you typically use a plain anchor element — there is no framework-provided `Link` component. Style it with `styled` the same way you would any other element:

```ts
// /components/custom-link.css.ts
import { styled } from "{{styledImport}}";

export const CustomLink = styled("a", {
  base: {
    color: "blue",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
```
