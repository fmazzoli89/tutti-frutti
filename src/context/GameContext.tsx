import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getRandomLetter, getRandomCategories } from '../data/categories';
import { GameState, GameContextType, Answer, ValidationEngine } from '../types/game';
import * as openaiService from '../services/openaiService';

const initialGameState: GameState = {
  status: 'idle',
  currentLetter: '',
  selectedCategories: [],
  answers: {},
  timeLeft: 60,
  score: 0,
  validatedAnswers: [],
  validationEngine: 'ai',
  story: undefined
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [timer, setTimer] = useState<number | null>(null);

  const startGame = () => {
    const letter = getRandomLetter();
    const categories = getRandomCategories(5);
    
    setGameState({
      status: 'playing',
      currentLetter: letter,
      selectedCategories: categories,
      answers: {},
      timeLeft: 60,
      score: 0,
      validatedAnswers: [],
      validationEngine: gameState.validationEngine,
      story: undefined
    });
  };

  const updateAnswer = (categoryId: string, word: string) => {
    setGameState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [categoryId]: word
      }
    }));
  };

  const validateAnswersOffline = (): Answer[] => {
    const { currentLetter, selectedCategories, answers } = gameState;
    
    return selectedCategories.map(category => {
      const word = answers[category.id] || '';
      const isCorrect = word.toLowerCase().startsWith(currentLetter.toLowerCase()) && 
                        word.trim() !== '';
      
      return {
        categoryId: category.id,
        word,
        isCorrect
      };
    });
  };

  const calculateScore = (validatedAnswers: Answer[]): {
    total: number;
    correctWordsPoints: number;
    bonusPoints: number;
    timePoints: number;
  } => {
    const correctWords = validatedAnswers.filter(answer => answer.isCorrect).length;
    const correctWordsPoints = correctWords * 10;
    const bonusPoints = correctWords === 5 ? 20 : 0;
    const timePoints = Math.round(gameState.timeLeft/10*correctWords);
    
    return {
      total: correctWordsPoints + bonusPoints + timePoints,
      correctWordsPoints,
      bonusPoints,
      timePoints
    };
  };

  const submitAnswers = async () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    
    setGameState(prev => ({
      ...prev,
      status: 'validating'
    }));
    
    let validatedAnswers: Answer[];
    
    if (gameState.validationEngine === 'ai') {
      try {
        const aiResults = await openaiService.validateAnswersWithAI(
          gameState.answers,
          gameState.currentLetter,
          gameState.selectedCategories
        );
        
        validatedAnswers = aiResults.map(result => ({
          categoryId: result.categoryId,
          word: result.word,
          isCorrect: result.isCorrect,
          example: result.example
        }));
      } catch (error) {
        console.error('Error validating with AI, falling back to offline:', error);
        validatedAnswers = validateAnswersOffline();
      }
    } else {
      validatedAnswers = validateAnswersOffline();
    }
    
    const scoreDetails = calculateScore(validatedAnswers);
    
    setGameState(prev => ({
      ...prev,
      status: 'results',
      validatedAnswers,
      score: scoreDetails.total,
      scoreDetails
    }));
  };

  const playAgain = () => {
    startGame();
  };

  const setValidationEngine = (engine: ValidationEngine) => {
    setGameState(prev => ({
      ...prev,
      validationEngine: engine
    }));
  };

  const generateStory = async () => {
    // Only generate a story if we're in the results state and have correct answers
    if (gameState.status !== 'results') return;
    
    const correctAnswers = gameState.validatedAnswers.filter(answer => answer.isCorrect);
    if (correctAnswers.length === 0) return;
    
    // Set status to generating-story to show loading spinner
    setGameState(prev => ({
      ...prev,
      status: 'generating-story'
    }));
    
    try {
      const story = await openaiService.generateStory(
        correctAnswers.map(answer => ({
          categoryId: answer.categoryId,
          word: answer.word
        })),
        gameState.currentLetter
      );
      
      setGameState(prev => ({
        ...prev,
        status: 'results',
        story
      }));
    } catch (error) {
      console.error('Error generating story:', error);
      setGameState(prev => ({
        ...prev,
        status: 'results',
        story: 'No se pudo generar una historia. Asegúrate de tener configurada la clave de API.'
      }));
    }
  };

  useEffect(() => {
    if (gameState.status === 'playing' && gameState.timeLeft > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
      
      setTimer(interval);
      
      return () => clearInterval(interval);
    } else if (gameState.status === 'playing' && gameState.timeLeft === 0) {
      submitAnswers();
    }
  }, [gameState.status, gameState.timeLeft]);

  return (
    <GameContext.Provider value={{ 
      gameState, 
      startGame, 
      updateAnswer, 
      submitAnswers, 
      playAgain,
      setValidationEngine,
      generateStory
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 