import os
import openai
import psycopg2
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from psycopg2.extras import Json
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Retrieve the environment variables
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")

# Initialize OpenAI API client
client = OpenAI()

# Create your PostgreSQL connection string
connection_string = f"dbname={db_name} user={db_user} password={db_password} host={db_host} port={db_port}"

# Initialize FastAPI app
app = FastAPI()

# Pydantic model for search request
class SearchRequest(BaseModel):
    term: str

# Function to generate embedding using OpenAI
def generate_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    embedding = response.data[0].embedding
    return embedding

def search(term: str, page: int = 1, page_size: int = 10):
    term_lower = term.lower()
    offset = (page - 1) * page_size

    # Connect to the database
    conn = psycopg2.connect(connection_string)
    cur = conn.cursor()

    # Exact match search
    cur.execute("SELECT * FROM word_references WHERE LOWER(word) = %s;", (term_lower,))
    result = cur.fetchone()

    if result:
        columns = [desc[0] for desc in cur.description]
        word_data = dict(zip(columns, result))
        word_data["similarity"] = 1.0  # Exact match has similarity 1.0

        # Fetch definitions from dictionary table using the ref array
        ref_ids = word_data['refs']
        cur.execute("SELECT id, word, definition FROM dictionary WHERE id = ANY(%s);", (ref_ids,))
        definitions = cur.fetchall()
        word_data["definitions"] = [{"id": row[0], "word": row[1] ,"definition": row[2]} for row in definitions]

        # Close the database connection
        cur.close()
        conn.close()

        return [word_data]

    # If exact match not found, perform similarity search using pgvector's cosine_distance
    term_embedding = generate_embedding(term)

    # Perform the similarity search directly in the database with pagination
    cur.execute("""
        SELECT *, 1 - (word_embedding <=> %s) AS similarity
        FROM word_references
        WHERE word_embedding IS NOT NULL
        ORDER BY word_embedding <=> %s
        LIMIT %s OFFSET %s;  -- Pagination parameters
    """, (Json(term_embedding), Json(term_embedding), page_size, offset))

    rows = cur.fetchall()

    # Process the similarity search results
    columns = [desc[0] for desc in cur.description]
    relevant_results = []

    for row in rows:
        word_data = dict(zip(columns, row))

        # Fetch definitions from dictionary table using the ref array
        ref_ids = word_data['refs']
        cur.execute("SELECT id, word, definition FROM dictionary WHERE id = ANY(%s);", (ref_ids,))
        definitions = cur.fetchall()
        word_data["definitions"] = [{"id": row[0], "word": row[1], "definition": row[2]} for row in definitions]

        relevant_results.append(word_data)

    # Close the database connection
    cur.close()
    conn.close()

    return relevant_results


