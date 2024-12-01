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

export const HeadingLarge = styled(Heading, {
  base: {
    textStyle: "headline.large",
  },
});
