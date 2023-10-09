import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import "./App.css";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfUse from "./components/TermsOfUse";
import Home from "./Home";
import LogIn from "./components/LogIn";
import useToken from "./components/useToken";

function App() {
  const [stickyNotes, setStickyNotes] = useState([]);
  const [containerClass, setContainerClass] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    if (stickyNotes.length > 0 && containerClass === "querytype-medium") {
      document.body.classList.add("scroll-hide");
    }
  });
  //login function
  //get token
  const { token, setToken } = useToken();
  
  // if(!token){
  //     return <LogIn setToken={setToken}/>
  // }
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
            {/* <Route path="/"  element={<Protected Component={Home} />} /> */}
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/termsOfUse" element={<TermsOfUse />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<NotFound />} />
            <Route />
          </Routes>
        </BrowserRouter>
        
      </div>
    </div>
  );
}

export default App;
