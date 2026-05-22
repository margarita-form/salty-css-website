## React + Vite

1. In your existing Vite repository you can run `npx salty-css init` to automatically configure Salty CSS.
2. Create your first Salty CSS component with `npx salty-css generate [filePath]` (e.g. `src/custom-wrapper`).
3. Import your component for example to `main.tsx` and see it working!

### Manual configuration — Vite

1. Install the Vite plugin and the core package:
   ```bash
   npm i @salty-css/vite @salty-css/core
   ```
2. In `vite.config.ts` import the plugin and register it:
   ```ts
   import { saltyPlugin } from "@salty-css/vite";

   export default defineConfig({
     plugins: [saltyPlugin(__dirname)],
   });
   ```
3. Make sure that `salty.config.ts` and `vite.config.ts` are in the same folder.
4. Build the `saltygen` directory by running your app once or via the CLI: `npx salty-css build [directory]`.
5. Import global styles from `saltygen/index.css` in your app entry: `@import 'insert_path_to_index_css';`.

### Manual configuration — Webpack

If you have a hand-rolled React + Webpack project (CRA eject, custom config, Rspack via the webpack-compatible API, etc.), wire Salty CSS in directly. If you're on Next.js, use the [Next.js setup](#nextjs) instead — `withSaltyCss` already wraps Webpack for you.

1. Install the Webpack plugin and the runtime packages:
   ```bash
   npm i @salty-css/webpack @salty-css/core @salty-css/react
   ```
2. In `webpack.config.js` import the plugin and apply it to your config object:
   ```js
   const { saltyPlugin } = require("@salty-css/webpack");

   const config = {
     // your existing webpack config
   };

   saltyPlugin(config, __dirname);

   module.exports = config;
   ```
   `saltyPlugin` mutates the config object in place — it pushes the Salty loader rule for `*.css.ts` / `*.salty.ts` / `*.styled.ts` / `*.styles.ts` files and registers the compiler hook that generates `saltygen/` on build start.
3. Create `salty.config.ts` in the same folder as `webpack.config.js`:
   ```ts
   import { defineConfig } from "@salty-css/core/config";

   export const config = defineConfig({
     // Add variables, templates, modifiers as you grow.
   });
   ```
4. Build the `saltygen` directory by running your app once or via the CLI: `npx salty-css build [directory]`.
5. Import global styles from `saltygen/index.css` in a global CSS file that's loaded at your app entry: `@import 'insert_path_to_index_css';`.
