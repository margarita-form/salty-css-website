```astro
---
// src/components/button.astro
import { buttonClass } from "../styles/button.css";

type Props = {
  color: "primary" | "secondary" | "danger";
  size: "small" | "large";
};

const { color, size } = Astro.props;
const cls = buttonClass.variant("color", color).variant("size", size);
---

<button class={cls}><slot /></button>
```
