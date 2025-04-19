import { keyframes } from "@salty-css/react";

export const fadeIn = keyframes({
  animationName: "fadeIn",
  appendInitialStyles: true,
  params: {
    delay: "50ms",
    duration: "100ms",
  },
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});
