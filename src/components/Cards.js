import MainPage from "./../components/MainPage";
import TinderCard from "react-tinder-card";
import React, { useState } from "react";
import Share from "./Share";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useEffect } from "react";
import Typewriter from "./Typewriter";
const Cards = (props) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleBackCard = () => {
    return props.swipe("left");
  };


  const handlePageReload = () => {
    props.fetchApi();
    let timerInterval;
    Swal.fire({
      title: "Reload",
      html: "Update",
      timer: 100,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };
  return (
    <div className="slider-section">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12 desktop-design">
            {props.stickyNotes.length != 0 ? (
              <div className="cardContainer">
                {props.stickyNotes.map((character, index) => (
                  <>
                    <TinderCard
                      ref={props.childRefs[index]}
                      className={`swipe ${
                        index === props.stickyNotes.length - 1
                          ? "active"
                          : "inactive"
                      }`}
                      key={index}
                      onSwipe={(dir) => props.swiped(dir, character, index)}
                      onCardLeftScreen={() =>
                        props.outOfFrame(character, index)
                      }
                      preventSwipe={["left", "right"]}
                    >
                      <div className={`card-box`}>
                        <div className="card-details">
                          <h3>{props.stickyNotes[index]}</h3>

                          <div className="card-logo">
                            <h4>
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/img/main-page-icon.svg"
                                }
                                alt="Icon"
                              />
                              <span>Pixstory.ai</span>
                            </h4>
                            <button
                              onClick={() => props.handleCopyClick(index)}
                              className="copy-icon tooltip-show"
                            >
                              <img
                                src={process.env.PUBLIC_URL + "/img/copy.svg"}
                                alt="copy1"
                              />
                              <span className="tooltiptext">Copied</span>
                            </button>
                          </div>

                          {/* <p id={"content-to-copy" + index}>{props.getResponseAtIndex(index).response}</p>  */}
                          <div id=""></div>
                          {isLoading ? (
                            <Loader />
                          ) : (
                            <Typewriter
                              id={"content-to-copy" + index}
                              text={props.data.response}
                              speed={50}
                            />
                          )}
                        </div>
                        <div className="share-icon">
                          <h5>
                            <button className="" onClick={handleBackCard}>
                              <img
                                src={process.env.PUBLIC_URL + "/img/back.svg"}
                                alt="Load"
                              />
                            </button>
                            <button onClick={handlePageReload}>
                              <img
                                src={process.env.PUBLIC_URL + "/img/load.svg"}
                                alt="Load"
                              />
                            </button>
                          </h5>
                          <h5>
                            <button
                              className="social-btn"
                              onClick={toggleDropdown}
                            >
                              <img
                                src={process.env.PUBLIC_URL + "/img/share.svg"}
                                alt="Load"
                              />
                            </button>

                            {isOpen &&  (
                              <Share
                                description={"this is a basic share page"}
                              />
                            )}
                          </h5>
                        </div>
                      </div>
                      {props.stickyNotes.length > 1 && (
                        <div className="bottom-shadow"></div>
                      )}
                    </TinderCard>
                  </>
                ))}
              </div>
            ) : (
              <MainPage />
            )}

            {props.stickyNotes.length > 0 && (
              <div className="prompt-cont top-query">
                <ul>
                  {props.data.followup_ques.map((val, index) => (
                    <li onClick={() => props.handleQueryClick(val, index)}>
                      <span>{val}</span>
                    </li>
                  ))}

                  {/* {                    
                    props.data.map((item, index) => (
                         item.followup_ques.map((val,ind)=>
                         <li onClick={() => props.handleQueryClick(val, index)}>
                        <span>{val}</span>
                      </li>
                     
                    ))
            )} */}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
