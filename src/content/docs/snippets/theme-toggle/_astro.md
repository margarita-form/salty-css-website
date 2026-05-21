```astro
---
// /src/components/ThemeToggle.astro
---

<button id="theme-toggle" type="button" aria-label="Toggle theme">☾ / ☀</button>

<script is:inline>
  (() => {
    const STORAGE_KEY = "theme";
    const initial =
      localStorage.getItem(STORAGE_KEY) ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = initial;

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      const next =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem(STORAGE_KEY, next);
    });
  })();
</script>
```

The `is:inline` directive ensures the script runs before the first paint, so users never see a flash of the wrong theme.
