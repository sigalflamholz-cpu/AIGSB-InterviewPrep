import { NextResponse } from "next/server";
import anthropic from "@/lib/anthropic";
import { buildEvaluationPrompt } from "@/lib/prompts";
import type { EvaluateAnswerRequest, Feedback } from "@/lib/types";

function parseJSON(text: string): unknown {
  const cleaned = text.replace(/^```(?:json)?\s*\n?/m, "").replace(/\n?```\s*$/m, "").trim();
  return JSON.parse(cleaned);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EvaluateAnswerRequest;

    if (!body.question || !body.answer || !body.answerMode) {
      return NextResponse.json(
        { error: "Missing required fields: question, answer, answerMode" },
        { status: 400 }
      );
    }

    const { system, user } = buildEvaluationPrompt(body);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
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

    const parsed = parseJSON(textBlock.text) as Feedback;

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Evaluate answer error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}
