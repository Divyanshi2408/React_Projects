// src/Spinner.js
import React from "react";
import "./Spinner.css"; // Import the spinner styles

const Spinner = ({ type }) => {
  return (
    <div className={`spinner-container ${type}`}>
      {type === "circle" && (
        <div className="circle-spinner">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      )}
      {type === "bars" && (
        <div className="bars-spinner">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      {type === "custom" && (
        <div className="custom-spinner">
          <div className="custom-shape"></div>
        </div>
      )}
    </div>
  );
};

export default Spinner;
