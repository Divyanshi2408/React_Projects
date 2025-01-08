import React from 'react';

function AnimatedElement({ color, size, speed }) {
  const heartStyle = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'relative',
    transform: 'rotate(-45deg)',
    animation: `flutter ${speed}s infinite ease-in-out`,
  };

  const topHalfStyle = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%',
    borderRadius: '50%',
    backgroundColor: color,
    transformOrigin: 'bottom',
    animation: `flutterTop ${speed}s infinite ease-in-out`,
  };

  const bottomHalfStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: color,
    transformOrigin: 'top',
    animation: `flutterBottom ${speed}s infinite ease-in-out`,
  };

  const containerStyle = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    margin: 'auto',
    animation: `float ${speed}s infinite`,
  };

  return (
    <div style={containerStyle}>
      <div style={heartStyle}>
        <div style={topHalfStyle}></div>
        <div style={bottomHalfStyle}></div>
      </div>
    </div>
  );
}

export default AnimatedElement;
