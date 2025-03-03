import React from 'react';
import { useGame } from '../context/GameContext';
import GameScreen from './GameScreen';
import ResultsScreen from './ResultsScreen';
import LoadingSpinner from './LoadingSpinner';
import Timer from './Timer';
import '../styles/Game.css';

const Game: React.FC = () => {
  const { gameState, startGame } = useGame();
  const { status, timeLeft, currentLetter } = gameState;

  return (
    <div className="game-container">
      {status === 'idle' && (
        <div className="start-screen">
          <h1 className="game-title">Tutti-Frutti</h1>
          <p className="game-description">
            ¡Bienvenido a Tutti-Frutti! Se te dará una letra al azar y tendrás que escribir 
            palabras que empiecen con esa letra para diferentes categorías. 
            Tienes 60 segundos para completar todas las categorías.
          </p>
          <button className="start-button" onClick={startGame}>
            ¡Comenzar Juego!
          </button>
        </div>
      )}
      {status === 'playing' && (
        <>
          <div className="sticky-header">
            <div className="current-letter">
              Letra: <span className="letter">{currentLetter}</span>
            </div>
            <Timer timeLeft={timeLeft} />
          </div>
          <GameScreen />
        </>
      )}
      {status === 'validating' && (
        <div className="loading-screen">
          <h2>Verificando respuestas...</h2>
          <LoadingSpinner size="large" color="#2196f3" />
        </div>
      )}
      {status === 'generating-story' && (
        <div className="loading-screen">
          <h2>Generando historia...</h2>
          <LoadingSpinner size="large" color="#4caf50" />
        </div>
      )}
      {status === 'results' && <ResultsScreen />}
    </div>
  );
};

export default Game; 