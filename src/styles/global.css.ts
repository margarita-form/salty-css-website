import { defineGlobalStyles } from "@salty-css/core/config";

export const globalStyles = defineGlobalStyles({
  html: {
    scrollBehavior: "smooth",
    scrollPaddingTop: "5vh",
  },
  body: {
    margin: "0px",
    fontFamily: "var(--font-family-main, helvetica, sans-serif)",
    overflowY: "scroll",
  },
  a: {
    color: "currentcolor",
  },
  code: {
    background: "{theme.terminalBackground}",
  },
  strong: {
    fontWeight: "500",
  },
  ":where(p,li) > code": {
    padding: "2px 4px",
    border: "1px solid {theme.altBackground}",
    color: "{colors.highlight}",
  },
  "pre:has(code)": {
    background: "{theme.terminalBackground}",
    overflow: "auto",
    border: "1px solid {theme.altBackground}",
    fontSize: "{fontSize.body.small}",
    lineHeight: "1.2em",
    position: "relative",
    maxWidth: "100%",
  },
  // Add a language label to code blocks
  "*[data-language]::before": {
    content: "attr(data-language)",
    position: "absolute",
    top: "0",
    right: "2.5em",
    padding: "0.5em 0.6em 0.3em",
    textTransform: "uppercase",
    background: "{theme.altBackground}",
    color: "{theme.color}",
    borderBottomLeftRadius: "0.2em",
    borderBottomRightRadius: "0.2em",
    opacity: "0.7",
  },
});
