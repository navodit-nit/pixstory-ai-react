import React, { useState, useMemo, useRef, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfUse from "./components/TermsOfUse";
import Home from "./Home";


const db = [
  {
    name: "PixStory.ai, Next Gen AI search box. What are you curious about type in and see magic happening.",
    url: "./img/richard.jpg",
  },
];

function App() {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [stickyNotes, setStickyNotes] = useState([]);
  const [stickyNotesCounts, setStickyNotesCounts] = useState();
  const [show, setShow] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [textInput, setTextInput] = useState("");
  const [containerClass, setContainerClass] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [messageBox, setmessageBox] = useState("");
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState({});
  const [InputValue, setInputValue] = useState();

  
  

  
  const [theme, setTheme] = useState("light");

  
  
  
  
  
  
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (stickyNotes.length > 0 && containerClass === "querytype-medium") {
      document.body.classList.add("scroll-hide");
    }
  });
  
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
      className={`app ${stickyNotes.length == 0 ? "bgImage " : "cardpage"} ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <div className="image-bg">

       <BrowserRouter>
       <NavBar toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
          <Route path="/TermsOfUse" element={<TermsOfUse/>}/>
          <Route/>
        </Routes>
       </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
