// Word database for Tutti-Frutti game
// 10 common letters, 10 categories, 5 words per combination

// Define the structure of our word database
export interface WordDatabase {
  [letter: string]: {
    [category: string]: string[];
  };
}

// The 10 most common starting letters in Spanish
export const commonLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'M', 'P', 'R', 'S'];

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
  'B': {
    'country': ['Brasil', 'Bélgica', 'Bulgaria', 'Bahamas', 'Bolivia'],
    'city': ['Barcelona', 'Berlín', 'Bogotá', 'Boston', 'Bruselas'],
    'food': ['Burrito', 'Bacalao', 'Batido', 'Bizcocho', 'Brócoli'],
    'animal': ['Ballena', 'Búho', 'Búfalo', 'Burro', 'Bisonte'],
    'name': ['Beatriz', 'Bruno', 'Belén', 'Bernardo', 'Blanca'],
    'fruit': ['Banana', 'Blueberry', 'Boysenberry', 'Breadfruit', 'Bergamota'],
    'profession': ['Biólogo', 'Bombero', 'Banquero', 'Bibliotecario', 'Barista'],
    'object': ['Bolígrafo', 'Botella', 'Bolso', 'Balanza', 'Batería'],
    'color': ['Blanco', 'Beige', 'Borgoña', 'Bronce', 'Bermellón'],
    'sport': ['Baloncesto', 'Béisbol', 'Balonmano', 'Boxeo', 'Badminton']
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
  'D': {
    'country': ['Dinamarca', 'Dominica', 'Djibouti', 'Dominicana', 'Dinamarca'],
    'city': ['Denver', 'Dallas', 'Dublín', 'Detroit', 'Doha'],
    'food': ['Donut', 'Dátil', 'Durazno', 'Dulce', 'Dorada'],
    'animal': ['Delfín', 'Dragón', 'Dingo', 'Dromedario', 'Dodo'],
    'name': ['Daniel', 'Diana', 'David', 'Daniela', 'Diego'],
    'fruit': ['Durazno', 'Dátil', 'Damasco', 'Durián', 'Drupas'],
    'profession': ['Doctor', 'Dentista', 'Diseñador', 'Desarrollador', 'Decorador'],
    'object': ['Disco', 'Destornillador', 'Dado', 'Ducha', 'Diario'],
    'color': ['Dorado', 'Durazno', 'Damasco', 'Denim', 'Diamante'],
    'sport': ['Dardos', 'Decatlón', 'Descenso', 'Deportes acuáticos', 'Disco volador']
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
  'F': {
    'country': ['Francia', 'Finlandia', 'Filipinas', 'Fiji', 'Federación Rusa'],
    'city': ['Florencia', 'Frankfurt', 'Filadelfia', 'Fukuoka', 'Fortaleza'],
    'food': ['Frijoles', 'Flan', 'Focaccia', 'Frutos secos', 'Fideos'],
    'animal': ['Foca', 'Flamenco', 'Faisán', 'Fénec', 'Frailecillo'],
    'name': ['Fernando', 'Francisca', 'Felipe', 'Fabiola', 'Federico'],
    'fruit': ['Fresa', 'Frambuesa', 'Feijoa', 'Fruta del dragón', 'Fruta de la pasión'],
    'profession': ['Farmacéutico', 'Fotógrafo', 'Físico', 'Fontanero', 'Filósofo'],
    'object': ['Foco', 'Frasco', 'Florero', 'Flauta', 'Fotografía'],
    'color': ['Fucsia', 'Frambuesa', 'Fresa', 'Fuego', 'Floral'],
    'sport': ['Fútbol', 'Frontón', 'Fútbol americano', 'Fitness', 'Fórmula 1']
  },
  'M': {
    'country': ['México', 'Marruecos', 'Mónaco', 'Madagascar', 'Malasia'],
    'city': ['Madrid', 'Miami', 'Melbourne', 'Montreal', 'Moscú'],
    'food': ['Manzana', 'Maíz', 'Miel', 'Mantequilla', 'Merluza'],
    'animal': ['Mono', 'Murciélago', 'Mapache', 'Mariposa', 'Morsa'],
    'name': ['María', 'Miguel', 'Marta', 'Manuel', 'Mónica'],
    'fruit': ['Mango', 'Melón', 'Mandarina', 'Mora', 'Membrillo'],
    'profession': ['Médico', 'Maestro', 'Mecánico', 'Músico', 'Marinero'],
    'object': ['Mesa', 'Martillo', 'Moneda', 'Mochila', 'Micrófono'],
    'color': ['Marrón', 'Magenta', 'Malva', 'Mostaza', 'Menta'],
    'sport': ['Maratón', 'Motociclismo', 'Montañismo', 'Marcha', 'Monopatín']
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
  'R': {
    'country': ['Rusia', 'Rumania', 'República Checa', 'Ruanda', 'Reino Unido'],
    'city': ['Roma', 'Río de Janeiro', 'Rotterdam', 'Rabat', 'Riga'],
    'food': ['Risotto', 'Ramen', 'Ravioli', 'Remolacha', 'Rosquilla'],
    'animal': ['Ratón', 'Rinoceronte', 'Rana', 'Reno', 'Ruiseñor'],
    'name': ['Roberto', 'Rosa', 'Raúl', 'Raquel', 'Ricardo'],
    'fruit': ['Rambután', 'Ruibarbo', 'Rocoto', 'Rowan', 'Remolacha'],
    'profession': ['Recepcionista', 'Relojero', 'Radiólogo', 'Repartidor', 'Repostero'],
    'object': ['Radio', 'Reloj', 'Regla', 'Refrigerador', 'Rueda'],
    'color': ['Rojo', 'Rosa', 'Rubí', 'Rojizo', 'Rosado'],
    'sport': ['Rugby', 'Remo', 'Rally', 'Racquetball', 'Rafting']
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
  
  // Normalize the word to remove accents and convert to uppercase
  const normalizedWord = normalizeString(word);
  const normalizedLetter = normalizeString(letter);
  
  // Check if the word starts with the given letter (case insensitive)
  if (!normalizedWord.startsWith(normalizedLetter)) return false;
  
  // Check if the category exists in our database
  if (!wordDatabase[letter] || !wordDatabase[letter][category]) return false;
  
  // Check if the word is in our database (case insensitive, ignoring accents)
  return wordDatabase[letter][category].some(dbWord => 
    normalizeString(dbWord) === normalizedWord
  );
};

// Function to normalize strings (remove accents and convert to uppercase)
export const normalizeString = (str: string): string => {
  return str.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
};

// Function to get a list of valid words for a given letter and category
export const getValidWords = (letter: string, category: string): string[] => {
  if (!wordDatabase[letter] || !wordDatabase[letter][category]) return [];
  return wordDatabase[letter][category];
};
