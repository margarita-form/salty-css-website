import { styled } from "@salty-css/react/styled";
import { fadeIn, slideDown } from "../../../../styles/animations.css";

export const SearchModalBackdrop = styled("div", {
  base: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
    animation: fadeIn,
  },
});

export const SearchModalContainer = styled("div", {
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
    maxWidth: "min(600px, 90vw)",
    height: "fit-content",
    maxHeight: "min(90vh, 800px)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid {theme.altBackground}",
    animation: slideDown,
    textStyle: "body.small",
  },
});

export const SearchInputContainer = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    padding: "0.75em 1em",
    borderBottom: "1px solid {theme.altBackground}",
  },
});

export const SearchInput = styled("input", {
  base: {
    flex: 1,
    border: "none",
    background: "transparent",
    color: "{theme.color}",
    outline: "none",
    padding: "0.5em",
    width: "100%",
  },
});

export const SearchResults = styled("div", {
  base: {
    overflowY: "auto",
    flex: 1,
  },
});

export const SearchResultItem = styled("a", {
  base: {
    display: "flex",
    flexDirection: "column",
    padding: "0.75em 1em",
    textDecoration: "none",
    color: "{theme.color}",
    transition: "background-color 0.2s",
    cursor: "pointer",

    "&:hover, &.active": {
      backgroundColor: "{theme.altBackground}",
    },
  },
});

export const SearchResultTitle = styled("div", {
  base: {
    fontWeight: "500",
    marginBottom: "0.25em",
  },
});

export const SearchResultDescription = styled("div", {
  base: {
    opacity: 0.8,
  },
});

export const SearchShortcut = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    marginLeft: "0.5em",
    opacity: 0.6,
  },
});

export const KeyboardShortcut = styled("kbd", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "{theme.altBackground}",
    color: "{theme.color}",
    borderRadius: "4px",
    padding: "0.2em 0.4em",
    minWidth: "20px",
    textAlign: "center",
    "@media (pointer: coarse)": {
      display: "none",
    },
  },
});

export const SearchCloseButton = styled("button", {
  base: {
    display: "none",
    textStyle: "body.regular",
    "@media (pointer: coarse)": {
      display: "flex",
      alignItems: "center",
      background: "transparent",
      color: "white",
      border: "none",
      padding: "0.125em",
      margin: 0,
      lineHeight: "1em",
      position: "absolute",
      top: "1.25em",
      right: "1em",
      cursor: "pointer",
      "--icon-size": "1em",
    },
  },
});
