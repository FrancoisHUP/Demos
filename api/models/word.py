from typing import List, Optional
from pydantic import BaseModel

# Define the response model using Pydantic
class Source(BaseModel):
    url: str
    word: str

class WordData(BaseModel):
    id: int
    lang: str
    word_embedding: Optional[List[float]] = None 
    word: str
    url: str
    french_words: List[str]
    english_words: List[str]
    definition: List[str]
    complement: Optional[List[str]] = None
    sources: List[Source]
    similarity: Optional[float] = None 
