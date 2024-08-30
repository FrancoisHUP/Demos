"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Layout from "@/app/DashboardLayout";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/SearchContext";
import SearchResults from "@/app/components/SearchResults";
import { SearchResult } from "@/app/models/SearchResult";
import PencilIcon from "@/app/components/icons/PencilIcon";
import SaveIcon from "@/app/components/icons/SaveIcon";
import EditIcon from "@/app/components/icons/EditIcon";

export default function WordPage() {
  const params = useParams();

  const { word } = params; // Get the dynamic word parameter
  const [wordData, setWordData] = useState<SearchResult | null>(null);
  const { results, searching, setResults, setSearching } = useSearch();
  const [user, setUser] = useState<any>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [textareaKey, setTextareaKey] = useState<number>(0);
  const [definitions, setDefinitions] = useState<string[]>([]);
  const [englishWords, setEnglishWords] = useState<string[]>([]);
  const [frenchWords, setFrenchWords] = useState<string[]>([]);
  const [sources, setSources] = useState<{ word: string; url: string }[]>([]);
  const [complements, setComplements] = useState<string[]>([]);
  const [lang, setLang] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  // Set definition handler with appropriate type annotations
  const setDefinitionHandler = (index: number, value: string): void => {
    setDefinitions((prevDefinitions) => {
      const updatedDefinitions = [...prevDefinitions]; // Copy previous definitions
      updatedDefinitions[index] = value; // Update the specific definition
      return updatedDefinitions; // Return the updated array
    });
  };

  const setEnglishWordHandler = (index: number, value: string): void => {
    setEnglishWords((prevEnglishWords) => {
      const updatedEnglishWords = [...prevEnglishWords];
      updatedEnglishWords[index] = value;
      return updatedEnglishWords;
    });
  };

  const setFrenchWordHandler = (index: number, value: string): void => {
    setFrenchWords((prevFrenchWords) => {
      const updatedFrenchWords = [...prevFrenchWords];
      updatedFrenchWords[index] = value;
      return updatedFrenchWords;
    });
  };

  const setSourceHandler = (
    index: number,
    key: keyof { word: string; url: string },
    value: string
  ): void => {
    setSources((prevSources) => {
      const updatedSources = [...prevSources];
      updatedSources[index] = { ...updatedSources[index], [key]: value };
      return updatedSources;
    });
  };
  const setComplementsHandler = (index: number, value: string): void => {
    setComplements((prevComplements) => {
      const updatedComplements = [...prevComplements];
      updatedComplements[index] = value;
      return updatedComplements;
    });
  };

  const textareaRefs = useRef<HTMLTextAreaElement[]>([]);

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

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
            console.log("data.definition", data);
            setDefinitions(data.definition);
            setEnglishWords(data.english_words);
            setFrenchWords(data.french_words);
            setLang(data.lang);
            setSources(data.sources);
            setUrl(data.url);
            setComplements(data.complement);
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

  const handleEdit = () => {
    setEdit(true);
    setTextareaKey((prevKey) => prevKey + 1); // Force re-render and adjustment
    console.log("edit");
  };
  const handleSave = () => {
    setEdit(false);
    console.log("save");
  };

  return (
    <Layout>
      {wordData && results.length === 0 ? (
        <main className="flex-1 p-4 flex flex-col items-center justify-between -z-1 dark:bg-gray-900">
          <div className="w-full max-w-3xl mt-4 relative rounded-lg shadow-sm h-full">
            <div className="container mx-auto p-4 h-full">
              <div className="flex justify-between">
                <h1 className="text-5xl font-bold ">{wordData.word}</h1>
                {edit ? (
                  <button
                    onClick={() => handleSave()}
                    className="flex bg-gray-700 text-white p-2 rounded-xl h-fit"
                  >
                    <p className="mr-2">Save</p>
                    <SaveIcon />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit()}
                    className="flex bg-gray-700 text-white p-2 rounded-xl h-fit"
                  >
                    <p className="mr-2">Edit</p>
                    <EditIcon />
                  </button>
                )}
              </div>
              {edit ? (
                <div>
                  <h2 className="font-bold mt-4 text-3xl mb-3">Definition</h2>
                  <button
                    className="hover-button absolute left-0 text-gray-500 px-2"
                    style={{ display: "none" }} // Initially hidden
                  >
                    ⋮
                  </button>
                  {definitions.map((definition: string, index: number) => (
                    <div
                      key={index}
                      className="relative flex items-center my-1 w-full"
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget.querySelector(
                            ".hover-button"
                          ) as HTMLElement
                        ).style.display = "inline-block";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget.querySelector(
                            ".hover-button"
                          ) as HTMLElement
                        ).style.display = "none";
                      }}
                    >
                      <button
                        className="hover-button absolute left-0 text-white text-xl px-2 dark:bg-gray-800 rounded-lg px-2"
                        style={{ display: "none" }} // Initially hidden
                      >
                        ⋮⋮
                      </button>
                      <textarea
                        onChange={(e) =>
                          setDefinitionHandler(index, e.target.value)
                        }
                        className="w-full border dark:bg-gray-900 dark:border-none resize-none custom-scrollbar focus:outline-none text-lg rounded-lg"
                        ref={(el) => {
                          if (el) {
                            textareaRefs.current[index] = el;
                            adjustTextareaHeight(el); // Adjust height immediately
                          }
                        }}
                        rows={1}
                        value={definition}
                        style={{
                          width: "100%",
                          overflowY: "auto",
                          paddingLeft: "2rem",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.target as HTMLTextAreaElement
                          ).style.backgroundColor =
                            " rgba(255, 255, 255, 0.03)"; // Set background to light gray
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.target as HTMLTextAreaElement
                          ).style.backgroundColor = "inherit"; // Revert background color
                        }}
                        onKeyUp={(e) => {
                          adjustTextareaHeight(e.target as HTMLTextAreaElement);
                        }}
                      ></textarea>
                    </div>
                  ))}

                  <h2 className="font-bold mt-10 text-3xl mb-3">
                    English Words
                  </h2>
                  {englishWords.map((englishWord: string, index: number) => (
                    <textarea
                      onChange={(e) =>
                        setEnglishWordHandler(index, e.target.value)
                      }
                      className="my-1 w-full border dark:bg-gray-900 dark:border-none resize-none custom-scrollbar focus:outline-none text-lg"
                      ref={(el) => {
                        if (el) {
                          textareaRefs.current[index] = el;
                          adjustTextareaHeight(el); // Adjust height immediately
                        }
                      }}
                      rows={1}
                      value={englishWord}
                      style={{
                        width: "100%",
                        overflowY: "auto",
                      }}
                      onKeyUp={(e) => {
                        adjustTextareaHeight(e.target as HTMLTextAreaElement);
                      }}
                    ></textarea>
                  ))}

                  <h2 className="font-bold mt-10 text-3xl mb-3">
                    French Words
                  </h2>
                  {frenchWords.map((frenchWord: string, index: number) => (
                    <textarea
                      onChange={(e) =>
                        setFrenchWordHandler(index, e.target.value)
                      }
                      className="my-1 w-full border dark:bg-gray-900 dark:border-none resize-none custom-scrollbar focus:outline-none text-lg"
                      ref={(el) => {
                        if (el) {
                          textareaRefs.current[index] = el;
                          adjustTextareaHeight(el); // Adjust height immediately
                        }
                      }}
                      rows={1}
                      value={frenchWord}
                      style={{
                        width: "100%",
                        overflowY: "auto",
                      }}
                      onKeyUp={(e) => {
                        adjustTextareaHeight(e.target as HTMLTextAreaElement);
                      }}
                    ></textarea>
                  ))}
                  <h2 className="font-bold mt-10 text-3xl mb-3">
                    Original Language
                  </h2>
                  <textarea
                    onChange={(e) => setLang(e.target.value)}
                    className="my-1 w-full border dark:bg-gray-900 dark:border-none resize-none custom-scrollbar focus:outline-none text-lg"
                    ref={(el) => {
                      if (el) {
                        adjustTextareaHeight(el); // Adjust height immediately
                      }
                    }}
                    rows={1}
                    value={lang}
                    style={{
                      width: "100%",
                      overflowY: "auto",
                    }}
                    onKeyUp={(e) => {
                      adjustTextareaHeight(e.target as HTMLTextAreaElement);
                    }}
                  ></textarea>
                  <h2 className="font-bold mt-10 text-3xl mb-3">Complement</h2>
                  {complements.map((complement: string, index: number) => (
                    <textarea
                      onChange={(e) =>
                        setComplementsHandler(index, e.target.value)
                      }
                      className="my-1 w-full border dark:bg-gray-900 dark:border-none resize-none custom-scrollbar focus:outline-none text-lg"
                      ref={(el) => {
                        if (el) {
                          textareaRefs.current[index] = el;
                          adjustTextareaHeight(el); // Adjust height immediately
                        }
                      }}
                      rows={1}
                      value={complement}
                      style={{
                        width: "100%",
                        overflowY: "auto",
                      }}
                      onKeyUp={(e) => {
                        adjustTextareaHeight(e.target as HTMLTextAreaElement);
                      }}
                    ></textarea>
                  ))}

                  <h2 className="font-bold mt-10 text-3xl mb-3">Sources</h2>
                  {sources.map((source, index: number) => (
                    <div key={index} className="mb-4">
                      <input
                        type="text"
                        placeholder="Word"
                        onChange={(e) =>
                          setSourceHandler(index, "word", e.target.value)
                        }
                        value={source.word}
                        className="my-1 w-full border dark:bg-gray-900 dark:border-none resize-none custom-scrollbar focus:outline-none text-lg"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        onChange={(e) =>
                          setSourceHandler(index, "url", e.target.value)
                        }
                        value={source.url}
                        className="my-1 w-full border dark:bg-gray-900 dark:border-none resize-none custom-scrollbar focus:outline-none text-lg"
                      />
                    </div>
                  ))}
                  <h2 className="font-bold mt-10 text-3xl mb-3">Origin</h2>
                  <input
                    type="text"
                    placeholder="URL"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    className="my-1 w-full border dark:bg-gray-900 dark:border-none resize-none custom-scrollbar focus:outline-none text-lg"
                  />
                  <button
                    onClick={() => handleSave()}
                    className="flex bg-gray-700 text-white p-2 rounded-xl h-fit ml-auto my-3"
                  >
                    <p className="mr-2">Save</p>
                    <SaveIcon />
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="font-bold mt-4 text-3xl mb-3">Definition</h2>
                  {/* <p className="text-justify text-lg">{wordData.definition}</p> */}
                  {definitions.map((definition: string, index: number) => (
                    <p className="text-justify text-lg my-4">{definition}</p>
                  ))}
                  <h2 className="font-bold mt-10 text-3xl mb-3">
                    English Words
                  </h2>
                  <ul>
                    {englishWords.map((englishWord: string, index: number) => (
                      <li key={index} className="text-lg">
                        {englishWord}
                      </li>
                    ))}
                  </ul>
                  <h2 className="font-bold mt-10 text-3xl mb-3">
                    French Words
                  </h2>
                  <ul>
                    {frenchWords.map((frenchWord: string, index: number) => (
                      <li key={index} className="text-lg">
                        {frenchWord}
                      </li>
                    ))}
                  </ul>
                  <h2 className="font-bold mt-10 text-3xl mb-3">
                    Original Language
                  </h2>
                  <p className="text-justify text-lg">{lang}</p>
                  <h2 className="font-bold mt-10 text-3xl mb-3">Complement</h2>
                  {complements.map((complement: string, index: number) => (
                    <p key={index} className="text-justify text-lg">
                      {complement}
                    </p>
                  ))}
                  <h2 className="font-bold mt-10 text-3xl mb-3">Sources</h2>
                  <ul>
                    {sources.map((source, index) => (
                      <li key={index}>
                        <a className="underline mr-2 text-lg" href={source.url}>
                          {source.word}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <h2 className="font-bold mt-10 text-3xl mb-3">Origin</h2>
                  <a href="wordData.url" className="flex">
                    <img
                      src="https://datafranca.org/wiki/images/logo-wiki.png"
                      style={{ width: "100px" }}
                    ></img>
                    <p className="text-justify text-lg ml-2">{url}</p>
                  </a>
                </div>
              )}
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
