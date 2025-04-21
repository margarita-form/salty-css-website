## Usage

This guide covers the basic usage of Salty CSS components and features across different frameworks.

### Create components

Create salty components with styled only inside files that end with `.css.ts`, `.css.tsx`, `.salty.ts`, `.styled.ts` or `.styles.ts`.

### Basic Component Structure

```ts
// /components/my-component.css.ts
import { styled } from "@salty-css/react/styled";

export const Component = styled("div", {
  className: "wrapper", // Optional custom class name
  element: "section", // Optional override for the rendered HTML element
  base: {
    // Base styles that are always applied
    display: "flex",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
  },
  variants: {
    // Conditional styles based on props
    size: {
      small: { padding: "0.5rem" },
      large: { padding: "2rem" },
    },
    color: {
      primary: { backgroundColor: "blue", color: "white" },
      secondary: { backgroundColor: "gray", color: "black" },
    },
  },
  compoundVariants: [
    // Styles applied when multiple variant conditions are met
    {
      size: "small",
      color: "primary",
      css: { borderRadius: "4px" },
    },
  ],
});
```

### Using Components in React

```tsx
import { Component } from "./my-component.css";

const MyPage = () => {
  return (
    <Component size="small" color="primary">
      This is a Salty CSS component
    </Component>
  );
};

export default MyPage;
```

### Demo Projects

- **Next.js Demo Project**: [View on GitHub](https://github.com/margarita-form/salty-css-website)
- **React + Vite Demo**: [View on GitHub](https://github.com/margarita-form/salty-css-react-vite-demo)
- **CodeSandbox Demo**: [![Edit margarita-form/salty-css-react-vite-demo/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/margarita-form/salty-css-react-vite-demo/main?import=true&embed=1)
