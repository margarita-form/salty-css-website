---
title: Imports
description: Pull external CSS into your Salty CSS build with defineImport — relative paths, npm packages, public assets, and URLs.
topic: Imports
category: guide
schemaType: TechArticle
keywords: [imports, defineImport, css imports, third-party css, layer imports]
intent: Add external CSS to your build with defineImport — local files, npm packages, and remote stylesheets.
proficiencyLevel: Intermediate
priority: 0.6
---

# Imports

`defineImport` lets you pull external CSS into your Salty CSS build — a third-party reset, a vendor stylesheet, a print stylesheet, or anything else that lives outside your `.css.ts` files. The imports land in their own `@layer imports` block at the very top of the cascade, so they always lose to anything you write in Salty.

If you only need to register web fonts, reach for [`defineFont`](/docs/fonts/) instead — it gives you a CSS variable and class to consume.

## Basic usage

Call `defineImport` with one or more URLs. Each argument becomes one `@import` line in the generated `_imports.css`:

```ts
// /styles/imports.css.ts
import { defineImport } from "@salty-css/core/factories";

export default defineImport(
  "modern-normalize/modern-normalize.css",
  "./vendor/highlight-theme.css",
  "https://fonts.googleapis.com/css2?family=Inter&display=swap",
);
```

Salty CSS picks the file up the same way it picks up any other `*.css.ts`: register it once and the imports show up in your build output.

## Path resolution

The string you pass is forwarded to your bundler's CSS resolver, so the rules match whatever you'd write in a regular `@import` directive:

| Form                                 | Resolves to                                                              |
| ------------------------------------ | ------------------------------------------------------------------------ |
| `'./reset.css'`                      | A file relative to the `.css.ts` that declared the import.               |
| `'../shared/print.css'`              | A file at a parent path, also relative.                                  |
| `'modern-normalize/modern-normalize.css'` | An npm package — the bundler walks `node_modules` for it.           |
| `'~package/file.css'`                | The same as above; the `~` prefix is supported by webpack/Vite tooling.  |
| `'/styles/legacy.css'`               | A file at the public/asset root (served at runtime).                     |
| `'https://example.com/lib.css'`      | A remote stylesheet — emitted as a runtime `@import url(...)`.           |

## Conditional imports

For media-specific or feature-gated stylesheets, pass an object instead of a string:

```ts
// /styles/imports.css.ts
import { defineImport } from "@salty-css/core/factories";

export default defineImport(
  { url: "./print.css", media: "print" },
  { url: "./wide-gamut.css", supports: "color(display-p3 1 1 1)" },
);
```

Both `media` and `supports` translate to the corresponding `@import` descriptor (`@import url("./print.css") print;`, `@import url("./wide-gamut.css") supports(color(display-p3 1 1 1));`).

You can mix string and object forms freely in the same call:

```ts
defineImport(
  "modern-normalize/modern-normalize.css",
  { url: "./print.css", media: "print" },
);
```

## Where imports land in the cascade

Salty CSS uses CSS cascade layers internally. Imports go into `@layer imports`, which is declared **before** every other Salty layer (`reset`, `globals`, `templates`, `components`, `priorities`). The practical effect: anything you import will never accidentally win against a style you wrote with `styled` or `className`, regardless of selector specificity.

If you need a third-party stylesheet to actually win, override the specific properties in your own styles — or bump the relevant Salty rule's `priority`.

## Common use cases

### A third-party CSS reset

```ts
import { defineImport } from "@salty-css/core/factories";

export default defineImport("modern-normalize/modern-normalize.css");
```

Combine this with `defineConfig({ reset: 'none' })` if you don't want Salty CSS's built-in reset on top of it. See [`defineConfig` reference](/docs/api/config/).

### A syntax-highlight theme

When you're using a library like Prism or Shiki, drop its theme stylesheet in via `defineImport` so it ships with the rest of your build:

```ts
import { defineImport } from "@salty-css/core/factories";

export default defineImport("prismjs/themes/prism-tomorrow.css");
```

### A print stylesheet

```ts
import { defineImport } from "@salty-css/core/factories";

export default defineImport({ url: "./print.css", media: "print" });
```

The browser only fetches the file when the page is actually printed.

### A remote stylesheet (Google Fonts, CDN UI kit, etc.)

```ts
import { defineImport } from "@salty-css/core/factories";

export default defineImport(
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap",
);
```

For web fonts specifically, prefer [`defineFont`](/docs/fonts/) so the font ends up with a stable `.variable` and `.className` you can use in styles.

## See also

- [Fonts](/docs/fonts/) — the right tool for font registration.
- [Basics](/docs/basics/) — how global styles interact with imports.
- [`defineConfig` reference](/docs/api/config/) — `reset` option and other globals.
