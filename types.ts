
export enum GameState {
  INTRO = 'INTRO',
  PLAYING = 'PLAYING',
  LEVEL_TRANSITION = 'LEVEL_TRANSITION',
  FINAL_REPORT = 'FINAL_REPORT'
}

export interface LevelData {
  level: number;
  title: string;
  type: string;
  puzzle: string;
  sampleAnswer?: string;
  options?: string[];
}

export interface LevelScore {
  level: number;
  score: number; // 0 to 100
  feedback: string;
  personalityTrait: string;
  iqSegment: string;
  userAnswer: string;
}

export interface EvaluationResponse {
  score: number;
  feedback: string;
  personalityTrait: string;
  iqEstimate: string;
  criticalThinkingRating: number;
}

export interface FinalReport {
  overallIq: string;
  personalityProfile: string;
  criticalThinkingScore: number;
  growthAreas: string[];
}
