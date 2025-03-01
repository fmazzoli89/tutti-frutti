import { Category } from '../data/categories';

export type GameStatus = 'idle' | 'playing' | 'results';

export interface Answer {
  categoryId: string;
  word: string;
  isCorrect?: boolean;
}

export interface GameState {
  status: GameStatus;
  currentLetter: string;
  selectedCategories: Category[];
  answers: Record<string, string>;
  timeLeft: number;
  score: number;
  validatedAnswers: Answer[];
}

export interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  submitAnswers: () => void;
  updateAnswer: (categoryId: string, word: string) => void;
  playAgain: () => void;
} 