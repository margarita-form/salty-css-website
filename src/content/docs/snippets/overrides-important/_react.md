```ts
// /components/forced-link.css.ts
import { styled } from "{{styledImport}}";

// `!important` is passed through verbatim — Salty CSS doesn't strip it.
export const ForcedLink = styled("a", {
  base: {
    color: "{colors.brand.main}",
    textDecoration: "none !important",
  },
});
```

Prefer raising `priority` over reaching for `!important`. `!important` inside a cascade layer has [inverted precedence](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer#important_declarations) (earlier layers win), which is rarely what you expect.
