import React, { useState } from "react";
import MainPage from "./../components/MainPage";
import TinderCard from "react-tinder-card";
const Cards = (props) => {
  return (
    <div className="slider-section">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12">
            {props.stickyNotes.length != 0 ? (
              <div className="cardContainer">
                {props.stickyNotes.map((character, index) => (
                  <>
                  <a
                              onClick={() => props.handleCopyClick(index)}
                              className="copy-icon"
                            >
                              outside
                              
                            </a>
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
                          <h3 id={"content-to-copy" + index}>{character}</h3>
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
                            <a
                              onClick={() => props.handleCopyClick(index)}
                              className="copy-icon"
                            >
                              <img
                                src={process.env.PUBLIC_URL + "/img/copy.svg"}
                                alt="copy1"
                              />
                              
                            </a>
                          </div>
                          <p>{props.getResponseAtIndex(index).response}</p>
                        </div>
                        <div className="share-icon">
                          <h5>
                            <a href="#">
                              <img
                                src={process.env.PUBLIC_URL + "/img/back.svg"}
                                alt="Load"
                              />
                            </a>
                            <a href="#">
                              <img
                                src={process.env.PUBLIC_URL + "/img/load.svg"}
                                alt="Load"
                              />
                            </a>
                          </h5>
                          <h5>
                            <a href="#">
                              <img
                                src={process.env.PUBLIC_URL + "/img/share.svg"}
                                alt="Load"
                              />
                            </a>
                          </h5>
                        </div>
                      </div>
                      <div className="bottom-shadow"></div>
                    </TinderCard>
                  </>
                ))}
              </div>
            ) : (
              <MainPage />
            )}

            {props.stickyNotes.length > 0 && (
              <div className="prompt-cont top-query">
                <h3>Topics queries</h3>
                <ul>
                  {props.queries.map((data, index) => (
                    <li onClick={() => props.handleQueryClick(data)}>
                      <span className="slide">{data}</span>
                    </li>
                  ))}
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
