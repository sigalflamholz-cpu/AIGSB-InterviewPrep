import { GenerateQuestionRequest, EvaluateAnswerRequest } from "./types";

const DIFFICULTY_GUIDANCE: Record<string, string> = {
  easy: "Create a straightforward question about common workplace scenarios (e.g., teamwork, meeting a deadline, basic problem-solving). Keep the scenario simple with clear expectations.",
  medium:
    "Create a moderately challenging question involving conflict resolution, leadership, cross-team collaboration, or balancing competing priorities. The scenario should have some nuance.",
  hard: "Create a complex question involving ambiguous situations, ethical dilemmas, high-stakes decisions, organizational change, or navigating significant uncertainty. Multiple valid approaches should exist.",
};

const CATEGORY_GUIDANCE: Record<string, string> = {
  behavioral:
    "Create a behavioral interview question that asks the candidate to describe a past experience. The question should naturally prompt a STAR-method response (Situation, Task, Action, Result). Start with phrases like 'Tell me about a time when...' or 'Describe a situation where...'",
  case: "Create an open-ended business case question that requires analytical and strategic thinking. Present a realistic business scenario and ask the candidate to analyze it, propose solutions, or make recommendations.",
  situational:
    "Create a situational judgment question that presents a hypothetical workplace scenario and asks the candidate how they would handle it. The scenario should involve multiple stakeholders and competing interests.",
};

export function buildQuestionGenerationPrompt(req: GenerateQuestionRequest): {
  system: string;
  user: string;
} {
  const system = `You are an expert interview coach with 20 years of experience conducting and preparing candidates for interviews at top companies. You create realistic, thought-provoking interview questions calibrated to specific difficulty levels. Always respond with valid JSON only — no markdown, no code fences.`;

  let user = `Generate a ${req.difficulty} difficulty ${req.category} interview question.\n\n`;
  user += `${CATEGORY_GUIDANCE[req.category]}\n\n`;
  user += `Difficulty guidance: ${DIFFICULTY_GUIDANCE[req.difficulty]}\n\n`;

  if (req.jobDescription) {
    user += `Tailor the question specifically to skills, responsibilities, and competencies mentioned in this job description:\n\n---\n${req.jobDescription}\n---\n\n`;
  }

  if (req.answerMode === "multiple-choice") {
    user += `Also generate exactly 4 answer choices. One should be clearly the strongest answer, one should be acceptable but not ideal, and two should be weaker (but still plausible, not obviously wrong). Present them in a randomized order. Do NOT indicate which is correct.\n\n`;
  }

  user += `Respond with valid JSON matching this exact schema:
{
  "question": "The interview question text",
  "context": "Optional additional context or background for the scenario (only include if relevant, especially for case questions)",
  "choices": ["Choice A", "Choice B", "Choice C", "Choice D"]
}

${req.answerMode === "free-form" ? 'Omit the "choices" field entirely for free-form questions.' : 'Include exactly 4 items in the "choices" array.'}
The "context" field is optional — include it only when the question benefits from additional background information.`;

  return { system, user };
}

export function buildEvaluationPrompt(req: EvaluateAnswerRequest): {
  system: string;
  user: string;
} {
  const system = `You are a senior hiring manager and interview coach. You evaluate candidate answers constructively and specifically, providing actionable feedback. Be encouraging but honest. Always respond with valid JSON only — no markdown, no code fences.`;

  let user = `Evaluate this interview answer.\n\n`;
  user += `Question type: ${req.question.category} (${req.question.difficulty} difficulty)\n`;
  user += `Question: ${req.question.question}\n`;
  if (req.question.context) {
    user += `Context: ${req.question.context}\n`;
  }
  user += `\nAnswer mode: ${req.answerMode}\n`;

  if (req.answerMode === "multiple-choice" && req.question.choices) {
    user += `Available choices:\n${req.question.choices.map((c, i) => `${i + 1}. ${c}`).join("\n")}\n`;
  }

  user += `\nCandidate's answer: ${req.answer}\n\n`;

  user += `Scoring rubric (1-10 scale):
- 1-3: Answer misses the point, lacks substance, or is inappropriate
- 4-5: Answer is relevant but vague, generic, or missing key elements
- 6-7: Solid answer with good points but room for improvement
- 8-9: Strong answer demonstrating clear thinking and relevant experience
- 10: Exceptional answer that would impress any interviewer\n\n`;

  if (req.question.category === "behavioral") {
    user += `Since this is a behavioral question, evaluate the answer against each STAR framework component:
- Situation: Did they clearly describe the context and setting?
- Task: Did they explain their specific responsibility or challenge?
- Action: Did they detail the specific steps THEY took (not the team)?
- Result: Did they share measurable outcomes or impact?

Include a "starEvaluation" object in your response with scores (1-10) and specific feedback for each component.\n\n`;
  }

  user += `Provide:
- 2-4 specific strengths (what the candidate did well)
- 2-4 specific areas for improvement (what they could add or do differently)
- An improved model answer demonstrating an ideal response

Respond with valid JSON matching this exact schema:
{
  "overallScore": 7,
  "strengths": ["Specific strength 1", "Specific strength 2"],
  "improvements": ["Specific improvement 1", "Specific improvement 2"],
  ${req.question.category === "behavioral" ? '"starEvaluation": { "situation": { "score": 7, "feedback": "..." }, "task": { "score": 7, "feedback": "..." }, "action": { "score": 7, "feedback": "..." }, "result": { "score": 7, "feedback": "..." } },' : ""}
  "improvedAnswer": "A complete model answer demonstrating the ideal response..."
}`;

  return { system, user };
}
