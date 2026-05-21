```tsx
// /components/theme-toggle.tsx
"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

const readInitial = (): Theme => {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = readInitial();
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button type="button" onClick={toggle} aria-label="Toggle theme">
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
};
```

To avoid a flash of the wrong theme on first paint in Next.js, inline a tiny pre-hydration script in `app/layout.tsx` (or `_document.tsx` for the Pages Router) so the attribute is set before React hydrates:

```tsx
// /app/layout.tsx
const setThemeScript = `
  try {
    var t = localStorage.getItem("theme");
    if (t !== "dark" && t !== "light") {
      t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.dataset.theme = t;
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```
