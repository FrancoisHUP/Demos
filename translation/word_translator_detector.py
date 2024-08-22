import json
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

# Load the dictionary
with open('translated_words.json', 'r', encoding='utf-8') as file:
    dictionary = json.load(file)

def create_translation_mapping(dictionary):
    english_to_french = {}
    english_to_french_lower = {}
    for entry in dictionary:
        for eng_word in entry["english_words"]:
            eng_word_lower = eng_word.lower()
            if eng_word not in english_to_french:
                english_to_french[eng_word] = entry["french_words"]
                english_to_french_lower[eng_word_lower] = entry["french_words"]
            else:
                # Append new translations to the existing list
                english_to_french[eng_word].extend(entry["french_words"])
                english_to_french_lower[eng_word_lower].extend(entry["french_words"])
                # Remove duplicates by converting to a set and back to a list
                english_to_french[eng_word] = list(set(english_to_french[eng_word]))
                english_to_french_lower[eng_word_lower] = list(set(english_to_french_lower[eng_word_lower]))
    return english_to_french, english_to_french_lower

def lemmatize_phrase(phrase):
    # Split the phrase into individual words
    words = phrase.split()
    # Lemmatize each word
    lemmatized_words = [lemmatizer.lemmatize(word.lower()) for word in words]
    # Join the lemmatized words back into a single string
    return ' '.join(lemmatized_words)

def get_translations(word):
    # Check the word directly
    if word in english_to_french:
        return english_to_french[word]

    # Check the lemmatized (base) form of the word
    lemmatized_word = lemmatize_phrase(word)
    if lemmatized_word in english_to_french_lower:
        return english_to_french_lower[lemmatized_word]

    # If no translations are found, return an empty list
    return []

def extract_words(text):
    # Tokenize the text
    words = word_tokenize(text)
    # Filter out non-alphabetic tokens
    words = [word for word in words if word.isalpha()]
    return words

def build_translation_dict(words):
    translation_dict = {}
    for word in words:
        translations = get_translations(word)
        if translations:
            translation_dict[word] = translations
    return translation_dict

def read_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def write_json(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(content, file, ensure_ascii=False, indent=4)

# Create the translation mapping using the function
english_to_french, english_to_french_lower = create_translation_mapping(dictionary)

# Initialize the lemmatizer
lemmatizer = WordNetLemmatizer()

# Paths to the input markdown file and output JSON file
input_file_path = 'GraphRAG 0f86150a7e6d4867b5ade94dffa0dc7c.md'
output_file_path = 'GraphRAG_translation.json'

# Read the input markdown file
input_text = read_markdown(input_file_path)

# Extract words from the text
words = extract_words(input_text)

# Build the translation dictionary
translation_dict = build_translation_dict(words)

# Write the translation dictionary to a JSON file
write_json(output_file_path, translation_dict)

print(f"Translation dictionary created. Check the output file at {output_file_path}")