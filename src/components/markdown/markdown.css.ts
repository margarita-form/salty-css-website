import { styled } from "@salty-css/react/styled";

export const CodeBlock = styled("div", {
  base: {
    padding: ".5em",
    position: "relative",
  },
});

export const StyledCopyButton = styled("button", {
  base: {
    textStyle: "body.regular",
    position: "absolute",
    top: "0.4em",
    right: "0.25em",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    "--icon-size": "1em",
    padding: 0,
    "@largeMobileDown": {
      display: "none",
    },
  },
});
