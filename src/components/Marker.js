import React from "react";
import "../style.css";

const Marker = ({ text, tooltip, $hover }) => {
  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
  };

  return (
    <div className={$hover ? "circle hover" : "circle"} onClick={handleClick}>
      <span className="circleText" title={tooltip}>
        {text}
      </span>
    </div>
  );
};

export default Marker;