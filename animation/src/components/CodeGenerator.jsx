import React from 'react';

function CodeGenerator({ color, size, speed }) {
  const code = `
<div class="animated-element" style="
  width: ${size}px;
  height: ${size}px;
  background-color: ${color};
  animation: float ${speed}s infinite;
"></div>

<style>
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}
</style>
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="code-generator">
      <pre>{code}</pre>
      <button onClick={handleCopy}>Copy Code</button>
    </div>
  );
}

export default CodeGenerator;
