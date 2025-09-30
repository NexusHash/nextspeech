import React, { useState, useEffect } from "react";
import { useSpeech } from "react-text-to-speech";
import './tts.scss';

export default function TTS() {
  const [inputText, setInputText] = useState("Hello, world!");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("es"); // default to Spanish
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const { Text, start, stop, pause, speechStatus } = useSpeech({
    text: inputText,
    voice: selectedVoice,
  });

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const handleVoiceChange = (e) => {
    const voice = voices.find(v => v.name === e.target.value);
    setSelectedVoice(voice);
  };

  const handleTranslate = async () => {
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${targetLang}`);
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
          <label htmlFor="voice">Choose a voice:</label>
          <select id="voice" onChange={handleVoiceChange} value={selectedVoice?.name || ""}>
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
        <p className="tts-status-tag">
          <p className="tts-status-text">Status: {speechStatus}</p>
        </p>
      </div>

      <textarea
        className="txtArea"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type something to speak..."
      />

      <div className="tts-controls">
        <button className="btn-control" onClick={start}>Speak</button>
        <button className="btn-control" onClick={pause}>Pause</button>
        <button className="btn-control" onClick={stop}>Stop</button>
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
