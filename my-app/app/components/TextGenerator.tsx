import React, { useState, useEffect, useCallback, useMemo } from 'react';

const TextGenerator = ({ 
  text = '', 
  color = 'black', 
  fontSize = '1em', 
  position = 'relative', 
  speed = 50  
}) => {
  const [displayedText, setDisplayedText] = useState('');

  const processText = useCallback((char: string) => {
    return char === '\\' ? '\n' : char;
  }, []);

  const lines = useMemo(() => displayedText.split('\n'), [displayedText]);

  useEffect(() => {
    let isMounted = true;
    let index = 0;
    let currentText = '';

    const animateText = () => {
      if (index < text.length) {
        currentText += processText(text[index]);
        if (isMounted) {
          setDisplayedText(currentText);
        }
        index++;
        requestAnimationFrame(animateText);
      }
    };

    requestAnimationFrame(animateText);

    return () => {
      isMounted = false;
    };
  }, [text, speed, processText]);

  return (
    <div style={{ color, fontSize }} className="font-mono text-lg">
      {lines.map((line, index) => (
        <div key={index} style={{ whiteSpace: 'pre' }}>
          {line}
          {index === lines.length - 1 && <span className="animate-blink">|</span>}
        </div>
      ))}
    </div>
  );
};

export default TextGenerator;