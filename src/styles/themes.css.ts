import { defineTemplates, defineVariables } from "@salty-css/core/factories";

export const themeTemplate = defineTemplates({
  theme: {
    current: {
      background: "{theme.background}",
      color: "{theme.color}",
    },
  },
});

export const themes = defineVariables({
  conditional: {
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
});
