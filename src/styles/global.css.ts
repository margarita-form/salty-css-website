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
    background: "{theme.altBackground}",
  },
  ":where(p,li) > code": {
    padding: "1px 2px",
  },
  "pre:has(code)": {
    background: "{theme.altBackground}",
    padding: "16px",
    overflow: "auto",
  },
};
