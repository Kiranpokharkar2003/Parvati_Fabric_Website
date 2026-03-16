import React from 'react';
import styled from 'styled-components';

const ColorPalette = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const ColorSwatch = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid ${({ $active }) => ($active ? '#333' : 'transparent')};
  background: ${({ $color }) => $color};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }
`;

const ColorName = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
`;

const ColorVariantSwitcher = ({ colors, selectedColor, onColorChange, product }) => {
  return (
    <div>
      <h4>Available Colors</h4>
      <ColorPalette>
        {colors.map((color) => (
          <div key={color.name} style={{ textAlign: 'center' }}>
            <ColorSwatch
              $color={color.hex}
              $active={selectedColor === color.name}
              onClick={() => onColorChange(color.name)}
              title={color.name}
            />
            <ColorName>{color.name}</ColorName>
          </div>
        ))}
      </ColorPalette>
    </div>
  );
};

export default ColorVariantSwitcher;