import os
import json
import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import execute_values

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

# Connect to the PostgreSQL database
conn = psycopg2.connect(connection_string)
cur = conn.cursor()

# Prepare the insert query
insert_query = """
INSERT INTO dictionary (lang, word, url, french_words, english_words, definition, complement, sources)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
"""

# Placeholder for the word embeddings (e.g., use a zero vector temporarily)
# embedding_placeholder = [0.0] * 1536  # Assuming 1536 dimensions

# Function to load and insert data
def load_and_insert_data(file_path, lang):
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)
    
    for entry in data:
        # word_embedding = embedding_placeholder  # Placeholder, replace with actual embedding
        word = entry.get("word")
        url = entry.get("url")
        french_words = entry.get("french_words")
        english_words = entry.get("english_words")
        definition = entry.get("definition")
        complement = entry.get("complement")
        sources = entry.get("sources")

        # Convert sources to JSONB
        sources_jsonb = json.dumps(sources)


        # Insert the data
        cur.execute(insert_query, (lang , word, url, french_words, english_words, definition, complement, sources_jsonb))
        # cur.execute(insert_query, (lang, word_embedding, word, url, french_words, english_words, definition, complement, sources_jsonb))

# Load and insert data for both English and French JSON files
load_and_insert_data("translated_words_en.json", "en")
load_and_insert_data("translated_words_fr.json", "fr")

# Commit the transaction
conn.commit()

# Close the connection
cur.close()
conn.close()
