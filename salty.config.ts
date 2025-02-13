import { defineConfig } from "@salty-css/core/config";
import { globalStyles } from "./src/styles/global.css";

const clamp = (target: number) => {
  const min = Math.max(target * 0.75, 14);
  const mid = Math.round((target / 1920) * 10000) / 100;
  const max = target * 1.25;
  return `clamp(${min}px, ${mid}vw, ${max}px)`;
};

export const config = defineConfig({
  global: globalStyles,
  variables: {
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
        small: clamp(24),
        regular: clamp(36),
        large: clamp(48),
      },
      body: {
        small: clamp(12),
        regular: clamp(16),
        large: clamp(20),
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
  },
  conditionalVariables: {
    theme: {
      dark: {
        background: "{colors.black}",
        altBackground: "{colors.altBlack}",
        terminalBackground: "{colors.terminalBlack}",
        color: "{colors.white}",
        altColor: "{colors.altWhite}",
      },
      light: {
        background: "{colors.white}",
        altBackground: "{colors.altWhite}",
        terminalBackground: "{colors.terminalWhite}",
        color: "{colors.black}",
        altColor: "{colors.altBlack}",
      },
    },
  },
  templates: {
    theme: {
      current: {
        background: "{theme.background}",
        color: "{theme.color}",
      },
    },
    textStyle: {
      headline: {
        small: {
          fontSize: "{fontSize.headline.small}",
          fontWeight: "400",
          letterSpacing: "0.0125em",
          lineHeight: "1.2em",
        },
        regular: {
          fontSize: "{fontSize.headline.regular}",
          fontWeight: "400",
          letterSpacing: "0.0125em",
          lineHeight: "1.2em",
        },
        large: {
          fontSize: "{fontSize.headline.large}",
          fontWeight: "400",
          letterSpacing: "0.0125em",
          lineHeight: "1.2em",
        },
      },
      body: {
        small: {
          fontSize: "{fontSize.body.small}",
          fontWeight: "400",
          letterSpacing: "0.0125em",
          lineHeight: "1.5em",
        },
        regular: {
          fontSize: "{fontSize.body.regular}",
          fontWeight: "400",
          letterSpacing: "0.0125em",
          lineHeight: "1.4em",
        },
        large: {
          fontSize: "{fontSize.body.large}",
          fontWeight: "400",
          letterSpacing: "0.0125em",
          lineHeight: "1.3em",
        },
      },
    },
  },
});
