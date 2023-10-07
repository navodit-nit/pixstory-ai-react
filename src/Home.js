import React, { useState, useMemo, useRef, useEffect } from "react";
import "./App.css";

import Cards from "./components/Cards";
import DialogueBox from "./components/DialogueBox";
import axios from "axios";
const responses = [];
const db = [
  {
    name: "PixStory.ai, Next Gen AI search box. What are you curious about type in and see magic happening.",
    url: "./img/richard.jpg",
  },
];

 var queries = [
    "What is your favorite Google product? Why? How would you improve it?",
   "How does Google stand out from its competitors?",
    "What are some other sites you visit frequently? Why do you like them?",
  ];

function Home() {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [stickyNotes, setStickyNotes] = useState([]);
  const [stickyNotesCounts, setStickyNotesCounts] = useState();
  const [show, setShow] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [textInput, setTextInput] = useState("");
  const [containerClass, setContainerClass] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [messageBox, setmessageBox] = useState("");
  const [copied, setCopied] = useState(false);
  // const [post, setPost] = useState({});
  const [InputValue, setInputValue] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async(searchQuery) => {
    console.log(process.env.REACT_APP_BASE_URL);
    setIsLoading(true);
   await axios.post(process.env.REACT_APP_BASE_URL + "/test", {
        query: encodeURIComponent(searchQuery),
      })
      // .then((response) => {
      //   return response.json();
      // })
      .then((data) => {
        console.log(data);
        // setPost(data.data.response);
        responses.push(data.data.response);
        setIsLoading(false);
      });
      // console.log(post)
      
  };

  // useEffect(() => {
  //   fetchUserData("");
  // }, []);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("./data/response.json")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       setData(json);
  //     });
  // });
  const [theme, setTheme] = useState("light");

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    console.log(`List item at index ${index} was swiped ${direction}`);
    // Remove the swiped item from the list
  };

  const outOfFrame = (name, idx) => {
    // console.log(`List item at index ${idx} was outOfFrame`);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    //  const newList = stickyNotes.filter((_, index1) => index1 !== idx);

    // console.log(newList);
    // setStickyNotes(newList);
    // setStickyNotesCounts(newList.length);
    var index = stickyNotes.indexOf(name);
    console.log(`index : ${index}`);
    if (index > -1) {
      console.log(`index : ${index}`);
      stickyNotes.splice(index, 1);
      setStickyNotesCounts(stickyNotes.length);
      console.log(
        `New List : ${stickyNotes.length}, ChildRefs : ${childRefs.length} when ${idx} was outOfFrame`
      );
    }
    // initialiseChildRefs();
  };

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

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
    [stickyNotesCounts]
  );
  const canSwipe = currentIndex >= 0;

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < stickyNotes.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const childToParent = (data) => {
    //setAmountValue(data);
    console.log(`${data} left the screen!`, "");
    //addCard();
  };

  const handlePropt = () => {
    if (show == false) {
      setShow(true);
      setContainerClass("querytype-medium");
      setmessageBox("send-msg-up");
      // fetchUserData();
    } else {
      setShow(false);
      setContainerClass("querytype-small");
      setmessageBox("send-msg-down");
    }
  };

  const handleSpanClick = (event) => {
    const spanValue = event.target.textContent;
    setTextInput(spanValue);
    console.log(spanValue);
  };

  const getResponseAtIndex = (cIdx) => {    
    return responses[cIdx];
  };

  const handleQueryClick = (content) => {
    console.log("stickyNotes : "+stickyNotes)
    setStickyNotes((prevCards) => [...prevCards, content]);
    setStickyNotesCounts(stickyNotes.length);
    console.log("stickyNotes.length : "+stickyNotes.length)
    console.log("stickyNotes : "+stickyNotes)
    
    // let queries = getResponseAtIndex(stickyNotes.length).followup_ques;
    setShow(false);
    setContainerClass("querytype-small");
    document.body.classList.remove("scroll-hide");
    fetchUserData(content);
  };

  const handleCopyClick = (value) => {
    const contentToCopy = document.getElementById("content-to-copy" + value);
    const range = document.createRange();
    range.selectNode(contentToCopy);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    try {
      document.execCommand("copy");
      setCopied(true);
    } catch (err) {
      console.error("Unable to copy", err);
    }
    window.getSelection().removeAllRanges();
  };

  useEffect(() => {
    if (stickyNotes.length > 0 && containerClass === "querytype-medium") {
      document.body.classList.add("scroll-hide");
    }
  });

  return (
    <>
      <Cards
        stickyNotes={stickyNotes}
        childRefs={childRefs}
        swiped={swiped}
        outOfFrame={outOfFrame}
        handleQueryClick={handleQueryClick}
        queries={queries}
        getResponseAtIndex={getResponseAtIndex}
        handleCopyClick={handleCopyClick}
        swipe={swipe}
        fetchApi={fetchUserData}
        isLoading={isLoading}
        //data={post}
      />
      <DialogueBox
        className="parent"
        show={show}
        stickyNotes={stickyNotes}
        messageBox={messageBox}
        containerClass={containerClass}
        handlePropt={handlePropt}
        textInput={textInput}
        // queries={queries}
        handleQueryClick={handleQueryClick}
        setStickyNotes={setStickyNotes}
        setShow={setShow}
        data={queries}
      />
      <p align="right">v1.0.0-061023:1630 .</p>
    </>
  );
}

export default Home;
