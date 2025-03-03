import { Category } from '../data/categories';

export interface APIUsageStats {
  requestCount: number;
  totalTokens: number;
  timestamp: string;
}

export function getAPIUsageStats(): APIUsageStats;
export function getApiKey(): string;
export function validateWordWithAI(word: string, letter: string, categoryId: string): Promise<boolean>;
export function validateAnswersWithAI(
  answers: Record<string, string>,
  letter: string,
  categories: Category[]
): Promise<{ categoryId: string; word: string; isCorrect: boolean }[]>;
export function generateExplanation(word: string, letter: string, categoryId: string): Promise<string>;
export function generateStory(
  correctAnswers: { categoryId: string; word: string }[],
  letter: string
): Promise<string>; 