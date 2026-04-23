import OpenAI from "openai";
import config from ".";

const openAI = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: config.OPENROUTER_API_KEY,
});

export default openAI;
