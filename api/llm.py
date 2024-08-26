
class Llm:
    map_model_name = {
        "gpt-4o-mini": "gpt-4o-mini",
        "gpt-4o": "gpt-4o",
        "claude3.5-sonnet": "claude-3-5-sonnet-20240620",
        "gemini-1.5-flash" : "gemini-1.5-flash" 
    }

    def __init__(self, model):
        self.model = model.lower()

    @staticmethod
    def create(model_name):
        model_name = model_name.lower()

        if model_name in ["gpt-4o-mini", "gpt-4o"]:
            from openai_rapper import GPT
            return GPT(model_name)
        elif model_name in ["claude3.5-sonnet", "claude-3-5-sonnet-20240620"]:
            from anthropic_rapper import Claude 
            return Claude(model_name)
        elif model_name in ["gemini-1.5-flash"]: 
            from gemini_rapper import Gemini
            return Gemini(model_name)
        else:
            raise ValueError(f"Unknown model: {model_name}")

    def prompt(self, text):
        raise UndefinedException("Undefined function")
    
    async def stream(self, text):
        raise UndefinedException("Undefined function")

    async def __aiter__(self):
        return self

    async def __anext__(self):
        chunk = await self.stream_chunk()
        if not chunk:
            raise StopAsyncIteration
        return chunk

    async def stream_chunk(self):
        """Override this method to provide a stream chunk."""
        return None

    
class UndefinedException(Exception):
    def __init__(self, message, errors):            
        # Call the base class constructor with the parameters it needs
        super().__init__(message)
            
        # Now for your custom code...
        self.errors = errors


