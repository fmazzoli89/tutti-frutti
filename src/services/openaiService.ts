import { Category } from '../data/categories';
import { APIUsageStats } from './openaiService.d';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_USAGE_KEY = 'tutti_frutti_api_usage';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Memory fallback when localStorage is not available
const memoryStorage: Record<string, string> = {};

// Check if we're in a browser environment and have localStorage access
const hasLocalStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && 
           window.localStorage !== undefined && 
           window.localStorage !== null;
  } catch {
    return false;
  }
};

const safeStorage = {
  getItem: (key: string): string | null => {
    if (hasLocalStorage()) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn('Failed to read from localStorage:', error);
      }
    }
    return memoryStorage[key] || null;
  },
  
  setItem: (key: string, value: string): void => {
    if (hasLocalStorage()) {
      try {
        localStorage.setItem(key, value);
        return;
      } catch (error) {
        console.warn('Failed to write to localStorage:', error);
      }
    }
    memoryStorage[key] = value;
  }
};

// Get API usage stats from storage
export function getApiUsageStats(): APIUsageStats {
  const storedStats = safeStorage.getItem(API_USAGE_KEY);
  const newStats = storedStats ? JSON.parse(storedStats) : { count: 0, lastReset: new Date().toISOString() };
  return newStats;
}

// Update API usage stats
export function updateApiUsageStats(stats: APIUsageStats): void {
  safeStorage.setItem(API_USAGE_KEY, JSON.stringify(stats));
}

// Check if API key is available
const isApiKeyAvailable = (): boolean => {
  return !!OPENAI_API_KEY;
};

// Make a request to the OpenAI API
const makeOpenAIRequest = async (messages: any[], model: string = 'gpt-3.5-turbo') => {
  if (!isApiKeyAvailable()) {
    throw new Error('OpenAI API key not configured');
  }
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Update API usage stats
    if (data.usage) {
      updateApiUsageStats(data.usage);
    }
    
    return data;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

// Validate a single word with OpenAI
export const validateWordWithAI = async (
  word: string,
  letter: string,
  categoryId: string
): Promise<boolean> => {
  if (!isApiKeyAvailable()) {
    throw new Error('OpenAI API key not configured');
  }

  if (!word || word.trim() === '') {
    return false;
  }

  const messages = [
    {
      role: 'system',
      content: `You are a helpful assistant that validates words for a word game. 
      You need to check if a word starts with a specific letter and belongs to a specific category.
      Respond with only "true" or "false".`
    },
    {
      role: 'user',
      content: `Does the word "${word}" start with the letter "${letter}" and belong to the category "${categoryId}"? 
      Respond with only "true" or "false".`
    }
  ];

  try {
    const response = await makeOpenAIRequest(messages);
    const result = response.choices[0].message.content.trim().toLowerCase();
    return result === 'true';
  } catch (error) {
    console.error('Error validating word with AI:', error);
    // Fallback to simple validation
    return word.toLowerCase().startsWith(letter.toLowerCase()) && word.trim() !== '';
  }
};

// Validate multiple answers with OpenAI
export const validateAnswersWithAI = async (
  answers: Record<string, string>,
  letter: string,
  categories: Category[]
): Promise<{ categoryId: string; word: string; isCorrect: boolean }[]> => {
  if (!isApiKeyAvailable()) {
    throw new Error('OpenAI API key not configured');
  }

  const answersToValidate = categories.map(category => {
    const word = answers[category.id] || '';
    return {
      categoryId: category.id,
      categoryName: category.name,
      word
    };
  }).filter(item => item.word.trim() !== '');

  if (answersToValidate.length === 0) {
    return categories.map(category => ({
      categoryId: category.id,
      word: answers[category.id] || '',
      isCorrect: false
    }));
  }

  const messages = [
    {
      role: 'system',
      content: `You are a helpful assistant that validates words for a word game called "Tutti Frutti" or "Stop".
      You need to check if each word starts with a specific letter and belongs to its specific category.
      Respond with a JSON array where each item has "categoryId" and "isCorrect" properties.`
    },
    {
      role: 'user',
      content: `Validate the following words that should start with the letter "${letter}":
      ${answersToValidate.map(a => `- Word: "${a.word}" for category "${a.categoryName}" (ID: ${a.categoryId})`).join('\n')}
      
      Respond with a JSON array in this format:
      [
        {"categoryId": "category1", "isCorrect": true},
        {"categoryId": "category2", "isCorrect": false}
      ]`
    }
  ];

  try {
    const response = await makeOpenAIRequest(messages);
    const content = response.choices[0].message.content;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from OpenAI');
    }
    
    const validationResults = JSON.parse(jsonMatch[0]);
    
    // Map the results back to the full answer set
    return categories.map(category => {
      const word = answers[category.id] || '';
      
      if (word.trim() === '') {
        return {
          categoryId: category.id,
          word,
          isCorrect: false
        };
      }
      
      const result = validationResults.find((r: any) => r.categoryId === category.id);
      return {
        categoryId: category.id,
        word,
        isCorrect: result ? result.isCorrect : false
      };
    });
  } catch (error) {
    console.error('Error validating answers with AI:', error);
    // Fallback to simple validation
    return categories.map(category => {
      const word = answers[category.id] || '';
      const isCorrect = word.toLowerCase().startsWith(letter.toLowerCase()) && 
                        word.trim() !== '';
      return {
        categoryId: category.id,
        word,
        isCorrect
      };
    });
  }
};

