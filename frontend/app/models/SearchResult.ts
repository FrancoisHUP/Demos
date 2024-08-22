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
  
  export interface ApiResponse {
    result: SearchResult[];
  }