import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const body = await request.json();
    const prompt = String(body.prompt || "").trim();

    if (!prompt) {
      return Response.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Try reliable models in sequence (gemini-3.6-flash verified active)
    const candidateModels = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.7-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.8-flash",
    ];

    let lastError = null;
    let responseText = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction: `
You are ClubOps AI, an intelligent college club operations copilot.
Your mission is to help club administrators, coordinators, and volunteers run exceptional campus activities.

Specialties:
1. Event Planning & Execution Checklists
2. Task Breakdown & Volunteer Assignment
3. Meeting Agendas & Action Items
4. Risk Assessment & Contingency Planning
5. Budget Allocation & Expense Categories
6. Engaging Campus Announcements & Email Drafts

Formatting Guidelines:
- Produce structured, ready-to-use output with clear headers and bullet points.
- Include realistic timelines, student club considerations, and safety precautions.
- Keep the tone encouraging, professional, and tailored for college student leaders.
            `,
            temperature: 0.5,
            maxOutputTokens: 2000,
          },
        });

        if (response && response.text) {
          responseText = response.text;
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next fallback:`, err.message);
      }
    }

    if (!responseText && lastError) {
      throw lastError;
    }

    return Response.json({
      text: responseText || "No response could be generated.",
    });
  } catch (error) {
    console.error("Gemini route error:", error);
    return Response.json(
      {
        error:
          error?.message ||
          "AI assistant is momentarily unavailable. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}