import React from 'react';
import { useGame } from '../context/GameContext';
import MainScreen from './MainScreen';
import GameScreen from './GameScreen';
import ResultsScreen from './ResultsScreen';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Game.css';

const Game: React.FC = () => {
  const { gameState } = useGame();
  const { status } = gameState;

  return (
    <div className="game-container">
      {status === 'idle' && <MainScreen />}
      {status === 'playing' && <GameScreen />}
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