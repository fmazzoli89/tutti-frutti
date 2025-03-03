import React from 'react';
import '../styles/LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#4caf50' 
}) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className="spinner-container">
      <div 
        className={`spinner ${sizeClass}`}
        style={{ borderTopColor: color }}
      ></div>
      <p className="spinner-text">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner; 