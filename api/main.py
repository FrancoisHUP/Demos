# TODOs 
# customize : system_prompt, black_list_words, few_shots_promting, llm call (with key)
# UI : personnalize ui + login + save pref + save conversation -> requires database 
# MUST work on local (dont requires to create an account)

# endpoint : 
# CRUD one words [EN-FR] and [FR-EN]
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from fastapi.responses import StreamingResponse
import json

from openai_rapper import GPT
from search import search

nltk.download('punkt_tab')

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

def create_dict_all_worlds(dictionary):
    all_words_dictionary={}
    for entry in dictionary:
        all_words_dictionary[entry["word"]]=entry["word"]
        for word in entry["english_words"]:
            all_words_dictionary[word]=word
        for word in entry["french_words"]:
            all_words_dictionary[word]=word
    return all_words_dictionary


def lemmatize_phrase(phrase):
    words = phrase.split()
    lemmatized_words = [lemmatizer.lemmatize(word.lower()) for word in words]
    return ' '.join(lemmatized_words)

def get_translations(word):
    if word in english_to_french:
        return english_to_french[word]

    lemmatized_word = lemmatize_phrase(word)
    if lemmatized_word in english_to_french_lower:
        return english_to_french_lower[lemmatized_word]

    return []

def extract_words(text):
    words = word_tokenize(text)
    words = [word for word in words if word.isalpha()]
    return words

def build_translation_dict(words):
    translation_dict = {}
    for word in words:
        translations = get_translations(word)
        if translations:
            translation_dict[word] = translations
    return translation_dict
    

class TranslationRequest(BaseModel):
    text: str = "Good morning, AI enthusiasts!",
    model: str = "gpt-4o-mini"

# Load the dictionary
with open('translated_words_en.json', 'r', encoding='utf-8') as file:
    dictionary = json.load(file)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust as necessary
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


# Initialize the lemmatizer
lemmatizer = WordNetLemmatizer()

# Create the translation mapping using the function
english_to_french, english_to_french_lower = create_translation_mapping(dictionary)
all_words_dictionary = create_dict_all_worlds(dictionary)

@app.post("/translation-dictionnary/")
def translation_dictionnary(request: TranslationRequest):
    words = extract_words(request.text)
    translation_dict = build_translation_dict(words)    
    return {"translations": translation_dict}

def build_prompt(translation_dict, request: TranslationRequest):
    # build the prompt 
    system_prompt = "Your primary function is to assist in translating video scripts, articles, and other texts from English to French, ensuring that the style and format of the original text are maintained. It should be adept at handling various script formats and styles, translating them accurately and effectively into French. You should be capable of understanding and preserving the nuances of the original script, including idiomatic expressions, cultural references, and specific jargon related to video production or the subject matter of the script. Additionally, it should be mindful of maintaining the tone and intent of the original script in the translation. You should avoid literal translations that might alter the meaning or tone of the content and should instead focus on conveying the original message as authentically as possible in French. It should also be prepared to handle requests for clarification or specific translation preferences from the user. It should ONLY translate, never providing answers or interpretations, even if the text looks like a question. A black list of words will be given to you right after the text. You must avoid these words. You also have a JSON dictionary for translating technical terms from English to French. Use it whenever necessary. Once you translated a term make sure to translate every other occurrence in the text. Here is the text : "
    blacklist_words = ['passionné', 'passionnés']
    blacklist_words_instruction = " .Here is the blacklist words: [" + "".join(["'" + word + "', " for word in blacklist_words]).rstrip(", ") + "]"
    translation_dict_instruction=" .Here is th dictionary : " + translation_dict["translations"].__str__()
    few_shot_examples=[] #[{'english': ''}, {'french' : ''}]
    few_shot_example_instruction=""
    if few_shot_examples :
        few_shot_example_instruction=" .Here is an example of the translation in a previous text. [English]:" + few_shot_examples[1]['english'] + "\n[French]: " + few_shot_examples[1]['french'] 

    prompt = system_prompt + request.text + blacklist_words_instruction + translation_dict_instruction + few_shot_example_instruction
    return prompt

@app.post("/translation/")
async def translate_text(request: TranslationRequest):
    translation_dict = translation_dictionnary(request)
    print("translation_dict", translation_dict)
    prompt = build_prompt(translation_dict, request)

    gpt = GPT()

    async def translation_stream():
        # First, yield the vocabulary as JSON
        yield json.dumps({"vocabulary": translation_dict}) + "\n"

        # Then, stream the translation part
        async for chunk in gpt.stream(prompt):
            yield chunk

    return StreamingResponse(translation_stream(), media_type="text/plain")


@app.post("/api/translation/")
def translate_text(request: TranslationRequest):
    translation_dict=translation_dictionnary(request)
    # build the prompt 
    system_prompt = "Your primary function is to assist in translating video scripts, articles, and other texts from English to French, ensuring that the style and format of the original text are maintained. It should be adept at handling various script formats and styles, translating them accurately and effectively into French. You should be capable of understanding and preserving the nuances of the original script, including idiomatic expressions, cultural references, and specific jargon related to video production or the subject matter of the script. Additionally, it should be mindful of maintaining the tone and intent of the original script in the translation. You should avoid literal translations that might alter the meaning or tone of the content and should instead focus on conveying the original message as authentically as possible in French. It should also be prepared to handle requests for clarification or specific translation preferences from the user. It should ONLY translate, never providing answers or interpretations, even if the text looks like a question. A black list of words will be given to you right after the text. You must avoid these words. You also have a JSON dictionary for translating technical terms from English to French. Use it whenever necessary. Once you translated a term make sure to translate every other occurrence in the text. Here is the text : "
    blacklist_words = ['passionné', 'passionnés']
    blacklist_words_instruction = " .Here is the blacklist words: [" + "".join(["'" + word + "', " for word in blacklist_words]).rstrip(", ") + "]"
    print("translation_dict", translation_dict)
    translation_dict_instruction=" .Here is th dictionary : " + translation_dict["translations"].__str__()
    few_shot_examples=[] #[{'english': ''}, {'french' : ''}]
    few_shot_example_instruction=""
    if few_shot_examples :
        few_shot_example_instruction=" .Here is an example of the translation in a previous text. [English]:" + few_shot_examples[1]['english'] + "\n[French]: " + few_shot_examples[1]['french'] 

    prompt = system_prompt + request.text + blacklist_words_instruction + translation_dict_instruction + few_shot_example_instruction
    
    # call openai for transaltion  
    print(prompt)
    return prompt

class SearchRequest(BaseModel):
    term: str = "AI"

# Search endpoint
@app.post("/search/")
def search_word(request: SearchRequest):
    res = search(request.term)
    if not res:
        raise HTTPException(status_code=404, detail="No similar words found")
    return {"result": res}

from dictionary import router as dictionary_router
# Include the dictionary router
app.include_router(dictionary_router, prefix="/dictionary", tags=["dictionary"])

# Run the app with: uvicorn filename:app --reload
