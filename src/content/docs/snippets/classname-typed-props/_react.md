```tsx
import { buttonClass } from "./styles/button.css";

type Props = {
  color: "primary" | "secondary" | "danger";
  size: "small" | "large";
  children: React.ReactNode;
};

export const Button = ({ color, size, children }: Props) => {
  const cls = buttonClass.variant("color", color).variant("size", size);
  return <button className={cls}>{children}</button>;
};
```
