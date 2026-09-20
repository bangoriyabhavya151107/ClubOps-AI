import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const body = await request.json();

    const prompt = String(body.prompt || "").trim();

    if (!prompt) {
      return Response.json(
        {
          error: "Prompt is required.",
        },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error:
            "Gemini API key is not configured on the server.",
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response =
      await ai.models.generateContent({
        model: "gemini-3.8-flash",

        contents: prompt,

        config: {
          systemInstruction: `
You are ClubOps AI, an intelligent college club
operations assistant.

Your job is to help administrators, coordinators and
volunteers operate a real college club.

You specialize in:

1. Event planning
2. Task breakdown
3. Volunteer assignment
4. Meeting agendas
5. Meeting intelligence
6. Risk identification
7. Budget planning
8. Announcement writing
9. Documentation
10. Operational automation

Always produce practical, structured output.

Use headings, bullets and tables when helpful.

Do not invent database facts.

If information is missing, explicitly say what is missing.

For event planning, consider:
- event objective
- expected students
- activities
- volunteers
- timeline
- venue
- materials
- budget
- risks
- contingency plan
- communication

For task planning, produce:
- task
- owner
- priority
- deadline
- dependency

For risk analysis, produce:
- risk
- probability
- impact
- prevention
- mitigation

Keep responses useful for a student club operations team.
          `,
          temperature: 0.4,
          maxOutputTokens: 1800,
        },
      });

    return Response.json({
      text:
        response.text ||
        "No response generated.",
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return Response.json(
      {
        error:
          error?.message ||
          "AI request failed.",
      },
      { status: 500 }
    );
  }
}