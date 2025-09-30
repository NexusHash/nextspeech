import React, { useState } from "react";
import { useSpeech } from "react-text-to-speech";

export default function TTS() {
  const [inputText, setInputText] = useState("Hello, world!");
  const { Text, start, stop, pause, speechStatus } = useSpeech({
    text: inputText,
  });

  return (
    <div className="tts-container">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type something to speak..."
      />
      <div className="tts-controls">
        <button onClick={start}>Speak</button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Stop</button>
      </div>
      <p>Status: {speechStatus}</p>
    </div>
  );
}
