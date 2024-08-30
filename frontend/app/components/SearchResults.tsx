import React, { useState } from "react";
import { SearchResult, PartialSearchResult } from "@/app/models/SearchResult";
import CloseIcon from "./icons/CloseIcon";

interface SearchResultsProps {
  results: PartialSearchResult[];
  handleWordClick: (word: string) => void;
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  handleWordClick,
  setResults,
  setSearching,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(""); // State for selected language

  // Filter results based on the selected language
  const filteredResults = selectedLanguage
    ? results.filter((result) => result.lang === selectedLanguage)
    : results;

  return (
    <main style={{ backgroundColor: "rgb(17 24 39)" }}>
      <div
        className="flex-1 flex flex-col items-center mt-4"
        style={{
          backgroundColor: "rgb(17 24 39)",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <div className="w-full max-w-lg md:max-w-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white my-4">
              Search Results
            </h2>
            <button
              className="bg-gray-700 rounded-full"
              style={{ padding: "8px 8px" }}
              onClick={() => {
                setResults([]);
                setSearching(false);
              }}
            >
              <CloseIcon />
            </button>
          </div>
          {/* Language Filter Dropdown */}
          <div className="flex items-center mb-4">
            <label className="text-white">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-gray-700 text-white rounded p-1 ml-2"
            >
              <option value="">All</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              {/* Add more language options as needed */}
            </select>
          </div>
        </div>

        {filteredResults.length > 0 ? (
          <div className="w-full max-w-lg md:max-w-2xl">
            <ul className="list-disc pl-5">
              {filteredResults.map((result) => (
                <li key={result.word} className="list-none mb-2">
                  <a
                    onClick={() => {
                      setResults([]);
                      setSearching(false);
                      handleWordClick(result.definitions[0].word);
                    }}
                    className="text-blue-500 hover:underline text-xl font-bold cursor-pointer"
                  >
                    {result.word}
                  </a>
                  <h2 className="font-bold mt-2 underline">Definition</h2>
                  <p className="text-justify">
                    {result.definitions[0].definition}
                  </p>
                  <h2 className="font-bold mt-2 underline">Related words</h2>
                  {result.definitions.map((definition, index) => (
                    <div key={index}>{definition.word}</div>
                  ))}
                  <hr className="my-2" />
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center">
              <button
                className="bg-gray-700 rounded-full px-2 py-1 my-4"
                onClick={() => {}}
              >
                Load More
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
