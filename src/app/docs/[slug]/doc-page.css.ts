import { styled } from "@salty-css/react/styled";
import { HDClamp } from "../../../styles/helpers.css";

export const DocPageWrapper = styled("div", {
  base: {
    padding: "0 {spacing.large} {spacing.large}",
    lineHeight: "1.5em",
    fontStyle: "initial",
    maxWidth: HDClamp(960),
    "@smallDesktopDown": {
      padding: 0,
    },
    "h1:has(+ .heading)": {
      marginBottom: "1em",
    },
    ".heading": {
      ":not(:first-child)": {
        marginTop: "1.5em",
      },
      marginBottom: "0.5em",
    },
    p: {
      marginBlock: "1em",
    },
    pre: {
      marginBlock: "2em",
    },
    "*:is(p,pre,ul,ol) + h3": {
      marginTop: "1.5em",
    },
  },
});
