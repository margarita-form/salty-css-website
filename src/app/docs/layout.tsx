import { SearchProvider } from "./components/search/search-provider";
import { DocsLayoutWrapper } from "./docs-layout.css";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SearchProvider>
      <DocsLayoutWrapper>{children}</DocsLayoutWrapper>
    </SearchProvider>
  );
}
