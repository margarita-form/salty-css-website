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
              GitHub
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
