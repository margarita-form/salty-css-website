import { styled } from "@salty-css/react/styled";

export const FrameworkSwitcherTrigger = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
    width: "100%",
    padding: "0.7em 0.7em",
    borderRadius: "0.33em",
    border: "1px solid {theme.altBackground}",
    background: "transparent",
    color: "currentColor",
    cursor: "pointer",
    textStyle: "body.small",
    transition: "0.15s ease-out",
    "&:hover, &:focus-visible": {
      background: "{theme.altBackground}",
      outline: "none",
    },
  },
});

export const FrameworkTriggerIcon = styled("img", {
  base: {
    width: "1em",
    height: "1em",
    flexShrink: 0,
  },
});

export const FrameworkTriggerChevron = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    marginLeft: "auto",
    opacity: 0.7,
    "--icon-size": "0.6em",
    "--icon-margin-inline": "0",
  },
});
