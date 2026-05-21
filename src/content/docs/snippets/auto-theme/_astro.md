```astro
---
// src/components/AutoTheme.astro
---

<script is:inline>
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const apply = (matches) => {
    document.documentElement.dataset.theme = matches ? "dark" : "light";
  };
  apply(query.matches);
  query.addEventListener("change", (event) => apply(event.matches));
</script>
```

Drop `<AutoTheme />` into your root layout. The `is:inline` directive ensures the script runs synchronously before the first paint, so users never see a flash of the wrong theme.
