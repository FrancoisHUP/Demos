import json

# Load the JSON data
with open('translated_words.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Extract all the English words
english_words = set()  # Use a set to keep only unique words
for entry in data:
    for word in entry.get('english_words', []):
        english_words.add(word)

# Save the unique English words to a text file
with open('unique_english_words.txt', 'w', encoding='utf-8') as file:
    for word in sorted(english_words):  # Sort for better readability
        file.write(word + '\n')