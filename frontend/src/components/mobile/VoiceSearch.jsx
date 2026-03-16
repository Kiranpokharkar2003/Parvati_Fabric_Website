import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import './VoiceSearch.css';

const VoiceSearch = ({ onSearch, onResults }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          onSearch(transcript);
          setTranscript('');
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onSearch]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!recognition) {
    return null;
  }

  return (
    <div className="voice-search">
      <button
        className={`voice-btn ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
        title={isListening ? 'Stop listening' : 'Start voice search'}
      >
        {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </button>
      
      {isListening && (
        <div className="voice-status">
          <div className="pulse-animation"></div>
          <span>Listening...</span>
        </div>
      )}
      
      {transcript && (
        <div className="voice-transcript">
          "{transcript}"
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;