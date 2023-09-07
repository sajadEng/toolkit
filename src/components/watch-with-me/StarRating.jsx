import { useState } from "react";
import ProtoTypes from "prop-types";

const mainColor = "var(--color-text)";
const mainSize = 48;

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  // backgroundColor: "rgb(230,30,30)",
};

const starContainerStyle = {
  display: "flex",
  gap: "1px",
};

StarRating.protoTypes = {
  maxRating: ProtoTypes.number,
};

function noneFunction(xxx) {
  console.log(xxx);
}

export default function StarRating({
  maxRating = 5,
  color = mainColor,
  size = mainSize,
  classname = "",
  defaultRating = 0,
  onSetRating = noneFunction,
}) {
  // states
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  // event handlers
  function handleRate(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  function handleHover(tempRating) {
    setTempRating(tempRating);
  }

  function handleDehover() {
    setTempRating(0);
  }

  // Styles

  const textStyle = {
    color,
    fontSize: `${size / 1.5}px`,
    width: size,
    height: size,
  };

  // JSX

  return (
    <div style={containerStyle} className={classname}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={(event) => handleRate(i + 1)}
            isFull={tempRating ? i < tempRating : i < rating}
            onhover={(event) => handleHover(i + 1)}
            ondehover={handleDehover}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || " "}</p>
    </div>
  );
}

function Star({ ondehover, onhover, onRate, isFull = false, color, size }) {
  return (
    <span
      role="button"
      onClick={onRate}
      onMouseEnter={onhover}
      onMouseLeave={ondehover}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={isFull ? color : "none"}
        stroke={color}
        width={size + "px"}
        height={size + "px"}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
