import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: sticky;
  top: 80px;
  z-index: 100;
  background: #fff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Chip = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: ${({ active }) => (active ? "#000" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 120px;
  }
`;

const AdvancedFiltersBar = ({
  categories,
  activeCategory,
  setActiveCategory,
  price,
  setPrice
}) => {
  return (
    <Wrapper>
      {categories.map((cat) => (
        <Chip
          key={cat}
          active={activeCategory === cat}
          onClick={() => setActiveCategory(cat)}
        >
          {cat}
        </Chip>
      ))}

      <PriceRange>
        <span>Price:</span>
        <input
          type="range"
          min="0"
          max="5000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <span>₹{price}</span>
      </PriceRange>
    </Wrapper>
  );
};

export default AdvancedFiltersBar;
