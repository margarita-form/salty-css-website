import { DocsAside } from "./components/docs-aside";
import { DocsNavigation } from "./components/docs-nav";
import { SearchProvider } from "./components/search/search-provider";
import { DocsLayoutArticle, DocsLayoutWrapper } from "./docs-layout.css";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SearchProvider>
      <DocsLayoutWrapper>
        <DocsNavigation />
        <DocsLayoutArticle>{children}</DocsLayoutArticle>
        <DocsAside />
      </DocsLayoutWrapper>
    </SearchProvider>
  );
}
