import React, { useState } from "react";
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
  return (
    <div
      className={
        props.show == 1 || (props.show > 0 && props.stickyNotes.length == 0)
          ? "overlayDialogBox"
          : "query-section"
      }
    >
      <div className={`fixed-bottom message-section ${props.messageBox}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className={`message-textarea ${props.containerClass}`}>
                <a onClick={handleCloseDialougeBox}><span></span></a>
                <textarea
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
                  <img
                    src={process.env.PUBLIC_URL + "/img/send-msg.svg"}
                    alt="Image"
                  />
                </button>
              </div>
            </div>
            {props.show && (
              <div className="col-md-12">
                <div className="prompt-cont bottom-prompt-box">
                  <ul>
                    {props.queries.map((data, index) => (
                      <li onClick={() => props.handleQueryClick(data)}>
                        <span className="slide">{data}</span>
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
  );
};

export default DialogueBox;
