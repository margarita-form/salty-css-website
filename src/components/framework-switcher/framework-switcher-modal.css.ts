import { styled } from "@salty-css/react/styled";
import { fadeIn, slideDown } from "../../styles/animations.css";

export const ModalBackdrop = styled("div", {
  base: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
    animation: fadeIn,
  },
});

export const ModalContainer = styled("div", {
  base: {
    position: "fixed",
    insetInline: 0,
    top: "{spacing.pageMargin}",
    zIndex: 1001,
    margin: "auto",
    backgroundColor: "{theme.background}",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "min(420px, 90vw)",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid {theme.altBackground}",
    animation: slideDown,
    textStyle: "body.small",
  },
});

export const ModalHeader = styled("header", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75em 1em",
    borderBottom: "1px solid {theme.altBackground}",
  },
});

export const ModalTitle = styled("h2", {
  base: {
    textStyle: "body.regular",
    fontWeight: "500",
    margin: 0,
  },
});

export const ModalCloseButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    color: "currentColor",
    border: "none",
    padding: "0.4em",
    margin: 0,
    cursor: "pointer",
    borderRadius: "4px",
    "--icon-size": "1em",
    "&:hover": {
      background: "{theme.altBackground}",
    },
  },
});

export const OptionList = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5em",
    gap: "2px",
  },
});

export const OptionButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.75em",
    padding: "0.6em 0.9em",
    textAlign: "left",
    background: "transparent",
    border: "none",
    color: "currentColor",
    cursor: "pointer",
    borderRadius: "6px",
    textStyle: "body.regular",
    transition: "background-color 0.15s ease-out, outline 0.15s ease-out",
    outline: "1px solid transparent",
    "&:hover, &:focus-visible": {
      background: "{theme.altBackground}",
      outline: "1px solid currentColor",
    },
    "&[aria-checked='true']": {
      background: "{theme.altBackground}",
      // color: "{theme.background}",
    },
  },
});

export const OptionIcon = styled("img", {
  base: {
    width: "1.25em",
    height: "1.25em",
    flexShrink: 0,
  },
});
