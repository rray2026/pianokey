// src/MIDIInput.js

import { useEffect } from 'react';
import { WebMidi } from 'webmidi';

const MIDIInput = ({ onNoteEvent }) => {
  useEffect(() => {
    WebMidi.enable((err) => {
      if (err) {
        console.error("WebMidi could not be enabled.", err);
        return;
      }

      const handleMIDIMessage = (e) => {
        console.log(e);
        const note = e.note.name + e.note.octave;
        const type = e.type === 'noteon' ? 'noteOn' : 'noteOff';
        onNoteEvent({ type, note });
      };

      WebMidi.inputs.forEach(input => {
        input.addListener('noteon', 'all', handleMIDIMessage);
        input.addListener('noteoff', 'all', handleMIDIMessage);
      });

      return () => {
        WebMidi.inputs.forEach(input => {
          input.removeListener('noteon', 'all', handleMIDIMessage);
          input.removeListener('noteoff', 'all', handleMIDIMessage);
        });
      };
    });
  }, [onNoteEvent]);

  return null;
};

export default MIDIInput;
