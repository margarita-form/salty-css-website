# `className` API reference

`className` produces a reusable, build-time-generated CSS class for use with any element. It is a lightweight alternative to `styled` when you don't need a React component wrapper — you just want a class string with variants, nesting, tokens, and the rest of Salty CSS's style features. The returned value behaves like a `string` (so it slots straight into a JSX `className` attribute) but also exposes a `.variant()` method for chaining variant classes onto it.

For runnable examples and patterns, see [`classnames`](/docs/classnames/).

## Import

```ts
import { className } from "@salty-css/react/class-name";
```

All Salty CSS style definitions must live in `*.css.ts` (or `*.css.tsx`) files so the build-time compiler can pick them up.

## Signature

```ts
className(params: StyledParams): ClassNameFunction
```

`ClassNameFunction` is a `string`-coercible object with extra members:

```ts
type ClassNameFunction = string & {
  variant: (name: string, value: string) => ClassNameFunction;
  generator: ClassNameGenerator;
  isClassName: true;
};
```

## Options

| Key                | Type                                     | Description                                                                                                                                                                                                        |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `base`             | `CSSinJS`                                | Base styles applied to every use of the class. Supports the full Salty style-object syntax (see [Style features](#style-features)).                                                                                |
| `className`        | `string \| string[]`                     | One or more custom class names appended to the generated hash. Useful for stable selectors you can target from external CSS or DevTools.                                                                           |
| `variants`         | `{ [name]: { [value]: CSSinJS } }`       | Named style variants. Activated at runtime by chaining `.variant(name, value)`.                                                                                                                                    |
| `defaultVariants`  | `{ [name]: value }`                      | Declarative defaults consumed by `styled`. With `className`, defaults **do not auto-apply** at runtime — you must chain `.variant()` yourself. See the guide for the recommended helper pattern.                   |
| `compoundVariants` | `Array<{ [name]: value, css: CSSinJS }>` | Extra styles applied only when **all** of the listed variant values are active.                                                                                                                                    |
| `anyOfVariants`    | `Array<{ [name]: value, css: CSSinJS }>` | Extra styles applied when **any** of the listed variant values is active. Generated with `:where()`, so the rule has zero specificity and loses to a regular variant rule on the same property.                    |
| `displayName`      | `string`                                 | Label used by the build output for debugging.                                                                                                                                                                      |
| `priority`         | `number`                                 | CSS layer priority used to order rules in the cascade. Defaults to `0` for `className` (lower than `styled`'s default). Higher numbers come later in the cascade and therefore win conflicts at equal specificity. |

### Ignored on `className`

`StyledParams` also defines `element`, `passProps`, and `defaultProps`. These are only meaningful for `styled`, which renders an actual React component. `className` returns a class string, so it has no element to override and no props to pass through — these keys are accepted by the type but have no effect.

## Returned value

The result of `className({ ... })` exposes:

| Member                  | Description                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| string coercion         | Produces the generated hash class (e.g. `"s_1a2b3c4"`), so `<div className={myClass} />` and `` `my-prefix ${myClass}` `` both work.                         |
| `.variant(name, value)` | Returns a **new** `ClassNameFunction` with `"name-value"` appended. Immutable: the original is unchanged. Chainable: `.variant("a", "1").variant("b", "2")`. |
| `.generator`            | The underlying `ClassNameGenerator`. Used by Salty's build tooling — not intended for app code.                                                              |
| `.isClassName`          | Always `true`. Useful for runtime detection (e.g. when writing a helper that accepts either a raw string or a Salty class).                                  |

## Style features

The same style-object features that work in `styled` work in `className`. See the [guide](./classnames.md) for examples of each.

- **Pseudo-selectors** with `&`: `'&:hover'`, `'&:disabled'`, `'&::before'`, including chained forms like `'&:hover:focus'` and grouped forms like `'&:hover, &:focus'`.
- **Combinators**: `'& > svg'`, `'& + .sibling'`, `'& ~ p'`, `'& span'`. The `&` is replaced with the generated class selector.
- **Nested object selectors**: nest a style object under any selector key; nested selectors and pseudos compose with the parent.
- **`@media` and `@container` queries**: `'@media (min-width: 600px)': { ... }`. If your config defines aliases, you can also write `'@tablet': { ... }`.
- **Token references**: `'{colors.brand}'`, `'{spacings.large}'`. Tokens come from your `defineVariables` config.
- **Template keys**: shorthand keys defined in your config, e.g. `textStyle: 'body.small'`.
- **Function values**: `color: () => 'red'`. Functions are evaluated at build time.
- **Array values**: arrays are joined with `,`, e.g. `boxShadow: ['0 1px 2px #000', '0 2px 8px #0003']`.
