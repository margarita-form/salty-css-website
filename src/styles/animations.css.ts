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

export const fadeInFromLeft = keyframes({
  animationName: "fadeInFromLeft",
  appendInitialStyles: true,
  params: {
    duration: "300ms",
    easing: "ease-out",
  },
  from: {
    transform: "translateX(-100%)",
  },
  to: {
    transform: "translateX(0)",
  },
});
