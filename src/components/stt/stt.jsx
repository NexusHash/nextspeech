import React, { useState, useEffect, useRef } from "react";
import './stt.scss';

export default function STT() {
  const [transcript, setTranscript] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("es"); // default to Spanish
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("Idle");

  const recognitionRef = useRef(null);

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

  const handleTranslate = async () => {
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(transcript)}&langpair=en|${targetLang}`);
      const data = await res.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (err) {
      setTranslatedText("Translation failed.");
    }
  };

  const speakTranslation = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLang;
  
    // Try to match a voice with the selected language
    const matchedVoice = synth.getVoices().find(v => v.lang.startsWith(targetLang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
  
    synth.speak(utterance);
  };

  return (
    <div className="tts-container">
      <div className="tts-top-container">
        <div className="voice-selector">
          <label>Status:</label>
          <p className="tts-status-text">{status}</p>
        </div>
      </div>

      <textarea
        className="txtArea"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Your speech will appear here..."
      />

      <div className="tts-controls">
        <button className="btn-control" onClick={startListening} disabled={isListening}>Start</button>
        <button className="btn-control" onClick={stopListening} disabled={!isListening}>Stop</button>
      </div>

      <div className="tts-top-container">
        <div className="voice-selector">
          <label htmlFor="lang">Translate to:</label>
          <select id="lang" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="af">Afrikaans</option>
            <option value="zu">Zulu</option>
          </select>
        </div>
      </div>

      <textarea
        className="txtArea"
        value={translatedText}
        readOnly
        placeholder="Translated text will appear here..."
      />
        <div className="tts-controls">
        <button className="btn-control" onClick={handleTranslate}>Translate</button>
        <button className="btn-control" onClick={speakTranslation} disabled={!translatedText}>Speak Translation</button>
        </div>
    </div>
  );
}