// Generate an explanation for why a word is incorrect
export const generateExplanation = async (
  word: string,
  letter: string,
  categoryId: string
): Promise<string> => {
  if (!isApiKeyAvailable()) {
    throw new Error('OpenAI API key not configured');
  }

  if (!word || word.trim() === '') {
    return 'No se proporcionó una palabra.';
  }
  
  const messages = [
    {
      role: 'system',
      content: `You are a helpful assistant for a word game called "Tutti Frutti" or "Stop".
      You need to explain why a word might be incorrect for a specific category and letter.
      Keep explanations brief, friendly, and educational.`
    },
    {
      role: 'user',
      content: `Explain briefly in Spanish why the word "${word}" might not be valid for the category "${categoryId}" 
      with the letter "${letter}". Keep it under 100 characters if possible.`
    }
  ];

  try {
    const response = await makeOpenAIRequest(messages);
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating explanation:', error);
    // Fallback explanation
    if (!word.toLowerCase().startsWith(letter.toLowerCase())) {
      return `La palabra "${word}" no comienza con la letra "${letter.toUpperCase()}".`;
    }
    return `La palabra "${word}" no es válida para esta categoría.`;
  }
};

// Generate a story using correct words
export const generateStory = async (
  correctAnswers: { categoryId: string; word: string }[],
  letter: string
): Promise<string> => {
  if (!isApiKeyAvailable()) {
    throw new Error('OpenAI API key not configured');
  }

  if (correctAnswers.length === 0) {
    return 'No hay palabras correctas para generar una historia.';
  }
  
  const words = correctAnswers.map(a => a.word).join(', ');
  
  const messages = [
    {
      role: 'system',
      content: `You are a creative storyteller for a word game called "Tutti Frutti" or "Stop".
      You need to create a short, fun story that incorporates all the provided words.
      The story should be appropriate for all ages and written in Spanish.`
    },
    {
      role: 'user',
      content: `Create a short story in Spanish that includes all of these words: ${words}.
      The story should somehow relate to the letter "${letter.toUpperCase()}".
      Keep the story under 200 words and make it fun and creative.`
    }
  ];

  try {
    const response = await makeOpenAIRequest(messages);
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating story:', error);
    // Fallback story
    return `Había una vez en un lugar muy lejano, donde todo comenzaba con la letra "${letter.toUpperCase()}", 
    un grupo de amigos que se llamaban ${words}. Juntos vivieron muchas aventuras y aprendieron 
    la importancia de la amistad y la creatividad. Fin.`;
  }
}; 