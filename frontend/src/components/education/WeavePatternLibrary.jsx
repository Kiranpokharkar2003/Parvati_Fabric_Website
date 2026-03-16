import React, { useState } from 'react';
import styled from 'styled-components';

const weavePatterns = [
  {
    id: 1,
    name: "Banarasi Brocade",
    description: "Intricate gold and silver thread work on silk base",
    technique: "Jacquard loom weaving with metallic threads",
    origin: "Varanasi, Uttar Pradesh",
    characteristics: ["Heavy weight", "Metallic sheen", "Floral motifs"],
    image: "/images/weaves/banarasi-brocade.jpg"
  },
  {
    id: 2,
    name: "Kanjivaram Silk",
    description: "Pure mulberry silk with contrasting borders",
    technique: "Three-shuttle weaving technique",
    origin: "Kanchipuram, Tamil Nadu",
    characteristics: ["Thick texture", "Temple motifs", "Contrasting borders"],
    image: "/images/weaves/kanjivaram.jpg"
  },
  {
    id: 3,
    name: "Chanderi Weave",
    description: "Lightweight fabric with subtle sheen",
    technique: "Handloom weaving with cotton and silk",
    origin: "Chanderi, Madhya Pradesh",
    characteristics: ["Sheer texture", "Coin motifs", "Lightweight"],
    image: "/images/weaves/chanderi.jpg"
  },
  {
    id: 4,
    name: "Ikat Weave",
    description: "Resist dyeing technique creating blurred patterns",
    technique: "Tie-dye before weaving",
    origin: "Odisha, Andhra Pradesh",
    characteristics: ["Blurred edges", "Geometric patterns", "Vibrant colors"],
    image: "/images/weaves/ikat.jpg"
  }
];

const WeavePatternLibrary = () => {
  const [selectedWeave, setSelectedWeave] = useState(weavePatterns[0]);

  return (
    <Container>
      <Header>
        <h1>Weave Pattern Library</h1>
        <p>Explore the rich heritage of Indian textile weaving techniques</p>
      </Header>

      <Content>
        <WeaveList>
          {weavePatterns.map(weave => (
            <WeaveCard 
              key={weave.id}
              $active={selectedWeave.id === weave.id}
              onClick={() => setSelectedWeave(weave)}
            >
              <img src={weave.image} alt={weave.name} />
              <h3>{weave.name}</h3>
              <p>{weave.origin}</p>
            </WeaveCard>
          ))}
        </WeaveList>

        <WeaveDetails>
          <DetailImage>
            <img src={selectedWeave.image} alt={selectedWeave.name} />
          </DetailImage>
          
          <DetailContent>
            <h2>{selectedWeave.name}</h2>
            <Origin>Origin: {selectedWeave.origin}</Origin>
            <Description>{selectedWeave.description}</Description>
            
            <Section>
              <h4>Weaving Technique</h4>
              <p>{selectedWeave.technique}</p>
            </Section>
            
            <Section>
              <h4>Key Characteristics</h4>
              <CharacteristicsList>
                {selectedWeave.characteristics.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </CharacteristicsList>
            </Section>
          </DetailContent>
        </WeaveDetails>
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
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WeaveList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
  }
`;

const WeaveCard = styled.div`
  padding: 1rem;
  border: 2px solid ${props => props.$active ? '#8B4513' : '#eee'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1rem;
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

const WeaveDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailImage = styled.div`
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const DetailContent = styled.div`
  h2 {
    color: #8B4513;
    margin-bottom: 0.5rem;
  }
`;

const Origin = styled.p`
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #555;
    line-height: 1.6;
  }
`;

const CharacteristicsList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    color: #555;
    
    &:before {
      content: "✓";
      color: #8B4513;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

export default WeavePatternLibrary;