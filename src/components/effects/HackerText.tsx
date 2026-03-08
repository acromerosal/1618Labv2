import React, { useState, useEffect } from 'react';

export const HackerText: React.FC<{ text: string; className?: string; speed?: number }> = ({ text, className = '', speed = 30 }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (text[index] === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    startScramble();

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
};
