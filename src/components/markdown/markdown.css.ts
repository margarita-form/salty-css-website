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

export const TableWrapper = styled("div", {
  base: {
    width: "100%",
    overflowX: "auto",
    marginBlock: "0 {spacing.large}",
  },
});

export const MarkdownTable = styled("table", {
  base: {
    textStyle: "body.small",
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: 0,
    margin: "0",

    "& th": {
      borderBottom: "1px solid {theme.altBackground}",
      padding: "0.75em 1em",
      textAlign: "left",
      fontWeight: "500",
      "&:first-child": {
        paddingLeft: "0",
      },
    },

    "& td": {
      padding: "0.75em 1em",
      borderBottom: "1px solid {theme.altBackground}",
      verticalAlign: "top",
      "&:first-child": {
        paddingLeft: "0",
      },
    },

    "& tr:nth-child(even)": {
      backgroundColor:
        "color-mix(in srgb, {theme.altBackground} 10%, transparent)",
    },

    "& tr:hover": {
      backgroundColor:
        "color-mix(in srgb, {theme.altBackground} 20%, transparent)",
    },
  },
});
