import React, { useState } from "react";
import Card from "./Card";
import MainPage from "./MainPage";
import Button from "react";

const SendMessage = ({childToParent}) => {
  const [inputValue, setInputValue] = useState();
  const [show, setShow] = useState(false);
  const [showCard, setShowCard] = useState(false)
  const data = "This is data from Child Component to the Parent Component."
const handlePropt = () => {
    if (show == false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
const handleSpanClick = (event) => {
    const spanValue = event.target.textContent;
    setInputValue(spanValue);
    childToParent(data);
    // <Button primary onClick={() => }>Click Child</Button>
  };



const handleSubmit = (event) => {
    event.preventDefault();
    setShowCard('ture');
  }
  return (
    <>
      {/* {showCard ? <Card item={inputValue} /> : <MainPage />} */}
      <div className="fixed-bottom bg-light shadow border-top py-2">
        <div className="container-fluid">
          <div className="">
            <div className="row">
              <div className="col-md-12">
              
                <form className="" onSubmit={handleSubmit}>
                  <label htmlFor="messageInput" hidden>
                    Enter Message
                  </label>
                  <div className="postion-relative">
                    <textarea
                      className="form-control "
                      rows={1}
                      
                      onFocus={handlePropt}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="type query....."
                    ></textarea>
                    <button
                      type="submit"
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
                </form>
              </div>                            
              {show && (
                <div className="col-md-12 mb-2">                  
                  <div className="prompt-cont scroll-toggle">
                    <ul className="scroll-toggle__list">
                      <li className="scroll-toggle__list-item"> <span className="slide" onClick={handleSpanClick}>What is your favorite Google product? Why? How would you improve it?</span></li>
                      <li className="scroll-toggle__list-item"> <span className="slide" onClick={handleSpanClick}>How does Google stand out from its competitors?</span></li>
                      <li className="scroll-toggle__list-item"> <span className="slide" onClick={handleSpanClick}>What are some other sites you visit frequently? Why do you like them?</span></li>
                      <li className="scroll-toggle__list-item"> <span className="slide" onClick={handleSpanClick}>Is there a Google product that you don’t like to use? Why?  </span></li>
                      <li className="scroll-toggle__list-item"> <span className="slide" onClick={handleSpanClick}>If you don’t get hired at Google, what other companies would you be happy working for?  </span></li>
                      <li className="scroll-toggle__list-item"> <span className="slide" onClick={handleSpanClick}>In your opinion, why is the Google homepage mostly blank space? </span></li>

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
};


export default SendMessage;
