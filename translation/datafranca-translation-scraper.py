import requests
from bs4 import BeautifulSoup
import json
import time

# Load the initial JSON file
with open('words_with_links.json', 'r', encoding='utf-8') as f:
    words_data = json.load(f)

translated_words = []

def get_paragraphs_text(soup, header_id):
    paragraphs = []
    header = soup.find('span', id=header_id)
    if header:
        for sibling in header.find_parent('h2').find_next_siblings():
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
        
        # Get French translations
        french_paragraphs = get_paragraphs_text(soup, 'Fran.C3.A7ais')
        
        # Get English translations
        english_paragraphs = get_paragraphs_text(soup, 'Anglais')
        
        return french_paragraphs, english_paragraphs
    except Exception as e:
        print(f"Error fetching translations from {url}: {e}")
    return [], []

def save_progress(translated_words):
    with open('translated_words.json', 'w', encoding='utf-8') as f:
        json.dump(translated_words, f, ensure_ascii=False, indent=4)
    print("Progress saved.")

start_time = time.time()
save_interval = 120  # Save progress every 2 minutes
progress_counter = 0  # To track and print progress

for i, entry in enumerate(words_data):
    word = entry['word']
    url = entry['url']
    french_words, english_words = get_translations(url)
    print(f"{i + 1}/{len(words_data)} Word: {word}, French Words: {french_words}, English Words: {english_words}")
    if french_words or english_words:
        translated_words.append({
            "word": word,
            "french_words": french_words,
            "english_words": english_words
        })
    else:
        print(f"Translations not found for {word} at {url}")
    
    # Periodic saving
    progress_counter += 1
    current_time = time.time()
    if current_time - start_time >= save_interval:
        save_progress(translated_words)
        start_time = current_time  # Reset the timer

# Final save after processing all words
save_progress(translated_words)
print("Translation completed and data saved to translated_words.json")
