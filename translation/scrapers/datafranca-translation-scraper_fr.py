import requests
from bs4 import BeautifulSoup
import json
import time
import os

# Load the initial JSON file
with open('words_with_links_fr.json', 'r', encoding='utf-8') as f:
    words_data = json.load(f)

translated_words = []

# Load the last processed index
if os.path.exists('last_processed_index_fr.txt'):
    with open('last_processed_index_fr.txt', 'r') as f:
        start_index = int(f.read().strip())
else:
    start_index = 0

def get_paragraphs_text(soup, header_id):
    paragraphs = []
    header = soup.find('span', id=header_id)
    if header:
        h2_parent = header.find_parent('h2')
        if h2_parent:
            for sibling in h2_parent.find_next_siblings():
                if sibling.name == 'h2':
                    break
                if sibling.name == 'p':
                    paragraphs.append(sibling.get_text(strip=True))
    return paragraphs

def get_translations(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Will raise HTTPError for bad responses
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Get definition 
        definition = get_paragraphs_text(soup, 'Définition')

        # Get description 
        complement = get_paragraphs_text(soup, 'Compléments')

        # Get French translations
        french_paragraphs = get_paragraphs_text(soup, 'Fran.C3.A7ais')
        
        # Get English translations
        english_paragraphs = get_paragraphs_text(soup, 'Anglais')

        # Get sources 
        sources = []
        word_list = soup.select('a.external.text')
        for word in word_list:
            word_text = word.get_text()
            word_url = word['href']  # Use the href as is, it's already a full URL
            sources.append({"name": word_text, "url": word_url})
        
        return french_paragraphs, english_paragraphs, definition, complement, sources
    except Exception as e:
        print(f"Error fetching translations from {url}: {e}")
        return [], [], [], [], []  # Return empty lists for all expected return values

def save_progress(translated_words, index):
    with open('translated_words_fr.json', 'w', encoding='utf-8') as f:
        json.dump(translated_words, f, ensure_ascii=False, indent=4)
    with open('last_processed_index_fr.txt', 'w') as f:
        f.write(str(index))
    print(f"Progress saved at index {index}.")

start_time = time.time()
save_interval = 60  # Save progress every 1 minute

for i in range(start_index, len(words_data)):
    entry = words_data[i]
    word = entry['word']
    url = entry['url']
    french_words, english_words, definition, complement, sources = get_translations(url)
    print(f"{i + 1}/{len(words_data)} Word: {word}, URL: {url}")
    if french_words or english_words:
        translated_words.append({
            "word": word,
            "url": url,
            "french_words": french_words,
            "english_words": english_words,
            "definition": definition,
            "complement": complement,
            "sources": sources
        })
    else:
        print(f"Translations not found for {word} at {url}")
    
    # Periodic saving
    current_time = time.time()
    if current_time - start_time >= save_interval:
        save_progress(translated_words, i)
        start_time = current_time  # Reset the timer

# Final save after processing all words
save_progress(translated_words, len(words_data) - 1)
print("Translation completed and data saved to translated_words_fr.json")
