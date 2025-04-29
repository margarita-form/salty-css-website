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

export const slideDown = keyframes({
  animationName: "slideDown",
  appendInitialStyles: true,
  params: {
    duration: "200ms",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  from: {
    transform: "translateY(-10px)",
    opacity: 0,
  },
  to: {
    transform: "translateY(0)",
    opacity: 1,
  },
});

export const rotateInfinite = keyframes({
  animationName: "rotateInfinite",
  appendInitialStyles: true,
  params: {
    duration: "30s",
    easing: "linear",
    iterationCount: "infinite",
  },
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});
