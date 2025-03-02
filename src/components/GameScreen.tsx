import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/GameScreen.css';

const GameScreen: React.FC = () => {
  const { gameState, updateAnswer, submitAnswers } = useGame();
  const { currentLetter, selectedCategories, answers, timeLeft } = gameState;

  const handleInputChange = (categoryId: string, value: string) => {
    updateAnswer(categoryId, value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAnswers();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="game-screen">
      <div className="game-header">
        <div className="timer">Tiempo: {formatTime(timeLeft)}</div>
        <div className="current-letter">Letra: <span>{currentLetter}</span></div>
      </div>

      <form onSubmit={handleSubmit} className="game-form">
        <div className="categories-container">
          {selectedCategories.map((category) => (
            <div key={category.id} className="category-input">
              <label htmlFor={`input-${category.id}`}>{category.name}</label>
              <input
                id={`input-${category.id}`}
                type="text"
                value={answers[category.id] || ''}
                onChange={(e) => handleInputChange(category.id, e.target.value)}
                placeholder={`${category.name} con ${currentLetter}...`}
                autoComplete="off"
                className="uppercase-input"
              />
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button">
          Enviar Respuestas
        </button>
      </form>
    </div>
  );
};

export default GameScreen; 