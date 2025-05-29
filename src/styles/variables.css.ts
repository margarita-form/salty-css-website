import { defineVariables } from "@salty-css/core/factories";
import { HDClamp, MobileClamp } from "./helpers.css";

const columnBase = 142;
const columnGap = 20;
const getColumns = (cols: number) =>
  HDClamp(columnBase * cols + columnGap * (cols - 1), 100);

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
        "cols-1": getColumns(1),
        "cols-2": getColumns(2),
        "cols-3": getColumns(3),
        "cols-4": getColumns(4),
        "cols-5": getColumns(5),
        "cols-6": getColumns(6),
        "cols-7": getColumns(7),
        "cols-8": getColumns(8),
        "cols-9": getColumns(9),
        "cols-10": getColumns(10),
        "cols-11": getColumns(11),
        "cols-12": getColumns(12),
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
