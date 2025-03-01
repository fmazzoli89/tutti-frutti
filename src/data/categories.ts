export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'country', name: 'País' },
  { id: 'city', name: 'Ciudad' },
  { id: 'food', name: 'Comida' },
  { id: 'animal', name: 'Animal' },
  { id: 'name', name: 'Nombre' },
  { id: 'fruit', name: 'Fruta o Verdura' },
  { id: 'profession', name: 'Profesión' },
  { id: 'object', name: 'Objeto' },
  { id: 'movie', name: 'Película o Serie' },
  { id: 'brand', name: 'Marca' },
  { id: 'color', name: 'Color' },
  { id: 'household', name: 'Cosa de la casa' },
  { id: 'instrument', name: 'Instrumento Musical' },
  { id: 'celebrity', name: 'Personaje Famoso' },
  { id: 'sport', name: 'Deporte' },
  { id: 'vehicle', name: 'Vehículo' },
  { id: 'book', name: 'Libro' },
  { id: 'drink', name: 'Bebida' },
  { id: 'game', name: 'Juego o Juguete' },
  { id: 'bodyPart', name: 'Parte del Cuerpo' },
];

// Spanish alphabet without rare letters like K, W, X, Y
export const availableLetters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 
  'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'Z'
];

export const getRandomLetter = (): string => {
  const randomIndex = Math.floor(Math.random() * availableLetters.length);
  return availableLetters[randomIndex];
};

export const getRandomCategories = (count: number = 5): Category[] => {
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 