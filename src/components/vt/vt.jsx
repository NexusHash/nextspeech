import React, { useState, useEffect, useRef } from "react";
import './vt.scss';

export default function VT() {
  const [videoSrc, setVideoSrc] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("Idle");

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setStatus("Listening...");
    recognition.onend = () => {
      setStatus("Stopped");
      setIsListening(false);
    };
    recognition.onerror = (e) => {
      setStatus(`Error: ${e.error}`);
      setIsListening(false);
    };
    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          setTranscript(prev => prev + result[0].transcript + " ");
        } else {
          interimTranscript += result[0].transcript;
        }
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleVideoLink = (e) => {
    setVideoSrc(e.target.value);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  return (
    <div className="tts-container">
      <div className="tts-top-container">
        <div className="voice-selector">
          <label>Status:</label>
          <p className="tts-status-text">{status}</p>
        </div>
      </div>

      <div className="tts-controls">
        <input
          type="text"
          className="txtArea"
          placeholder="Paste video link (MP4 or YouTube embed)"
          onChange={handleVideoLink}
        />
        <input
          type="file"
          accept="video/*"
          className="btn-control"
          onChange={handleVideoUpload}
        />
      </div>

      {videoSrc && (
        <video ref={videoRef} controls width="100%" className="video-player">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="tts-controls">
        <button className="btn-control" onClick={startListening} disabled={isListening}>Start Transcribing</button>
        <button className="btn-control" onClick={stopListening} disabled={!isListening}>Stop</button>
      </div>

      <textarea
        className="txtArea"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Transcribed video speech will appear here..."
      />
    </div>
  );
}
