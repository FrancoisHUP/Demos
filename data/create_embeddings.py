import psycopg2
from psycopg2.extras import Json
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve the environment variables
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = "localhost"   
DB_PORT = os.getenv("DB_PORT")

# Initialize OpenAI API client
client = OpenAI()

# Function to generate embedding using OpenAI
def generate_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    embedding = response.data[0].embedding
    return embedding

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host=DB_HOST,
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)
cur = conn.cursor()

# Fetch all words and refs from the word_references table
# cur.execute("SELECT word, refs FROM word_references")
# word_refs = cur.fetchall()

# Placeholder vector (adjust the length as per your embedding size)
placeholder_embedding = [0.0] * 1536

# Fetch words and their refs where embeddings are zero vectors
# cur.execute("SELECT word, refs, word_embedding FROM word_references WHERE word_embedding = %s::vector(1536);", (Json(placeholder_embedding),))
cur.execute("SELECT word, refs, word_embedding FROM word_references")

word_refs = cur.fetchall()

# Total number of words to process
total_words = len(word_refs)

# Process each word and its refs
for index, (word, refs, embedding) in enumerate(word_refs, start=1):

    # Print the current progress
    print(f"Processing word {index}/{total_words}: {word}")

    # Fetch definitions from the dictionary table using refs
    cur.execute("SELECT definition FROM dictionary WHERE id = ANY(%s)", (refs,))
    definition = cur.fetchone()  # Use fetchone() to get a single row

    if definition:  # Check if a definition was found
        definition_text = definition[0][0]  # Extract the string from the tuple
        
        # Generate the embedding using OpenAI
        new_embedding = generate_embedding(word + " : " + definition_text)

        # Update the word_embedding in the word_references table
        cur.execute(
            "UPDATE word_references SET word_embedding = %s WHERE word = %s",
            (new_embedding, word)
        )

    if index%100 == 0:
        conn.commit()
       
# Commit changes and close connection
conn.commit()
cur.close()
conn.close()

print("Word embeddings updated successfully.")
