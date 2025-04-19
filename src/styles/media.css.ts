import { defineMediaQuery } from "@salty-css/react/config";

export const largeMobileDown = defineMediaQuery((media) => media.maxWidth(900));
export const smallMobileDown = defineMediaQuery((media) => media.maxWidth(400));
export const smallDesktopDown = defineMediaQuery((media) =>
  media.maxWidth(1024)
);
