"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

import { SearchResult, ApiResponse } from "./models/SearcResult";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [word, setWord] = useState<SearchResult>();
  const [user, setUser] = useState<any>(null);

  const models = []; // Replace with your list of models
  const router = useRouter(); // Access Next.js router

  const handleWordClick = (word: string) => {
    router.push(`/dictionary/${encodeURIComponent(word)}`);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = async () => {
    setSearching(true);
    if (searchTerm.trim() === "") return;

    try {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ term: searchTerm }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: ApiResponse = await response.json();
      setResults(data.result);
      console.log("Search results:", data.result);
    } catch (error) {
      console.error("Error:", error);
    }
    setSearching(false);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="flex space-x-2"
        style={{
          position: "absolute",
          margin: "10px",
          zIndex: "100",
        }}
      >
        <button
          className="text-gray-900 dark:text-gray-100 text-left bg-gray-700 rounded-lg hover:bg-gray-600 px-3 py-2"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <button
          className="bg-gray-700 rounded-lg hover:bg-gray-600 px-2 py-2"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="icon-xl-heavy"
          >
            <path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
        className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white flex flex-col"
      >
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-4" style={{ height: "2.5rem" }}></div>
          <ul className="space-y-4 flex-1">
            <li>
              <button className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Search
              </button>
            </li>
            <li>
              <button className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                {/* add function like strip, to json (respecting a format), etc...  */}
                Utils
              </button>
            </li>
            <li>
              <hr></hr>
            </li>
            <li>Translations</li>
          </ul>
          <ul className="space-y-4">
            <li>
              <button
                className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="p-2 bg-gray-200 dark:bg-gray-900 flex items-center">
          <div className="relative">
            <button
              className="text-xl font-semibold bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 flex ml-2"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              style={{
                transform: isSidebarOpen
                  ? "translateX(0px)"
                  : "translateX(100px)",
                transition: "transform 0.3s ease",
              }}
            >
              Gpt4-o
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="icon-md text-token-text-tertiary ml-2"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 0 1 1.414 0L12 14.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                className="absolute mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-48"
                style={{
                  transform: isSidebarOpen
                    ? "translateX(0px)"
                    : "translateX(100px)",
                  transition: "transform 0.3s ease",
                }}
              >
                <ul className="py-1">
                  {models.length > 0 ? (
                    models.map((model, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          // Handle model selection
                          console.log(`Selected model: ${model}`);
                          setDropdownOpen(false);
                        }}
                      >
                        {model}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-700 dark:text-gray-100">
                      No model found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center mx-2">
            <div
              className="relative w-full max-w-lg md:max-w-2xl"
              style={{ minWidth: "50%" }}
            >
              <input
                type="text"
                placeholder="Search the dictionary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="float-end px-4 py-2 pr-12 rounded-lg bg-gray-700 text-white focus:outline-none transition-all duration-300 ease-in-out w-64 focus:w-3/4 focus:w-3/4"
              />
              <button
                className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded-r-lg focus:outline-none"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Profile & login */}
          <div className="ml-auto mx-2">
            {user ? (
              <button
                className="bg-gray-700 rounded-full hover:bg-gray-600 p-1"
                onClick={() => router.push("/profile")}
              >
                <img
                  src={user.photoURL || "/default-profile.png"} // Use a default image if photoURL is not available
                  alt="User Profile"
                  className="rounded-full w-8 h-8"
                />
              </button>
            ) : (
              <button
                className="bg-gray-700 rounded-full hover:bg-gray-600 p-1"
                onClick={() => router.push("/login")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  viewBox="0 0 24 24"
                  stroke="#ffffff"
                  width="28"
                  height="28"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                </svg>
              </button>
            )}
          </div>
        </header>

        {results.length === 0 && !searching ? (
          /* Chat Area */
          <main className="flex-1 p-4 flex flex-col items-center justify-between">
            {/* Chat Messages */}
            <div className="flex-1 w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              {/* Display chat messages here */}
            </div>

            {/* Input Area */}
            <div className="w-full max-w-3xl mt-4 relative border rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
              <textarea
                placeholder="Type your message..."
                className="p-3 pr-0 mt-1 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none"
                rows={1}
                style={{
                  height: "auto",
                  width: "calc(100% - 50px)",
                  maxHeight: "200px",
                  overflowY: "hidden",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto"; // Reset height to auto
                  target.style.height = `${target.scrollHeight}px`; // Adjust height

                  // Add or remove the overflow based on height
                  if (target.scrollHeight > 200) {
                    target.style.overflowY = "auto"; // Show scrollbar
                  } else {
                    target.style.overflowY = "hidden"; // Hide scrollbar
                  }
                }}
              />
              <button
                className="absolute right-2 top-1 bottom-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 focus:outline-none"
                style={{ maxHeight: "35px", padding: "5px", marginTop: "auto" }}
                onClick={() => {
                  // Handle the send action here
                  console.log("Send button clicked");
                }}
              >
                <svg
                  className="p-1"
                  fill="#FFFFFF"
                  height="25px"
                  width="25px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 495.003 495.003"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="XMLID_51_">
                      {" "}
                      <path
                        id="XMLID_53_"
                        d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z"
                      ></path>{" "}
                      <path
                        id="XMLID_52_"
                        d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </button>
            </div>
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }

              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #4b5563; /* Thumb color */
                border-radius: 4px;
              }

              .custom-scrollbar::-webkit-scrollbar-track {
                background-color: #1f2937; /* Track color */
              }
            `}</style>
          </main>
        ) : (
          <main style={{ backgroundColor: "rgb(17 24 39)" }}>
            {/* Display search results */}
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
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                        <h2 className="font-bold mt-2 underline">English</h2>
                        {result.english_words.map((english_word, index) => (
                          <li key={index} className="list-none">
                            {english_word}
                          </li>
                        ))}
                        <h2 className="font-bold mt-2 underline">French</h2>
                        {result.french_words.map((french_word, index) => (
                          <li key={index} className="list-none">
                            {french_word}
                          </li>
                        ))}
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
        )}
      </div>
    </div>
  );
}
