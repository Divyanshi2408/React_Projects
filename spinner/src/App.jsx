// src/App.js
import React, { useState, useEffect } from "react";
import Spinner from "./component/Spinner";
import "./App.css";

const App = () => {
  const [spinnerType, setSpinnerType] = useState("circle");

  return (
    <div className="app">
      <h1>Select a Spinner</h1>
      <div className="spinner-display">
        <Spinner type={spinnerType} />
      </div>

      <div className="button-container">
        <button onClick={() => setSpinnerType("circle")}>Circle Spinner</button>
        <button onClick={() => setSpinnerType("bars")}>Bars Spinner</button>
        <button onClick={() => setSpinnerType("custom")}>Custom Spinner</button>
      </div>

      <div className="code-snippet">
        <p>To use this spinner in your project, copy the code below:</p>
        <pre>
          <code>
            {`<Spinner type="circle" />`}
            <br />
            {`<Spinner type="bars" />`}
            <br />
            {`<Spinner type="custom" />`}
          </code>
        </pre>
        <p>Import the spinner component:</p>
        <pre>
          <code>{`import Spinner from './Spinner';`}</code>
        </pre>
      </div>
    </div>
  );
};

export default App;
