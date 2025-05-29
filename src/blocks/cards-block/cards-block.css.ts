import { styled } from "@salty-css/react/styled";
import { HDClamp, MobileClamp } from "../../styles/helpers.css";
import { HeadingSmall } from "../../components/heading.css";
import { BodySmall } from "../../components/body.css";

// CSS variables for themeable cards
export const cardCSSVars = {
  cardColor: "--card-color",
  cardGlowColor: "--card-glow-color",
  cardBgColor: "--card-bg-color",
  cardBorderColor: "--card-border-color",
  cardTextColor: "--card-text-color",
};

export const CardsBlockWrapper = styled("section", {
  base: {
    padding: "{spacing.medium} {spacing.pageMargin}",
    width: "100%",
  },
});

export const CardsBlockContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "calc({spacing.large} * 1.5)",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    maxWidth: "{width.cols.9}",
    margin: "0 auto",
  },
});

export const CardsGrid = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "{spacing.medium}",
    width: "100%",
    position: "relative",
    "--card-width": HDClamp(380),
    "@mediumDesktopDown": {
      "--card-width": HDClamp(360),
    },
    "@largeMobileDown": {
      "--card-width": MobileClamp(480),
    },
  },
});

export const Card = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "{spacing.medium}",
    backgroundColor: `var(${cardCSSVars.cardBgColor}, #0A0A0A)`,
    borderRadius: "6px",
    gap: "{spacing.small}",
    textAlign: "left",
    position: "relative",
    border: `1px solid var(${cardCSSVars.cardBorderColor}, #333333)`,
    borderTop: `3px solid var(${cardCSSVars.cardColor}, #333333)`,
    overflow: "hidden",
    transition: "all 0.3s ease",
    width: "100%",
    maxWidth: "{card-width}",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    "@mediumMobileDown": {
      width: "100%",
      maxWidth: "100%",
    },
  },
});

export const CardIconWrapper = styled("div", {
  base: {
    width: "54px",
    height: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "{spacing.small}",
    alignSelf: "flex-start",
    borderRadius: "4px",
    padding: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    border: `1px solid var(${cardCSSVars.cardColor}, #333333)`,
    "& svg": {
      color: `var(${cardCSSVars.cardColor}, currentColor)`,
      filter: `drop-shadow(0 0 3px var(${cardCSSVars.cardGlowColor}, rgba(0, 0, 0, 0.2)))`,
    },
  },
});

export const CardTitle = styled(HeadingSmall, {
  base: {
    marginTop: "0.5em",
    background: `linear-gradient(135deg, #fff -150%, var(${cardCSSVars.cardColor}, #FFFFFF) 125%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
});

export const CardDescription = styled(BodySmall, {
  base: {
    color: `var(${cardCSSVars.cardTextColor}, #AAAAAA)`,
    lineHeight: "1.5",
    fontSize: "0.9em",
  },
});
