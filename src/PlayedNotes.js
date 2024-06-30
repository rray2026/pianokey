// src/PlayedNotes.js

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './PlayedNotes.css';

const PlayedNotes = forwardRef((_, ref) => {
  const [notes, setNotes] = useState([]);
  const maxNotes = 10;

  const addNote = (note) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes, note];
      return newNotes.length > maxNotes ? newNotes.slice(newNotes.length - maxNotes) : newNotes;
    });
  };

  useImperativeHandle(ref, () => ({
    addNote,
  }));

  return (
    <div className="played-notes">
      {notes.map((note, index) => (
        <div key={index} className="note">
          {note}
        </div>
      ))}
    </div>
  );
});

export default PlayedNotes;
