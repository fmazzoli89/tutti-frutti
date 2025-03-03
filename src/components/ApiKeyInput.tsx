import React, { useState, useEffect } from 'react';
import { getApiKey, setApiKey } from '../services/openaiService';
import '../styles/ApiKeyInput.css';

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKeyState] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load the API key from localStorage on component mount
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKeyState(savedKey);
      setIsSaved(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeyState(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    setApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="api-key-input">
      <h3>Configuración de API</h3>
      <p className="api-key-description">
        Para usar la validación con IA y la generación de historias, necesitas configurar tu clave de API de OpenAI.
      </p>
      
      <div className="input-group">
        <label htmlFor="apiKey">Clave de API de OpenAI:</label>
        <div className="key-input-container">
          <input
            type={isVisible ? 'text' : 'password'}
            id="apiKey"
            value={apiKey}
            onChange={handleChange}
            placeholder="sk-..."
          />
          <button 
            type="button" 
            className="visibility-toggle"
            onClick={toggleVisibility}
          >
            {isVisible ? '🙈' : '👁️'}
          </button>
        </div>
      </div>
      
      <button 
        className="save-button"
        onClick={handleSave}
        disabled={!apiKey}
      >
        {isSaved ? '✓ Guardado' : 'Guardar clave'}
      </button>
      
      <div className="api-key-info">
        <p>
          Tu clave de API se guarda localmente en tu navegador y nunca se envía a nuestros servidores.
          Puedes obtener una clave de API en <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com/api-keys</a>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput; 