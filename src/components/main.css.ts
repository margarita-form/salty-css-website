import { styled } from "@salty-css/react/styled";

export const Main = styled("div", {
  base: {
    padding: "{spacing.screen.medium}",
    maxWidth: "1600px",
    textStyle: "body.regular",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.large}",
  },
});

export const WarningBox = styled("p", {
  base: {
    color: "#ffd100",
    background: "tranparent",
    borderRadius: "6px",
    border: "1px solid currentColor",
    padding: "0.5em 1.5em",
    width: "fit-content",
  },
});
