import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useSearch } from "@/app/SearchContext";
import SearchResults from "@/app/components/SearchResults";
import Layout from "@/app/DashboardLayout";

export default function Home() {
  const { results, searching, setResults, setSearching } = useSearch();
  const [user, setUser] = useState<any>(null);
  const [inputText, setInputText] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<
    { text: string; isHuman: boolean }[]
  >([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuOptions, setMenuOptions] = useState<string[]>([
    "Option 1",
    "Option 2",
    "Option 3",
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const router = useRouter(); // Access Next.js router
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref to access the textarea
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to access the chat container

  const handleWordClick = (word: string) => {
    router.push(`/dictionary/${encodeURIComponent(word)}`);
  };

  const handleSend = () => {
    const trimmedText = inputText.trim();

    if (trimmedText) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: trimmedText, isHuman: true },
        { text: `AI response to "${trimmedText}"`, isHuman: false }, // Simulating an AI response
      ]);
      setInputText(""); // Clear the input field after sending the message

      // Reset the height of the textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      // Adjust the height of the chat container
      adjustChatContainerHeight();
    }

    console.log(trimmedText);
  };

  const adjustChatContainerHeight = () => {
    if (textareaRef.current && chatContainerRef.current) {
      const textareaHeight = textareaRef.current.offsetHeight;
      const chatContainerMaxHeight = `calc(100vh - ${textareaHeight + 110}px)`;
      chatContainerRef.current.style.maxHeight = chatContainerMaxHeight;
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);

    // Check if the last character is "/"
    if (value.endsWith("/")) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }

    // Adjust the height of the textarea dynamically
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Adjust the height of the chat container
    adjustChatContainerHeight();
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowMenu(false);
    setInputText((prev) => prev.replace("/", option)); // Replace "/" with the selected option
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Adjust the chat container height initially
    adjustChatContainerHeight();
  }, []);

  return (
    <Layout>
      {results.length === 0 && !searching ? (
        /* Chat Area */
        <main className="flex-1 p-4 flex flex-col items-center justify-between">
          {/* Chat Messages */}
          <div
            ref={chatContainerRef} // Attach the ref to the chat container
            className="flex-1 w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-2 overflow-y-scroll resize-none custom-scrollbar2"
            style={{ maxHeight: "calc(100vh - 158px)" }} // Initial max height calculation
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-3xl ${
                  message.isHuman
                    ? "bg-gray-700 text-white ml-auto max-w-2xl w-fit"
                    : ""
                }`}
                style={{
                  wordBreak: "break-word", // Ensure long words break into the next line
                  overflowWrap: "break-word", // Prevent overflow for long strings
                }}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="w-full max-w-3xl mt-4 relative border rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
            <textarea
              placeholder="Type your message..."
              className="flex p-3 pr-0 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none "
              rows={1}
              value={inputText}
              ref={textareaRef} // Attach the ref to the textarea
              onChange={handleTextareaChange}
              style={{
                width: "calc(100% - 50px)",
                maxHeight: "200px",
                overflowY: "hidden",
              }}
            />
            <button
              className="absolute right-2 bottom-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 focus:outline-none"
              style={{ height: "35px", padding: "5px", marginTop: "auto" }}
              onClick={handleSend}
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

            {showMenu && (
              <div className="absolute bottom-full left-0 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-lg p-2">
                {menuOptions.map((option, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      ) : (
        <main style={{ backgroundColor: "rgb(17 24 39)" }}>
          {/* Display search results */}
          <div className="flex-1 flex flex-col items-center mt-4">
            <div className="w-full max-w-lg md:max-w-2xl">
              {results.length > 0 || searching ? (
                <SearchResults
                  results={results}
                  handleWordClick={handleWordClick}
                  setResults={setResults}
                  setSearching={setSearching}
                />
              ) : (
                <p className="text-gray-500">No results found</p>
              )}
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
}
