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
const makeOpenAIRequest = async (messages: any[], model: string = 'gpt-4o-mini-2024-07-18') => {
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

// Generate an example for an incorrect word
export const generateExample = async (
  letter: string,
  categoryId: string
): Promise<string> => {
  if (!isApiKeyAvailable()) {
    throw new Error('OpenAI API key not configured');
  }
  
  const messages = [
    {
      role: 'system',
      content: `You are a helpful assistant for a word game called "Tutti Frutti" or "Stop".
      You need to provide one valid example word for a given category that starts with a specific letter.
      The word must be:
      1. Start with the specified letter
      2. Be a well-known example for the category
      3. For soccer teams, include teams from any major league worldwide
      4. For brands, include international brands
      5. For cities, include major cities from any country
      6. Use proper capitalization (e.g., Barcelona, Burger King, Google)
      Respond with just the word with proper capitalization, nothing else.`
    },
    {
      role: 'user',
      content: `Give me one valid example for the category "${categoryId}" that starts with the letter "${letter}".
      Make sure it's a well-known example that most people would recognize.
      Respond with just the word with proper capitalization, nothing else.`
    }
  ];

  try {
    const response = await makeOpenAIRequest(messages);
    const example = response.choices[0].message.content.trim();
    return example;
  } catch (error) {
    console.error('Error generating example:', error);
    return 'No se pudo generar un ejemplo.';
  }
};

// Validate multiple answers with OpenAI
export const validateAnswersWithAI = async (
  answers: Record<string, string>,
  letter: string,
  categories: Category[]
): Promise<{ categoryId: string; word: string; isCorrect: boolean; example?: string }[]> => {
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
      isCorrect: false,
      example: ''
    }));
  }

  const messages = [
    {
      role: 'system',
      content: `You are a helpful assistant that validates words for a word game called "Tutti Frutti" or "Stop".
      You need to check if each word:
      1. Starts with the specific letter
      2. Is a valid word or proper noun that exists
      3. Belongs to its specific category
      4. For soccer teams, accept any real professional team from any country
      5. For brands, accept international brands as well
      6. For cities, accept any real city from any country
      Respond with a JSON array where each item has "categoryId" and "isCorrect" properties.
      Be inclusive with proper nouns and international terms as long as they're real and commonly known.`
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
    
    // Get examples for incorrect answers
    const resultsWithExamples = await Promise.all(
      categories.map(async category => {
        const word = answers[category.id] || '';
        
        if (word.trim() === '') {
          const example = await generateExample(letter, category.id);
          return {
            categoryId: category.id,
            word,
            isCorrect: false,
            example
          };
        }
        
        const result = validationResults.find((r: any) => r.categoryId === category.id);
        const isCorrect = result ? result.isCorrect : false;
        
        if (!isCorrect) {
          const example = await generateExample(letter, category.id);
          return {
            categoryId: category.id,
            word,
            isCorrect,
            example
          };
        }
        
        return {
          categoryId: category.id,
          word,
          isCorrect
        };
      })
    );
    
    return resultsWithExamples;
  } catch (error) {
    console.error('Error validating with AI, falling back to offline:', error);
    // Even in offline mode, generate examples for incorrect answers
    const results = await Promise.all(categories.map(async category => {
      const word = answers[category.id] || '';
      const isCorrect = word.toLowerCase().startsWith(letter.toLowerCase()) && 
                      word.trim() !== '';
      
      if (!isCorrect) {
        const example = await generateExample(letter, category.id);
        return {
          categoryId: category.id,
          word,
          isCorrect,
          example
        };
      }
      
      return {
        categoryId: category.id,
        word,
        isCorrect
      };
    }));
    
    return results;
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