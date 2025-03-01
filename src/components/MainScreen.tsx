import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/MainScreen.css';

const MainScreen: React.FC = () => {
  const { startGame } = useGame();

  return (
    <div className="main-screen">
      <div className="main-content">
        <h1 className="game-title">Tutti-Frutti</h1>
        <p className="game-instructions">
          ¡Bienvenido a Tutti-Frutti! Se te dará una letra al azar y tendrás que escribir 
          palabras que empiecen con esa letra para 5 categorías diferentes. 
          Tienes 60 segundos para completar todas las categorías.
        </p>
        <button className="start-button" onClick={startGame}>
          Comenzar Juego
        </button>
      </div>
    </div>
  );
};

export default MainScreen; 