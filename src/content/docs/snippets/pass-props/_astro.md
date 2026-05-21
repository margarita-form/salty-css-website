```ts
// /src/components/link.css.ts
import { styled } from "{{styledImport}}";

// Astro example using a small wrapper component.
import { ThirdPartyLink } from "../lib/third-party-link";

export const StyledLink = styled(ThirdPartyLink, {
  passProps: ["href", "target"], // forward these to ThirdPartyLink
  base: { color: "{colors.brand.main}" },
  variants: {
    underline: {
      true: { textDecoration: "underline" },
    },
  },
});
```

`passProps` controls which props reach the wrapped component. Use `true` to forward everything, a string to forward one, or an array to forward a specific set.
