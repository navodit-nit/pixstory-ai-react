import React, { useState, useEffect } from "react";
import "./Typewriter.css"; // Import your CSS file

const Typewriter = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
//   const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex === text.length) {
        clearInterval(typingInterval);
        return ;
      }
      setDisplayText((prevText) => prevText + text[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      
    }, []);

    // const cursorInterval = setInterval(() => {
    //   setCursorVisible((prevCursor) => !prevCursor);

    // }, 500); // Blinking interval, change as needed

    return () => {
      clearInterval(typingInterval);
    //   clearInterval(cursorInterval);
     
    };
  }, [currentIndex, text, speed]);
 
  return (
    <div className="typing-animation">
      <div className="text">{displayText}</div>
      {/* <div className={`d-none ${cursorVisible ? "blink cursor" : "d-none"}`}>
        &nbsp;
      </div> */}
    </div>
  );
};

export default Typewriter;
