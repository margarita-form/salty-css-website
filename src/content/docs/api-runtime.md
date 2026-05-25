---
title: defineRuntime API
description: API reference for defineRuntime() in Salty CSS — turn arbitrary JSON-shaped style objects (CMS payloads, prop-derived overrides) into scoped CSS at request time, while staying inside the same parser as styled().
preHeadline:
  react: defineRuntime() — Convert CMS JSON Payloads Into Scoped Class Names From React Components
  next: defineRuntime() for App Router — Emit Per-Request Scoped CSS From Server Components and Edge Routes
  astro: defineRuntime() for SSR Astro Pages — Compile CMS JSON Into Scoped Class Names Per Request
visibleHeading:
  react: defineRuntime() for React
  next: defineRuntime() in App Router Server Components
  astro: defineRuntime() in Astro SSR Routes
topic: Runtime Styles
category: api-reference
schemaType: APIReference
keywords:
  [
    defineRuntime,
    runtime styles,
    dynamic CSS,
    CMS-driven styles,
    headless CMS,
    scoped CSS,
    request-time CSS,
    RSC styles,
    React Server Components,
    Astro SSR,
    Salty CSS runtime,
    dynamic class name,
    CSS-in-JS from JSON,
  ]
intent: Reference for the defineRuntime() function — signature, supported features, and the SSR pattern for emitting per-request CSS from JSON.
proficiencyLevel: Expert
priority: 0.6
nextPage: end
apiReferences: [api/styled, api/classname, api/config]
---

`defineRuntime` turns a style object into a `{ className, css }` pair at request time. Unlike [`styled`](/docs/api/styled/) and [`className`](/docs/api/classname/), the input does not have to be known when the project compiles — it can come from a headless CMS, a database row, or props the server resolved on the request. The same parser the build-time compiler uses runs at the call site, so `{token}` references, `@media`, modifiers, and nested selectors all keep working.

Because it returns strings (no in-DOM `<style>` injection, no client style runtime), it composes naturally with server rendering: emit the CSS in a `<style>` tag next to the element in your RSC, Next route handler, or Astro `.astro` file.

## When to reach for `defineRuntime`

Most Salty styling stays compile-time — that's the cheap path. Reach for `defineRuntime` only when the _shape_ of the styles is not known until the request runs:

- **`styled` / `className`** — styles are known when the project compiles. The everyday choice.
- **`defineRuntime`** — the styles arrive as data: a CMS block author dropped in custom CSS, a tenant config supplies brand overrides, a URL param picks a tint. Anything where you cannot put the rule in a `*.css.ts` file because you don't know what the rule is yet.
- **Truly client-only-interactive styles** — mouse-following gradients, drag offsets. Use a regular `style={{ ... }}` prop; `defineRuntime` is a request-time helper, not a per-frame one.

## Import

```ts
import { defineRuntime } from "{{runtimeImport}}";
```

`defineRuntime` is a regular `.ts` import — **not** a `*.css.ts` file. There is nothing for the compiler to extract; the CSS is generated when your server component runs. A framework-agnostic entry point is also available at `@salty-css/core/runtime`.

## Signature

```ts
defineRuntime(config?: Partial<SaltyConfig & CachedConfig>): {
  className(styles: BaseStyles): string;
  css(styles: BaseStyles, scope?: string): Promise<string>;
  resolve(styles: BaseStyles, scope?: string): Promise<{ className: string; css: string }>;
  getDynamicStylesCss: typeof css; // deprecated alias of css
};
```

| Member                | Type                                              | Description                                                                                                                                                                                                                   |
| --------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`           | `(styles) => string`                              | Synchronous deterministic hash of the style object. Structurally-equal inputs yield the same class — useful when you've already emitted the CSS for this shape elsewhere on the page and just need to attach the class.       |
| `css`                 | `(styles, scope?) => Promise<string>`             | Returns the parsed CSS as a string. With no `scope`, declarations are emitted unwrapped (matching `parseStyles` behaviour) so you can drop them inside an existing rule.                                                      |
| `resolve`             | `(styles, scope?) => Promise<{ className, css }>` | The common case. Defaults `scope` to `.${className}`, so the returned CSS is already scoped to the matching class and you can render `<style>{css}</style>` + an element with `className={className}` without further wiring. |
| `getDynamicStylesCss` | alias of `css`                                    | Deprecated. Kept exported for backward compatibility with the standalone helper that predates `defineRuntime`. Prefer `css`.                                                                                                  |

### The `config` argument

`config` is `Partial<SaltyConfig & CachedConfig>` — the same shape `defineConfig` accepts. The fields the runtime actually uses are `variables`, `templates`, `mediaQueries`, and `modifiers`. The practical recipe is to import your project's existing config and pass it in, so CMS-supplied `{colors.brand}` tokens resolve to the same CSS variables your `styled` components already use:

```ts
import { defineRuntime } from "{{runtimeImport}}";
import config from "../../salty.config";

