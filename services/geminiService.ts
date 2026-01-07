
import { GoogleGenAI, Type } from "@google/genai";
import { EvaluationResponse, LevelData, FinalReport, LevelScore } from "../types";

// Always initialize GoogleGenAI inside functions to ensure the most current API key is used.
export const evaluateLevelResponse = async (
  level: LevelData,
  answer: string
): Promise<EvaluationResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Evaluate the following answer for 360IQ Level ${level.level}: ${level.title}.
    Puzzle: ${level.puzzle}
    User's Answer: ${answer}
    
    Provide a professional assessment including a score (0-100), detailed feedback, a personality trait revealed, and an estimated IQ range for this specific type of thinking.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          personalityTrait: { type: Type.STRING },
          iqEstimate: { type: Type.STRING },
          criticalThinkingRating: { type: Type.NUMBER, description: "Rating from 1 to 10" },
        },
        required: ["score", "feedback", "personalityTrait", "iqEstimate", "criticalThinkingRating"],
      },
    },
  });

  // Access response.text as a property (not a method).
  return JSON.parse(response.text.trim());
};

export const generateFinalReport = async (
  scores: LevelScore[]
): Promise<FinalReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const summary = scores.map(s => `Level ${s.level} (${s.iqSegment}): ${s.userAnswer} -> Score: ${s.score}, Trait: ${s.personalityTrait}`).join('\n');

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `As the 360IQ Evaluator, generate a final comprehensive report based on these 5 level performances:
    ${summary}
    
    Analyze the patterns in thinking styles, IQ segments, and personality traits.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallIq: { type: Type.STRING, description: "Final estimated IQ range, e.g., 120-130" },
          personalityProfile: { type: Type.STRING, description: "A few sentences describing the user's holistic personality." },
          criticalThinkingScore: { type: Type.NUMBER, description: "Average rating out of 100" },
          growthAreas: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3-4 specific areas for improvement."
          },
        },
        required: ["overallIq", "personalityProfile", "criticalThinkingScore", "growthAreas"],
      },
    },
  });

  // Access response.text as a property (not a method).
  return JSON.parse(response.text.trim());
};
