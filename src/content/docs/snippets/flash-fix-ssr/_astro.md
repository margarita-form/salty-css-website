**Astro (SSR mode)** — read the cookie in your layout template and set the attribute on `<html>`:

```astro
---
// /src/layouts/Layout.astro
const theme = Astro.cookies.get("theme")?.value ?? "light";
---
<html data-theme={theme}>
  <body><slot /></body>
</html>
```

For a fully static Astro build (no SSR adapter), skip to the inline-script approach below.
