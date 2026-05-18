```astro
---
// src/pages/index.astro
import { ThemedBox } from "../components/themed-box.css";
---

<div style="--box-bg: navy; --box-text: white; --box-radius: 8px;">
  <ThemedBox>This box uses the parent's custom properties</ThemedBox>
</div>
```
