export interface SearchResult {
    id: number;
    lang: string;
    word_embedding: string;
    word: string;
    url: string;
    french_words: string[];
    english_words: string[];
    definition: string[];
    complement: string[];
    sources: {
      url: string;
      word: string;
    }[];
    similarity: number;
  }
  
export interface Definition {
    id: number;
    word: string;
    definition: string[];
}

export interface PartialSearchResult {
    word: string;
    refs: number[];
    lang: string;
    word_embedding: string;
    similarity: number;
    definitions: Definition[];
}

export interface ApiResponse {
    result: SearchResult[];
}

  