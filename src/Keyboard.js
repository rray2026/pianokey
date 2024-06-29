// src/Keyboard.js
import React from 'react';
import './Keyboard.css';
import keyBindings from './keyBindings.json';

const row1 = 'qwertyuiop'.split('');
const row2 = 'asdfghjkl'.split('');
const row3 = 'zxcvbnm'.split('');

const Keyboard = ({ activeKeys }) => {
  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {row1.map(key => (
          <div
            key={key}
            className={`key ${activeKeys.includes(key) ? 'active' : ''} ${keyBindings[key] ? 'bound' : 'unbound'}`}
          >
            {key.toUpperCase()}
            {keyBindings[key] && <span className="note">{keyBindings[key]}</span>}
          </div>
        ))}
      </div>
      <div className="keyboard-row">
        {row2.map(key => (
          <div
            key={key}
            className={`key ${activeKeys.includes(key) ? 'active' : ''} ${keyBindings[key] ? 'bound' : 'unbound'}`}
          >
            {key.toUpperCase()}
            {keyBindings[key] && <span className="note">{keyBindings[key]}</span>}
          </div>
        ))}
      </div>
      <div className="keyboard-row">
        {row3.map(key => (
          <div
            key={key}
            className={`key ${activeKeys.includes(key) ? 'active' : ''} ${keyBindings[key] ? 'bound' : 'unbound'}`}
          >
            {key.toUpperCase()}
            {keyBindings[key] && <span className="note">{keyBindings[key]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
