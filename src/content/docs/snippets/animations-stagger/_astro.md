```astro
---
// src/pages/items.astro
import { StaggeredItem } from "../components/staggered-items.css";

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
---

<ul>
  {items.map((item, index) => (
    <StaggeredItem index={Math.min(index, 4)}>{item}</StaggeredItem>
  ))}
</ul>
```
