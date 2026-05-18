```tsx
import { StaggeredItem } from "./staggered-items.css";

export const ItemsList = () => {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  return (
    <ul>
      {items.map((item, index) => (
        <StaggeredItem key={item} index={Math.min(index, 4)}>
          {item}
        </StaggeredItem>
      ))}
    </ul>
  );
};
```