const runtime = defineRuntime(config);
```

`defineRuntime()` (with no argument) is fine when the incoming styles don't reference any tokens or templates.

## Feature support

`defineRuntime` runs the same parser as the build-time compiler, so most Salty features come along for free. The exception is anything that requires a component wrapper — `defineRuntime` returns CSS, not a component.

| Feature                                                         | Supported | Notes                                                                                                                                                                                                            |
| --------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token substitution (`{colors.brand}`)                           | yes       | Pass the matching `variables` in `config`.                                                                                                                                                                       |
| Media queries (`@media (...)`)                                  | yes       | Scoped under the resolved class — `.${className} { ... }` inside the `@media` block.                                                                                                                             |
| Modifiers / pseudo-classes (`&:hover`, `&[data-state]`)         | yes       | Ampersand-expansion is identical to the build-time parser.                                                                                                                                                       |
| Nested selectors (`'& > svg'`)                                  | yes       | Combinators are appended to the scope class.                                                                                                                                                                     |
| Templates (`textStyle: 'caption'`)                              | yes       | Pass the matching `templates` in `config`.                                                                                                                                                                       |
| `variants` / `compoundVariants` / `anyOfVariants`               | partial   | The parser emits the variant selectors (`.${className}.size-sm`, etc.), but there is **no prop → class mapping** here. Either pass a flat object, or select the active branch yourself before calling `resolve`. |
| `defaultVariants`, `defaultProps`, `passProps`, `element`, `as` | no        | These are `styled()` component concepts. `defineRuntime` returns strings.                                                                                                                                        |
| `keyframes`, `defineGlobalStyles`, `defineFont`                 | no        | Build-time only — they need to live in the generated stylesheet, not a per-request `<style>` tag.                                                                                                                |

## Example 1 — CMS block with custom CSS

A content editor pasted a `css` object into a CMS block. Render it inline with the block, scoped to that block instance:

```tsx
// app/blocks/custom-block.tsx (React Server Component)
import { defineRuntime } from "{{runtimeImport}}";
import config from "../../salty.config";

const runtime = defineRuntime(config);

interface CustomBlock {
  heading: string;
  body: string;
  css: Record<string, unknown>; // arbitrary JSON shape from the CMS
}

export async function CustomBlock({ block }: { block: CustomBlock }) {
  const { className, css } = await runtime.resolve(block.css);
  return (
    <section className={className}>
      <style>{css}</style>
      <h2>{block.heading}</h2>
      <p>{block.body}</p>
    </section>
  );
}
```

The class is a hash of `block.css`, so two blocks with identical styles produce the same class — if you want to ship one rule per unique shape, collect the pairs across the request and dedupe by `className` before rendering the `<style>` tags.

The same pattern works in Astro: `await runtime.resolve(block.css)` inside the component frontmatter, then `<style set:html={css} />` + a wrapping element with the class.

## Example 2 — prop-derived per-instance styles

A server component that takes a tenant tint and bakes it into scoped rules — including a hover state and a media query — without ever shipping a client style runtime:

```tsx
import { defineRuntime } from "{{runtimeImport}}";
import config from "../../salty.config";

const runtime = defineRuntime(config);

export async function TenantCard({
  tint,
  children,
}: {
  tint: string;
  children: React.ReactNode;
}) {
  const { className, css } = await runtime.resolve({
    background: tint,
    color: "{colors.text.onBrand}",
    padding: "1rem",
    "&:hover": { filter: "brightness(1.1)" },
    "@media (min-width: 600px)": { padding: "1.5rem" },
  });

  return (
    <article className={className}>
      <style>{css}</style>
      {children}
    </article>
  );
}
```

`{colors.text.onBrand}` resolves against your project config; the `&:hover` and `@media` blocks compose exactly the way they do inside a `styled()` definition.

## Scoping

`resolve(styles)` defaults the scope to `.${className}`, which is what you want most of the time — render the returned CSS in a `<style>` tag and attach the returned class to the wrapping element.

Override the scope when you need to target an existing selector:

```ts
const { css } = await runtime.css(
  { color: "{colors.brand}" },
  "#hero", // emits "#hero { color: var(--colors-brand); }"
);
```

Calling `runtime.css(styles)` with no scope returns unwrapped declarations (`color: red;`) — convenient when you're stitching them into a rule you're building yourself.

## Pitfalls

- **Don't call `defineRuntime` from a `*.css.ts` file.** It's a request-time helper. The compiler ignores its output; only `styled` / `className` / `defineX` factories are extracted from `*.css.ts` files.
- **Pass `config` if your styles reference tokens.** Without `variables`, `{colors.brand}` still renders as `var(--colors-brand)`, but there is no matching CSS variable declaration anywhere on the page.
- **Treat CMS-supplied CSS as untrusted text.** The parser does not sanitize property values — `url(javascript:...)` and friends will pass straight through. Validate at the CMS boundary if editors are not trusted.
- **`variants` blocks emit all branches.** The parser does not know which branch the consumer "picks" — if you want one branch, hand it `resolve(myVariants[active])` rather than the full variants object.

## See also

- [`styled` API](/docs/api/styled/) — the build-time component factory.
- [`className` API](/docs/api/classname/) — build-time class-string output with variants.
- [`defineConfig` reference](/docs/api/config/) — the `variables` / `templates` / `mediaQueries` / `modifiers` shape that `defineRuntime` consumes.
