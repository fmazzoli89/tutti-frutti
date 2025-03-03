import { Category } from '../data/categories';
import { APIUsageStats } from './openaiService.d';

// Store API usage stats in localStorage
const API_USAGE_KEY = 'tutti_frutti_api_usage';
const API_KEY_KEY = 'tutti_frutti_api_key';

// Initialize API usage stats
const initializeAPIUsageStats = (): APIUsageStats => {
  return {
    requestCount: 0,
    totalTokens: 0,
    timestamp: new Date().toISOString()
  };
};

// Get API usage stats from localStorage
export const getAPIUsageStats = (): APIUsageStats => {
  const storedStats = localStorage.getItem(API_USAGE_KEY);
  if (storedStats) {
    return JSON.parse(storedStats);
  }
  const newStats = initializeAPIUsageStats();
  localStorage.setItem(API_USAGE_KEY, JSON.stringify(newStats));
  return newStats;
};

// Update API usage stats
const updateAPIUsageStats = (tokens: number): void => {
  const stats = getAPIUsageStats();
  stats.requestCount += 1;
  stats.totalTokens += tokens;
  stats.timestamp = new Date().toISOString();
  localStorage.setItem(API_USAGE_KEY, JSON.stringify(stats));
};

// Get API key from localStorage
export const getApiKey = (): string => {
  return localStorage.getItem(API_KEY_KEY) || '';
};

// Set API key in localStorage
export const setApiKey = (key: string): void => {
  localStorage.setItem(API_KEY_KEY, key);
};

// Check if API key is set
const isApiKeySet = (): boolean => {
  const key = getApiKey();
  return key !== null && key !== '';
};

// Validate a single word with OpenAI
export const validateWordWithAI = async (
  word: string,
  letter: string,
  _categoryId: string  // Prefix with underscore to indicate it's not used
): Promise<boolean> => {
  if (!isApiKeySet()) {
    throw new Error('API key not set');
  }

  if (!word || word.trim() === '') {
    return false;
  }

  // For now, just check if the word starts with the letter
  // In a real implementation, this would call the OpenAI API
  const isValid = word.toLowerCase().startsWith(letter.toLowerCase());
  
  // Simulate API usage
  updateAPIUsageStats(10);
  
  return isValid;
};

// Validate multiple answers with OpenAI
export const validateAnswersWithAI = async (
  answers: Record<string, string>,
  letter: string,
  categories: Category[]
): Promise<{ categoryId: string; word: string; isCorrect: boolean }[]> => {
  if (!isApiKeySet()) {
    throw new Error('API key not set');
  }

  // For now, just check if each word starts with the letter
  // In a real implementation, this would call the OpenAI API
  const results = categories.map(category => {
    const word = answers[category.id] || '';
    const isCorrect = word.toLowerCase().startsWith(letter.toLowerCase()) && 
                      word.trim() !== '';
    return {
      categoryId: category.id,
      word,
      isCorrect
    };
  });
  
  // Simulate API usage
  updateAPIUsageStats(50);
  
  return results;
};

// Generate an explanation for why a word is incorrect
export const generateExplanation = async (
  word: string,
  letter: string,
  _categoryId: string  // Prefix with underscore to indicate it's not used
): Promise<string> => {
  if (!isApiKeySet()) {
    throw new Error('API key not set');
  }

  if (!word || word.trim() === '') {
    return 'No se proporcionó una palabra.';
  }
  
  if (!word.toLowerCase().startsWith(letter.toLowerCase())) {
    return `La palabra "${word}" no comienza con la letra "${letter.toUpperCase()}".`;
  }
  
  // Simulate API usage
  updateAPIUsageStats(30);
  
  return `La palabra "${word}" no es válida para esta categoría.`;
};

// Generate a story using correct words
export const generateStory = async (
  correctAnswers: { categoryId: string; word: string }[],
  letter: string
): Promise<string> => {
  if (!isApiKeySet()) {
    throw new Error('API key not set');
  }

  if (correctAnswers.length === 0) {
    return 'No hay palabras correctas para generar una historia.';
  }
  
  const words = correctAnswers.map(a => a.word).join(', ');
  
  // Simulate API usage
  updateAPIUsageStats(100);
  
  return `Había una vez en un lugar muy lejano, donde todo comenzaba con la letra "${letter.toUpperCase()}", 
  un grupo de amigos que se llamaban ${words}. Juntos vivieron muchas aventuras y aprendieron 
  la importancia de la amistad y la creatividad. Fin.`;
}; 