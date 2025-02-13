import { GlobalStyles } from "@salty-css/core/config";

export const globalStyles: GlobalStyles = {
  body: {
    margin: 0,
    fontFamily: "var(--font-family-main, helvetica, sans-serif)",
  },
  a: {
    color: "currentcolor",
  },
  code: {
    background: "{theme.terminalBackground}",
  },
  ":where(p,li) > code": {
    padding: "2px 4px",
    border: "1px solid {theme.altBackground}",
    color: "{colors.highlight}",
  },
  "pre:has(code)": {
    background: "{theme.terminalBackground}",
    padding: "20px",
    overflow: "auto",
    border: "1px solid {theme.altBackground}",
    fontSize: "{fontSize.body.small}",
    lineHeight: "1.2em",
  },
};
