'use client';

// Debug one character string issues
import React, { useState, useEffect } from 'react';

const TextGenerator = ({ text, color = 'white',fontSize = '1em', position = 'relative',speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText(text[0])
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length - 1) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  const lines = displayedText.split('\n');

  return (
    <div style={{ color, fontSize }} className="font-mono text-lg">
      {lines.map((line, index) => (
        <div key={index} style = {{whiteSpace:'pre'}}>
          {line}
          {index === lines.length - 1 && <span className="animate-blink">|</span>}
        </div>
      ))}
    </div>
  );
};

export default TextGenerator;