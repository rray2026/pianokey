// src/PlayedNotes.js
import React from 'react';
import './PlayedNotes.css';

const PlayedNotes = ({ notes }) => {
  return (
    <div className="played-notes">
      {notes.map((note, index) => (
        <div key={index} className="note">
          {note}
        </div>
      ))}
    </div>
  );
};

export default PlayedNotes;
