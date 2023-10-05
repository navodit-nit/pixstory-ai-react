import React, { useState } from 'react';

function Slider() {
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (e) => {
    setMouseDown(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const stopDragging = () => {
    setMouseDown(false);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - e.currentTarget.offsetLeft;
    const scroll = x - startX;
    e.currentTarget.scrollLeft = scrollLeft - scroll;
  };

  return (
    <div
      id="drag"
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={handleMouseMove}
      style={{
        cursor: mouseDown ? 'grabbing' : 'grab',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
    
    </div>
  );
}

export default Slider;
