// src/Keyboard.js
import React from 'react';
import './Keyboard.css';
import keyBindings from './keyBindings.json';

const Keyboard = ({ activeKeys, onKeyDown, onKeyUp }) => {
  const handleMouseDown = (key) => {
    if (keyBindings[key]) {
      onKeyDown({ key });
    }
  };

  const handleMouseUp = (key) => {
    if (keyBindings[key]) {
      onKeyUp({ key });
    }
  };

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <div
              key={key}
              className={`key ${keyBindings[key] ? 'bound' : 'unbound'} ${activeKeys.includes(key) ? 'active' : ''}`}
              onMouseDown={() => handleMouseDown(key)}
              onMouseUp={() => handleMouseUp(key)}
            >
              {key}
              {keyBindings[key] && <div className="note">{keyBindings[key]}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
