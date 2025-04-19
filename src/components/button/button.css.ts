import { styled } from "@salty-css/react/styled";
import { DynamicLink } from "../dynamic-link/dynamic-link";

export const Button = styled(DynamicLink, {
  defaultProps: {
    element: "button",
  },
  base: {
    padding: "0.5em 1.5em",
    borderRadius: "0.5em",
    textStyle: "body.regular",
    border: "1px solid currentColor",
    backgroundColor: "transparent",
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease-out",
    "&:where(:hover, :focus-visible)": {
      borderColor: "{theme.color}",
      backgroundColor: "{theme.color}",
      color: "{theme.background}",
    },
  },
});
