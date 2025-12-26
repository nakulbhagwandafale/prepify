import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("CRITICAL: NEXT_PUBLIC_GEMINI_API_KEY is not defined in environment variables.");
        return NextResponse.json(
            { error: "Configuration Error: API Key missing. Please check .env file." },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();
        const { resumeText, category, difficulty, questionCount, jobDescription } = body;

        console.log("Generate Questions Request:", {
            hasResume: !!resumeText,
            hasJD: !!jobDescription,
            category,
            difficulty,
            count: questionCount
        });

        if (!resumeText && !jobDescription) {
            console.error("Validation Failed: Missing both Resume and JD");
            return NextResponse.json(
                { error: "Resume text or Job Description is required" },
                { status: 400 }
            );
        }

        // User requested "2.5 flash", mapping to "gemini-2.0-flash-exp"
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        console.log("Using Gemini Model: gemini-2.0-flash-exp");

        const prompt = `
      You are an expert technical interviewer. Generate ${questionCount} interview questions for a candidate.
      
      Details:
      - Interview Category: ${category}
      - Difficulty Level: ${difficulty}
      - Resume Context: ${resumeText.substring(0, 3000)}... (truncated)
      - Job Description: ${jobDescription ? jobDescription.substring(0, 1000) : "N/A"}

      Rules:
      1. The first question MUST be "Please introduce yourself."
      2. The remaining questions should be relevant to the resume and category.
      3. Return ONLY a raw JSON array of strings. Do not include markdown formatting like \`\`\`json.
      
      Example output:
      ["Please introduce yourself.", "Tell me about your experience with React.", "How do you handle conflict?"]
    `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean up markdown if present
        const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

        const questions = JSON.parse(cleanedText);

        return NextResponse.json({ questions });
    } catch (error: any) {
        console.error("Error generating questions:", error);

        // Check for specific Gemini errors
        if (error.message?.includes("API key not found")) {
            return NextResponse.json(
                { error: "Server Configuration Error: Gemini API Key is missing." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Failed to generate questions" },
            { status: 500 }
        );
    }
}
