export type QuestionCategory = "behavioral" | "case" | "situational";
export type Difficulty = "easy" | "medium" | "hard";
export type AnswerMode = "free-form" | "multiple-choice";

export interface GenerateQuestionRequest {
  category: QuestionCategory;
  difficulty: Difficulty;
  answerMode: AnswerMode;
  jobDescription?: string;
}

export interface GeneratedQuestion {
  question: string;
  context?: string;
  choices?: string[];
  category: QuestionCategory;
  difficulty: Difficulty;
}

export interface EvaluateAnswerRequest {
  question: GeneratedQuestion;
  answer: string;
  answerMode: AnswerMode;
}

export interface StarComponentEval {
  score: number;
  feedback: string;
}

export interface StarEvaluation {
  situation: StarComponentEval;
  task: StarComponentEval;
  action: StarComponentEval;
  result: StarComponentEval;
}

export interface Feedback {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  starEvaluation?: StarEvaluation;
  improvedAnswer: string;
}
