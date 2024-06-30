// src/EventManager.js

import React, { useState, useImperativeHandle, forwardRef, useCallback, useRef } from 'react';
import Keyboard from './Keyboard';
import MIDIInput from './MIDIInput';

const EventManager = forwardRef(({ synthRef, onNoteEvent }, ref) => {
  const [activeNotesState, setActiveNotesState] = useState([]);
  const activeNotes = useRef([]);

  useImperativeHandle(ref, () => ({
    triggerNoteEvent: handleNoteEvent,
  }));

  const handleNoteEvent = useCallback((event) => {
    if (onNoteEvent) {
      onNoteEvent(event);
    }

    const { type, note } = event;

    if (type === 'noteOn') {
      if (!activeNotes.current.includes(note)) {
        activeNotes.current.push(note);
        setActiveNotesState([...activeNotes.current]); // Force a state update
        synthRef.current[note].triggerAttack(note);
      }
    } else if (type === 'noteOff') {
      const noteIndex = activeNotes.current.indexOf(note);
      if (noteIndex > -1) {
        activeNotes.current.splice(noteIndex, 1);
        setActiveNotesState([...activeNotes.current]); // Force a state update
        synthRef.current[note].triggerRelease();
      }
    }
  }, [onNoteEvent, synthRef]);

  return (
    <div className="event-manager">
      <Keyboard activeNotes={activeNotesState} onNoteEvent={handleNoteEvent} />
      <MIDIInput onNoteEvent={handleNoteEvent} />
    </div>
  );
});

export default EventManager;
