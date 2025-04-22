# Media Queries

Media queries allow you to apply different styles based on device characteristics like screen size, device type, or orientation. Salty CSS provides a powerful and intuitive API for creating and using media queries.

## Creating Media Queries

With Salty CSS, you can define reusable media queries using the `defineMediaQuery` function:

```ts
// /styles/media.css.ts
import { defineMediaQuery } from "@salty-css/react/config";

// Mobile breakpoints
export const largeMobileDown = defineMediaQuery((media) => media.maxWidth(900));
export const smallMobileDown = defineMediaQuery((media) => media.maxWidth(400));

// Desktop breakpoints
export const mediumDesktopDown = defineMediaQuery((media) =>
  media.maxWidth(1440)
);
export const smallDesktopDown = defineMediaQuery((media) =>
  media.maxWidth(1100)
);

// Feature-based media queries
export const darkMode = defineMediaQuery((media) =>
  media.prefersColorScheme("dark")
);
export const lightMode = defineMediaQuery((media) =>
  media.prefersColorScheme("light")
);
```

## Using Media Queries in Components

Once defined, you can use these media queries directly in your component styles:

```ts
import { styled } from "@salty-css/react/styled";

export const ResponsiveBox = styled("div", {
  base: {
    padding: "{spacing.large}",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "{spacing.medium}",

    // Use media queries as properties prefixed with '@'
    "@mediumDesktopDown": {
      gridTemplateColumns: "1fr",
      gap: "{spacing.small}",
    },

    // For small screens, adjust padding further
    "@largeMobileDown": {
      padding: "{spacing.medium}",
    },

    // Even smaller screens
    "@smallMobileDown": {
      padding: "{spacing.small}",
    },
  },
});
```

The media queries can be referenced directly by name with the `@` prefix in your styles. This creates cleaner, more maintainable code compared to inline media queries.

## Real-world Usage Example

Here's an actual example from this website's header component:

```ts
// From header.css.ts
export const Navigation = styled("nav", {
  base: {
    margin: 0,
    display: "grid",
    gridAutoFlow: "column",
    gap: "{spacing.large}",
    alignItems: "center",

    // Progressive adjustment of spacing as screen size decreases
    "@mediumDesktopDown": {
      gap: "{spacing.medium}",
    },
    "@smallDesktopDown": {
      gap: "{spacing.small}",
    },
  },
});

export const Links = styled("ul", {
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "{spacing.medium}",

    // Transform to vertical menu on small screens
    "@smallDesktopDown": {
      display: "none",
      "&.open": {
        display: "flex",
        flexDirection: "column",
        // ...other mobile menu styles
      },
    },
  },
});
```

## Available Media Query Methods

The media query builder provides several methods:

| Method/Property              | Description                                                |
| ---------------------------- | ---------------------------------------------------------- |
| `minWidth(value)`            | Matches when viewport width is at least `value`            |
| `maxWidth(value)`            | Matches when viewport width is at most `value`             |
| `minHeight(value)`           | Matches when viewport height is at least `value`           |
| `maxHeight(value)`           | Matches when viewport height is at most `value`            |
| `prefersColorScheme(scheme)` | Matches user's color scheme preference (`dark` or `light`) |
| `dark`                       | Shorthand for `prefersColorScheme("dark")`                 |
| `light`                      | Shorthand for `prefersColorScheme("light")`                |
| `portrait`                   | Matches when device is in portrait orientation             |
| `landscape`                  | Matches when device is in landscape orientation            |
| `reducedMotion`              | Matches when user has requested reduced motion             |
| `print`                      | Targets print media type                                   |
| `screen`                     | Targets screen media type                                  |
| `speech`                     | Targets speech synthesizers                                |
| `all`                        | Targets all device types                                   |
| `not`                        | Negates the media query                                    |
| `custom(value)`              | Creates a custom media query with the provided value       |

## Combining Media Queries

You can combine multiple conditions using `and()` and `or()` methods:

```ts
// Match both conditions (tablet in portrait orientation)
export const tabletPortrait = defineMediaQuery((media) =>
  media
    .minWidth(768)
    .and(media.maxWidth(1024))
    .and(media.orientation("portrait"))
);

// Match either condition (dark mode OR mobile)
export const darkOrMobile = defineMediaQuery((media) =>
  media.prefersColorScheme("dark").or(media.maxWidth(480))
);
```

## Media Queries and Viewport Clamps

Media queries work exceptionally well with viewport clamps for fully responsive designs:

```ts
import { styled } from "@salty-css/react/styled";
import { HDClamp, MobileClamp } from "../styles/helpers.css";

export const ResponsiveText = styled("h1", {
  base: {
    // Scale font size fluidly for larger screens
    fontSize: HDClamp(48),

    // Switch to mobile-optimized scaling at breakpoint
    "@largeMobileDown": {
      fontSize: MobileClamp(32),
    },
  },
});
```

## Best Practices

1. **Define all media queries in a central file** for consistency across your application.
2. **Use semantic names** that describe the purpose or device target rather than specific dimensions.
3. **Create a logical breakpoint system** that covers your key device targets.
4. **Combine with responsive tokens or viewport clamps** for truly fluid responsive designs.
5. **Be consistent** with your naming patterns (e.g., `smallDesktopDown`, `largeMobileDown`).
6. **Test thoroughly** across different devices and screen sizes.
