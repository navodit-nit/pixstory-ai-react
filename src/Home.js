import React, { useState, useMemo, useRef, useEffect } from "react";
import "./App.css";

import Cards from "./components/Cards";
import DialogueBox from "./components/DialogueBox";
import axios from 'axios';

const responses = [
  {
    success: true,
    message: "done",
    response:
      "1-A market economy is an economic system in which the allocation of resources is determined by the ords fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "1.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "1.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy",
      "1.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "2A market economy is an rolled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "2.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "2.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "2.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "3A market economy is an economic system in which the allocation of resources is determined by the operation of market forces, such as supply and demand. The key features of a market economy include private ownership of resources, the existence of competitive markets, and the role of prices and profit incentives in allocating resources. This differs from a planned economy, which is an economic system in which the government controls the allocation of resources through central planning. In a planned economy, resources are typically owned and controlled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "3.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "3.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "3.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "4A market economy is an economic system in which the allocation of resources is determined by the operation of market forces, such as supply and demand. The key features of a market economy include private ownership of resources, the existence of competitive markets, and the role of prices and profit incentives in allocating resources. This differs from a planned economy, which is an economic system in which the government controls the allocation of resources through central planning. In a planned economy, resources are typically owned and controlled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "4.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "4.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "4.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "5-A market economy is an economic system in which the allocation of resources is determined by the operation of market forces, such as supply and demand. The key features of a market economy include private ownership of resources, the existence of competitive markets, and the role of prices and profit incentives in allocating resources. This differs from a planned economy, which is an economic system in which the government controls the allocation of resources through central planning. In a planned economy, resources are typically owned and controlled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "5.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "5.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "5.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "6-A market economy is an economic system in which the allocation of resources is determined by the operation of market forces, such as supply and demand. The key features of a market economy include private ownership of resources, the existence of competitive markets, and the role of prices and profit incentives in allocating resources. This differs from a planned economy, which is an economic system in which the government controls the allocation of resources through central planning. In a planned economy, resources are typically owned and controlled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "6.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "6.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "6.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "7-A market economy is an economic system in which the allocation of resources is determined by the operation of market forces, such as supply and demand. The key features of a market economy include private ownership of resources, the existence of competitive markets, and the role of prices and profit incentives in allocating resources. This differs from a planned economy, which is an economic system in which the government controls the allocation of resources through central planning. In a planned economy, resources are typically owned and controlled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "7.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "7.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "7.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "8-A market economy is an economic system in which the allocation of resources is determined by the operation of market forces, such as supply and demand. The key features of a market economy include private ownership of resources, the existence of competitive markets, and the role of prices and profit incentives in allocating resources. This differs from a planned economy, which is an economic system in which the government controls the allocation of resources through central planning. In a planned economy, resources are typically owned and controlled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "8.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "8.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "8.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "9-A market economy is an economic system in which the allocation of resources is determined by the operation of market forces, such as supply and demand. The key features of a market economy include private ownership of resources, the existence of competitive markets, and the role of prices and profit incentives in allocating resources. This differs from a planned economy, which is an economic system in which the government controls the allocation of resources through central planning. In a planned economy, resources are typically owned and controlled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "9.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "9.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "9.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
  {
    success: true,
    message: "done",
    response:
      "10-A market economy is an economic system in which the allocation of resources is determined by the operation of market forces, such as supply and demand. The key features of a market economy include private ownership of resources, the existence of competitive markets, and the role of prices and profit incentives in allocating resources. This differs from a planned economy, which is an economic system in which the government controls the allocation of resources through central planning. In a planned economy, resources are typically owned and controlled by the government and production is directed towards fulfilling centrally planned targets and objectives.",
    followup_ques: [
      "10.1-Can you provide an example of a market where competition has led to improved product quality or reduced costs for consumers?",
      "10.2-What are some examples of industries that have been traditionally dominated by government intervention in a planned economy, and how has this impacted the overall economy?",
      "10.3-How do market economies address issues such as income inequality and environmental degradation?",
    ],
  },
];
const db = [
  {
    name: "PixStory.ai, Next Gen AI search box. What are you curious about type in and see magic happening.",
    url: "./img/richard.jpg",
  },
];

//  var queries = [
//     "What is your favorite Google product? Why? How would you improve it?",
//    "How does Google stand out from its competitors?",
//     "What are some other sites you visit frequently? Why do you like them?",
//   ];

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
  const [post, setPost] = useState({});
  const [InputValue, setInputValue] = useState();

  
    const fetchUserData = (searchQuery) => {
      console.log(process.env.REACT_APP_BASE_URL);
      axios.post(process.env.REACT_APP_BASE_URL+"/test", {
        query: encodeURIComponent(searchQuery),
      })
      // .then((response) => {
      //   return response.json();
      // })
      .then((data) =>{
        console.log(data)
          setPost(data.data.response)
      });
    };
  
  
  useEffect(() => {
      fetchUserData(''); 
  }, []);
   useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
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
    while (cIdx >= responses.length) {
      cIdx = cIdx % 10;
    }
    return responses[cIdx];
  };

  const handleQueryClick = (content) => {
    setStickyNotes((prevCards) => [...prevCards, content]);
    setStickyNotesCounts(stickyNotes.length);
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
   
       
<> <div
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
      className={`app ${stickyNotes.length == 0 ? "bgImage " : "cardpage"} ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
        <Cards
          stickyNotes={stickyNotes}
          childRefs={childRefs}
          swiped={swiped}
          outOfFrame={outOfFrame}
          handleQueryClick={handleQueryClick}
          // queries={queries}
          getResponseAtIndex={getResponseAtIndex}
          handleCopyClick={handleCopyClick}
          swipe={swipe}
          fetchApi={fetchUserData}
          data={post}
        />

        <DialogueBox className="parent"
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
          data={post}
        />
         <p align="right">v1.0.0-051023:1252    .</p>       
        </div>

     </>
  );
}

export default Home;
