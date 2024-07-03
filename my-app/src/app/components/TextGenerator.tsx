'use client';

// Debug one character string issues
import React, { useState, useEffect } from 'react';

const TextGenerator = ({ text, color = 'black',fontSize = '1em', position = 'relative',speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    let currentText = '';
    const interval = setInterval(() => {
      if (index < text.length) {
        if (text[index] === '\\') {
          currentText += '\n';
        } else {
          currentText += text[index];
        }
        setDisplayedText(currentText);
        index++;
      } else {
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