---
title: Installation
description: Install Salty CSS and wire up the build-time plugin for your framework.
topic: Installation
category: tutorial
schemaType: TechArticle
keywords: [installation, install, setup, plugin, configuration]
intent: Install the Salty CSS packages and register the build-time plugin for your framework.
proficiencyLevel: Beginner
priority: 0.8
---

# Installation

Fastest way to get started with any framework is:

```bash
npx salty-css init
```

The init command detects your framework, installs the right packages, creates `salty.config.ts`, and wires the build plugin into your existing bundler config. For most projects that's all you need.

{{snippet:install-cli}}

{{fw-snippet:plugin-setup}}

## Manual setup

If `salty-css init` picks the wrong framework, can't find your bundler config, or you'd rather wire things up by hand, follow the manual setup for your stack. The framework-specific snippet above includes the precise commands and config edits; the steps below are the universal shape.

1. **Install the packages.** Each framework needs its runtime plus the core compiler:
   - Next.js: `npm i @salty-css/next @salty-css/core @salty-css/react`
   - React + Vite: `npm i @salty-css/vite @salty-css/core @salty-css/react`
   - React + Webpack: `npm i @salty-css/webpack @salty-css/core @salty-css/react`
   - Astro: `npm i @salty-css/astro @salty-css/core`
2. **Wire the bundler plugin.** `withSaltyCss(nextConfig)` for Next.js, `saltyPlugin(__dirname)` for Vite, `saltyPlugin(config, __dirname)` in `webpack.config.js` for Webpack, the integration for Astro.
3. **Create `salty.config.ts`** in the same directory as your bundler config (e.g. next to `next.config.ts` or `vite.config.ts`):
   ```ts
   import { defineConfig } from "{{configImport}}";

   export const config = defineConfig({
     // Add variables, templates, modifiers as you grow.
   });
   ```
4. **Import the generated stylesheet.** With the default `importStrategy: 'root'`, Salty CSS expects one stylesheet to be imported at your app root. Most framework plugins do this for you on first run; if not, add `@import "../saltygen/index.css";` (or the appropriate path) to your global CSS.
5. **Build once.** Run your dev server (or `npx salty-css build`) so `saltygen/` exists before the first render.

## Peer dependencies

You'll need:

| Package         | Version              | Notes                                                            |
| --------------- | -------------------- | ---------------------------------------------------------------- |
| `node`          | 18 or newer          | Required for the build pipeline (esbuild + ESM).                 |
| `typescript`    | 5.x                  | Needed because `.css.ts` files are evaluated through TypeScript. |
| `react`         | 18 or 19 (when using React/Next) | The `@salty-css/react` runtime targets modern React.  |
| `next`          | 13 (App Router) or newer | For `@salty-css/next`.                                       |
| `vite`          | 5 or newer           | For `@salty-css/vite`.                                           |
| `astro`         | 4 or newer           | For `@salty-css/astro`.                                          |

The exact ranges live in each package's `peerDependencies` — check `package.json` if you're on a fringe version.

## Verify your install

After running the dev server (or `npx salty-css build`), confirm:

1. **`saltygen/` exists** at the root of the package you initialised. It should contain at least `index.css` and a `salty.config.js` snapshot.
2. **`saltygen/index.css` is non-empty.** A few `@layer` declarations and your reset should be there even before you write any components.
3. **A test component renders styled.** Create a `*.css.ts` file with a tiny styled component, use it on a page, and inspect the element in DevTools — you should see a class like `s_xxxx` and a matching rule in the Styles panel.
4. **No build warnings about missing plugin.** Salty CSS logs a warning at build time if the plugin didn't load — search your terminal output for `salty-css`.

If any step fails, jump to [Troubleshooting](/docs/troubleshooting/).

Want the linter to catch missing `export`s and misplaced `variants` before they reach the compiler? See [ESLint setup](/docs/eslint/).
