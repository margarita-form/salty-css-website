import { defineTemplates } from "@salty-css/core/factories";

export default defineTemplates({
  textStyle: {
    headline: {
      small: {
        fontSize: "{fontSize.headline.small}",
        fontWeight: "400",
        letterSpacing: "0.0125em",
        lineHeight: "1.2em",
      },
      regular: {
        fontSize: "{fontSize.headline.regular}",
        fontWeight: "400",
        letterSpacing: "0.0125em",
        lineHeight: "1.2em",
      },
      large: {
        fontSize: "{fontSize.headline.large}",
        fontWeight: "400",
        letterSpacing: "0.0125em",
        lineHeight: "1.2em",
      },
    },
    body: {
      small: {
        fontSize: "{fontSize.body.small}",
        fontWeight: "300",
        letterSpacing: "0.0125em",
        lineHeight: "1.5em",
      },
      regular: {
        fontSize: "{fontSize.body.regular}",
        fontWeight: "300",
        letterSpacing: "0.0125em",
        lineHeight: "1.4em",
      },
      large: {
        fontSize: "{fontSize.body.large}",
        fontWeight: "300",
        letterSpacing: "0.0125em",
        lineHeight: "1.3em",
      },
    },
  },
});
