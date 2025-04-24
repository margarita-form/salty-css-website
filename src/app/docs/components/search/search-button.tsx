"use client";

import {
  SearchButtonContainer,
  SearchIcon,
  ShortcutContainer,
} from "./search-button.css";
import { useSearch } from "./search-context";
import { KeyboardShortcut } from "./search-modal.css";

export function SearchButton() {
  const { openSearch } = useSearch();

  return (
    <SearchButtonContainer onClick={openSearch}>
      <div>
        <SearchIcon css-src="url(/icons/search.svg)" />
        Search
      </div>
      <ShortcutContainer>
        <KeyboardShortcut>Ctrl</KeyboardShortcut>
        <KeyboardShortcut>K</KeyboardShortcut>
      </ShortcutContainer>
    </SearchButtonContainer>
  );
}
