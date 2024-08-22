"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

import Layout from "@/app/DashboardLayout";
import { useSearch } from "@/app/SearchContext";
import SearchResults from "@/app/components/SearchResults";

export default function DictionaryPage() {
  const { results, searching, setResults, setSearching } = useSearch();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleWordClick = (word: string) => {
    router.push(`/dictionary/${encodeURIComponent(word)}`);
  };

  return (
    <Layout>
      {results.length === 0 && !searching ? (
        <div>none</div>
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
