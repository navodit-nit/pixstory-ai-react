import React, { useState, useEffect } from 'react';
const Loader = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const message = 'Please Wait...';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex === message.length) {
        setIsTyping(false);
        clearInterval(typingInterval);
      } else {
        setText((prevText) => prevText + message[currentIndex]);
        currentIndex++;
      }
    }, 100); // Adjust the typing speed as needed
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="typing-animation">
      <p>{text}</p>
      {isTyping && <span className="typing-cursor">|</span>}
    </div>
  );
};

export default Loader;
