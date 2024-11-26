import { styled } from "@salty-css/react/styled";

export const Heading = styled("h2", {
  className: "heading",
  base: {
    width: "fit-content",
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

export const HeadingLarge = styled(Heading, {
  base: {
    textStyle: "headline.large",
  },
});
