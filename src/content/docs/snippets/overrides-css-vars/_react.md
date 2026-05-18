```tsx
import { ThemedBox } from "./themed-box.css";

export const ThemeExample = () => {
  return (
    <div
      style={
        {
          "--box-bg": "navy",
          "--box-text": "white",
          "--box-radius": "8px",
        } as React.CSSProperties
      }
    >
      <ThemedBox>This box uses the parent's custom properties</ThemedBox>
    </div>
  );
};
```
