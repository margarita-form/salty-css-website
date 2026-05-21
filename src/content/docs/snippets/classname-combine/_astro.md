```astro
---
// src/components/CardWithButton.astro
import { card } from "../styles/card.css";
import { buttonClass } from "../styles/button.css";
import clsx from "clsx";
---

<div class={card}>
  <slot />
  <button class={clsx(buttonClass.variant("color", "primary"), "my-other-class")}>
    Click me
  </button>
</div>
```
