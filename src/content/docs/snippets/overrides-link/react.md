```ts
// /components/custom-link.css.ts
import { styled } from "{{styledImport}}";
import { Link } from "react-router-dom"; // Or any other component library

export const CustomLink = styled(Link, {
  base: {
    color: "blue",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
```
