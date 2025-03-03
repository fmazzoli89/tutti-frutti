import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/GameScreen.css';

const GameScreen: React.FC = () => {
  const { gameState, updateAnswer, submitAnswers } = useGame();
  const { currentLetter, selectedCategories, answers } = gameState;

  const handleInputChange = (categoryId: string, value: string) => {
    updateAnswer(categoryId, value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAnswers();
  };

  return (
    <div className="game-screen">
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
          Enviar Respuestas!
        </button>
      </form>
    </div>
  );
};

export default GameScreen; 