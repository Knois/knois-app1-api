import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sparkle from './Sparkle';

function App() {
  const name = 'Adam';
  const now = String(new Date());
  return (
    <>
      <div className="App">
        <p>Hello {name}!</p>
        <p>The current time is {now}</p>
        <p>Two plus two is {2 + 2}</p>
      </div>
      <Sparkle />
    </>
  );
}

export default App;
