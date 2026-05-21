```ts
// /components/link.css.ts
import { styled } from "{{styledImport}}";
import NextLink from "next/link";

// passProps: true — every variant prop is forwarded to the wrapped component.
export const PassAll = styled(NextLink, {
  passProps: true,
  base: { color: "{colors.brand.main}" },
});

// passProps: "href" — only "href" is forwarded (others are consumed as variant props).
export const PassOne = styled(NextLink, {
  passProps: "href",
  base: { color: "{colors.brand.main}" },
  variants: {
    underline: {
      true: { textDecoration: "underline" },
    },
  },
});

// passProps: ["href", "target"] — list specific props to forward.
export const PassMany = styled(NextLink, {
  passProps: ["href", "target"],
  base: { color: "{colors.brand.main}" },
});
```

Without `passProps`, every prop you pass to the styled component is treated as a variant or a base HTML attribute. With `passProps`, the listed prop names (or all of them, with `true`) are forwarded to the underlying component instead — required for libraries like `next/link` that rely on specific props (`href`, `prefetch`) to function.
