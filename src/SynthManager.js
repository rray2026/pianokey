// src/SynthManager.js

import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import noteList from './noteList';

const SynthManager = React.forwardRef((props, ref) => {
  const synthsRef = useRef({});

  useEffect(() => {
    // Initialize a synth for each possible note
    noteList.forEach(note => {
      if (!synthsRef.current[note]) {
        synthsRef.current[note] = new Tone.Synth().toDestination();
      }
    });

    if (ref) {
      ref.current = synthsRef.current;
    }
  }, [ref]);

  return null;
});

export default SynthManager;



