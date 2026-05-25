import type { Metadata } from "next";
import "../styles/index.css";
import { fonts } from "../styles/fonts";
import { Header } from "../components/header/header";
import { WarningBox } from "../components/main.css";
import { Footer } from "../components/footer/footer";
import { FrameworkProvider } from "./docs/components/framework-context";
import { SITE_ORIGIN, buildSiteJsonLd } from "@/lib/docs-seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteJsonLd = buildSiteJsonLd();
  return (
    <html lang="en" className={fonts}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        {process.env.NODE_ENV === "production" && (
          <>
            <link rel="preconnect" href="https://plausible.io" />
            <script
              async
              src="https://plausible.io/js/pa-1lfMWNPBAwBTBjaG9aOUq.js"
            />
            <script
              dangerouslySetInnerHTML={{
                __html:
                  "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();",
              }}
            />
          </>
        )}
      </head>
      <body className="theme-dark theme-current">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <FrameworkProvider>
          <WarningBox data-nosnippet>
            Version 0.1.0 just released! Check out the release notes from{" "}
            <a
              href="https://github.com/margarita-form/salty-css/releases/tag/v0.1.0"
              target="_blank"
            >
              GitHub Releases
            </a>
          </WarningBox>
          <Header />
          {children}
          <Footer />
        </FrameworkProvider>
      </body>
    </html>
  );
}
