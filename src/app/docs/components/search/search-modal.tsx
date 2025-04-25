"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { useSearch } from "./search-context";
import { Portal } from "./portal";
import {
  SearchModalBackdrop,
  SearchModalContainer,
  SearchInputContainer,
  SearchInput,
  SearchResults,
  SearchResultItem,
  SearchResultTitle,
  SearchResultDescription,
  KeyboardShortcut,
  SearchCloseButton,
} from "./search-modal.css";
import { docPages } from "../../[slug]/doc-pages";
import { Icon } from "../../../../components/icon/icon.css";

// Define the document structure
interface DocPage {
  title: string;
  slug: string;
  description: string;
}

export const SearchModal = () => {
  const { isSearchOpen, closeSearch, searchTerm, setSearchTerm } = useSearch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<DocPage[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const showResults = results.length ? results : docPages.slice(0, 5);

  // Navigate to selected result
  const navigateToResult = useCallback(
    (doc: DocPage) => {
      router.push(`/docs/${doc.slug}`);
      closeSearch(true);
    },
    [closeSearch, router]
  );

  // Initialize Fuse.js search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    const fuse = new Fuse(docPages, {
      keys: ["title", "description", "slug"],
      includeScore: true,
      threshold: 0.4,
    });

    const searchResults = fuse.search(searchTerm);
    setResults(searchResults.map((result) => result.item));
    setActiveIndex(0); // Reset active index when results change
  }, [searchTerm]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          console.log(1);

          setActiveIndex(Math.min(activeIndex + 1, showResults.length));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex(Math.max(activeIndex - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (showResults[activeIndex]) {
            navigateToResult(showResults[activeIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, showResults, activeIndex, navigateToResult]);

  // Scroll active result into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeElement = resultsRef.current.querySelector(`.active`);
      if (activeElement) activeElement.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  if (!isSearchOpen) return null;

  return (
    <Portal>
      <SearchModalBackdrop onClick={() => closeSearch()} />
      <SearchModalContainer onClick={(e) => e.stopPropagation()}>
        <SearchInputContainer>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            autoFocus
          />
          <KeyboardShortcut>ESC</KeyboardShortcut>
          <SearchCloseButton
            id="docs-search-close-button"
            aria-label="Close search"
            onClick={() => closeSearch()}
          >
            <Icon css-src="url(/icons/close-x.svg)" />
          </SearchCloseButton>
        </SearchInputContainer>

        <SearchResults ref={resultsRef}>
          {results.length === 0 && searchTerm ? (
            <SearchResultItem element="div">
              <SearchResultTitle>No results found</SearchResultTitle>
              <SearchResultDescription>
                Try a different search term
              </SearchResultDescription>
            </SearchResultItem>
          ) : (
            showResults.map((doc, index) => (
              <SearchResultItem
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToResult(doc);
                }}
                className={index === activeIndex ? "active" : ""}
              >
                <SearchResultTitle>{doc.title}</SearchResultTitle>
                <SearchResultDescription>
                  {doc.description}
                </SearchResultDescription>
              </SearchResultItem>
            ))
          )}
        </SearchResults>
      </SearchModalContainer>
    </Portal>
  );
};
