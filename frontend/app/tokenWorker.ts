import GPT4Tokenizer from "gpt4-tokenizer";
const gpt_tokenizer = new GPT4Tokenizer({ type: "gpt4" });

// Listen for messages from the main thread
self.onmessage = (event: MessageEvent) => {
    const { inputText, model } = event.data;
    const estimatedTokenCount = calculateTokens(inputText);
    const estimatedCost = calculateEstimatedCost(estimatedTokenCount, model);
    
    // Send the result back to the main thread
    self.postMessage({ estimatedTokenCount, estimatedCost });
  };
  
  // Function to calculate tokens (dummy implementation for example)
  const calculateTokens = (inputText: string): number => {
    return gpt_tokenizer.estimateTokenCount(inputText);
    // Replace this with actual token calculation logic
    return inputText.length; // Example: replace with actual token calculation
  };
  
  // Function to calculate estimated cost based on model and token count
  const calculateEstimatedCost = (estimatedTokenCount: number, model: string): number => {
    if (estimatedTokenCount) {
      switch (model) {
        case "Gpt-4o":
          return estimatedTokenCount * (5 / 1_000_000);
        case "Gpt-4o-mini":
          return estimatedTokenCount * (0.15 / 1_000_000);
        case "Gemini-1.5-flash":
          const isLongPrompt = estimatedTokenCount > 128_000;
          return isLongPrompt
            ? estimatedTokenCount * (0.15 / 1_000_000)
            : estimatedTokenCount * (0.075 / 1_000_000);
        case "Claude3.5-sonnet":
          return estimatedTokenCount * (3 / 1_000_000);
        default:
          return 0;
      }
    }
    return 0;
  };