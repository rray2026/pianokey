// src/EventLog.js

import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import './EventLog.css';

const EventLog = forwardRef((_, ref) => {
  const [eventLog, setEventLog] = useState([]);
  const maxEvents = 50;

  const addEvent = useCallback((event) => {
    const { type, note, velocity, timestamp, device, key, midiChannel } = event;
    let logMessage = `${timestamp} - ${type}: Note ${note} (Velocity ${velocity}) [${device}]`;
    if (device === 'keyboard' && key) {
      logMessage += ` (Key: ${key})`;
    } else if (device === 'midi' && midiChannel !== undefined) {
      logMessage += ` (MIDI Channel: ${midiChannel})`;
    }

    setEventLog((prevLog) => {
      const newLog = [logMessage, ...prevLog];
      return newLog.length > maxEvents ? newLog.slice(0, maxEvents) : newLog;
    });
  }, []);

  useImperativeHandle(ref, () => ({
    addEvent,
  }));

  return (
    <div className="event-log">
      {eventLog.map((log, index) => (
        <div key={index} className="log-entry">
          {log}
        </div>
      ))}
    </div>
  );
});

export default EventLog;
