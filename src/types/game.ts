import { Category } from '../data/categories';

export type GameStatus = 'idle' | 'playing' | 'results' | 'validating' | 'generating-story';

export type ValidationEngine = 'offline' | 'ai';

export interface ScoreBreakdown {
  correctWords: number;
  correctWordsPoints: number;
  allWordsBonus: number;
  timeBonus: number;
  totalScore: number;
}

export interface Answer {
  categoryId: string;
  word: string;
  isCorrect?: boolean;
  explanation?: string;
}

export interface GameState {
  status: GameStatus;
  currentLetter: string;
  selectedCategories: Category[];
  answers: Record<string, string>;
  timeLeft: number;
  score: number;
  scoreBreakdown?: ScoreBreakdown;
  validatedAnswers: Answer[];
  validationEngine: ValidationEngine;
  story?: string;
}

export interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  submitAnswers: () => void;
  updateAnswer: (categoryId: string, word: string) => void;
  playAgain: () => void;
  setValidationEngine: (engine: ValidationEngine) => void;
  generateStory: () => Promise<void>;
} 