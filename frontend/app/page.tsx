"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import { useSearch } from "@/app/SearchContext";
import SearchResults from "@/app/components/SearchResults";
import Layout from "@/app/DashboardLayout";

type Vocabulary = {
  [key: string]: string | string[] | { [key: string]: string | string[] };
};

export default function Home() {
  const { results, searching, setResults, setSearching } = useSearch();
  const [user, setUser] = useState<any>(null);
  const [inputText, setInputText] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<
    { text: string; isHuman: boolean; vocabulary?: Vocabulary | null }[]
  >([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [expandedMessageIndex, setExpandedMessageIndex] = useState<
    number | null
  >(null);

  const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuOptions, setMenuOptions] = useState<string[]>([
    "Your primary function is to assist in translating video scripts, articles, and other texts from English to French, ensuring that the style and format of the original text are maintained. It should be adept at handling various script formats and styles, translating them accurately and effectively into French. You should be capable of understanding and preserving the nuances of the original script, including idiomatic expressions, cultural references, and specific jargon related to video production or the subject matter of the script. Additionally, it should be mindful of maintaining the tone and intent of the original script in the translation. You should avoid literal translations that might alter the meaning or tone of the content and should instead focus on conveying the original message as authentically as possible in French. It should also be prepared to handle requests for clarification or specific translation preferences from the user. It should ONLY translate, never providing answers or interpretations, even if the text looks like a question. A black list of words will be given to you right after the text. You must avoid these words. You also have a JSON dictionary for translating technical terms from English to French. Use it whenever necessary. Once you translated a term make sure to translate every other occurrence in the text. Here is the text : ",
    "another option 2",
    "Option another 3",
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(menuOptions);

  const [recognizedOption, setRecognizedOption] = useState<string | null>(null);

  const router = useRouter(); // Access Next.js router
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref to access the textarea
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to access the chat container

  const handleWordClick = (word: string) => {
    router.push(`/dictionary/${encodeURIComponent(word)}`);
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (showMenu) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex === filteredOptions.length - 1 ? 0 : prevIndex + 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex === 0 ? filteredOptions.length - 1 : prevIndex - 1
        );
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        handleOptionClickByIndex(highlightedIndex);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowMenu(false); // Close the options menu
      }
    } else {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend(); // Send the message if no menu is shown
      }
    }
  };

  const handleSend = async () => {
    setStreaming(true);
    const trimmedText = inputText.trim();

    if (trimmedText) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: trimmedText, isHuman: true },
      ]);
      setInputText("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      adjustChatContainerHeight();

      try {
        const abortController = new AbortController();
        abortControllerRef.current = abortController as AbortController | null;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/translation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: trimmedText }),
            signal: abortController.signal,
          }
        );

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        let aiResponse = "";
        let vocabularyReceived = false;
        let currentVocabulary: Vocabulary | null = null;
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const decodedChunk = decoder.decode(value);

            if (!vocabularyReceived) {
              const vocabEndIndex = decodedChunk.indexOf("\n");
              if (vocabEndIndex !== -1) {
                const vocabPart = decodedChunk.substring(0, vocabEndIndex);
                currentVocabulary = JSON.parse(vocabPart).vocabulary;
                vocabularyReceived = true;
                aiResponse += decodedChunk.substring(vocabEndIndex + 1);
              } else {
                aiResponse += decodedChunk;
              }
            } else {
              aiResponse += decodedChunk;
            }

            setChatMessages((prevMessages) => {
              const lastMessage = prevMessages[prevMessages.length - 1];

              if (!lastMessage.isHuman) {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1] = {
                  ...lastMessage,
                  text: aiResponse,
                  vocabulary: currentVocabulary,
                };
                return updatedMessages;
              } else {
                return [
                  ...prevMessages,
                  {
                    text: aiResponse,
                    isHuman: false,
                    vocabulary: currentVocabulary,
                  },
                ];
              }
            });

            adjustChatContainerHeight();
          }
        }
      } catch (error) {
        if ((error as { name: string }).name === "AbortError") {
          console.log("Streaming aborted");
        } else {
          console.error("Error streaming translation:", error);
        }
      }
    }
    setStreaming(false);
  };

  const handleToggleInfo = (index: number) => {
    setExpandedMessageIndex(index === expandedMessageIndex ? null : index);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort the ongoing fetch request
    }
  };

  const adjustChatContainerHeight = () => {
    if (textareaRef.current && chatContainerRef.current) {
      const textareaHeight = textareaRef.current.offsetHeight;
      const chatContainerMaxHeight = `calc(100vh - ${textareaHeight + 116}px)`;
      chatContainerRef.current.style.maxHeight = chatContainerMaxHeight;
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);

    // Check if the last character is "/"
    if (value.endsWith("/")) {
      setShowMenu(true);
      setFilteredOptions(menuOptions); // Reset to all options when "/" is typed
      setHighlightedIndex(0); // Reset the highlighted index
    } else if (showMenu) {
      const query = value.split("/").pop()?.toLowerCase() || "";
      const filtered = menuOptions.filter((option) =>
        option.toLowerCase().includes(query)
      );
      setFilteredOptions(filtered);
      setHighlightedIndex(0); // Reset the highlighted index to the first filtered option
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
    const lastSlashIndex = inputText.lastIndexOf("/");
    const newText = inputText.slice(0, lastSlashIndex) + option;

    setSelectedOption(option);
    setShowMenu(false);
    setInputText(newText); // Replace everything after the last "/" with the selected option
    setFilteredOptions(menuOptions); // Reset filtered options after selection
  };

  const handleOptionClickByIndex = (index: number) => {
    handleOptionClick(filteredOptions[index]);
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
        <main
          className="flex-1 p-4 flex flex-col items-center justify-between dark:bg-gray-900"
          style={{ fontFamily: "'system-ui', sans-serif" }}
        >
          {/* <MarkdownRenderer
            content={`This is some text with a term that has a definition: <span class="has-definition" data-definition="This is the definition of the term."><a href="">term</a></span>.`}
          /> */}

          {/* Chat Messages */}
          <div
            ref={chatContainerRef} // Attach the ref to the chat container
            className="flex-1 w-full rounded-lg p-4 space-y-2 overflow-y-scroll resize-none custom-scrollbar2 "
            style={{ maxHeight: "calc(100vh - 160px)" }} // Initial max height calculation
          >
            <div className="max-w-3xl mx-auto flex-1 w-full rounded-lg p-4 space-y-4 overflow-y-scroll resize-none custom-scrollbar2 ">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 px-3 rounded-3xl ${
                    message.isHuman
                      ? "bg-gray-700 text-white ml-auto max-w-2xl w-fit px-4 leading-6"
                      : "text-black dark:text-white max-w-3xl text-justify"
                  }`}
                  style={{
                    wordBreak: "break-word", // Ensure long words break into the next line
                    overflowWrap: "break-word", // Prevent overflow for long strings
                  }}
                >
                  {message.isHuman ? (
                    message.text
                  ) : (
                    <div>
                      <MarkdownRenderer content={message.text} />

                      {/* Vocabulary List */}
                      {message.vocabulary && (
                        <div
                          className={`w-full max-w-3xl mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 transition-max-height duration-500 ease-in-out overflow-hidden ${
                            expandedMessageIndex === index
                              ? "max-h-screen"
                              : "max-h-14"
                          }`}
                        >
                          <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                            Info
                            <button
                              className="float-right mr-2"
                              onClick={() => handleToggleInfo(index)}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                width="25px"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#ffffff"
                                className={`transition-transform duration-400 ease-in-out ${
                                  expandedMessageIndex === index
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                              >
                                <path
                                  d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                                  fill="#ffffff"
                                ></path>
                              </svg>
                            </button>
                          </h2>

                          <ul>
                            {Object.entries(message.vocabulary).map(
                              ([word, translations], index) => (
                                <li key={index} className="mb-1">
                                  {Array.isArray(translations) ? (
                                    translations.map((translation, i) => (
                                      <span key={i}>
                                        {translation}
                                        {i < translations.length - 1 && ", "}
                                      </span>
                                    ))
                                  ) : typeof translations === "object" ? (
                                    <ul>
                                      {Object.entries(translations).map(
                                        (
                                          [subKey, subTranslations],
                                          subIndex
                                        ) => (
                                          <li key={subIndex}>
                                            <strong>{subKey}</strong>:{" "}
                                            {Array.isArray(subTranslations)
                                              ? subTranslations.join(", ")
                                              : subTranslations}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    translations
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="w-full max-w-3xl mt-4 relative rounded-3xl shadow-sm dark:bg-gray-700 dark:border-gray-600">
            <textarea
              placeholder="Type your message..."
              className="flex p-1 m-2 pl-3 border rounded-3xl shadow-sm dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none "
              rows={1}
              value={inputText}
              ref={textareaRef} // Attach the ref to the textarea
              onChange={handleTextareaChange}
              onKeyDown={handleTextareaKeyDown}
              style={{
                width: "calc(100% - 55px)",
                maxHeight: "600px",
                overflowY: "hidden",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto"; // Reset height to auto
                target.style.height = `${target.scrollHeight}px`; // Adjust height

                // Adjust the height of the chat container
                adjustChatContainerHeight();

                // Add or remove the overflow based on height
                if (target.scrollHeight > 200) {
                  target.style.overflowY = "auto"; // Show scrollbar
                } else {
                  target.style.overflowY = "hidden"; // Hide scrollbar
                }
              }}
            />
            {!streaming ? (
              <button
                className="absolute right-2 bottom-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 focus:outline-none"
                style={{ height: "35px", padding: "5px", marginTop: "auto" }}
                onClick={handleSend}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#EEEEEE"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                      fill="#EEEEEE"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            ) : (
              <button
                className="absolute right-2 bottom-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 focus:outline-none"
                style={{ height: "35px", padding: "5px", marginTop: "auto" }}
                onClick={handleStop}
              >
                <svg
                  fill="#ffffff"
                  viewBox="0 0 32 32"
                  width="25"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>stop</title>{" "}
                    <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z"></path>{" "}
                  </g>
                </svg>
              </button>
            )}

            {showMenu && (
              <div
                className="absolute bottom-full left-0 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-lg p-2 max-h-128 overflow-y-scroll custom-scrollbar border-solid border-1 border-gray-500"
                style={{ width: "calc(100% - 20px)" }}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`p-2 cursor-pointer ${
                        index === highlightedIndex
                          ? "bg-gray-200 dark:bg-gray-600"
                          : ""
                      }`}
                      onClick={() => handleOptionClickByIndex(index)} // Ensure correct option is selected
                    >
                      {option}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No options found</div>
                )}
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
