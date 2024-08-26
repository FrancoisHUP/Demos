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
        let formattedVocabulary: string | null = null;

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
                if (currentVocabulary !== null) {
                  formattedVocabulary = formatVocabulary(currentVocabulary);
                }
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
                  vocabulary: formattedVocabulary,
                };
                return updatedMessages;
              } else {
                return [
                  ...prevMessages,
                  {
                    text: aiResponse,
                    isHuman: false,
                    vocabulary: formattedVocabulary,
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
        let formattedVocabulary: string | null = null;

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
                if (currentVocabulary !== null) {
                  formattedVocabulary = formatVocabulary(currentVocabulary);
                }
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
              vocabulary: formattedVocabulary,
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

  function formatVocabulary(vocabulary: Vocabulary): string {
    setVocabulary(vocabulary);
    return Object.entries(vocabulary)
      .map(([word, translations]) => {
        if (Array.isArray(translations)) {
          return `${word}: ${translations.join(", ")}`;
        } else if (typeof translations === "object") {
          const subTranslations = Object.entries(translations)
            .map(([subKey, subValues]) => {
              if (Array.isArray(subValues)) {
                return `${subKey}: ${subValues.join(", ")}`;
              } else {
                return `${subKey}: ${subValues}`;
              }
            })
            .join("; ");
          return `${word}: ${subTranslations}`;
        } else {
          return `${word}: ${translations}`;
        }
      })
      .join("\n");
  }

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
          {/* <MarkdownRenderer
            content={`This is some text with a term that has a definition: <span class="has-definition" data-definition="This is the definition of the term."><a href="">term</a></span>.`}
          /> */}
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
                              <svg
                                className="hover:cursor-pointer"
                                width="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#BBBBBB"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm2.91-2.91l10.06-10.06 3.75 3.75-10.06 10.06H5.91v-3.75z"
                                    fill="#BBBBBB"
                                  />
                                </g>
                              </svg>
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
                                  <svg
                                    width="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <path
                                        d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                                        stroke="#BBBBBB"
                                        stroke-width="1.5"
                                      ></path>{" "}
                                      <path
                                        d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                                        stroke="#BBBBBB"
                                        strokeWidth="1.5"
                                      ></path>{" "}
                                    </g>
                                  </svg>
                                </button>
                                <button
                                  className="text-white ml-auto rounded-full mb-4"
                                  onClick={closeVocabularyPopup}
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    width="38px"
                                    height="18px"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <path
                                        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                                        fill="#ffffff"
                                      ></path>{" "}
                                    </g>
                                  </svg>
                                </button>
                                {/* </div> */}
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
                              onClick={() => showVocabulary(message.vocabulary)}
                            >
                              <svg
                                viewBox="0 0 1024 1024"
                                className="icon"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#BBBBBB"
                                stroke="#BBBBBB"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    fill="#BBBBBB"
                                    d="M512 64a448 448 0 110 896.064A448 448 0 01512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 01-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 017.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
                                  ></path>
                                </g>
                              </svg>
                            </button>
                            <button
                              className="ml-4"
                              onClick={() => copyToClipboard(message.text)}
                            >
                              <svg
                                width="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                                    stroke="#BBBBBB"
                                    stroke-width="1.5"
                                  ></path>{" "}
                                  <path
                                    d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                                    stroke="#BBBBBB"
                                    strokeWidth="1.5"
                                  ></path>{" "}
                                </g>
                              </svg>
                            </button>
                            <button onClick={() => handleRegenerate(index)}>
                              <svg
                                className="hover:cursor-pointer ml-4"
                                width="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#BBBBBB"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <g id="Arrow / Arrows_Reload_01">
                                    {" "}
                                    <path
                                      id="Vector"
                                      d="M10 16H5V21M14 8H19V3M4.58301 9.0034C5.14369 7.61566 6.08244 6.41304 7.29255 5.53223C8.50266 4.65141 9.93686 4.12752 11.4298 4.02051C12.9227 3.9135 14.4147 4.2274 15.7381 4.92661C17.0615 5.62582 18.1612 6.68254 18.9141 7.97612M19.4176 14.9971C18.8569 16.3848 17.9181 17.5874 16.708 18.4682C15.4979 19.3491 14.0652 19.8723 12.5723 19.9793C11.0794 20.0863 9.58606 19.7725 8.2627 19.0732C6.93933 18.374 5.83882 17.3175 5.08594 16.0239"
                                      stroke="#BBBBBB"
                                      strokeWidth="2.4"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>{" "}
                                  </g>{" "}
                                </g>
                              </svg>
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
                <svg
                  viewBox="0 0 24 24"
                  width="25"
                  fill="none"
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
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                      fill="#ffffff"
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
