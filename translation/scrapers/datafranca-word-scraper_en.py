import requests
from bs4 import BeautifulSoup
import json

def scrape_words_with_links(url):
    words_with_links = []
    while url:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract words and their links
        word_list = soup.select('div.mw-category-group ul li a')
        for word in word_list:
            word_text = word.get_text()
            word_url = 'https://datafranca.org' + word['href']
            words_with_links.append({"word": word_text, "url": word_url})
        
        # Find the next page link
        next_page = soup.find('a', text='page suivante')
        if next_page:
            url = 'https://datafranca.org' + next_page['href']
        else:
            url = None
    return words_with_links

start_url = "https://datafranca.org/wiki/index.php?title=Cat%C3%A9gorie:ENGLISH&pageuntil=Affective+computing#mw-pages"
words_with_links = scrape_words_with_links(start_url)

# Save the words with links to a JSON file
with open('words_with_links_en.json', 'w', encoding='utf-8') as f:
    json.dump(words_with_links, f, ensure_ascii=False, indent=4)

print("Scraping completed. Words and their URLs have been saved to 'words_with_links_en.json'.")
