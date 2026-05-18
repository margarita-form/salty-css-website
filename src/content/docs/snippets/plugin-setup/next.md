## Next.js

1. In your existing Next.js repository you can run `npx salty-css init` to automatically configure Salty CSS.
2. Create your first Salty CSS component with `npx salty-css generate [filePath]` (e.g. `src/custom-wrapper`).
3. Import your component for example to `page.tsx` and see it working!

### Manual configuration

1. Install the Next.js plugin and the runtime packages:
   ```bash
   npm i @salty-css/next @salty-css/core @salty-css/react
   ```
2. Create `salty.config.ts` in your app directory.
3. Wire the plugin into your Next config:
   - **Next.js 15** — in `next.config.ts`:
     ```ts
     import { withSaltyCss } from "@salty-css/next";

     export default withSaltyCss(nextConfig);
     ```
   - **Next.js 14 and older** — in `next.config.js`:
     ```js
     const { withSaltyCss } = require("@salty-css/next");

     module.exports = withSaltyCss(nextConfig);
     ```
4. Make sure that `salty.config.ts` and `next.config.ts` are in the same folder.
5. Build the `saltygen` directory by running your app once or via the CLI: `npx salty-css build [directory]`.
6. Import global styles from `saltygen/index.css` in some global css file: `@import 'insert_path_to_index_css';`.

> {{ssrNote}}
