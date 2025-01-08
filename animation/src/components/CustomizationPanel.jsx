import React from 'react';

function CustomizationPanel({ color, setColor, size, setSize, speed, setSpeed }) {
  return (
    <div className="customization-panel">
      <label>
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <label>
        Size:
        <input
          type="range"
          min="50"
          max="300"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </label>
      <label>
        Speed:
        <input
          type="range"
          min="1"
          max="5"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
      </label>
    </div>
  );
}

export default CustomizationPanel;
