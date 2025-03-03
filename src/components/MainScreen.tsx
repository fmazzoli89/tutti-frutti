import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import EngineToggle from './EngineToggle';
import ApiKeyInput from './ApiKeyInput';
import '../styles/MainScreen.css';

const MainScreen: React.FC = () => {
  const { startGame } = useGame();
  const [showApiSettings, setShowApiSettings] = useState(false);

  const toggleApiSettings = () => {
    setShowApiSettings(!showApiSettings);
  };

  return (
    <div className="main-screen">
      <div className="main-content">
        <h1 className="game-title">Tutti-Frutti</h1>
        <p className="game-instructions">
          ¡Bienvenido a Tutti-Frutti! Se te dará una letra al azar y tendrás que escribir 
          palabras que empiecen con esa letra para 5 categorías diferentes. 
          Tienes 60 segundos para completar todas las categorías.
        </p>
        
        <EngineToggle />
        
        <button className="api-settings-button" onClick={toggleApiSettings}>
          {showApiSettings ? 'Ocultar configuración de API' : 'Configurar API de OpenAI'}
        </button>
        
        {showApiSettings && <ApiKeyInput />}
        
        <button className="start-button" onClick={startGame}>
          Comenzar Juego
        </button>
      </div>
    </div>
  );
};

export default MainScreen; 