---
title: Styled Function API
description: Full API reference for the styled() function in Salty CSS — signature, options, and examples.
topic: Styled Function
category: api-reference
schemaType: APIReference
keywords: [styled, api reference, function signature, options]
intent: Reference for the styled() function — signature, options, variants, and usage examples.
proficiencyLevel: Expert
priority: 0.7
---

# Styled function

Styled function is the main way to use Salty CSS in {{frameworkRuntime}}. Styled function creates a {{componentNoun}} that then can be used {{usageContext}}. All styled functions must be created in `.css.ts` or `.css.tsx` files

```ts
// /components/my-component.css.ts
import { styled } from "{{styledImport}}";

// Define a component with a styled function. First argument is the component name or existing component to extend and second argument is the object containing the styles and other options
export const Component = styled("div", {
  className: "wrapper", // Define optional custom class name that will be included for this component
  element: "section", // Override the html element that will be rendered for this component
  base: {
    // 👉 Add your CSS-in-JS base styles here! 👈
  },
  variants: {
    // Define conditional styles that will be applied to the component based on the variant prop values
  },
  compoundVariants: [
    // Define conditional styles that will be applied to the component based on the combination of variant prop values
  ],
  defaultVariants: {
    // Set default variant prop values
  },
  defaultProps: {
    // Add additional default props for the component (eg, id and other html element attributes)
  },
  passProps: true, // Pass variant props to the rendered element / parent component (default: false)
  priority: 1, // Override automatic priotity layer with a custom value (0-8), higher is considered more important
});
```

## Example usage:

{{fw-snippet:styled-hello}}
