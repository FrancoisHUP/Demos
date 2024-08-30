CREATE TABLE word_references (
    word TEXT PRIMARY KEY,
    refs INTEGER[],
    lang TEXT,
    word_embedding vector(1536)  
);

-- DELETE THE LONGEST WORDS
-- WITH rows_to_delete AS (
--     SELECT ctid
--     FROM public.word_references
--     ORDER BY LENGTH(word) DESC 
--     LIMIT 123
-- )
-- DELETE FROM public.word_references
-- USING rows_to_delete
-- WHERE public.word_references.ctid = rows_to_delete.ctid;