"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import { useSearch } from "@/app/SearchContext";
import SearchResults from "@/app/components/SearchResults";
import Layout from "@/app/DashboardLayout";
import { useModel } from "@/app/ModelContext";
import GPT4Tokenizer from "gpt4-tokenizer";
import EditIcon from "@/app/components/icons/EditIcon";
import CopyIcon from "@/app/components/icons/CopyIcon";
import CloseIcon from "@/app/components/icons/CloseIcon";
import InfoIcon from "@/app/components/icons/InfoIcon";
import RegenIcon from "@/app/components/icons/RegenIcon";
import ArrowTopIcon from "@/app/components/icons/ArrowTopIcon";
import StopIcon from "@/app/components/icons/StopIcon";

// const { GoogleGenerativeAI } = require("@google/generative-ai");

type Vocabulary = {
  [key: string]: string | string[] | { [key: string]: string | string[] };
};

export default function Home() {
  const gpt_tokenizer = new GPT4Tokenizer({ type: "gpt4" });

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
  const [showVocabularyPopup, setShowVocabularyPopup] =
    useState<boolean>(false);
  const [vocabularyContent, setVocabularyContent] = useState<string>("");

  const [showInfo, setShowInfo] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuOptions, setMenuOptions] = useState<string[]>([
    "snippet 1",
    "snippet 2",
    "snippet 3",
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(menuOptions);

  const [recognizedOption, setRecognizedOption] = useState<string | null>(null);

  const router = useRouter(); // Access Next.js router
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref to access the textarea
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to access the chat container

  const { model, setModel } = useModel();

  const [hoveredMessageIndex, setHoveredMessageIndex] = useState<number | null>(
    null
  );

  const [estimatedTokenCount, setEstimatedTokenCount] = useState<number>(0);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize the web worker
    workerRef.current = new Worker(new URL("tokenWorker.ts", import.meta.url));

    workerRef.current.onmessage = (event: MessageEvent) => {
      const { estimatedTokenCount, estimatedCost } = event.data;
      setEstimatedTokenCount(estimatedTokenCount); // Update the token count
      setEstimatedCost(estimatedCost); // Update the estimated cost
    };

    // Clean up the worker when the component unmounts
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Recalculate cost when model changes by posting a message to the worker
  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ inputText, model });
    }
  }, [model, inputText]); // Post to worker whenever model or inputText changes

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);

    // Send data to the worker for processing
    if (workerRef.current) {
      workerRef.current.postMessage({ inputText: value, model });
    }

    // Show menu logic
    if (value.endsWith("/")) {
      setShowMenu(true);
      setFilteredOptions(menuOptions);
      setHighlightedIndex(0);
    } else if (showMenu) {
      const query = value.split("/").pop()?.toLowerCase() || "";
      const filtered = menuOptions.filter((option) =>
        option.toLowerCase().includes(query)
      );
      setFilteredOptions(filtered);
      setHighlightedIndex(0);
    } else {
      setShowMenu(false);
    }

    // Dynamically adjust the height of the textarea
    adjustTextareaHeight(e.target);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleWordClick = (word: string) => {
    router.push(`/dictionary/${encodeURIComponent(word)}`);
  };

  // Function to show vocabulary popup
  const showVocabulary = (vocabulary: string) => {
    setVocabularyContent(vocabulary);
    setShowVocabularyPopup(true);
  };

  // Function to close vocabulary popup
  const closeVocabularyPopup = () => {
    setShowVocabularyPopup(false);
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
            body: JSON.stringify({ text: trimmedText, model: model }),
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

  const handleRegenerate = async (index?: number) => {
    if (index) {
      // Remove the message at the specified index and the corresponding AI response
      setChatMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];

        // Remove the human message and the AI response
        updatedMessages.splice(index - 1, 2);
        return updatedMessages;
      });

      const previousIndex = index - 1;
      handleResend(chatMessages[previousIndex].text, previousIndex);

      // Reset editing state
      setEditingIndex(null);
      setEditText("");
    }
  };

  const handleResend = async (messageToResend: string, index?: number) => {
    setStreaming(true);

    const trimmedText = messageToResend.trim();

    if (trimmedText) {
      setChatMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const newMessage = { text: trimmedText, isHuman: true };

        if (index !== undefined) {
          // Insert the new human message at the specified index
          updatedMessages.splice(index, 0, newMessage);
        } else {
          // Add the new human message to the end
          updatedMessages.push(newMessage);
        }

        return updatedMessages;
      });

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
            body: JSON.stringify({ text: trimmedText, model: model }),
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
          }

          // Update the state once after processing the entire response
          setChatMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const newAIMessage = {
              text: aiResponse,
              isHuman: false,
              vocabulary: currentVocabulary,
            };

            if (index !== undefined) {
              // Insert the AI response at the correct position
              updatedMessages.splice(index + 1, 0, newAIMessage);
            } else {
              // Add the AI response to the end
              updatedMessages.push(newAIMessage);
            }

            return updatedMessages;
          });

          adjustChatContainerHeight();
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

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort the ongoing fetch request
    }
  };

  const adjustChatContainerHeight = () => {
    if (textareaRef.current && chatContainerRef.current) {
      const textareaHeight = textareaRef.current.offsetHeight;
      const chatContainerMaxHeight = `calc(100vh - ${textareaHeight + 144}px)`;
      chatContainerRef.current.style.maxHeight = chatContainerMaxHeight;
    }
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard");
        // You can add additional feedback to the user here, such as showing a toast message.
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const startEditing = (index: number, currentText: string) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const saveEditing = async (index: number) => {
    // Reset editing state
    setEditingIndex(null);

    // Remove the message at the specified index and the corresponding AI response
    setChatMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      // Remove the human message and the AI response
      updatedMessages.splice(index, 2);
      return updatedMessages;
    });

    // Resend the edited message to regenerate the AI response
    await handleResend(editText, index);

    setEditText("");
  };

  return (
    <Layout>
      {results.length === 0 && !searching ? (
        /* Chat Area */
        <main
          className="flex-1 p-4 flex flex-col items-center justify-between dark:bg-gray-900"
          style={{ fontFamily: "'system-ui', sans-serif" }}
        >
          {/* Chat Messages */}
          <div
            ref={chatContainerRef} // Attach the ref to the chat container
            className="flex-1 w-full rounded-lg p-4 space-y-2 overflow-y-scroll resize-none custom-scrollbar2"
            style={{ maxHeight: "calc(100vh - 162px)" }} // Initial max height calculation
          >
            <div className="group max-w-3xl mx-auto flex-1 w-full rounded-lg p-4 space-y-4 overflow-y-scroll resize-none custom-scrollbar2">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 px-3 rounded-3xl ${
                    message.isHuman
                      ? "text-white ml-auto max-w-3xl w-full leading-6"
                      : "text-black dark:text-white max-w-3xl text-justify"
                  }`}
                  style={{
                    wordBreak: "break-word", // Ensure long words break into the next line
                    overflowWrap: "break-word", // Prevent overflow for long strings
                  }}
                  onMouseEnter={() => setHoveredMessageIndex(index)}
                  onMouseLeave={() => setHoveredMessageIndex(null)}
                >
                  <div>
                    {message.isHuman ? (
                      <div>
                        {editingIndex === index ? (
                          <div
                            className="w-full rounded-3xl dark:bg-gray-700 pb-2 pr-2"
                            style={{
                              height: "400px",
                            }}
                          >
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              style={{
                                height: "332px",
                              }}
                              className="p-3 my-1 w-full border rounded-3xl dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none"
                              rows={1}
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => saveEditing(index)}
                                className="px-4 py-2 bg-gray-900 text-white rounded-3xl hover:bg-gray-800"
                              >
                                Send
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="px-4 py-2 bg-gray-500 text-white rounded-3xl hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center ml-auto w-fit">
                            <button
                              className={`rounded-3xl text-white w-fit leading-6 mr-4 h-fit hover:bg-gray-800 ${
                                hoveredMessageIndex === index
                                  ? "visible"
                                  : "invisible"
                              }`}
                              onClick={() => startEditing(index, message.text)}
                              style={{ padding: "10px 10px" }}
                            >
                              {/* Edit Icon */}
                              <EditIcon />
                            </button>
                            <div className="p-2 px-3 rounded-3xl bg-gray-700 text-white ml-auto max-w-2xl w-full leading-6">
                              {message.text}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <MarkdownRenderer content={message.text} />
                        {showVocabularyPopup && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-gray-700 p-4 rounded-lg shadow-lg w-1/2">
                              <h2 className="flex text-lg font-bold mb-2 ">
                                Vocabulary
                                {/* <div className="flex mt-4 space-x-2 "> */}
                                <button
                                  className="bg-gray-700 text-white p-2 rounded ml-1"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      JSON.stringify(vocabularyContent, null, 2)
                                    )
                                  }
                                >
                                  <CopyIcon />
                                </button>
                                <button
                                  className="text-white ml-auto rounded-full mb-4"
                                  onClick={closeVocabularyPopup}
                                >
                                  <CloseIcon />
                                </button>
                              </h2>

                              <pre className="bg-gray-800 p-2 rounded overflow-auto">
                                {JSON.stringify(vocabularyContent, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                        {/* Vocabulary List */}
                        {message.vocabulary && (
                          <div className="flex ml-1 mt-3">
                            <button
                              onClick={() =>
                                message.vocabulary &&
                                showVocabulary(
                                  JSON.stringify(message.vocabulary, null, 2)
                                )
                              }
                            >
                              <InfoIcon />
                            </button>
                            <button
                              className="ml-4"
                              onClick={() => copyToClipboard(message.text)}
                            >
                              <CopyIcon />
                            </button>
                            <button onClick={() => handleRegenerate(index)}>
                              <RegenIcon />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Input Area */}
          <div className="w-full max-w-3xl mt-4 relative rounded-3xl shadow-sm dark:bg-gray-700 dark:border-gray-600">
            <textarea
              placeholder="Type your message..."
              className="flex p-1 m-2 pl-3 border rounded-3xl shadow-sm dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none"
              rows={1}
              value={inputText}
              ref={textareaRef}
              onChange={handleTextareaChange}
              onKeyDown={handleTextareaKeyDown}
              style={{
                width: "calc(100% - 100px)",
                maxHeight: "400px",
                overflowY: "auto", // Directly use auto for scroll handling
              }}
              onKeyUp={(e) => {
                adjustTextareaHeight(e.target as HTMLTextAreaElement);
              }}
            />

            {!streaming ? (
              <button
                className="absolute right-2 bottom-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 focus:outline-none"
                style={{ height: "35px", padding: "5px", marginTop: "auto" }}
                onClick={handleSend}
              >
                <ArrowTopIcon />
              </button>
            ) : (
              <button
                className="absolute right-2 bottom-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 focus:outline-none"
                style={{ height: "35px", padding: "5px", marginTop: "auto" }}
                onClick={handleStop}
              >
                <StopIcon />
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
          <div className="flex text-slate-400 text-sm">
            <div className="mx-2">
              Estimated Tokens: {estimatedTokenCount.toLocaleString()}
            </div>
            <div className="mx-2">
              Estimated Cost: $
              {estimatedCost
                ? estimatedCost < 1
                  ? estimatedCost.toFixed(7).replace(/\.?0+$/, "") // Remove trailing zeros
                  : estimatedCost
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Use comma as thousands separator
                : "0.00"}
            </div>
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
