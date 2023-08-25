import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import MainPage from "./../components/MainPage";

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

function Advanced2() {
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [textInput, setTextInput] = useState("");
  const [stickyNotes, setStickyNotes] = useState([]);
  const [amountValue, setAmountValue] = useState("");
  const [showCard, setShowCard] = useState(false);

  const [containerClass, setContainerClass] = useState("");
  const [messageBox, setmessageBox] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveCard(index);
  };
  
  const handleTextareaClick = () => {};

  function handleAddNote() {
    if (textInput.trim() !== "") {
      setStickyNotes([...stickyNotes, textInput]);
      setTextInput("");
      setShow(false);
    }
  }



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
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    console.log(`List item at index ${index} was swiped ${direction}`);
   
      // Remove the swiped item from the list
      setTimeout(() => {
        const newList = stickyNotes.filter((_, index1) => index1 !== index);
        console.log(newList);
        setStickyNotes(newList);  
      }, 500);
      
    
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
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
    setStickyNotes(prevCards => [...prevCards, content]); 
  }
  return (
    <> 
      <div className="slider-section">
        {stickyNotes.length != 0 ? (
          <div className="cardContainer">
            {stickyNotes.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className={`swipe ${index === stickyNotes.length - 1 ? 'active' : ''}`}        
                key={character}
                onSwipe={(dir) => swiped(dir, character, index)}
                onCardLeftScreen={() => outOfFrame(character, index)}
                preventSwipe={['up', 'down']}
              >
                <div className={`card`}>
                  <div className="card-details">
                    <h3>{character}</h3> 
                    <div className="card-logo">
                      <h4>
                        <img src={process.env.PUBLIC_URL + '/img/main-page-icon.svg'} alt="Icon" /> 
                        <span>Pixstory.ai</span>
                      </h4>
                      <img src={process.env.PUBLIC_URL + '/img/copy.svg'} alt="copy" /> 
                      
                    </div>
                    <p>{character}</p> 
                  </div>
                  <div className="share-icon">
                    <h5>
                      <a href="#">
                         <img src={process.env.PUBLIC_URL + '/img/back.svg'} alt="Load" />                        
                      </a>
                      <a href="#">
                      <img src={process.env.PUBLIC_URL + '/img/load.svg'} alt="Load" />
                      </a>
                    </h5>
                    <h5>
                    <a href="#">
                      <img src={process.env.PUBLIC_URL + '/img/share.svg'} alt="Load" />
                      </a>
                    </h5>
                  </div>
                </div>
              </TinderCard>
            ))}
          </div>
        ) : (
          <MainPage />
        )}
        {stickyNotes.length > 0 && (
                <div className="prompt-cont top-query">
                  <h3>Topics queries</h3>
                  <ul>
                    {queries.map((data, index) => (
                      <li onClick={() => handleQueryClick(data.value)}>
                        <span className="slide" >
                          {data.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
        )}
      </div>
      <div
        className={
          show == 1 || show > 0 && stickyNotes.length == 0
            ? "overlayDialogBox"
            : "query-section"
        }
      >
        <div
          className={`fixed-bottom message-section ${messageBox}`}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className={`message-textarea ${containerClass}`}>
                  <span></span>
                  <textarea
                    className={
                      "form-control message-box" +
                      (show == 1 ? " largeTextArea" : "")
                    }
                    rows={1}
                    onFocus={handlePropt}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Ask anything..."
                    onClick={handleTextareaClick}
                  ></textarea>

                  <button
                    type="submit"
                    onClick={handleAddNote}
                    className="btn position-absolute message-btn"
                  >
                    
                    <img src={process.env.PUBLIC_URL + "/img/send-msg.svg"} alt="Image"/>
                  </button>
                </div>
              </div>
              {show && (
                <div className="col-md-12 mb-2">
                  <div className="prompt-cont bottom-prompt-box">
                    <ul>
                      {queries.map((data, index) => (
                         <li onClick={() => handleQueryClick(data.value)}>
                          <span className="slide">
                            {data.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Advanced2;
