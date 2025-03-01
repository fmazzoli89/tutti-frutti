import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getRandomLetter, getRandomCategories } from '../data/categories';
import { isValidWord } from '../data/wordDatabase';
import { GameState, GameContextType, Answer } from '../types/game';

const initialGameState: GameState = {
  status: 'idle',
  currentLetter: '',
  selectedCategories: [],
  answers: {},
  timeLeft: 60,
  score: 0,
  validatedAnswers: [],
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

  const validateAnswers = (): Answer[] => {
    const { currentLetter, selectedCategories, answers } = gameState;
    
    return selectedCategories.map(category => {
      const word = answers[category.id] || '';
      const isCorrect = isValidWord(word, currentLetter, category.id);
      
      return {
        categoryId: category.id,
        word,
        isCorrect
      };
    });
  };

  const calculateScore = (validatedAnswers: Answer[]): number => {
    const correctAnswers = validatedAnswers.filter(answer => answer.isCorrect).length;
    // 1 point per correct word + 2 bonus points if all 5 are correct
    return correctAnswers + (correctAnswers === 5 ? 2 : 0);
  };

  const submitAnswers = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    
    const validatedAnswers = validateAnswers();
    const score = calculateScore(validatedAnswers);
    
    setGameState(prev => ({
      ...prev,
      status: 'results',
      validatedAnswers,
      score
    }));
  };

  const playAgain = () => {
    startGame();
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
    <GameContext.Provider value={{ gameState, startGame, updateAnswer, submitAnswers, playAgain }}>
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