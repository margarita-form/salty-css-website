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
   - **Next.js 15 and newer (incl. 16.2)** — in `next.config.ts`:
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

### `withSaltyCss` options

Both Webpack and Turbopack are supported; `withSaltyCss` auto-detects which one Next.js is running (`next dev --turbopack` sets `process.env.TURBOPACK=1`) and picks the matching integration. Pass a second argument to override:

```ts
withSaltyCss(nextConfig, {
  bundler: "auto",     // 'auto' | 'webpack' | 'turbopack' — default 'auto'
  mode: undefined,     // 'production' | 'development' — defaults to NODE_ENV
  dir: undefined,      // project root for Turbopack; defaults to nextConfig.turbopack.root or process.cwd()
});
```

> {{ssrNote}}
