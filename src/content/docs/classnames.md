# Class Name Function

The `className` function allows you to create reusable CSS classes without creating React components. This approach is framework-agnostic and can be used with any front-end library or vanilla HTML.

## Basic Usage

```ts
// /styles/classes.css.ts
import { className } from "@salty-css/react/class-name";

export const card = className({
  className: "card", // Optional custom class name
  base: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
});

export const header = className({
  base: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    marginBottom: "0.5rem",
  },
});

export const content = className({
  base: {
    flex: 1,
  },
});
```

## Using in React

```tsx
import { card, header, content } from "./styles/classes.css";

export const Card = ({ title, children }) => {
  return (
    <div className={card}>
      <h2 className={header}>{title}</h2>
      <div className={content}>{children}</div>
    </div>
  );
};
```

## Conditional Class Names

Like the `styled` function, `className` also supports variants for conditional styling with variants:

```ts
// /styles/button-class.css.ts
import { className } from "@salty-css/react/class-name";

export const buttonClass = className({
  base: {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  variants: {
    color: {
      primary: {
        backgroundColor: "blue",
        color: "white",
        borderColor: "blue",
      },
      secondary: {
        backgroundColor: "gray",
        color: "white",
        borderColor: "gray",
      },
      danger: {
        backgroundColor: "red",
        color: "white",
        borderColor: "red",
      },
    },
    size: {
      small: { fontSize: "0.8rem", padding: "0.25rem 0.5rem" },
      large: { fontSize: "1.2rem", padding: "0.75rem 1.5rem" },
    },
  },
});
```

## Using Conditional Classes

```tsx
import { buttonClass } from "./styles/button-class.css";

export const Button = ({ color, size, children }) => {
  // The variant parameters are passed as an object
  const className = buttonClass.variant("color", color).variant("size", size);

  return <button className={className}>{children}</button>;
};
```

## Combining with Other Classes

You can combine multiple class names:

```tsx
import { card } from "./styles/classes.css";
import { buttonClass } from "./styles/button-class.css";
import clsx from "clsx"; // Or any class name combining utility

export const CardWithButton = ({ children }) => {
  return (
    <div className={card}>
      {children}
      <button
        className={clsx(
          buttonClass.variant("color", "primary"),
          "my-other-class"
        )}
      >
        Click me
      </button>
    </div>
  );
};
```
