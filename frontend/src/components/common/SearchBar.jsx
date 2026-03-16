import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #a47148;
    box-shadow: 0 0 0 3px rgba(164, 113, 72, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  
  &:hover {
    background: #f0f0f0;
  }
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const SuggestionItem = styled.div`
  padding: 0.8rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const ProductImage = styled.img`
  width: 40px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
  
  .name {
    font-weight: 500;
    color: #333;
    margin-bottom: 0.2rem;
  }
  
  .category {
    font-size: 0.8rem;
    color: #666;
  }
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = productsData
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.subcategory?.toLowerCase().includes(query.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
          product.regionalStyle?.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setShowSuggestions(false);
    setQuery('');
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchIcon>
        <FiSearch />
      </SearchIcon>
      
      <SearchInput
        type="text"
        placeholder="Search sarees, fabrics, occasions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => query && setShowSuggestions(true)}
      />
      
      {query && (
        <ClearBtn onClick={clearSearch}>
          <FiX />
        </ClearBtn>
      )}
      
      {showSuggestions && (
        <SuggestionsDropdown>
          {suggestions.length > 0 ? (
            suggestions.map((product) => (
              <SuggestionItem
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
              >
                <ProductImage 
                  src={product.images?.[0] || product.image} 
                  alt={product.name}
                />
                <ProductInfo>
                  <div className="name">{product.name}</div>
                  <div className="category">{product.category} • {product.subcategory}</div>
                </ProductInfo>
              </SuggestionItem>
            ))
          ) : (
            <NoResults>No products found for "{query}"</NoResults>
          )}
        </SuggestionsDropdown>
      )}
    </SearchContainer>
  );
};

export default SearchBar;