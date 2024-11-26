import { Outfit } from "next/font/google";

const mainFont = Outfit({
  variable: "--font-family-main",
  subsets: ["latin"],
});

export const fonts = [mainFont.variable].join(" ");
