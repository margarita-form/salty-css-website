import { styled } from "@salty-css/react/styled";

export const Body = styled("div", {
  base: {
    opacity: 0.9,
  },
});

export const BodySmall = styled(Body, {
  base: {
    textStyle: "body.small",
  },
});

export const BodyRegular = styled(Body, {
  base: {
    textStyle: "body.regular",
  },
});

export const BodyLarge = styled(Body, {
  base: {
    textStyle: "body.large",
  },
});
