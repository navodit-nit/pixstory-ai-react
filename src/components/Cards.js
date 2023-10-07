import MainPage from "./../components/MainPage";
import TinderCard from "react-tinder-card";
import React, { useState } from "react";
import Share from "./Share";

// import Loader from "./Loader";
// import { useEffect } from "react";
import Typewriter from "./Typewriter";
const Cards = (props) => {
  // const [isLoader, setIsLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const toggleDropdown = () => {
    debugger
    setIsOpen(!isOpen);
  };
  const toggleAdd = () => {
    setIsAdd(!isAdd);
  };
// loader start
  
  // useEffect(() => {
  //   setIsLoader(true);
  //   setTimeout(() => {
  //     setIsLoader(false);
  //     console.log(isLoader)
  //   }, 3000)
  // }, [props.stickyNotes]);
// loader end
  const handleBackCard = () => {
    return props.swipe("left");
  };
  const handlePageReload = () => {
   
      // setIsLoader(true);
      // setTimeout(() => {
      //   setIsLoader(false);
      //   console.log(isLoader)
      // }, 3000)
  };
//Mouse event
  return (
    <>
    <div className="">
    <button onClick={toggleAdd} className="d-none">btn</button>
      <div className="container-fluid pt-1">
        <div className="row">
          <div className="col-md-7 mx-auto ">
      
            {props.stickyNotes.length != 0 ? (
              <div className="desktop-design"><div className="cardContainer">
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
                      preventSwipe={["up", "down"]}
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
                        
                       
                            <Typewriter
                              id={"content-to-copy" + index}
                              text={props.getResponseAtIndex(index) ? props.getResponseAtIndex(index).response : "Please wait..."}
                              speed={50}
                            />
                       
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
                            {isOpen ?(<img
                                src={process.env.PUBLIC_URL + "/img/close.svg"}
                                alt="Load" width="17px" height="17px"
                              /> ) : (<img
                                src={process.env.PUBLIC_URL + "/img/share.svg"}
                                alt="Load"
                              />)}
                              {/* <img
                                src={process.env.PUBLIC_URL + "/img/share.svg"}
                                alt="Load"
                              /> */}
                            </button>

                            {isOpen && (
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
              </div> {props.stickyNotes.length > 0 && props.getResponseAtIndex(props.stickyNotes.length - 1) && (
              <div className="prompt-cont top-query">
                <ul>
                  {props.getResponseAtIndex(props.stickyNotes.length - 1).followup_ques.map((val, index) => (
                    <li onClick={() => props.handleQueryClick(val, index)}>
                      <span>{val}</span>
                    </li>
                  ))}

                 
                </ul>
              </div>
            )}</div>
            ) : (
              <MainPage />
            )}
          </div>
           {isAdd && <div className="col-md-3 mx-auto d-flex justify-content-center align-items-center"><div><img src={process.env.PUBLIC_URL + "/img/add.png"}  className="img-fluid" alt=""/></div> </div>} 
        </div>
      </div>
    </div>
  
    </>
  );
};

export default Cards;
