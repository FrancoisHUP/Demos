import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { SearchResult, ApiResponse } from "./models/SearchResult";
import { useSearch } from "@/app/SearchContext";
import { useModel } from "@/app/ModelContext";
import ProfileIcon from "@/app/components/icons/ProfileIcon";

export default function Layout({
  children,
}: // onSearchResults,
// setSearching,
{
  children: React.ReactNode;
  // onSearchResults: (results: SearchResult[]) => void;
  // setSearching: (searching: boolean) => void;
}) {
  const { setResults, setSearching } = useSearch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTranslation, setSearchTranslation] = useState("");
  //   const [searching, setSearching] = useState(false);
  // const [results, setResults] = useState<SearchResult[]>([]);
  const models: string[] = [
    "Gpt-4o",
    "Gpt-4o-mini",
    "Claude3.5-sonnet",
    "Gemini-1.5-flash",
  ]; // Replace with your list of models
  // const [model, setModel] = useState<string>("Gpt4-o");
  const { model, setModel } = useModel();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSearchTranslation = async () => {
    console.log("gg");
    if (searchTranslation.trim() === "") return;
    // do something
  };

  const handleSearch = async () => {
    setSearching(true);
    if (searchTerm.trim() === "") return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ term: searchTerm }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: ApiResponse = await response.json();
      // onSearchResults(data.result); // Pass the results to the callback function
      console.log("data.result", data.result);
      setResults(data.result);

      //   console.log("Search results:", data.result);
    } catch (error) {
      console.error("Error:", error);
    }
    setSearching(false);
  };

  const newChat = () => {
    router.push("/");
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
          className="text-gray-900 dark:text-gray-100 text-left bg-gray-700 rounded-lg hover:bg-gray-600 "
          style={{ padding: "8px 13px " }}
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <button
          className="bg-gray-700 rounded-lg hover:bg-gray-600 "
          style={{ padding: "8px 8px " }}
          onClick={() => newChat()}
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
        <button
          className="text-gray-900 dark:text-gray-100 text-left bg-gray-700 rounded-lg hover:bg-gray-600"
          style={{ padding: "8px 17px " }}
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          /
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
              <button
                className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                onClick={() => router.push("/dictionary")}
              >
                Dictionary
              </button>
            </li>

            <li>
              <button className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Utils
              </button>
            </li>
            <li>
              <hr></hr>
            </li>
            <li>Translations</li>
            <li>
              <div className="text-left">
                <div className="relative w-full max-w-lg md:max-w-2xl flex items-end">
                  <input
                    type="text"
                    placeholder="Search in translations"
                    value={searchTranslation}
                    onChange={(e) => setSearchTranslation(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                    style={{ width: "inherit" }}
                  />
                  <button
                    className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded-r-lg focus:outline-none"
                    onClick={handleSearchTranslation}
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
              {/* <button className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Search
              </button> */}
            </li>
          </ul>
          <ul className="space-y-4">
            <li>
              <button
                className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                onClick={() => router.push("/login")}
              >
                Collaborate with your team
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 
          ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Header */}
        <header className="p-2 bg-gray-200 dark:bg-gray-900 flex items-center">
          {/* Hamburger Menu */}
          <div className="relative flex-shrink-0">
            <button
              className="text-xl font-semibold bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 flex"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              style={{
                transform: isSidebarOpen
                  ? "translateX(5px)"
                  : "translateX(145px)",
                transition: "transform 0.3s ease",
              }}
            >
              {model}
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
                className="absolute mt-2 dark:bg-gray-800 rounded-lg shadow-lg w-48 z-10"
                style={{
                  transform: isSidebarOpen
                    ? "translateX(5px)"
                    : "translateX(145px)",
                  transition: "transform 0.3s ease",
                }}
              >
                <ul className="p-1">
                  {models.length > 0 ? (
                    models.map((model, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                        onClick={() => {
                          setModel(model);
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
          <div
            className="flex mx-4 flex items-center justify-center transition-all duration-300 ease-in-out"
            style={{
              width: "100%",
              transform: isSidebarOpen
                ? "translateX(15px)"
                : "translateX(145px)",
            }}
          >
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search the dictionary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full px-3 py-2 pr-12 rounded-lg bg-gray-700 text-white focus:outline-none transition-all duration-300 ease-in-out"
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
          <div
            className="ml-auto flex-shrink-0 mx-2 flex justify-end"
            style={{ minWidth: isSidebarOpen ? "50px" : "185px" }}
          >
            {user ? (
              <button
                className="bg-gray-700 rounded-full hover:bg-gray-600 p-1"
                onClick={() => router.push("/profile")}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="rounded-full w-8 h-8"
                  />
                ) : (
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
                )}
              </button>
            ) : (
              <div>
                <button
                  className="bg-gray-700 rounded-lg hover:bg-gray-600 px-3 py-1"
                  onClick={() => router.push("/login")}
                >
                  Log in
                </button>
                <button
                  className="bg-gray-300 rounded-lg hover:bg-gray-600 px-3 py-1 text-black text-bold ml-3"
                  onClick={() => router.push("/register")}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </header>
        {/* Chat Area */}
        {children}
      </div>
    </div>
  );
}
