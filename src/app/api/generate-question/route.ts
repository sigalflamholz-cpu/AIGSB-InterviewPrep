import { NextResponse } from "next/server";
import anthropic from "@/lib/anthropic";
import { buildQuestionGenerationPrompt } from "@/lib/prompts";
import type { GenerateQuestionRequest, GeneratedQuestion } from "@/lib/types";

function parseJSON(text: string): unknown {
  // Strip markdown code fences if present
  const cleaned = text.replace(/^```(?:json)?\s*\n?/m, "").replace(/\n?```\s*$/m, "").trim();
  return JSON.parse(cleaned);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateQuestionRequest;

    if (!body.category || !body.difficulty || !body.answerMode) {
      return NextResponse.json(
        { error: "Missing required fields: category, difficulty, answerMode" },
        { status: 400 }
      );
    }

    const { system, user } = buildQuestionGenerationPrompt(body);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system,
      messages: [{ role: "user", content: user }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from AI" },
        { status: 500 }
      );
    }

    const parsed = parseJSON(textBlock.text) as Record<string, unknown>;

    const result: GeneratedQuestion = {
      question: parsed.question as string,
      context: parsed.context as string | undefined,
      choices: parsed.choices as string[] | undefined,
      category: body.category,
      difficulty: body.difficulty,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate question error:", error);
    return NextResponse.json(
      { error: "Failed to generate question" },
      { status: 500 }
    );
  }
}
