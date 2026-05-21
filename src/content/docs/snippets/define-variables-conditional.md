```ts
// /styles/themes.css.ts
import { defineVariables } from "@salty-css/core/factories";

export const themes = defineVariables({
  conditional: {
    theme: {
      dark: {
        background: "{colors.black}",
        color: "{colors.white}",
        highlight: "{colors.highlight}",
      },
      light: {
        background: "{colors.white}",
        color: "{colors.black}",
        highlight: "{colors.highlight}",
      },
    },
  },
});
```

Activate by setting the matching attribute on an ancestor:

```html
<html data-theme="dark">...</html>
```
