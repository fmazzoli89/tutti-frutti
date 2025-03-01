import { commonLetters, easyCategories } from './wordDatabase';

export interface Category {
  id: string;
  name: string;
}

// Map the category IDs to display names
const categoryNameMap: Record<string, string> = {
  'country': 'País',
  'city': 'Ciudad',
  'food': 'Comida',
  'animal': 'Animal',
  'name': 'Nombre',
  'fruit': 'Fruta',
  'profession': 'Profesión',
  'object': 'Objeto',
  'color': 'Color',
  'sport': 'Deporte'
};

// Create the categories array from our easyCategories
export const categories: Category[] = easyCategories.map(id => ({
  id,
  name: categoryNameMap[id] || id
}));

// Use the common letters from our word database
export const availableLetters = commonLetters;

export const getRandomLetter = (): string => {
  const randomIndex = Math.floor(Math.random() * availableLetters.length);
  return availableLetters[randomIndex];
};

export const getRandomCategories = (count: number = 5): Category[] => {
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 