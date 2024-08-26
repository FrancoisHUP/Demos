from openai import OpenAI
from dotenv import load_dotenv
from llm import Llm
load_dotenv()

client = OpenAI()

class GPT(Llm):
    def __init__(self, model="gpt-4o-mini") -> None:
        super().__init__(model)
        self.model = Llm.map_model_name[model]

    def prompt(self, text):
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": text}
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
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                # print(chunk.choices[0].delta.content)
                yield chunk.choices[0].delta.content
            