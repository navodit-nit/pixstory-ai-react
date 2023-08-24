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
      "In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?In your opinion, why is the Google homepage mostly blank space?",
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
      const newList = stickyNotes.filter((_, index1) => index1 !== index);
      console.log(newList);
      setStickyNotes(newList);
    
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
      setmessageBox("abc");
    } else {
      setShow(false);
      setContainerClass("querytype-small");
      setmessageBox("xyz");
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
      <div className="slider-section newclass">
        {stickyNotes.length != 0 ? (
          <div className="cardContainer">
            {stickyNotes.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                // className={`swipe card-index-${index}`}
                className={`swipe ${index === stickyNotes.length - 1 ? 'active' : ''}`}        
                key={character}
                onSwipe={(dir) => swiped(dir, character, index)}
                onCardLeftScreen={() => outOfFrame(character, index)}
                preventSwipe={['up', 'down']}
              >
                <div className={`card`}>
                  <h3>{character}</h3>
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
                    placeholder="type query....."
                    onClick={handleTextareaClick}
                  ></textarea>

                  <button
                    type="submit"
                    onClick={handleAddNote}
                    className="btn position-absolute message-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M3 13.0001H9V11.0001H3V1.8457C3 1.56956 3.22386 1.3457 3.5 1.3457C3.58425 1.3457 3.66714 1.36699 3.74096 1.4076L22.2034 11.562C22.4454 11.695 22.5337 11.9991 22.4006 12.241C22.3549 12.3241 22.2865 12.3925 22.2034 12.4382L3.74096 22.5925C3.499 22.7256 3.19497 22.6374 3.06189 22.3954C3.02129 22.3216 3 22.2387 3 22.1544V13.0001Z"
                        fill="#e9ff07"
                      ></path>
                    </svg>
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
