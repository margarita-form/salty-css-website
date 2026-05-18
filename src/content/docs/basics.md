---
title: Styling Basics
description: Understand styled components, className, tokens, and global styles in Salty CSS.
topic: Styling Basics
category: guide
schemaType: TechArticle
keywords: [basics, styled, classname, tokens, globals]
intent: Learn the fundamental building blocks of Salty CSS — styled, className, tokens, and global styles.
proficiencyLevel: Beginner
priority: 0.8
---

# Basic Concepts

This guide explains the fundamental concepts of styling with Salty CSS.

## Styled Function

The `styled` function is the main way to use Salty CSS in {{frameworkRuntime}}. It creates a {{componentNoun}} that can be used {{usageContext}}.

```ts
// /components/my-component.css.ts
import { styled } from "{{styledImport}}";

export const Component = styled("div", {
  className: "wrapper", // Define optional custom class name that will be included for this component
  element: "section", // Override the html element that will be rendered for this component
  base: {
    display: "flex",
    padding: "1rem",
    // Add your CSS-in-JS base styles here
  },
});
```

## Class Name Function

The `className` function creates CSS class names with the possibility to add scope and media queries. It's similar to `styled` but doesn't allow extending components or classes.

```ts
// /components/my-class.css.ts
import { className } from "{{classNameImport}}";

export const myClass = className({
  className: "wrapper", // Define optional custom class name that will be included to the scope
  base: {
    display: "flex",
    padding: "1rem",
    // Add your CSS-in-JS base styles here
  },
});
```

Usage example:

{{fw-snippet:classname-hello}}

## Global Styles

Global styles allow you to define styles for HTML elements that apply throughout your application.

```ts
// /styles/global.css.ts
import { defineGlobalStyles } from "@salty-css/core/factories";

export default defineGlobalStyles({
  html: {
    fontFamily: "Arial, sans-serif",
  },
  body: {
    backgroundColor: "#fff",
    margin: 0,
  },
  // Add more global styles as needed
});
```

## CSS Variables (Tokens)

CSS variables create design tokens that can be reused throughout your application.

```ts
// /styles/variables.css.ts
import { defineVariables } from "@salty-css/core/factories";

export default defineVariables({
  colors: {
    dark: "#111",
    light: "#fefefe",
    brand: {
      main: "#0070f3",
      highlight: "#ff4081",
    },
  },
  fontFamily: {
    heading: "Arial, sans-serif",
    body: "Georgia, serif",
  },
});
```

Usage example:

```ts
styled("span", {
  base: {
    fontFamily: "{fontFamily.heading}",
    fontSize: "{fontSize.heading.regular}",
    color: "{theme.textColor}",
  },
});
```
