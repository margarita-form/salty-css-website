import { defineVariables } from "@salty-css/core/factories";
import { HDClamp, MobileClamp } from "./helpers.css";

const columnBase = 142;

export default defineVariables({
  colors: {
    black: "#0a0a0a",
    altBlack: "#222",
    terminalBlack: "#111",
    white: "#f0f0f0",
    altWhite: "#ddd",
    terminalWhite: "#eee",
    highlight: "aqua",
    success: "#2fdb5a",
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
        xLarge: HDClamp(64),
        pageMargin: HDClamp(120),
        blockMargin: HDClamp(160),
      },
      fontSize: {
        headline: {
          small: HDClamp(24),
          regular: HDClamp(36),
          large: HDClamp(64),
        },
        body: {
          xs: HDClamp(12),
          small: HDClamp(14),
          regular: HDClamp(16),
          large: HDClamp(24),
        },
      },
      width: {
        "cols-1": HDClamp(columnBase),
        "cols-2": HDClamp(columnBase * 2),
        "cols-3": HDClamp(columnBase * 3),
        "cols-4": HDClamp(columnBase * 4),
        "cols-5": HDClamp(columnBase * 5),
        "cols-6": HDClamp(columnBase * 6),
        "cols-7": HDClamp(columnBase * 7),
        "cols-8": HDClamp(columnBase * 8),
        "cols-9": HDClamp(columnBase * 9),
        "cols-10": HDClamp(columnBase * 10),
        "cols-11": HDClamp(columnBase * 11),
        "cols-12": HDClamp(columnBase * 12),
      },
    },
    "@largeMobileDown": {
      spacing: {
        pageMargin: MobileClamp(30),
        blockMargin: MobileClamp(80),
      },
      fontSize: {
        headline: {
          small: MobileClamp(24),
          regular: MobileClamp(32),
          large: MobileClamp(42),
        },
        body: {
          xs: MobileClamp(12),
          small: MobileClamp(16),
          regular: MobileClamp(20),
          large: MobileClamp(24),
        },
      },
    },
  },
});
