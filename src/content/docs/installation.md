## Installation

Fastest way to get started with any framework is:

```bash
npx salty-css init
```

### Next.js

1. In your existing Next.js repository you can run `npx salty-css init` to automatically configure Salty CSS.
2. Create your first Salty CSS component with `npx salty-css generate [filePath]` (e.g. src/custom-wrapper)
3. Import your component for example to `page.tsx` and see it working!

#### Manual configuration

1. For Next.js support install `npm i @salty-css/next @salty-css/core @salty-css/react`
2. Create `salty.config.ts` to your app directory
3. Add Salty CSS plugin to next.js config:
   - **Next.js 15:** In `next.config.ts` add import for salty plugin `import { withSaltyCss } from '@salty-css/next';` and then add `withSaltyCss` to wrap your nextConfig export like so `export default withSaltyCss(nextConfig);`
   - **Next.js 14 and older:** In `next.config.js` add import for salty plugin `const { withSaltyCss } = require('@salty-css/next');` and then add `withSaltyCss` to wrap your nextConfig export like so `module.exports = withSaltyCss(nextConfig);`
4. Make sure that `salty.config.ts` and `next.config.ts` are in the same folder!
5. Build `saltygen` directory by running your app once or with cli `npx salty-css build [directory]`
6. Import global styles from `saltygen/index.css` to some global css file with `@import 'insert_path_to_index_css';`.

### React + Vite

1. In your existing Vite repository you can run `npx salty-css init` to automatically configure Salty CSS.
2. Create your first Salty CSS component with `npx salty-css generate [filePath]` (e.g. src/custom-wrapper)
3. Import your component for example to `main.tsx` and see it working!

#### Manual configuration

1. For Vite support install `npm i @salty-css/vite @salty-css/core`
2. In `vite.config` add import for salty plugin `import { saltyPlugin } from '@salty-css/vite';` and then add `saltyPlugin(__dirname)` to your vite configuration plugins
3. Make sure that `salty.config.ts` and `vite.config.ts` are in the same folder!
4. Build `saltygen` directory by running your app once or with cli `npx salty-css build [directory]`
5. Import global styles from `saltygen/index.css` to some global css file with `@import 'insert_path_to_index_css';`.
