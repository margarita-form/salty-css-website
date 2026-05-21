```ts
// /components/auto-theme.ts
"use client";
import { useEffect } from "react";

export function AutoTheme() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (matches: boolean) => {
      document.documentElement.dataset.theme = matches ? "dark" : "light";
    };
    apply(query.matches);
    query.addEventListener("change", (event) => apply(event.matches));
    return () => query.removeEventListener("change", apply as any);
  }, []);
  return null;
}
```

Add `<AutoTheme />` to your root layout. Because `useEffect` runs after hydration, users may see a brief flash of the default theme on the first load. To avoid the flash, add a pre-hydration inline script to your root layout — see [Avoiding the flash on first paint](/docs/theming/#avoiding-the-flash-on-first-paint).
