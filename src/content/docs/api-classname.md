# Class name function

Create CSS class names with possibility to add scope and media queries etc. Function `className` is quite similar to `styled` but does not allow extending components or classes.

```ts
// /components/my-class.css.ts
import { className } from "@salty-css/react/class-name";

// Define a CSS class with className function. First and only argument is the object containing the styles and other options
export const myClass = className({
  className: "wrapper", // Define optional custom class name that will be included to the scope
  base: {
    // 👉 Add your CSS-in-JS base styles here! 👈
  },
});
```

## Example usage:

```tsx
import { myClass } from "./my-class.css";

export const Page = () => {
  return <div className={myClass}>Hello world</div>;
};
```
