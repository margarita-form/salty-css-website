"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
import docsIndex from "../../data/docs-index.json";
import { useFramework } from "../framework-context";
import { Icon } from "../../../../components/icon/icon.css";

interface IndexEntry {
  framework: string;
  slug: string;
  title: string;
  description: string;
  headings: string[];
  body: string;
}

const INDEX = docsIndex as IndexEntry[];

export const SearchModal = () => {
  const { isSearchOpen, closeSearch, searchTerm, setSearchTerm } = useSearch();
  const { framework } = useFramework();
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<IndexEntry[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const corpus = useMemo(
    () => INDEX.filter((entry) => entry.framework === framework),
    [framework],
  );

  const fuse = useMemo(
    () =>
      new Fuse(corpus, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "headings", weight: 0.3 },
          { name: "description", weight: 0.2 },
          { name: "body", weight: 0.1 },
        ],
        includeScore: true,
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [corpus],
  );

  const showResults = results.length ? results : corpus.slice(0, 5);

  const navigateToResult = useCallback(
    (doc: IndexEntry) => {
      router.push(`/docs/${framework}/${doc.slug}`);
      closeSearch(true);
    },
    [closeSearch, router, framework],
  );

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }
    const searchResults = fuse.search(searchTerm);
    setResults(searchResults.map((result) => result.item));
    setActiveIndex(0);
  }, [searchTerm, fuse]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
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
                href={`/docs/${framework}/${doc.slug}`}
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
