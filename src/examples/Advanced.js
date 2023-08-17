import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'PixStory.ai, Next Gen AI search box. What are you curious about type in and see magic happening.',
    url: './img/richard.jpg'
  },
  // {
  //   name: 'Erlich Bachman',
  //   url: './img/erlich.jpg'
  // },
  // {
  //   name: 'Monica Hall',
  //   url: './img/monica.jpg'
  // },
  // {
  //   name: 'Jared Dunn',
  //   url: './img/jared.jpg'
  // },
  // {
  //   name: 'Dinesh Chugtai',
  //   url: './img/dinesh.jpg'
  // }
]

function Advanced () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
   const [amountValue, setAmountValue] = useState("");
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  var childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  const handleInput = (event) => {
    const { value } = event.target;
    setAmountValue(value);
    console.log(`${value} left the screen!`, "")
  };

  const addCard = async() => {
    let entry = {
    name: `${amountValue}`,
    url: './img/richard.jpg'
    };
    db.push(entry)   
    updateCurrentIndex(db.length - 1)
    console.log(`${db} left the screen!`, db)
    // event.preventDefault();
    setAmountValue("")
    // setTimeout(function(){
 
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      // swipe('down')
    
    // }, 100);

    // setTimeout(function(){
 
    //   //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
    //   goBack()
    
    // }, 50);
``
    
  }
  // increase current index and show card
  const goBack = async () => {
    // if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  const animateNewCard = async () => {
    await childRefs[currentIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>Cards to Swipe</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >            
            <div
              
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
         <input
            className="form-control-lg amount bg-dark shadow"
            placeholder="Enter Query"
            type="text"
            value={amountValue}
            onChange={handleInput}
          />
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => addCard()}>Add Card</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          Swiped {lastDirection} 
        </h2>
      ) : (
        <h2 className='infoText'>
          Play with swiping cards, restart game pressing key
        </h2>
      )}
    </div>
  )
}

export default Advanced
