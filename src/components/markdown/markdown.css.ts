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
    top: "0.3em",
    right: "0.25em",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    "--icon-size": "1em",
  },
});
