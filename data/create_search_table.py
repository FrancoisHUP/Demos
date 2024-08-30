import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the environment variables
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")

# Database connection parameters
conn_params = {
    'dbname': db_name,
    'user': db_user,
    'password': db_password,
    'host': db_host,
    'port': db_port
}

# Connect to the PostgreSQL database
conn = psycopg2.connect(**conn_params)
cur = conn.cursor()

# Create the new table
# cur.execute("""
#     CREATE TABLE IF NOT EXISTS word_references (
#         word TEXT PRIMARY KEY,
#         refs INTEGER[],
#         lang TEXT,
#         word_embedding vector(1536)
#     )
# """)

# Fetch all rows from the dictionary table
cur.execute("SELECT id, french_words, english_words, word, lang FROM dictionary")
rows = cur.fetchall()

# Create a dictionary to hold the words and their references
word_dict = {}

# Process each row
for row in rows:
    id, french_words, english_words, word, lang = row
    for w in  french_words + english_words + [word]:
        if w not in word_dict:
            word_dict[w] = {'refs': [], 'lang': lang}
        word_dict[w]['refs'].append(id)

# Insert the data into the new table
for word, data in word_dict.items():
    refs = data['refs']
    lang = data['lang']
    word_embedding = [0.0] * 1536  # Initialize the vector with zeroes
    cur.execute("""
        INSERT INTO word_references (word, refs, lang, word_embedding) 
        VALUES (%s, %s, %s, %s) 
        ON CONFLICT (word) DO NOTHING
    """, (word, refs, lang, word_embedding))

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()