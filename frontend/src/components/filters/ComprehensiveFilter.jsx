import React, { useState } from "react";
import styled from "styled-components";
import { FiFilter, FiX } from "react-icons/fi";
import { filterOptions } from "../../data/products";

const ComprehensiveFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  const activeFiltersCount = Object.values(filters).flat().length;

  return (
    <>
      <FilterToggle onClick={() => setIsOpen(!isOpen)}>
        <FiFilter />
        <span>Filters</span>
        {activeFiltersCount > 0 && <Badge>{activeFiltersCount}</Badge>}
      </FilterToggle>

      <FilterPanel className={isOpen ? "open" : ""}>
        <FilterHeader>
          <h3>Filter Sarees</h3>
          <CloseButton onClick={() => setIsOpen(false)}>
            <FiX />
          </CloseButton>
        </FilterHeader>

        <FilterContent>
          <FilterGroup>
            <FilterTitle>Occasion</FilterTitle>
            <FilterOptions>
              {filterOptions.occasions.map(occasion => (
                <FilterOption key={occasion}>
                  <input
                    type="checkbox"
                    id={`occasion-${occasion}`}
                    checked={filters.occasions?.includes(occasion) || false}
                    onChange={() => handleFilterChange('occasions', occasion)}
                  />
                  <label htmlFor={`occasion-${occasion}`}>{occasion}</label>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Regional Style</FilterTitle>
            <FilterOptions>
              {filterOptions.regionalStyles.map(style => (
                <FilterOption key={style}>
                  <input
                    type="checkbox"
                    id={`style-${style}`}
                    checked={filters.regionalStyles?.includes(style) || false}
                    onChange={() => handleFilterChange('regionalStyles', style)}
                  />
                  <label htmlFor={`style-${style}`}>{style}</label>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Saree Length</FilterTitle>
            <FilterOptions>
              {filterOptions.lengths.map(length => (
                <FilterOption key={length}>
                  <input
                    type="checkbox"
                    id={`length-${length}`}
                    checked={filters.lengths?.includes(length) || false}
                    onChange={() => handleFilterChange('lengths', length)}
                  />
                  <label htmlFor={`length-${length}`}>{length}</label>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Fabric Weight</FilterTitle>
            <FilterOptions>
              {filterOptions.fabricWeights.map(weight => (
                <FilterOption key={weight}>
                  <input
                    type="checkbox"
                    id={`weight-${weight}`}
                    checked={filters.fabricWeights?.includes(weight) || false}
                    onChange={() => handleFilterChange('fabricWeights', weight)}
                  />
                  <label htmlFor={`weight-${weight}`}>{weight}</label>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Stock Status</FilterTitle>
            <FilterOptions>
              {filterOptions.stockStatus.map(status => (
                <FilterOption key={status}>
                  <input
                    type="checkbox"
                    id={`stock-${status}`}
                    checked={filters.stockStatus?.includes(status) || false}
                    onChange={() => handleFilterChange('stockStatus', status)}
                  />
                  <label htmlFor={`stock-${status}`}>{status}</label>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Draping Style</FilterTitle>
            <FilterOptions>
              {filterOptions.drapingStyles.map(style => (
                <FilterOption key={style}>
                  <input
                    type="checkbox"
                    id={`draping-${style}`}
                    checked={filters.drapingStyles?.includes(style) || false}
                    onChange={() => handleFilterChange('drapingStyles', style)}
                  />
                  <label htmlFor={`draping-${style}`}>{style}</label>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterActions>
            <ClearButton onClick={onClearFilters}>
              Clear All Filters
            </ClearButton>
          </FilterActions>
        </FilterContent>
      </FilterPanel>

      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default ComprehensiveFilter;

const FilterToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  background: #a47148;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  transition: background-color 0.3s ease;

  &:hover {
    background: #8b5a3c;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e63946;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
`;

const FilterPanel = styled.div`
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
  overflow-y: auto;

  &.open {
    right: 0;
  }

  @media (max-width: 480px) {
    width: 100vw;
    right: -100vw;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  background: #f8f9fa;

  h3 {
    margin: 0;
    color: #2b2b2b;
    font-size: 1.2rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.2rem;

  &:hover {
    color: #333;
  }
`;

const FilterContent = styled.div`
  padding: 1.5rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: #2b2b2b;
  font-size: 1rem;
  font-weight: 600;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #a47148;
  }

  label {
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;
    flex: 1;
  }
`;

const FilterActions = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    color: #333;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;