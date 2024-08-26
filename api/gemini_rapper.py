import google.generativeai as genai
from dotenv import load_dotenv
from llm import Llm
import os 
load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

class Gemini(Llm):
    def __init__(self, model="gemini-1.5-flash") -> None:
        super().__init__(model)
        self.model_name = Llm.map_model_name[model]
        self.model = genai.GenerativeModel(self.model_name)
        

    def prompt(self, text):
        response = self.model.generate_content(text)
        return response
        
    async def stream(self, text):
        response = self.model.generate_content(text, stream=True)
        for chunk in response:
            yield chunk.text