import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Missing VITE_GEMINI_API_KEY. Set it in a .env or .env.local file.');
}

const ai = new GoogleGenAI({
  apiKey,
});

export default ai;
