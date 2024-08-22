
import os
from openai import OpenAI
import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import Json

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

# Connect to the PostgreSQL database
conn = psycopg2.connect(connection_string)
cur = conn.cursor()

# Placeholder vector (adjust the length as per your embedding size)
placeholder_embedding = [0.0] * 1536

# Function to generate embedding using OpenAI
def generate_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    embedding = response.data[0].embedding
    return embedding

# Fetch words from the database where the embedding is still the placeholder
cur.execute("SELECT id, word FROM dictionary WHERE word_embedding = %s;", (Json(placeholder_embedding),))
rows = cur.fetchall()

# Get total number of rows for progress tracking
total_rows = len(rows)

# Update the database with embeddings
for index, row in enumerate(rows, start=1):
    word_id = row[0]
    word_text = row[1]

    # Generate the embedding
    embedding = generate_embedding(word_text)

    # Update the database with the embedding
    cur.execute(
        "UPDATE dictionary SET word_embedding = %s WHERE id = %s;",
        (embedding, word_id)
    )

    # Commit after each update
    conn.commit()

    # Print progress to terminal
    print(f"{index} / {total_rows}, ID: {word_id}, Word: {word_text}")

# Close the connection
cur.close()
conn.close()

print("Embeddings generated and updated in the database.")
