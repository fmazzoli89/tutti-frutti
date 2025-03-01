// Word database for Tutti-Frutti game
// 5 common letters, 10 categories, 5 words per combination

// Define the structure of our word database
export interface WordDatabase {
  [letter: string]: {
    [category: string]: string[];
  };
}

// The 5 most common starting letters in Spanish
export const commonLetters = ['A', 'C', 'E', 'P', 'S'];

// The 10 easiest categories
export const easyCategories = [
  'country', // País
  'city',    // Ciudad
  'food',    // Comida
  'animal',  // Animal
  'name',    // Nombre
  'fruit',   // Fruta
  'profession', // Profesión
  'object',  // Objeto
  'color',   // Color
  'sport'    // Deporte
];

// The word database
export const wordDatabase: WordDatabase = {
  'A': {
    'country': ['Argentina', 'Australia', 'Austria', 'Alemania', 'Angola'],
    'city': ['Atenas', 'Amsterdam', 'Atlanta', 'Ankara', 'Asunción'],
    'food': ['Arroz', 'Asado', 'Atún', 'Aguacate', 'Almendras'],
    'animal': ['Águila', 'Ardilla', 'Araña', 'Avestruz', 'Antílope'],
    'name': ['Ana', 'Antonio', 'Alejandro', 'Adriana', 'Alberto'],
    'fruit': ['Arándano', 'Albaricoque', 'Aguacate', 'Aceituna', 'Ananá'],
    'profession': ['Abogado', 'Arquitecto', 'Actor', 'Agricultor', 'Astronauta'],
    'object': ['Anillo', 'Almohada', 'Armario', 'Alfombra', 'Antena'],
    'color': ['Azul', 'Amarillo', 'Ámbar', 'Aguamarina', 'Añil'],
    'sport': ['Atletismo', 'Ajedrez', 'Artes marciales', 'Automovilismo', 'Alpinismo']
  },
  'C': {
    'country': ['Colombia', 'Canadá', 'Chile', 'China', 'Cuba'],
    'city': ['Caracas', 'Chicago', 'Copenhague', 'Cali', 'Córdoba'],
    'food': ['Carne', 'Chocolate', 'Cereal', 'Cebolla', 'Calabaza'],
    'animal': ['Caballo', 'Conejo', 'Cebra', 'Cocodrilo', 'Camello'],
    'name': ['Carlos', 'Carmen', 'Cristina', 'César', 'Carolina'],
    'fruit': ['Cereza', 'Coco', 'Ciruela', 'Chirimoya', 'Carambola'],
    'profession': ['Cocinero', 'Carpintero', 'Contador', 'Científico', 'Conductor'],
    'object': ['Cama', 'Cuchillo', 'Computadora', 'Cepillo', 'Cámara'],
    'color': ['Celeste', 'Café', 'Carmesí', 'Cian', 'Coral'],
    'sport': ['Ciclismo', 'Cricket', 'Clavados', 'Curling', 'Canoa']
  },
  'E': {
    'country': ['España', 'Ecuador', 'Egipto', 'Estonia', 'Etiopía'],
    'city': ['Estocolmo', 'Edimburgo', 'Estambul', 'Essen', 'Eindhoven'],
    'food': ['Espagueti', 'Empanada', 'Ensalada', 'Espinaca', 'Enchilada'],
    'animal': ['Elefante', 'Erizo', 'Escorpión', 'Escarabajo', 'Estrella de mar'],
    'name': ['Elena', 'Eduardo', 'Esteban', 'Esther', 'Emilio'],
    'fruit': ['Espino', 'Endrino', 'Escaramujo', 'Espino amarillo', 'Escaramujo'],
    'profession': ['Enfermero', 'Electricista', 'Escritor', 'Economista', 'Empresario'],
    'object': ['Espejo', 'Escalera', 'Escoba', 'Estufa', 'Escritorio'],
    'color': ['Esmeralda', 'Escarlata', 'Ébano', 'Espliego', 'Encarnado'],
    'sport': ['Esgrima', 'Esquí', 'Escalada', 'Equitación', 'Espeleología']
  },
  'P': {
    'country': ['Perú', 'Portugal', 'Polonia', 'Paraguay', 'Panamá'],
    'city': ['París', 'Praga', 'Pekín', 'Porto', 'Palermo'],
    'food': ['Pizza', 'Pasta', 'Paella', 'Pollo', 'Pan'],
    'animal': ['Perro', 'Pato', 'Pingüino', 'Pantera', 'Pez'],
    'name': ['Pedro', 'Pablo', 'Patricia', 'Paula', 'Pilar'],
    'fruit': ['Pera', 'Piña', 'Plátano', 'Papaya', 'Pomelo'],
    'profession': ['Profesor', 'Policía', 'Periodista', 'Programador', 'Piloto'],
    'object': ['Plato', 'Puerta', 'Papel', 'Peine', 'Paraguas'],
    'color': ['Púrpura', 'Plateado', 'Pardo', 'Pastel', 'Púrpura'],
    'sport': ['Patinaje', 'Pádel', 'Polo', 'Paracaidismo', 'Pentatlón']
  },
  'S': {
    'country': ['Suiza', 'Suecia', 'Singapur', 'Senegal', 'Serbia'],
    'city': ['Santiago', 'Sevilla', 'San Francisco', 'Sídney', 'Seúl'],
    'food': ['Sopa', 'Sushi', 'Sándwich', 'Salchicha', 'Salmón'],
    'animal': ['Serpiente', 'Sapo', 'Salamandra', 'Sardina', 'Suricata'],
    'name': ['Sergio', 'Sofía', 'Santiago', 'Sara', 'Sebastián'],
    'fruit': ['Sandía', 'Satsuma', 'Saúco', 'Sanguina', 'Salak'],
    'profession': ['Secretario', 'Soldador', 'Sastre', 'Sociólogo', 'Supervisor'],
    'object': ['Silla', 'Sofá', 'Sartén', 'Servilleta', 'Secador'],
    'color': ['Salmón', 'Sepia', 'Siena', 'Sable', 'Sésamo'],
    'sport': ['Surf', 'Senderismo', 'Snowboard', 'Squash', 'Skateboarding']
  }
};

// Function to check if a word is valid for a given letter and category
export const isValidWord = (word: string, letter: string, category: string): boolean => {
  if (!word || word.trim() === '') return false;
  
  // Check if the word starts with the given letter (case insensitive)
  if (!word.toUpperCase().startsWith(letter.toUpperCase())) return false;
  
  // Check if the category exists in our database
  if (!wordDatabase[letter] || !wordDatabase[letter][category]) return false;
  
  // For simplicity, we'll consider any word starting with the correct letter as valid
  // In a more advanced version, you could check if the word is in the database
  // return wordDatabase[letter][category].includes(word);
  
  return true;
};

// Function to get a list of valid words for a given letter and category
export const getValidWords = (letter: string, category: string): string[] => {
  if (!wordDatabase[letter] || !wordDatabase[letter][category]) return [];
  return wordDatabase[letter][category];
};
