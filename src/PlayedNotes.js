import React from 'react';
import './PlayedNotes.css';

const PlayedNotes = ({ notes }) => {
  return (
    <div className="played-notes">
      {notes.map((note, index) => (
        <span key={index} className="note">
          {note}
        </span>
      ))}
    </div>
  );
};

export default PlayedNotes;
