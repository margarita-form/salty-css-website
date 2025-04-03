import "../styles/index.css";
import type { Metadata } from "next";
import { fonts } from "../styles/fonts";
import { Header } from "../components/header/header";
import { PostHogProvider } from "../components/PostHogProvider";

export const metadata: Metadata = {
  title: "Salty CSS - CSS-in-JS for React, Next.js, Vite and RSC",
  description:
    "Build time CSS-in-JS library compatible with React, Next.js, Vite and React Server Components built with TypeScript.",
  openGraph: {
    images: [
      {
        url: "https://salty-css.dev/assets/banners/salty-css-meta-default.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fonts}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="theme-dark theme-current">
        <PostHogProvider>
          <Header />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
