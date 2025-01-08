import React from 'react';
import AnimatedElement from './components/AnimatedElement';
import CustomizationPanel from './components/CustomizationPanel';
import CodeGenerator from './components/CodeGenerator';

function App() {
  const [color, setColor] = React.useState('#FF5733');
  const [size, setSize] = React.useState(100);
  const [speed, setSpeed] = React.useState(2);

  return (
    <div className="app">
      <h1>Animated Component Library</h1>
      <div className="container">
        <AnimatedElement color={color} size={size} speed={speed} />
        <CustomizationPanel
          color={color}
          setColor={setColor}
          size={size}
          setSize={setSize}
          speed={speed}
          setSpeed={setSpeed}
        />
        <CodeGenerator color={color} size={size} speed={speed} />
      </div>
    </div>
  );
}

export default App;
