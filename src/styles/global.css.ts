import { CssStyles } from "@salty-css/core/types";

export const globalStyles: CssStyles = {
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
  },
};
