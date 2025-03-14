import React from 'react';
import { useGame } from '../context/GameContext';
import Fireworks from './Fireworks';
import '../styles/ResultsScreen.css';
import LoadingSpinner from './LoadingSpinner';
import { GameStatus } from '../types/game';

const ResultsScreen: React.FC = () => {
  const { gameState, playAgain, generateStory } = useGame();
  const { currentLetter, validatedAnswers, selectedCategories, status, story, scoreDetails } = gameState;

  // Check if all answers are correct for a perfect score
  const allCorrect = validatedAnswers.every(answer => answer.isCorrect);
  
  // Create a map of category IDs to names for easy lookup
  const categoryMap = selectedCategories.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {} as Record<string, string>);
  
  // Check if there are any correct answers to enable story generation
  const hasCorrectAnswers = validatedAnswers.some(answer => answer.isCorrect);
  
  // Show loading spinner when generating story
  if (status === 'generating-story') {
    return (
      <div className="results-screen">
        <h2 className="results-title">Generando historia...</h2>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="results-screen">
      {allCorrect && <Fireworks />}
      
      <h2 className="results-title">Resultados</h2>
      
      <div className="results-container">
        <div className="score-section">
          <h2>Letra: {currentLetter.toUpperCase()}</h2>
          <h2>Puntaje Total: {scoreDetails?.total || 0}</h2>
          {allCorrect && (
              <p className="perfect-score">¡Perfecto! ¡Todas las respuestas son correctas!</p>
            )}
          <div className="score-details">
            <div className="score-item">
              <span>Palabras correctas:</span>
              <span>{validatedAnswers.filter(a => a.isCorrect).length} × 10 = {scoreDetails?.correctWordsPoints || 0} puntos</span>
            </div>
            {scoreDetails && scoreDetails.bonusPoints > 0 && (
              <div className="score-item bonus">
                <span>¡Bonus por todas correctas!</span>
                <span>+{scoreDetails.bonusPoints} puntos</span>
              </div>
            )}
            <div className="score-item">
              <span>Tiempo restante:</span>
              <span>+{scoreDetails?.timePoints || 0} puntos</span>
            </div>
          </div>
        </div>

        <div className="answers-section">
          <div className="results-details">
            {validatedAnswers.map((answer) => (
              <div 
                key={answer.categoryId} 
                className="answer-item"
              >
                <div className="answer-header">
                  <span className="category-name">{categoryMap[answer.categoryId]}</span>
                  <span className={`answer-word ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    {answer.word || '(sin respuesta)'}
                  </span>
                  <span className={answer.isCorrect ? 'correct' : 'incorrect'}>
                    {answer.isCorrect ? '✓' : '✗'}
                  </span>
                </div>
                
                {!answer.isCorrect && (
                  <div className="answer-example">
                    <span className="example-label">¿Sabías que podrías haber usado?</span>
                    <span className="example-word">{answer.example}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {story && (
            <div className="story-section">
              <h3 className="story-title">Historia con tus palabras correctas</h3>
              <div className="story-content">
                {story}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="button-container">
        {hasCorrectAnswers && !story && (
          <button 
            className="generate-story-btn"
            onClick={generateStory}
            disabled={status === 'generating-story' as GameStatus}
          >
            Generar historia con palabras correctas
          </button>
        )}
        
        <button 
          className="play-again-btn"
          onClick={playAgain}
        >
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen; 