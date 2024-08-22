from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

client = OpenAI()

class GPT():
    def __init__(self, model="gpt-4o-mini") -> None:
        self.model = model

    def prompt(self, text) :
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": text }
            ]
        )
        return response
    
    async def stream(self, text):
        stream = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": text}
            ],
            stream=True,
        )
        # Stream the response in chunks
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content