import React from 'react';
import { useGame } from '../context/GameContext';
import { ValidationEngine } from '../types/game';
import '../styles/EngineToggle.css';

const EngineToggle: React.FC = () => {
  const { gameState, setValidationEngine } = useGame();
  const { validationEngine } = gameState;

  const handleToggle = (engine: ValidationEngine) => {
    setValidationEngine(engine);
  };

  return (
    <div className="engine-toggle">
      <p className="toggle-label">Modo de validación:</p>
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${validationEngine === 'offline' ? 'active' : ''}`}
          onClick={() => handleToggle('offline')}
        >
          Offline
        </button>
        <button
          className={`toggle-button ${validationEngine === 'ai' ? 'active' : ''}`}
          onClick={() => handleToggle('ai')}
        >
          IA
        </button>
      </div>
    </div>
  );
};

export default EngineToggle; 