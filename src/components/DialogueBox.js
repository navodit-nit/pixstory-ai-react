import React, { useState, useEffect } from "react";
const DialogueBox = (props) => {
  const [textInput, setTextInput] = useState("");
  
  const handleAddNote = () => {
    if (textInput.trim() !== "") {
      props.setStickyNotes([...props.stickyNotes, textInput]);
      setTextInput("");
      props.setShow(false);
    }
  };

  const handleCloseDialougeBox = () => {
    props.setShow(false);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
     
      <div 
        className={ props.show == 1 || (props.show > 0 && props.stickyNotes.length == 0)
            ? "overlayDialogBox"
            : "query-section"
        }
      >
        <div className={`fixed-bottom message-section ${props.messageBox}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className={`message-textarea ${props.containerClass}`}>
                  <a onClick={handleCloseDialougeBox}>
                    <span></span>
                  </a>

                  <textarea
                    disabled={isLoading}
                    className={
                      "form-control message-box" +
                      (props.show == 1 ? " largeTextArea" : "")
                    }
                    rows={1}
                    onFocus={props.handlePropt}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Ask anything..."
                  ></textarea>

                  <button
                    type="submit"
                    onClick={handleAddNote}
                    className="btn position-absolute message-btn"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.1056 7.55279C15.4741 7.73705 15.4741 8.26295 15.1056 8.44721L1.20893 15.3955C0.793737 15.6031 0.344372 15.1821 0.524508 14.7543L3.28673 8.19403C3.33897 8.06995 3.33897 7.93005 3.28673 7.80597L0.524508 1.24571C0.344371 0.817882 0.793737 0.396869 1.20893 0.604467L15.1056 7.55279Z"
                        fill="#A5B505"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {props.show && (
                <div className="col-md-12">
                  <div className="prompt-cont bottom-prompt-box">
                    <ul>
                      {props.data.followup_ques.map((val, index) => (
                        <li onClick={() => props.handleQueryClick(val, index)}>
                          <span>{val}</span>
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
      <div  className={ props.show == 1 || (props.show > 0 && props.stickyNotes.length == 0)
            ? "overlayDialoghide"
            : "query-section-show"
        } onClick={handleCloseDialougeBox}></div>
    </>
  );
};

export default DialogueBox;
