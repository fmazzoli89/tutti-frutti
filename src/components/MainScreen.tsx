import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import EngineToggle from './EngineToggle';
import Game from './Game';
import '../styles/MainScreen.css';

const MainScreen = () => {
  const { startGame } = useGame();
  const [showApiSettings, setShowApiSettings] = useState(false);

  const toggleApiSettings = () => {
    setShowApiSettings(!showApiSettings);
  };

  return (
    <div className="main-screen">
      <div className="game-container">
        <Game />
      </div>
    </div>
  );
};

export default MainScreen; 