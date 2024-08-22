"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "@/app/DashboardLayout";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/SearchContext";
import SearchResults from "@/app/components/SearchResults";
import { SearchResult } from "@/app/models/SearchResult";

export default function WordPage() {
  const params = useParams();

  const { word } = params; // Get the dynamic word parameter
  const [wordData, setWordData] = useState<SearchResult | null>(null);
  const { results, searching, setResults, setSearching } = useSearch();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const handleWordClick = (word: string) => {
    router.push(`/dictionary/${encodeURIComponent(word)}`);
  };

  useEffect(() => {
    if (word) {
      // Example: Fetch word data from an API or use static data
      const fetchData = async () => {
        try {
          const wordStr = Array.isArray(word) ? word[0] : word;
          // test : http://localhost:3000/dictionary/AI%20art
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }/dictionary/words/${encodeURIComponent(wordStr)}`
          );
          if (response.ok) {
            const data = await response.json();
            setWordData(data);
          } else {
            console.error("Failed to fetch word data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  }, [word]);

  if (!wordData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      {wordData && results.length === 0 ? (
        <main className="flex-1 p-4 flex flex-col items-center justify-between -z-1">
          <div className="w-full max-w-3xl mt-4 relative border rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
            <div className="container mx-auto p-4">
              <h1 className="text-3xl font-bold">{wordData.word}</h1>
              <h2 className="font-bold mt-4 text-xl">Definition</h2>
              <p className="text-justify">{wordData.definition}</p>
              <h2 className="font-bold mt-4 text-xl">English Words</h2>
              <ul>
                {wordData.english_words.map(
                  (english_word: string, index: number) => (
                    <li key={index}>{english_word}</li>
                  )
                )}
              </ul>
              <h2 className="font-bold mt-4 text-xl">French Words</h2>
              <ul>
                {wordData.french_words.map(
                  (french_word: string, index: number) => (
                    <li key={index}>{french_word}</li>
                  )
                )}
              </ul>
              <h2 className="font-bold mt-4 text-xl">Original Language</h2>
              <p className="text-justify">{wordData.lang}</p>
              <h2 className="font-bold mt-4 text-xl ">Origin</h2>
              <p className="text-justify">{wordData.url}</p>
              <h2 className="font-bold mt-4 text-xl">Complement</h2>
              <p className="text-justify">{wordData.complement}</p>
              <h2 className="font-bold mt-4 text-xl">Sources</h2>
              <ul>
                {Object.entries(wordData.sources).map(
                  ([key, source], index) => (
                    <a className="underline mr-2" href={source.url} key={index}>
                      {source.word}
                    </a>
                  )
                )}
              </ul>
            </div>
          </div>
        </main>
      ) : (
        <main style={{ backgroundColor: "rgb(17 24 39)" }}>
          <SearchResults
            results={results}
            handleWordClick={handleWordClick}
            setResults={setResults}
            setSearching={setSearching}
          />
        </main>
      )}
    </Layout>
  );
}
