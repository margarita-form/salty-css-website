## Astro

1. In your existing Astro repository you can run `npx salty-css init` to automatically configure Salty CSS.
2. Create your first Salty CSS component with `npx salty-css generate [filePath]` (e.g. `src/custom-wrapper`).
3. Import your component in any `.astro` page or layout and see it working!

### Manual configuration

1. Install the Astro integration:
   ```bash
   npm i @salty-css/astro
   ```
2. Create `salty.config.ts` in your project root.
3. Add the Salty CSS integration to `astro.config.mjs`:
   ```ts
   import { defineConfig } from "astro/config";
   import salty from "@salty-css/astro";

   export default defineConfig({
     integrations: [salty()],
   });
   ```
4. Make sure that `salty.config.ts` and `astro.config.mjs` are in the same folder.
5. Build the `saltygen` directory by running your app once or via the CLI: `npx salty-css build [directory]`.
6. Import global styles from `saltygen/index.css` in your global stylesheet: `@import 'insert_path_to_index_css';`.
