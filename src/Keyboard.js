// src/Keyboard.js

import React, { useEffect, useCallback } from 'react';
import keyBindings from './keyBindings.json';
import './Keyboard.css';

const keyLayout = {
  row1: 'qwertyuiop'.split(''),
  row2: 'asdfghjkl'.split(''),
  row3: 'zxcvbnm'.split(''),
};

const Keyboard = ({ activeNotes, onNoteEvent }) => {
  const handleKeyDown = useCallback((event) => {
    const note = keyBindings[event.key];
    if (note) {
      onNoteEvent({
        type: 'noteOn',
        note,
        velocity: 1,
        timestamp: Date.now(),
        device: 'keyboard',
        key: event.key,
      });
    }
  }, [onNoteEvent]);

  const handleKeyUp = useCallback((event) => {
    const note = keyBindings[event.key.toLowerCase()];
    if (note) {
      onNoteEvent({
        type: 'noteOff',
        note,
        velocity: 1,
        timestamp: Date.now(),
        device: 'keyboard',
        key: event.key,
      });
    }
  }, [onNoteEvent]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const renderKey = (key) => (
    <div
      key={key}
      className={`key ${activeNotes.includes(keyBindings[key]) ? 'active' : ''}`}
      onMouseDown={() => handleKeyDown({ key })}
      onMouseUp={() => handleKeyUp({ key })}
    >
      {key.toUpperCase()}
      {keyBindings[key] && <span className="note">{keyBindings[key]}</span>}
    </div>
  );

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {keyLayout.row1.map(renderKey)}
      </div>
      <div className="keyboard-row">
        {keyLayout.row2.map(renderKey)}
      </div>
      <div className="keyboard-row">
        {keyLayout.row3.map(renderKey)}
      </div>
    </div>
  );
};

export default Keyboard;
