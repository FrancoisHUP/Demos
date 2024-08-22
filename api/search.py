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

# Database search function
def search(term: str):
    term_lower = term.lower()

    # Connect to the database
    conn = psycopg2.connect(connection_string)
    cur = conn.cursor()

    # Exact match search
    cur.execute("SELECT * FROM dictionary WHERE LOWER(word) = %s;", (term_lower,))
    result = cur.fetchone()

    if result:
        columns = [desc[0] for desc in cur.description]
        word_data = dict(zip(columns, result))
        word_data["similarity"] = 1.0  # Exact match has similarity 1.0
        return [word_data]

    # If exact match not found, perform similarity search using pgvector's cosine_distance
    term_embedding = generate_embedding(term)

    # Perform the similarity search directly in the database
    cur.execute("""
        SELECT *, 1 - (word_embedding <=> %s) AS similarity
        FROM dictionary
        WHERE word_embedding IS NOT NULL
        ORDER BY word_embedding <=> %s
        LIMIT 25;  -- You can adjust the number of results returned
    """, (Json(term_embedding), Json(term_embedding)))

    rows = cur.fetchall()

    # Close the database connection
    cur.close()
    conn.close()

    # Convert results to desired format
    columns = [desc[0] for desc in cur.description]
    relevant_results = [dict(zip(columns, row)) for row in rows]

    return relevant_results

