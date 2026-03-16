import React, { useState } from 'react';
import styled from 'styled-components';

const festivals = [
  {
    id: 1,
    name: "Diwali",
    month: "October/November",
    season: "Autumn",
    description: "Festival of lights celebrating prosperity and joy",
    recommendedSarees: ["Banarasi silk", "Kanjivaram", "Heavy embroidered"],
    colors: ["Gold", "Red", "Maroon", "Royal Blue"],
    fabrics: ["Silk", "Brocade", "Georgette with embroidery"],
    styling: "Heavy jewelry, traditional draping",
    image: "/images/festivals/diwali.jpg"
  },
  {
    id: 2,
    name: "Durga Puja",
    month: "September/October",
    season: "Autumn",
    description: "Bengali festival celebrating Goddess Durga",
    recommendedSarees: ["Tant cotton", "Jamdani", "Red bordered white"],
    colors: ["White with red border", "Yellow", "Red", "Orange"],
    fabrics: ["Cotton", "Handloom", "Tant"],
    styling: "Traditional Bengali draping, conch shell bangles",
    image: "/images/festivals/durga-puja.jpg"
  },
  {
    id: 3,
    name: "Karva Chauth",
    month: "October/November",
    season: "Autumn",
    description: "Festival where married women fast for their husbands",
    recommendedSarees: ["Red silk", "Bandhani", "Heavy embroidered"],
    colors: ["Red", "Maroon", "Pink", "Orange"],
    fabrics: ["Silk", "Chiffon", "Georgette"],
    styling: "Heavy jewelry, mehendi, traditional makeup",
    image: "/images/festivals/karva-chauth.jpg"
  },
  {
    id: 4,
    name: "Holi",
    month: "March",
    season: "Spring",
    description: "Festival of colors celebrating spring",
    recommendedSarees: ["Cotton", "Light fabrics", "White base"],
    colors: ["White", "Light pink", "Yellow", "Light green"],
    fabrics: ["Cotton", "Linen", "Light silk"],
    styling: "Minimal jewelry, comfortable draping",
    image: "/images/festivals/holi.jpg"
  },
  {
    id: 5,
    name: "Navratri",
    month: "September/October",
    season: "Autumn",
    description: "Nine nights of dance and devotion",
    recommendedSarees: ["Bandhani", "Mirror work", "Chaniya choli style"],
    colors: ["Bright colors", "Each day specific color"],
    fabrics: ["Cotton", "Silk", "Georgette"],
    styling: "Garba jewelry, comfortable for dancing",
    image: "/images/festivals/navratri.jpg"
  },
  {
    id: 6,
    name: "Pongal/Makar Sankranti",
    month: "January",
    season: "Winter",
    description: "Harvest festival celebrating new beginnings",
    recommendedSarees: ["Traditional cotton", "Handloom", "Regional styles"],
    colors: ["Yellow", "Orange", "Green", "White"],
    fabrics: ["Cotton", "Handloom", "Traditional weaves"],
    styling: "Traditional jewelry, flowers in hair",
    image: "/images/festivals/pongal.jpg"
  }
];

