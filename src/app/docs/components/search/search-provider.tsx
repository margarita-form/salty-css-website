"use client";

import { ReactNode } from "react";
import { SearchProvider as SearchContextProvider } from "./search-context";
import { SearchModal } from "./search-modal";
import { SearchButton } from "./search-button";

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  return (
    <SearchContextProvider>
      {children}
      <SearchModal />
    </SearchContextProvider>
  );
};

export { SearchButton };
