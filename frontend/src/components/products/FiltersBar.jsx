import React, { useState } from "react";
import styled from "styled-components";
import { FiFilter } from "react-icons/fi";
import SearchSuggestions from "../common/SearchSuggestions";

const Bar = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid #eee;
  flex-wrap: nowrap;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.6rem 1rem;
  border-radius: 999px;
  border: 1px solid #ddd;
  width: 240px;
  flex-shrink: 0;
  
  &:focus {
    outline: none;
    border-color: #a47148;
  }
`;

const Pill = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid #ddd;
  background: ${({ $active }) => ($active ? "#111" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#111")};
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #111;
  }
`;

const MobileFilterBtn = styled.button`
  margin-left: auto;
  border: 1px solid #ddd;
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopOnly = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 0.6rem;
  }
`;

const FiltersBar = ({
  onSearch,
  tags = [],
  activeTag,
  setActiveTag,
  sort,
  setSort,
  openMobileFilters,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  const allFilters = [...tags, 'newest', 'popular'];
  
  const handleFilterClick = (filter) => {
    if (filter === 'newest') {
      setSort('new');
      setActiveTag('');
    } else if (filter === 'popular') {
      setSort('popular');
      setActiveTag('');
    } else {
      setActiveTag(filter === activeTag ? '' : filter);
    }
  };
  
  const isActive = (filter) => {
    if (filter === 'newest') return sort === 'new';
    if (filter === 'popular') return sort === 'popular';
    return filter === activeTag;
  };
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };
  
  const handleSuggestionSelect = (suggestion) => {
    setSearchValue(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <Bar>
      <SearchWrapper>
        <Input
          placeholder="Search sarees (e.g., silk, cotton, wedding)..."
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(searchValue.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <SearchSuggestions 
          show={showSuggestions} 
          onSelect={handleSuggestionSelect}
        />
      </SearchWrapper>

      <DesktopOnly>
        {allFilters.map((filter) => (
          <Pill
            key={filter}
            $active={isActive(filter)}
            onClick={() => handleFilterClick(filter)}
          >
            {filter === 'newest' ? 'Newest' : filter === 'popular' ? 'Popular' : filter}
          </Pill>
        ))}
      </DesktopOnly>

      <MobileFilterBtn onClick={openMobileFilters}>
        <FiFilter /> Filters
      </MobileFilterBtn>
    </Bar>
  );
};

export default FiltersBar;

const SearchWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;
