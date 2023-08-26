import React from "react";
import MainPage from "./../components/MainPage";
import TinderCard from "react-tinder-card";
const Cards = (props) => {
  return (
    <div className="slider-section">
      {props.stickyNotes.length != 0 ? (
        <div className="cardContainer">
          {props.stickyNotes.map((character, index) => (
            <TinderCard
              ref={props.childRefs[index]}
              className={`swipe ${
                index === props.stickyNotes.length - 1 ? "active" : ""
              }`}
              key={character}
              onSwipe={(dir) => props.swiped(dir, character, index)}
              onCardLeftScreen={() => props.outOfFrame(character, index)}
              preventSwipe={["up", "down"]}
            >
              <div className={`card`}>
                <div className="card-details">
                  <h3>{character}</h3>
                  <div className="card-logo">
                    <h4>
                      <img
                        src={process.env.PUBLIC_URL + "/img/main-page-icon.svg"}
                        alt="Icon"
                      />
                      <span>Pixstory.ai</span>
                    </h4>
                    <img
                      src={process.env.PUBLIC_URL + "/img/copy.svg"}
                      alt="copy"
                    />
                  </div>
                  <p>{character}</p>
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
            </TinderCard>
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
              <li onClick={() => props.handleQueryClick(data.value)}>
                <span className="slide">{data.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cards;
