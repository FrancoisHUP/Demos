import json
import re

# Read the JSON file with UTF-8 encoding
with open('words_with_links.json', 'r', encoding='utf-8') as f:
    json_data = json.load(f)

# Create a set from the JSON data for quick lookup
word_set = {item['word'] for item in json_data}

# Read the Markdown file with UTF-8 encoding
with open('GraphRAG 0f86150a7e6d4867b5ade94dffa0dc7c.md', 'r', encoding='utf-8') as f:
    markdown_text = f.read()

# Function to find matching words
def find_matching_words(text, word_set):
    # Extract words from the text
    words = re.findall(r'\b\w+\b', text)
    # Find matches
    matches = [word for word in words if word in word_set]
    return matches

# Find matching words in the markdown text
matching_words = find_matching_words(markdown_text, word_set)

# Print the list of matching words
print("Matching words found in the markdown file:")
print(matching_words)
