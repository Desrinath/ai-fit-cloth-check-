import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset on new text
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <>{displayedText}</>;
};