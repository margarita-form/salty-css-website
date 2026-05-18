```tsx
import { Button } from "./button/button.css";

export const MyComponent = () => {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="solid">Solid Button</Button>
      <Button variant="outlined" size="large">
        Large Outlined Button
      </Button>
    </div>
  );
};
```
