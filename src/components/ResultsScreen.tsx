import React from 'react';
import { useGame } from '../context/GameContext';
import { getValidWords } from '../data/wordDatabase';
import '../styles/ResultsScreen.css';

const ResultsScreen: React.FC = () => {
  const { gameState, playAgain } = useGame();
  const { currentLetter, validatedAnswers, score, selectedCategories } = gameState;

  // Create a map of category IDs to names for easy lookup
  const categoryMap = selectedCategories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {} as Record<string, string>);

  // Function to get example words for incorrect answers
  const getExampleWords = (categoryId: string): string[] => {
    // Get up to 3 valid words for this category and letter
    const validWords = getValidWords(currentLetter, categoryId);
    return validWords.slice(0, 3);
  };

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
              
              {/* Show example words for incorrect answers */}
              {!answer.isCorrect && (
                <div className="example-words">
                  <p>Ejemplos válidos:</p>
                  <ul>
                    {getExampleWords(answer.categoryId).map((word, i) => (
                      <li key={i}>{word}</li>
                    ))}
                  </ul>
                </div>
              )}
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