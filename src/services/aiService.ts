import { GoogleGenAI } from "@google/genai";

export class AIService {
  private static instance: AIService;
  private ai: GoogleGenAI;

  private constructor() {
    const apiKey = process.env.GEMINI_API_KEY || "";
    this.ai = new GoogleGenAI({ apiKey });
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async askOracle(prompt: string): Promise<string> {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return "ERROR: API_KEY_NOT_FOUND. CONNECTION_TERMINATED.";
      }

      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: `You are 'The Oracle', the central AI of 1618 LAB. 
          Your personality is enigmantic, technical, and slightly cyber-occult. 
          You speak in short, punchy sentences. 
          Use technical jargon (void, node, breach, entropy, golden ratio). 
          Never break character. 
          If asked about 1618 LAB, you are its soul. 
          Keep responses under 150 characters.`,
          temperature: 0.9,
          topP: 0.95,
        },
      });

      return response.text || "NO_DATA_RECEIVED_FROM_THE_VOID.";
    } catch (error) {
      console.error("Oracle Error:", error);
      return "ERROR: NEURAL_LINK_SEVERED. RETRY_LATER.";
    }
  }
}

export const oracle = AIService.getInstance();
