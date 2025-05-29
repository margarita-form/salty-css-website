import { styled } from "@salty-css/react/styled";

export const HeroBlockWrapper = styled("section", {
  base: {
    padding: "{spacing.blockMargin} {spacing.pageMargin}",
    width: "100%",
    background: "{theme.background}",
  },
});

export const HeroBlockContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.large}",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    maxWidth: "960px",
    margin: "0 auto",
  },
});
