import React from "react";
import styled from "styled-components";
import { FiSearch, FiTrendingUp } from "react-icons/fi";

const suggestions = [
  "Banarasi Silk Saree",
  "Wedding Lehenga",
  "Cotton Kurti",
  "Kanjivaram Silk",
  "Designer Saree",
  "Bridal Collection"
];

const SearchSuggestions = ({ show, onSelect }) => {
  if (!show) return null;

  return (
    <Dropdown>
      <Title>
        <FiTrendingUp /> Popular Searches
      </Title>
      {suggestions.map((item, i) => (
        <Item key={i} onClick={() => onSelect(item)}>
          <FiSearch />
          <span>{item}</span>
        </Item>
      ))}
    </Dropdown>
  );
};

export default SearchSuggestions;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin-top: 0.5rem;
  overflow: hidden;
  z-index: 100;
`;

const Title = styled.div`
  padding: 0.8rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

const Item = styled.div`
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.9rem;
  color: #333;

  svg {
    color: #999;
    font-size: 1rem;
  }

  &:hover {
    background: #f8f9fa;
    color: #a47148;

    svg {
      color: #a47148;
    }
  }
`;