const FestivalCalendar = () => {
  const [selectedFestival, setSelectedFestival] = useState(festivals[0]);
  const [selectedSeason, setSelectedSeason] = useState('All');

  const seasons = ['All', 'Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'];
  
  const filteredFestivals = selectedSeason === 'All' 
    ? festivals 
    : festivals.filter(f => f.season === selectedSeason);

  return (
    <Container>
      <Header>
        <h1>Festival Calendar</h1>
        <p>Seasonal saree recommendations for Indian festivals</p>
      </Header>

      <SeasonFilter>
        {seasons.map(season => (
          <SeasonButton
            key={season}
            $active={selectedSeason === season}
            onClick={() => setSelectedSeason(season)}
          >
            {season}
          </SeasonButton>
        ))}
      </SeasonFilter>

      <Content>
        <FestivalList>
          {filteredFestivals.map(festival => (
            <FestivalCard
              key={festival.id}
              $active={selectedFestival.id === festival.id}
              onClick={() => setSelectedFestival(festival)}
            >
              <FestivalImage>
                <img src={festival.image} alt={festival.name} />
                <SeasonBadge>{festival.season}</SeasonBadge>
              </FestivalImage>
              <FestivalInfo>
                <h3>{festival.name}</h3>
                <p>{festival.month}</p>
              </FestivalInfo>
            </FestivalCard>
          ))}
        </FestivalList>

        <FestivalDetails>
          <DetailHeader>
            <h2>{selectedFestival.name}</h2>
            <MonthBadge>{selectedFestival.month}</MonthBadge>
          </DetailHeader>
          
          <Description>{selectedFestival.description}</Description>
          
          <DetailGrid>
            <DetailSection>
              <h4>Recommended Sarees</h4>
              <RecommendationList>
                {selectedFestival.recommendedSarees.map((saree, index) => (
                  <li key={index}>{saree}</li>
                ))}
              </RecommendationList>
            </DetailSection>
            
            <DetailSection>
              <h4>Festival Colors</h4>
              <ColorGrid>
                {selectedFestival.colors.map((color, index) => (
                  <ColorCard key={index}>
                    <ColorSwatch $color={color.toLowerCase()} />
                    <span>{color}</span>
                  </ColorCard>
                ))}
              </ColorGrid>
            </DetailSection>
            
            <DetailSection>
              <h4>Recommended Fabrics</h4>
              <FabricList>
                {selectedFestival.fabrics.map((fabric, index) => (
                  <FabricTag key={index}>{fabric}</FabricTag>
                ))}
              </FabricList>
            </DetailSection>
            
            <DetailSection>
              <h4>Styling Tips</h4>
              <StylingTip>{selectedFestival.styling}</StylingTip>
            </DetailSection>
          </DetailGrid>
        </FestivalDetails>
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
  margin-bottom: 2rem;
  
  h1 {
    color: #8B4513;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const SeasonFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const SeasonButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 2px solid ${props => props.$active ? '#8B4513' : '#ddd'};
  background: ${props => props.$active ? '#8B4513' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #8B4513;
    color: #8B4513;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FestivalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
`;

const FestivalCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid ${props => props.$active ? '#8B4513' : '#eee'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #8B4513;
    transform: translateY(-2px);
  }
`;

const FestivalImage = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const SeasonBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #8B4513;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
`;

const FestivalInfo = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const FestivalDetails = styled.div``;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  h2 {
    color: #8B4513;
    margin: 0;
  }
`;

const MonthBadge = styled.div`
  background: #f8f9fa;
  border: 1px solid #8B4513;
  color: #8B4513;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailSection = styled.div`
  h4 {
    color: #333;
    margin-bottom: 1rem;
  }
`;

const RecommendationList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    color: #555;
    
    &:before {
      content: "✨";
      margin-right: 0.5rem;
    }
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const ColorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    font-size: 0.9rem;
    color: #555;
  }
`;

const ColorSwatch = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => {
    const colorMap = {
      'gold': '#ffd700',
      'red': '#dc3545',
      'maroon': '#800000',
      'royal blue': '#4169e1',
      'white': '#f8f8f8',
      'yellow': '#ffc107',
      'orange': '#fd7e14',
      'pink': '#e83e8c',
      'light pink': '#ffb3d9',
      'light green': '#90ee90',
      'green': '#28a745',
      'bright colors': 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)'
    };
    return colorMap[props.$color] || '#666';
  }};
  border: 1px solid #ddd;
`;

const FabricList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FabricTag = styled.span`
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 20px;
  color: #555;
  font-size: 0.8rem;
`;

const StylingTip = styled.p`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  color: #555;
  line-height: 1.6;
  margin: 0;
  border-left: 4px solid #8B4513;
`;

export default FestivalCalendar;