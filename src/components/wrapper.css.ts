import { styled } from "@salty-css/react/styled";

export const Wrapper = styled("div", {
  variants: {
    width: {
      full: {
        maxWidth: "100%",
      },
      half: {
        maxWidth: "50%",
      },
      maxWhird: {
        width: "33.33%",
      },
      small: {
        maxWidth: "{width.cols-3}",
      },
      medium: {
        maxWidth: "{width.cols-6}",
      },
      large: {
        maxWidth: "{width.cols-9}",
      },
    },
  },
  defaultVariants: {
    width: "full",
  },
});
