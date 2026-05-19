import { defineTemplates } from "@salty-css/core/factories";

export default defineTemplates({
  textStyle: {
    headline: {
      base: {
        fontWeight: "300",
        letterSpacing: "0.0125em",
        lineHeight: "1.2em",
        fontFamily: "var(--font-family-logo)",
      },
      small: {
        fontSize: "{fontSize.headline.small}",
      },
      regular: {
        fontSize: "{fontSize.headline.regular}",
      },
      large: {
        fontSize: "{fontSize.headline.large}",
      },
    },
    body: {
      base: {
        fontWeight: "300",
        letterSpacing: "0.0125em",
        lineHeight: "1.5em",
      },
      xs: {
        fontSize: "{fontSize.body.xs}",
      },
      small: {
        fontSize: "{fontSize.body.small}",
      },
      regular: {
        fontSize: "{fontSize.body.regular}",
        lineHeight: "1.4em",
      },
      large: {
        fontSize: "{fontSize.body.large}",
        lineHeight: "1.3em",
      },
    },
    code: {
      regular: {
        fontSize: "{fontSize.code.regular}",
        fontWeight: "300",
        letterSpacing: "0.025em",
        lineHeight: "1.66em",
      },
    },
  },
});
