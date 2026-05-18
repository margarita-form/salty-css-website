## React + Vite

1. In your existing Vite repository you can run `npx salty-css init` to automatically configure Salty CSS.
2. Create your first Salty CSS component with `npx salty-css generate [filePath]` (e.g. `src/custom-wrapper`).
3. Import your component for example to `main.tsx` and see it working!

### Manual configuration

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
