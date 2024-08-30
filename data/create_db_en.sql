CREATE TABLE dictionary (
    id SERIAL PRIMARY KEY,
    lang TEXT NOT NULL,  -- New field to store the language of the word ('en' or 'fr')
    word TEXT NOT NULL,
    url TEXT,
    french_words TEXT[],
    english_words TEXT[],
    definition TEXT[],
    complement TEXT[],
    sources JSONB  -- Storing the sources as a JSONB array with name and url
);