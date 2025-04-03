import { keyframes } from "@salty-css/react";
import { styled } from "@salty-css/react/styled";

export const Heading = styled("h2", {
  className: "heading",
  base: {
    width: "fit-content",
    "&:first-child": {
      marginTop: 0,
    },
  },
  variants: {
    underlined: {
      true: {
        borderBottom: "2px solid",
        borderColor: "{theme.altBackground}",
      },
    },
  },
});

export const HeadingSmall = styled(Heading, {
  base: {
    textStyle: "headline.small",
  },
});

export const HeadingRegular = styled(Heading, {
  base: {
    textStyle: "headline.regular",
  },
});

export const animateText = keyframes({
  animationName: "animateText",
  appendInitialStyles: true,
  params: {
    duration: "800ms",
    easing: "linear",
    delay: "100ms",
  },
  "0%": {
    fontWeight: "700",
  },
  "25%": {
    fontWeight: "600",
  },
  "50%": {
    fontWeight: "500",
  },
  "75%": {
    fontWeight: "400",
  },
  "100%": {
    fontWeight: "300",
  },
});

export const HeadingLarge = styled(Heading, {
  base: {
    textStyle: "headline.large",
    fontFamily: "var(--font-family-logo)",
    animation: animateText,
    marginBottom: "1em",
  },
});
