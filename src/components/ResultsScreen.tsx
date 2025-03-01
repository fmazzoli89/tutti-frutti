import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/ResultsScreen.css';

const ResultsScreen: React.FC = () => {
  const { gameState, playAgain } = useGame();
  const { currentLetter, validatedAnswers, score, selectedCategories } = gameState;

  // Create a map of category IDs to names for easy lookup
  const categoryMap = selectedCategories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="results-screen">
      <h2 className="results-title">Resultados</h2>
      
      <div className="results-summary">
        <p>Letra: <span className="highlight">{currentLetter}</span></p>
        <p>Puntuación: <span className="highlight">{score}</span></p>
        {score === 7 && <p className="perfect-score">¡Puntuación perfecta! ¡Felicidades!</p>}
      </div>
      
      <div className="results-details">
        <h3>Tus respuestas:</h3>
        <ul className="answers-list">
          {validatedAnswers.map((answer, index) => (
            <li key={index} className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
              <span className="category-name">{categoryMap[answer.categoryId]}:</span>
              <span className="answer-word">{answer.word || '(sin respuesta)'}</span>
              <span className="answer-status">
                {answer.isCorrect ? '✓' : '✗'}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <button className="play-again-button" onClick={playAgain}>
        Jugar de nuevo
      </button>
    </div>
  );
};

export default ResultsScreen; 