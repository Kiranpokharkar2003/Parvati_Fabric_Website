import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import VoiceSearch from './VoiceSearch';
import CameraSearch from './CameraSearch';
import './MobileSearchBar.css';

const MobileSearchBar = ({ onSearch, onVoiceSearch, onImageSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSearches = [
    'red silk sarees',
    'wedding lehengas',
    'cotton kurtis',
    'party wear',
    'traditional sarees',
    'designer lehengas',
    'casual kurtis',
    'festival wear'
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = popularSearches.filter(search => 
        search.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (term = searchTerm) => {
    if (term.trim()) {
      onSearch(term.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  const handleVoiceSearch = (transcript) => {
    setSearchTerm(transcript);
    handleSearch(transcript);
    if (onVoiceSearch) {
      onVoiceSearch(transcript);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mobile-search-container">
      <div className="mobile-search-bar">
        <div className="search-input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search sarees, lehengas, kurtis..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="mobile-search-input"
          />
          <div className="search-actions">
            <VoiceSearch onSearch={handleVoiceSearch} />
            <CameraSearch onImageSearch={onImageSearch} />
          </div>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="mobile-suggestions">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <FaSearch className="suggestion-icon" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {!searchTerm && (
        <div className="popular-searches">
          <h4>Popular Searches</h4>
          <div className="search-tags">
            {popularSearches.slice(0, 6).map((search, index) => (
              <button
                key={index}
                className="search-tag"
                onClick={() => handleSuggestionClick(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSearchBar;