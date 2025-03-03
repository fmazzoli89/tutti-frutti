import React from 'react';
import '../styles/Timer.css';

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'timer-red';
    if (timeLeft <= 20) return 'timer-yellow';
    return '';
  };

  return (
    <div className={`timer-container ${getTimerColor()}`}>
      <div className="timer-content">
        <span className="timer-label">Tiempo:</span>
        <span className="timer-value">{timeLeft}</span>
        <span className="timer-unit">segundos</span>
      </div>
    </div>
  );
};

export default Timer; 