import { useState } from 'react'

import './App.css'

function App() {
  /*
    In useState the first value is variable and the second value is a function: example: const [counter, setCounter]= useState(0) in this counter is a variable and setCounter is a function
  */
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(""); // State to hold error messages
  const [bgColor, setBgColor] = useState(""); // State to hold background color
  // let counter = 15

  const addValue = () => {
    if (counter < 50) {
      setCounter((prevCounter) => prevCounter + 1);
      setCounter((prevCounter) => prevCounter + 1);
      setCounter((prevCounter) => prevCounter + 1);
      setError(""); // Clear error message
      setBgColor(""); // Reset background color
    } else {
      setError("You have reached your limit.");
      setBgColor("green"); // Set background color to green on error
    }
  };

  const removeValue = () => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
      setCounter((prevCounter) => prevCounter - 1);
      setCounter((prevCounter) => prevCounter - 1);
      setError(""); // Clear error message
      setBgColor(""); // Reset background color
    } else {
      setError("You have reached your limit.");
      setBgColor("red"); // Set background color to red on error
    }
  };

  return (
    <div style={{ backgroundColor: bgColor, padding: "20px" }}>
      <h1>React Hooks</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>Remove value</button>
      {error && <p style={{ color: "white" }}>{error}</p>}
      <p>footer: {counter}</p>
    </div>
  );
}

export default App
