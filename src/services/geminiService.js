import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export async function analyzeTerms(text) {
  // Truncate to limit payload size and improve token generation speed dramatically
  const truncatedText = text.slice(0, 35000);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Analyze the following Terms and Conditions text. Provide a safety score from 0 to 100 (where 100 is perfectly safe). Identify specific 'Red Flags' (negative things like data selling, hidden fees, etc.). Categorize findings into 'Privacy', 'Data Usage', 'Legal', and 'Other'. Provide a concise summary.

    CRITICAL SPEED & CONCISENESS RULES:
    1. Limit 'redFlags' list to a maximum of 5 of the most crucial risk issues overall.
    2. Limit 'highlights' list to a maximum of 3 key positive or neutral elements.
    3. Keep descriptions for each point extremely concise (under 20 words).
    This keeps the generated JSON response brief, speeding up results up to 5x.

    Terms and Conditions Text:
    ${truncatedText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          safetyScore: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          redFlags: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING, enum: ["Privacy", "Data Usage", "Legal", "Other"] },
                point: { type: Type.STRING },
                severity: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
              },
              required: ["category", "point", "severity"],
            },
          },
          highlights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                content: { type: Type.STRING },
              },
              required: ["category", "content"],
            },
          },
        },
        required: ["safetyScore", "summary", "redFlags", "highlights"],
      },
    },
  });

  const textResponse = response.text;
  if (!textResponse) {
    throw new Error("No response from AI");
  }

  return JSON.parse(textResponse);
}

export async function askQuestionAboutTerms(
  terms,
  question,
  history = []
) {
  const systemInstruction = `You are a helpful legal assistant specializing in summarizing and analyzing complicated Terms & Conditions for normal users.
Analyze the provided Terms & Conditions text carefully.
Answer the user's questions objectively, accurately, and clearly based on the provided document text.
Give specific reasons, point out the exact clauses if possible, and state the risks involved.
Use clear, easy-to-read markdown formatting: bullet points, bold keywords, and short paragraphs.
If the answer cannot be found or reasonably inferred from the terms, say: "Based on the provided Terms and Conditions, this specific topic is not explicitly mentioned or covered."`;

  // Performance optimization: slice context document to max 40k chars for rapid response time
  const trimmedTerms = terms.slice(0, 40000);

  const contents = [
    {
      role: "user",
      parts: [{ text: `Here are the Terms & Conditions text for context:\n\n=== START OF DOCUMENT ===\n${trimmedTerms}\n=== END OF DOCUMENT ===` }]
    },
    {
      role: "model",
      parts: [{ text: "Thank you. I have analyzed the document. Please ask any questions you have, and I will answer them based on the Terms & Conditions." }]
    }
  ];

  // Add conversation history
  for (const msg of history) {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    });
  }

  // Add the new question
  contents.push({
    role: "user",
    parts: [{ text: question }]
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction,
    }
  });

  return response.text || "I was unable to get a response from the AI model.";
}
