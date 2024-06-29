import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as Tone from 'tone';
import './App.css';
import keyBindings from './keyBindings.json';
import Keyboard from './Keyboard';
import PlayedNotes from './PlayedNotes';

function App() {
  const synthsRef = useRef({});
  const activeNotes = useRef({});
  const [activeKeys, setActiveKeys] = useState([]);
  const [eventLog, setEventLog] = useState([]);
  const [playedNotes, setPlayedNotes] = useState([]);
  const [audioContextUnlocked, setAudioContextUnlocked] = useState(false);
  const maxPlayedNotes = 10;  // 设置要显示的音符的最大数量

  useEffect(() => {
    // 初始化每个音符对应的 Synth 实例
    Object.keys(keyBindings).forEach(key => {
      synthsRef.current[keyBindings[key]] = new Tone.Synth().toDestination();
    });

    // 添加全局的用户交互事件监听器以解锁音频上下文
    const unlockAudioContext = () => {
      if (!audioContextUnlocked) {
        Tone.start();
        setAudioContextUnlocked(true);
        window.removeEventListener('mousedown', unlockAudioContext);
        window.removeEventListener('touchstart', unlockAudioContext);
        window.removeEventListener('keydown', unlockAudioContext);
      }
    };

    window.addEventListener('mousedown', unlockAudioContext);
    window.addEventListener('touchstart', unlockAudioContext);
    window.addEventListener('keydown', unlockAudioContext);

    return () => {
      window.removeEventListener('mousedown', unlockAudioContext);
      window.removeEventListener('touchstart', unlockAudioContext);
      window.removeEventListener('keydown', unlockAudioContext);
    };
  }, [audioContextUnlocked]);

  const playNoteStart = useCallback((note) => {
    synthsRef.current[note].triggerAttack(note);
  }, []);

  const playNoteEnd = useCallback((note) => {
    const now = Tone.now();
    synthsRef.current[note].triggerRelease(now);
  }, []);

  const handleKeyDown = useCallback((event) => {
    const note = keyBindings[event.key];
    if (note && !activeNotes.current[note]) {
      activeNotes.current[note] = true;
      setActiveKeys(prevKeys => [...prevKeys, event.key]);
      playNoteStart(note);
      logKeyEvent(event);
      setPlayedNotes(prevNotes => {
        const newNotes = [...prevNotes, note];
        return newNotes.length > maxPlayedNotes ? newNotes.slice(newNotes.length - maxPlayedNotes) : newNotes;
      });
    }
  }, [playNoteStart, maxPlayedNotes]);

  const handleKeyUp = useCallback((event) => {
    const note = keyBindings[event.key];
    if (note && activeNotes.current[note]) {
      playNoteEnd(note);
      delete activeNotes.current[note];
      setActiveKeys(prevKeys => prevKeys.filter(key => key !== event.key));
      logKeyEvent(event);
    }
  }, [playNoteEnd]);

  const logKeyEvent = (event) => {
    const eventType = event.type;
    const key = event.key;
    const code = event.code;
    const timestamp = new Date().toLocaleTimeString();

    const logMessage = `${timestamp} - ${eventType}: Key ${key} (Code ${code})`;
    setEventLog(prevLog => [...prevLog, logMessage]);  // 将新日志添加到数组末尾
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Piano App</h1>
        <p>Press keys A, S, D, F, G, H, J, K to play notes</p>
      </header>
      <div className="piano-container">
        <PlayedNotes notes={playedNotes} />
        <Keyboard activeKeys={activeKeys} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
      </div>
      <div className="event-log">
        <h2>Event Log</h2>
        <ul>
          {eventLog.slice().reverse().map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
