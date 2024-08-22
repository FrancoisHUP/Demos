"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { SearchResult } from "@/app/models/SearchResult";

interface SearchContextProps {
  results: SearchResult[];
  searching: boolean;
  setResults: Dispatch<SetStateAction<SearchResult[]>>; // Update this line
  setSearching: Dispatch<SetStateAction<boolean>>; // Update this line
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  return (
    <SearchContext.Provider
      value={{ results, setResults, searching, setSearching }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
