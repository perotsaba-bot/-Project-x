
import { GoogleGenAI, Type } from "@google/genai";
import { OptimizationResult } from "../types";

const API_KEY = process.env.API_KEY;

export const generateOptimization = async (topic: string): Promise<OptimizationResult> => {
  if (!API_KEY) throw new Error("API Key is missing");

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Optimize this video for maximum reach and virality on YouTube Shorts.
    Video topic: ${topic}
    Platform focus: YouTube Shorts
    Language: Indonesian (casual, viral style)`,
    config: {
      systemInstruction: `You are a world-class social media strategist specializing in YouTube Shorts and viral content. 
      Your goal is to generate titles that maximize Click-Through Rate (CTR) and descriptions/hashtags that trigger the YouTube Shorts algorithm.
      Follow these rules strictly:
      - Titles must be under 60 characters.
      - Use Indonesian (casual, viral style).
      - Titles should be emotional, curiosity-driven, and use power words.
      - Provide 15-20 trending hashtags.
      - Include a virality score (0-100) based on current trends.
      - Provide a specific tip to increase retention in the first 3 seconds.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          titles: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "5 viral, clickbait-style titles."
          },
          description: {
            type: Type.STRING,
            description: "1 SEO-optimized description."
          },
          hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "15-20 high-performing hashtags."
          },
          viralityScore: {
            type: Type.NUMBER,
            description: "A score from 0 to 100."
          },
          retentionTip: {
            type: Type.STRING,
            description: "Tip to boost first 3 seconds retention."
          },
          ctrAnalysis: {
            type: Type.STRING,
            description: "Brief explanation of why these titles will work."
          }
        },
        required: ["titles", "description", "hashtags", "viralityScore", "retentionTip", "ctrAnalysis"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result as OptimizationResult;
  } catch (e) {
    console.error("Failed to parse JSON response", e);
    throw new Error("Gagal memproses data dari AI. Silakan coba lagi.");
  }
};
