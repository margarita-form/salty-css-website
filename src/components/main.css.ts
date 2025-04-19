import { styled } from "@salty-css/react/styled";

export const Main = styled("main", {
  base: {
    textStyle: "body.regular",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.large}",
    alignItems: "flex-start",
  },
});

export const WarningBox = styled("p", {
  base: {
    position: "relative",
    color: "#000",
    background:
      "repeating-linear-gradient( 45deg,#ffbb00,#ffbb00 10px, #ffbf00 10px, #ffbf00 20px )",
    padding: "0.5em 1.5em",
    width: "100%",
    textStyle: "body.small",
    fontWeight: "500",
    textAlign: "center",
    zIndex: 102,
  },
});

export const ContentBox = styled("div", {
  base: {
    width: "100%",
    maxWidth: "1280px",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.large}",
  },
});

export const Centered = styled("div", {
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
    padding: "{spacing.screen.medium}",
  },
});
