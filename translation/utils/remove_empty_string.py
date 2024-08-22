import json

# Your original JSON data
with open('translated_words.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Function to remove empty strings from 'english_words'
def remove_empty_strings(data):
    for entry in data:
        if "english_words" in entry:
            entry["english_words"] = [word for word in entry["english_words"] if word]
        if "french_words" in entry:
            entry["french_words"] = [word for word in entry["french_words"] if word]

    return data

def write_json(file_path, updated_data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(updated_data, file, ensure_ascii=False, indent=4)

# Update the JSON data
updated_data = remove_empty_strings(data)

write_json("translated_words_curate.json", updated_data)