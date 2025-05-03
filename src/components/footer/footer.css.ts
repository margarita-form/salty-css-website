import { styled } from "@salty-css/react/styled";
import { DynamicLink } from "../dynamic-link/dynamic-link";
import { HDClamp } from "../../styles/helpers.css";
import { fadeInHalf } from "../../styles/animations.css";

export const FooterWrapper = styled("footer", {
  base: {
    display: "flex",
    padding: "{spacing.large} {spacing.pageMargin} 0",
    marginTop: "5vw",
    zIndex: -1,
  },
});

export const FooterContainer = styled("div", {
  base: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr max-content",
    alignItems: "start",
    width: "100%",
    background: "{theme.background}",
    borderRadius: "42px 42px 0 0",
    padding: "{spacing.xLarge} {spacing.xLarge} 0",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-4px",
      left: "-4px",
      right: "-4px",
      bottom: "-5vw",
      background:
        "radial-gradient(129.08% 129.08% at 94.71% 3.44%, #0F0 0%, #00F 50%, #F0F 100%)",
      filter: "blur(10vw)",
      borderRadius: "44px 44px 0 0",
      zIndex: -1,
      maxHeight: "100%",
      animation: "fadeIn 2s ease-out",
    },
    "@largeMobileDown": {
      gridTemplateColumns: "1fr",
      padding: "{spacing.large} {spacing.large} 0",
      "&::before": {
        animation: fadeInHalf,
      },
    },
  },
});

export const FooterLogo = styled(DynamicLink, {
  base: {
    margin: 0,
    maxWidth: HDClamp(300),
    "@smallDesktopDown": {
      display: "none",
    },
  },
});

export const FooterLinkGroups = styled("div", {
  base: {
    display: "flex",
    flexDirection: "row",
    gap: "{spacing.xLarge}",
    textStyle: "body.small",
    "@largeMobileDown": {
      flexDirection: "column",
      gap: "{spacing.large}",
    },
  },
});

export const FooterLinksColumn = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.small}",
  },
});

export const FooterLinksTitle = styled("h3", {
  base: {
    marginBottom: "0.5em",
    textStyle: "body.small",
    fontWeight: "500",
  },
});

export const FooterLink = styled(DynamicLink, {
  base: {
    textStyle: "body.small",
    textDecoration: "underline",
    textDecorationColor: "transparent",
    textDecorationThickness: "1px",
    textUnderlineOffset: "0.3em",
    transition: "0.2s ease-out",
    fontWeight: "200",
    opacity: 0.7,
    "&:where(:hover, :focus-visible)": {
      textDecorationColor: "currentcolor",
      opacity: 1,
    },
  },
});

export const FooterMentions = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    gridColumn: "1 / -1",
    padding: "{spacing.medium} 0",
    borderTop: "1px solid {theme.altBackground}",
    marginTop: "{spacing.large}",
    textStyle: "body.small",
    fontWeight: "200",
    gap: "{spacing.small}",
    "@largeMobileDown": {
      flexDirection: "column-reverse",
    },
  },
});

export const FooterMention = styled("p", {
  base: {
    textStyle: "body.small",
    opacity: 0.7,
    fontWeight: "200",
    a: {
      textDecorationColor: "transparent",
      textUnderlineOffset: "0.3em",
      transition: "0.2s ease-out",
      "&:where(:hover, :focus-visible)": {
        textDecorationColor: "currentcolor",
      },
    },
  },
});
