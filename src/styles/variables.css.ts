import { defineVariables } from "@salty-css/core/factories";
import { HDClamp, MobileClamp } from "./helpers.css";

export default defineVariables({
  colors: {
    black: "#0a0a0a",
    altBlack: "#222",
    terminalBlack: "#111",
    white: "#f0f0f0",
    altWhite: "#ddd",
    terminalWhite: "#eee",
    highlight: "aqua",
  },
  fontSize: {
    headline: {
      // small: "24px",
      small: HDClamp(24),
      regular: HDClamp(36),
      large: HDClamp(48),
    },
    body: {
      small: HDClamp(14),
      regular: HDClamp(16),
      large: HDClamp(24),
    },
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
    screen: {
      small: "clamp(24px, 5vw, 120px)",
      medium: "clamp(32px, 6.25vw, 160px)",
      large: "clamp(48px, 7.5vw, 240px)",
    },
  },
  responsive: {
    base: {
      spacing: {
        small: HDClamp(8),
        medium: HDClamp(20),
        large: HDClamp(36),
        pageMargin: HDClamp(120),
        blockMargin: HDClamp(160),
      },
      fontSize: {
        headline: {
          small: HDClamp(24),
          regular: HDClamp(36),
          large: HDClamp(48),
        },
        body: {
          small: HDClamp(14),
          regular: HDClamp(16),
          large: HDClamp(24),
        },
      },
    },
    "@largeMobileDown": {
      spacing: {
        pageMargin: MobileClamp(60),
      },
    },
  },
});
