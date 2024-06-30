// src/App.js

import React, { useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import './App.css';
import PlayedNotes from './PlayedNotes';
import EventLog from './EventLog';
import EventManager from './EventManager';
import SynthManager from './SynthManager';

function App() {
  const synthsRef = useRef({});
  const eventManagerRef = useRef(null);
  const playedNotesRef = useRef(null);
  const eventLogRef = useRef(null);

  useEffect(() => {
    const unlockAudioContext = () => {
      Tone.start();
      window.removeEventListener('mousedown', unlockAudioContext);
      window.removeEventListener('touchstart', unlockAudioContext);
      window.removeEventListener('keydown', unlockAudioContext);
    };

    window.addEventListener('mousedown', unlockAudioContext);
    window.addEventListener('touchstart', unlockAudioContext);
    window.addEventListener('keydown', unlockAudioContext);

    return () => {
      window.removeEventListener('mousedown', unlockAudioContext);
      window.removeEventListener('touchstart', unlockAudioContext);
      window.removeEventListener('keydown', unlockAudioContext);
    };
  }, []);

  const handleNoteEvent = useCallback((event) => {
    const { type, note } = event;

    if (type === 'noteOn') {
      playedNotesRef.current?.addNote(note);
    }

    eventLogRef.current?.addEvent(event);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Piano App</h1>
        <p>Press keys A, S, D, F, G, H, J, K to play notes</p>
      </header>
      <div className="piano-container">
        <PlayedNotes ref={playedNotesRef} />
        <SynthManager ref={synthsRef} />
        <EventManager ref={eventManagerRef} onNoteEvent={handleNoteEvent} synthRef={synthsRef} />
      </div>
      <EventLog ref={eventLogRef} />
    </div>
  );
}

export default App;
