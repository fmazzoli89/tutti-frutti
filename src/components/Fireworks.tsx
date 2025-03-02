import React, { useEffect, useState } from 'react';
import '../styles/Fireworks.css';

interface FireworksProps {
  duration?: number;
}

const Fireworks: React.FC<FireworksProps> = ({ duration = 5000 }) => {
  const [active, setActive] = useState(true);
  
  useEffect(() => {
    // Play sound effect when fireworks start
    // Use the correct path with the base URL for GitHub Pages
    const audioPath = `${import.meta.env.BASE_URL}celebration.mp3`;
    const audio = new Audio(audioPath);
    audio.volume = 0.5;
    audio.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
    
    // Automatically hide fireworks after duration
    const timer = setTimeout(() => {
      setActive(false);
    }, duration);
    
    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, [duration]);
  
  if (!active) return null;
  
  // Create multiple firework elements
  const fireworks = Array.from({ length: 10 }).map((_, index) => (
    <div 
      key={index} 
      className="firework"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1 + Math.random() * 2}s`
      }}
    />
  ));
  
  return (
    <div className="fireworks-container">
      {fireworks}
    </div>
  );
};

export default Fireworks; 