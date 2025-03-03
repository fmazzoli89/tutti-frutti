export interface Category {
  id: string;
  name: string;
}

// Common first letters in Spanish words
export const commonLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'P', 'S'];

// Category names in Spanish
export const categoryNameMap: Record<string, string> = {
  'name': 'Nombre',
  'country': 'País',
  'city': 'Ciudad',
  'animal': 'Animal',
  'fruit': 'Fruta',
  'food': 'Comida',
  'color': 'Color',
  'profession': 'Profesión',
  'sport': 'Deporte',
  'brand': 'Marca',
  'movie': 'Película',
  'artist': 'Artista',
  'soccer_team': 'Equipo de Fútbol',
  'car_brand': 'Marca de Coche',
  'flower': 'Flor',
  'body_part': 'Parte del Cuerpo',
  'musical_instrument': 'Instrumento Musical',
  'clothing': 'Ropa',
  'drink': 'Bebida',
  'superhero': 'Superhéroe',
  'school_subject': 'Materia Escolar',
  'kitchen_item': 'Objeto de Cocina',
  'furniture': 'Mueble',
  'transport': 'Transporte',
  'technology': 'Tecnología'
};

// Create categories array from the map
export const categories: Category[] = Object.entries(categoryNameMap).map(([id, name]) => ({
  id,
  name
}));

// Get a random letter from the common letters
export const getRandomLetter = (): string => {
  const randomIndex = Math.floor(Math.random() * commonLetters.length);
  return commonLetters[randomIndex];
};

// Get random categories
export const getRandomCategories = (count: number): Category[] => {
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 