```tsx
import { card } from "./styles/card.css";
import { buttonClass } from "./styles/button.css";
import clsx from "clsx";

export const CardWithButton = ({ children }) => (
  <div className={card}>
    {children}
    <button
      className={clsx(
        buttonClass.variant("color", "primary"),
        "my-other-class",
      )}
    >
      Click me
    </button>
  </div>
);
```
