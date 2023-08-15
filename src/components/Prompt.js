import React from "react";

const Prompt = () =>{
   
    const handleSpanClick = (event) => {
        // Access the text content of the clicked span
        const spanValue = event.target.textContent;
        console.log('Clicked span value:', spanValue);
        // You can use this value as needed (e.g., update state, perform an action)
      };

    return(
        <>
        <div className="col-md-12 my-2">
            <div className="prompt-cont">
                <p onClick={handleSpanClick}>Prompt 1</p>
            </div>
        </div>
        </>
    )
}

export default Prompt;