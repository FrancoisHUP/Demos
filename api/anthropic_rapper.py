import anthropic
from dotenv import load_dotenv
from llm import Llm
import os 
load_dotenv()

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

class Claude(Llm):
    def __init__(self, model="claude-3-5-sonnet-20240620") -> None:
        super().__init__(model)
        self.model = Llm.map_model_name[model]

    def prompt(self, text):
        message = client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": text}
            ]
        )
        return message.content
    
    async def stream(self, text):
       with client.messages.stream(
            max_tokens=1024,
            messages=[{"role": "user", "content": text}],
            model=self.model,
        ) as stream:
        for text in stream.text_stream:
            yield text