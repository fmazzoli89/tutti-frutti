import React from 'react';
import { useGame } from '../context/GameContext';
import MainScreen from './MainScreen';
import GameScreen from './GameScreen';
import ResultsScreen from './ResultsScreen';

const Game: React.FC = () => {
  const { gameState } = useGame();
  const { status } = gameState;

  return (
    <div className="game-container">
      {status === 'idle' && <MainScreen />}
      {status === 'playing' && <GameScreen />}
      {status === 'results' && <ResultsScreen />}
    </div>
  );
};

export default Game; 