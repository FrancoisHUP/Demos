import os
import psycopg2
from fastapi import APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from psycopg2.extras import Json
from models.word import WordData, Source 
from typing import List
import ast  # Import the ast module to safely evaluate the string
import urllib.parse  # Import to decode the URL

# Load environment variables from .env file
load_dotenv()

# Retrieve the environment variables
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")

# Create your PostgreSQL connection string
connection_string = f"dbname={db_name} user={db_user} password={db_password} host={db_host} port={db_port}"

# Initialize FastAPI router
router = APIRouter()

# Dependency to get DB connection
def get_db():
    conn = psycopg2.connect(connection_string)
    try:
        yield conn
    finally:
        conn.close()

DEFAULT_VECTOR = [0.0] * 1536

# Fetch a word by its text value (READ)
@router.get("/words/{word}", response_model=WordData)
def read_word_by_text(word: str, db: psycopg2.extensions.connection = Depends(get_db)):
    
    # Decode the URL-encoded word to handle special characters
    decoded_word = urllib.parse.unquote(word)
    
    print("decoded_word",decoded_word)

    cur = db.cursor()
    cur.execute("SELECT * FROM dictionary WHERE word = %s;", (decoded_word,))
    row = cur.fetchone()
    cur.close()

    if row is None:
        raise HTTPException(status_code=404, detail="Word not found")

    columns = [desc[0] for desc in cur.description]
    word_data = dict(zip(columns, row))
    
    # Convert the word_embedding from a string to a list of floats
    if isinstance(word_data['word_embedding'], str):
        word_data['word_embedding'] = ast.literal_eval(word_data['word_embedding'])

    return WordData(**word_data)

# Create a new word (CREATE)
@router.post("/", response_model=WordData)
def create_word(dictionary: WordData, db: psycopg2.extensions.connection = Depends(get_db)):
    cur = db.cursor()
    cur.execute("""
        INSERT INTO dictionary (lang, word, url, french_words, english_words, definition, complement, sources, word_embedding)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id;
    """, (
        dictionary.lang,
        dictionary.word,
        dictionary.url,
        dictionary.french_words,
        dictionary.english_words,
        dictionary.definition,
        dictionary.complement,
        Json([source.dict() for source in dictionary.sources]),  # Convert to list of dictionaries
        dictionary.word_embedding if dictionary.word_embedding else DEFAULT_VECTOR,  # Handle None or empty array
    ))
    word_id = cur.fetchone()[0]
    db.commit()
    cur.close()
    dictionary.id = word_id
    return dictionary

# Read a word by ID (READ)
@router.get("/{word_id}", response_model=WordData)
def read_word(word_id: int, db: psycopg2.extensions.connection = Depends(get_db)):
    cur = db.cursor()
    cur.execute("SELECT * FROM dictionary WHERE id = %s;", (word_id,))
    row = cur.fetchone()
    cur.close()
    
    if row is None:
        raise HTTPException(status_code=404, detail="Word not found")

    columns = [desc[0] for desc in cur.description]
    word_data = dict(zip(columns, row))
    
    # Convert the word_embedding from a string to a list of floats
    if isinstance(word_data['word_embedding'], str):
        word_data['word_embedding'] = ast.literal_eval(word_data['word_embedding'])

    return WordData(**word_data)

# Update a word by ID (UPDATE)
@router.put("/{word_id}", response_model=WordData)
def update_word(word_id: int, dictionary: WordData, db: psycopg2.extensions.connection = Depends(get_db)):
    cur = db.cursor()
    cur.execute("""
        UPDATE dictionary
        SET lang = %s, word = %s, url = %s, french_words = %s, english_words = %s,
            definition = %s, complement = %s, sources = %s, word_embedding = %s
        WHERE id = %s
        RETURNING *;
    """, (
        dictionary.lang,
        dictionary.word,
        dictionary.url,
        dictionary.french_words,
        dictionary.english_words,
        dictionary.definition,
        dictionary.complement,
        Json([source.dict() for source in dictionary.sources]),  # Convert to list of dictionaries
        dictionary.word_embedding if dictionary.word_embedding else DEFAULT_VECTOR,  # Handle None or empty array
        word_id
    ))
    updated_row = cur.fetchone()
    db.commit()
    cur.close()
    
    if updated_row is None:
        raise HTTPException(status_code=404, detail="Word not found")
    
    columns = [desc[0] for desc in cur.description]
    word_data = dict(zip(columns, updated_row))
    
    # Convert the word_embedding from a string to a list of floats
    if isinstance(word_data['word_embedding'], str):
        word_data['word_embedding'] = ast.literal_eval(word_data['word_embedding'])
    
    return WordData(**word_data)

# Delete a word by ID (DELETE)
@router.delete("/{word_id}")
def delete_word(word_id: int, db: psycopg2.extensions.connection = Depends(get_db)):
    cur = db.cursor()
    cur.execute("DELETE FROM dictionary WHERE id = %s RETURNING id;", (word_id,))
    deleted_id = cur.fetchone()
    db.commit()
    cur.close()
    if deleted_id is None:
        raise HTTPException(status_code=404, detail="Word not found")
    return {"detail": "Word deleted successfully", "id": deleted_id[0]}


# 12461, 12462