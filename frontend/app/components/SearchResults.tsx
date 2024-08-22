import React from "react";
import { SearchResult } from "@/app/models/SearchResult";

interface SearchResultsProps {
  results: SearchResult[];
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
  return (
    <main style={{ backgroundColor: "rgb(17 24 39)" }}>
      <div className="flex-1 flex flex-col items-center mt-4">
        <div className="w-full max-w-lg md:max-w-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white my-4">
              Search Results
            </h2>
            <button
              className="bg-gray-700 rounded-full p-3"
              onClick={() => {
                setResults([]);
                setSearching(false);
              }}
            >
              <svg
                fill="#ffffff"
                height="15px"
                width="15px"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 460.775 460.775"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M0 57.308l57.308-57.308 373.467 373.467-57.308 57.308z"></path>
                  <path d="M430.775 57.308L57.308 430.775l-57.308-57.308 373.467-373.467z"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full max-w-lg md:max-w-2xl">
          {results.length > 0 ? (
            <ul className="list-disc pl-5">
              {results.map((result) => (
                <li key={result.id} className="list-none mb-2">
                  <a
                    onClick={() => handleWordClick(result.word)}
                    className="text-blue-500 hover:underline text-xl font-bold cursor-pointer"
                  >
                    {result.word}
                  </a>
                  <h2 className="font-bold mt-2 underline">Definition</h2>
                  <p className="text-justify">{result.definition}</p>
                  <hr className="my-2" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No results found</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchResults;
