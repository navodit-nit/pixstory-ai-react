import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import SendMessage1 from "../components/SendMessage1";
import MainPage from "./../components/MainPage";
const db = [
  {
    name: "PixStory.ai, Next Gen AI search box. What are you curious about type in and see magic happening.",
    url: "./img/richard.jpg",
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

  function handleAddNote() {
    if (textInput.trim() !== "") {
      setStickyNotes([...stickyNotes, textInput]);
      setTextInput("");
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

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < stickyNotes.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
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
    } else {
      setShow(false);
    }
  };

  const handleSpanClick = (event) => {
    const spanValue = event.target.textContent;
    setTextInput(spanValue);
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Cards to Swipe</h1>
      {stickyNotes.length != 0 ? (
        <div className="cardContainer">
          {stickyNotes.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character}
              onSwipe={(dir) => swiped(dir, character, index)}
              onCardLeftScreen={() => outOfFrame(character, index)}
            >
              <div className="card">
                <h3>{character}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
      ) : (
        <MainPage />
      )}
      <div className="fixed-bottom bg-light shadow border-top py-2 message-section">
        <div className="container-fluid">
          <div className="">
            <div className="row">
              <div className="col-md-12">
                <div className="postion-relative">
                
                  <textarea
                    className={"form-control message-box" + (show == 1 ? ' largeTextArea' : '')}
                    rows={1}
                    onFocus={handlePropt}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="type query....."
                  ></textarea>

                  <button
                    type="submit"
                    onClick={handleAddNote}
                    className="btn position-absolute message-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M3 13.0001H9V11.0001H3V1.8457C3 1.56956 3.22386 1.3457 3.5 1.3457C3.58425 1.3457 3.66714 1.36699 3.74096 1.4076L22.2034 11.562C22.4454 11.695 22.5337 11.9991 22.4006 12.241C22.3549 12.3241 22.2865 12.3925 22.2034 12.4382L3.74096 22.5925C3.499 22.7256 3.19497 22.6374 3.06189 22.3954C3.02129 22.3216 3 22.2387 3 22.1544V13.0001Z"
                        fill="rgba(0,0,0,1)"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              {show && (
                <div className="col-md-12 mb-2">
                  <div className="prompt-cont">
                    <ul>
                      <li>
                        {" "}
                        <span className="slide" onClick={handleSpanClick}>
                          What is your favorite Google product? Why? How would
                          you improve it?
                        </span>
                      </li>
                      <li>
                        {" "}
                        <span className="slide" onClick={handleSpanClick}>
                          How does Google stand out from its competitors?
                        </span>
                      </li>
                      <li>
                        {" "}
                        <span className="slide" onClick={handleSpanClick}>
                          What are some other sites you visit frequently? Why do
                          you like them?
                        </span>
                      </li>
                      <li>
                        {" "}
                        <span className="slide" onClick={handleSpanClick}>
                          Is there a Google product that you don’t like to use?
                          Why?{" "}
                        </span>
                      </li>
                      <li>
                        {" "}
                        <span className="slide" onClick={handleSpanClick}>
                          If you don’t get hired at Google, what other companies
                          would you be happy working for?{" "}
                        </span>
                      </li>
                      <li>
                        {" "}
                        <span className="slide" onClick={handleSpanClick}>
                          In your opinion, why is the Google homepage mostly
                          blank space?{" "}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advanced2;
