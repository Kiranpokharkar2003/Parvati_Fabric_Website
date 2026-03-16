import React, { useState } from 'react';
import styled from 'styled-components';

const regionalStyles = [
  {
    id: 1,
    region: "Bengal",
    state: "West Bengal",
    style: "Tant & Jamdani",
    description: "Handwoven cotton sarees with intricate motifs",
    specialties: ["Tant cotton", "Jamdani weave", "Geometric patterns"],
    colors: ["White", "Red", "Yellow", "Green"],
    occasions: ["Daily wear", "Festivals", "Cultural events"],
    coordinates: { x: 75, y: 45 }
  },
  {
    id: 2,
    region: "Tamil Nadu",
    state: "Tamil Nadu",
    style: "Kanjivaram",
    description: "Pure silk sarees with temple motifs and contrasting borders",
    specialties: ["Pure mulberry silk", "Temple designs", "Heavy borders"],
    colors: ["Deep red", "Royal blue", "Golden yellow", "Green"],
    occasions: ["Weddings", "Religious ceremonies", "Festivals"],
    coordinates: { x: 65, y: 85 }
  },
  {
    id: 3,
    region: "Gujarat",
    state: "Gujarat",
    style: "Bandhani",
    description: "Tie-dye technique creating colorful dotted patterns",
    specialties: ["Tie-dye technique", "Mirror work", "Vibrant colors"],
    colors: ["Bright red", "Yellow", "Green", "Pink"],
    occasions: ["Festivals", "Celebrations", "Traditional events"],
    coordinates: { x: 45, y: 55 }
  },
  {
    id: 4,
    region: "Odisha",
    state: "Odisha",
    style: "Ikat",
    description: "Resist dyeing technique with blurred geometric patterns",
    specialties: ["Ikat weave", "Geometric motifs", "Natural dyes"],
    colors: ["Maroon", "Black", "White", "Indigo"],
    occasions: ["Cultural events", "Traditional ceremonies"],
    coordinates: { x: 70, y: 60 }
  },
  {
    id: 5,
    region: "Rajasthan",
    state: "Rajasthan",
    style: "Leheriya",
    description: "Wave-like patterns created through tie-dye technique",
    specialties: ["Wave patterns", "Bright colors", "Lightweight fabric"],
    colors: ["Saffron", "Pink", "Yellow", "Green"],
    occasions: ["Monsoon festivals", "Traditional celebrations"],
    coordinates: { x: 40, y: 50 }
  }
];

const RegionalStyleGuide = () => {
  const [selectedRegion, setSelectedRegion] = useState(regionalStyles[0]);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  return (
    <Container>
      <Header>
        <h1>Regional Style Guide</h1>
        <p>Discover the diverse saree traditions across India</p>
      </Header>

      <Content>
        <MapSection>
          <IndiaMap>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              {/* Simplified India outline */}
              <path
                d="M20,30 L25,25 L35,20 L45,15 L55,18 L65,20 L75,25 L80,30 L85,40 L80,50 L85,60 L80,70 L75,80 L70,85 L60,90 L50,85 L40,80 L30,75 L25,65 L20,55 L15,45 Z"
                fill="#f0f0f0"
                stroke="#8B4513"
                strokeWidth="0.5"
              />
              
              {regionalStyles.map(region => (
                <circle
                  key={region.id}
                  cx={region.coordinates.x}
                  cy={region.coordinates.y}
                  r={selectedRegion.id === region.id ? "3" : "2"}
                  fill={selectedRegion.id === region.id ? "#8B4513" : "#A0522D"}
                  stroke="white"
                  strokeWidth="0.5"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedRegion(region)}
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
              ))}
            </svg>
            
            {hoveredRegion && (
              <Tooltip>
                <strong>{hoveredRegion.region}</strong>
                <br />
                {hoveredRegion.style}
              </Tooltip>
            )}
          </IndiaMap>
          
          <RegionList>
            {regionalStyles.map(region => (
              <RegionCard
                key={region.id}
                $active={selectedRegion.id === region.id}
                onClick={() => setSelectedRegion(region)}
              >
                <h4>{region.region}</h4>
                <p>{region.style}</p>
              </RegionCard>
            ))}
          </RegionList>
        </MapSection>

        <StyleDetails>
          <h2>{selectedRegion.region} - {selectedRegion.style}</h2>
          <State>{selectedRegion.state}</State>
          <Description>{selectedRegion.description}</Description>
          
          <DetailGrid>
            <DetailSection>
              <h4>Specialties</h4>
              <SpecialtyList>
                {selectedRegion.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </SpecialtyList>
            </DetailSection>
            
            <DetailSection>
              <h4>Traditional Colors</h4>
              <ColorPalette>
                {selectedRegion.colors.map((color, index) => (
                  <ColorSwatch key={index} $color={color.toLowerCase()}>
                    {color}
                  </ColorSwatch>
                ))}
              </ColorPalette>
            </DetailSection>
            
            <DetailSection>
              <h4>Occasions</h4>
              <OccasionList>
                {selectedRegion.occasions.map((occasion, index) => (
                  <OccasionTag key={index}>{occasion}</OccasionTag>
                ))}
              </OccasionList>
            </DetailSection>
          </DetailGrid>
        </StyleDetails>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    color: #8B4513;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MapSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const IndiaMap = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  height: 400px;
`;

const Tooltip = styled.div`
  position: absolute;
  background: #333;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  pointer-events: none;
  z-index: 10;
`;

const RegionList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RegionCard = styled.div`
  padding: 1rem;
  border: 2px solid ${props => props.$active ? '#8B4513' : '#eee'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
  
  &:hover {
    border-color: #8B4513;
    transform: translateY(-2px);
  }
`;

const StyleDetails = styled.div`
  h2 {
    color: #8B4513;
    margin-bottom: 0.5rem;
  }
`;

const State = styled.p`
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const DetailGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DetailSection = styled.div`
  h4 {
    color: #333;
    margin-bottom: 1rem;
  }
`;

const SpecialtyList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    color: #555;
    
    &:before {
      content: "•";
      color: #8B4513;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

const ColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ColorSwatch = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${props => {
    const colorMap = {
      'white': '#f8f8f8',
      'red': '#dc3545',
      'yellow': '#ffc107',
      'green': '#28a745',
      'blue': '#007bff',
      'pink': '#e83e8c',
      'maroon': '#800000',
      'black': '#343a40',
      'indigo': '#6610f2',
      'saffron': '#ff9500',
      'royal blue': '#4169e1',
      'golden yellow': '#ffd700',
      'deep red': '#8b0000',
      'bright red': '#ff0000'
    };
    return colorMap[props.$color] || '#666';
  }};
  color: ${props => ['white', 'yellow', 'golden yellow', 'ffc107'].includes(props.$color) ? '#333' : 'white'};
  font-size: 0.8rem;
  font-weight: 500;
`;

const OccasionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const OccasionTag = styled.span`
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 1px solid #8B4513;
  border-radius: 20px;
  color: #8B4513;
  font-size: 0.8rem;
`;

export default RegionalStyleGuide;