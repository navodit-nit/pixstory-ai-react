import React, { useState, useMemo, useRef } from "react";
import "./App.css";
import Advanced from "./examples/Advanced";
import Simple from "./examples/Simple";
import Advanced2 from "./examples/Advanced2";

import NavBar from "./components/NavBar";
import Cards from "./components/Cards";
import DialogueBox from "./components/DialogueBox";

const db = [
  {
    name: "PixStory.ai, Next Gen AI search box. What are you curious about type in and see magic happening.",
    url: "./img/richard.jpg",
  },
];

const queries = [
  {
    id: 1,
    value:
      "What is your favorite Google product? Why? How would you improve it?",
  },
  {
    id: 2,
    value: "How does Google stand out from its competitors?",
  },
  {
    id: 3,
    value:
      "What are some other sites you visit frequently? Why do you like them?",
  },
  {
    id: 4,
    value:
      "If you don't get hired at Google, what other companies would you be happy working for?",
  },
  {
    id: 5,
    value:
      "In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion",
  },
];
function App() {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [stickyNotes, setStickyNotes] = useState([]);
  const [show, setShow] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [textInput, setTextInput] = useState("");
  const [containerClass, setContainerClass] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [messageBox, setmessageBox] = useState("");
  

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    console.log(`List item at index ${index} was swiped ${direction}`);   
      // Remove the swiped item from the list      
    
  };

  const outOfFrame = (name, idx) => {
    // console.log(`List item at index ${idx} was outOfFrame`);   
    //currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    //  const newList = stickyNotes.filter((_, index1) => index1 !== idx);
   
        // console.log(newList);
        // setStickyNotes(newList);  
        // setStickyNotesCounts(newList.length);
        console.log(`Name : ${name}`);
        console.log(`idx : ${idx}`);
        var index = stickyNotes.indexOf(name);
        console.log(`index : ${index}`);
        if(index > -1){
          stickyNotes.splice(index, 1);
          setStickyNotesCounts(stickyNotes.length);
          console.log(`New List : ${stickyNotes.length}, ChildRefs : ${childRefs.length} when ${idx} was outOfFrame`);   
        }
        // initialiseChildRefs();

  };
  
  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  const handleTextareaClick = () => {};

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const currentIndexRef = useRef(currentIndex);

  var childRefs = useMemo(
    () =>
      Array(stickyNotes.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
  const canSwipe = currentIndex >= 0;

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < stickyNotes.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const childToParent = (data) => {
    //setAmountValue(data);
    console.log(`${data} left the screen!`, "");
    //addCard();
  };

  const handlePropt = () => {
    if (show == false) {
      setShow(true);
      setContainerClass("querytype-medium");
      setmessageBox("send-msg-up");
    } else {
      setShow(false);
      setContainerClass("querytype-small");
      setmessageBox("send-msg-down");
    }
  };

  const handleSpanClick = (event) => {
    const spanValue = event.target.textContent;
    setTextInput(spanValue);
  };

  const handleQueryClick = (content) => {
    console.log(content);
    setStickyNotes((prevCards) => [...prevCards, content]);
    setShow(false);
  };


  return (
    <div className={`app ${stickyNotes.length == 0 ? "bgImage":""}`}>
      <NavBar />
      <Cards
        stickyNotes={stickyNotes}
        childRefs={childRefs}
        swiped={swiped}
        outOfFrame={outOfFrame}
        handleQueryClick={handleQueryClick}
        queries={queries}
      />
      <DialogueBox
        show={show}
        stickyNotes={stickyNotes}
        messageBox={messageBox}
        containerClass={containerClass}
        handlePropt={handlePropt}
        textInput={textInput}
        queries={queries}
        handleQueryClick={handleQueryClick}
        setStickyNotes={setStickyNotes}
        setShow={setShow}
      />
      {/* {showAdvanced ? (
        <Advanced2 stickyNotes={stickyNotes} handleAddNote={handleAddNote} />
      ) : (
        <Simple />
      )} */}
      {/* <div className="row">
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
      </div> */}
    </div>
  );
}

export default App;
