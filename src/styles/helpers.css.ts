import { defineViewportClamp } from "@salty-css/core/helpers";

export const HDClamp = defineViewportClamp({
  screenSize: 1920,
  minMultiplier: 1,
  maxMultiplier: 1.25,
});

export const MobileClamp = defineViewportClamp({
  screenSize: 640,
  minMultiplier: 0.7,
});
