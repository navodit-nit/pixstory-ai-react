
import MainPage from "./../components/MainPage";
import TinderCard from "react-tinder-card";


const Cards = (props) => {
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
                      preventSwipe={["up", "down"]}
                    >
                      <div className={`card-box`}>
                        <div className="card-details">
                        {props.data.map((item) =>
                           <h3>{item.followup_ques[0]}</h3>
                    )}
                          <h3>{}</h3>
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
                            <a onClick={() => props.handleCopyClick(index)}
                              className="copy-icon tooltip-show"
                            >
                              <img
                                src={process.env.PUBLIC_URL + "/img/copy.svg"}
                                alt="copy1"
                              />
                              <span className="tooltiptext">Copied</span>
                            </a>
                          </div>
                          {/* <p id={"content-to-copy" + index}>{props.getResponseAtIndex(index).response}</p> */}
                          
                          <p id={"content-to-copy" + index}>{props.data.map(item=>item.response)}</p>
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
                  {props.data.map((item) =>
                       item.followup_ques.map((val) => (
                        <li onClick={() => props.handleQueryClick(val)}>
                          <span>{val}</span>
                        </li>
                      )) 
                    )}
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
