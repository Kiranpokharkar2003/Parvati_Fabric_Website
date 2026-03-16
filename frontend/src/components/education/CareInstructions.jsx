import React, { useState } from 'react';
import styled from 'styled-components';

const fabricCareGuides = [
  {
    id: 1,
    fabric: "Silk",
    description: "Delicate natural fiber requiring gentle care",
    washing: {
      method: "Dry clean recommended",
      temperature: "Cold water only if hand washing",
      detergent: "Mild silk detergent or baby shampoo",
      frequency: "After 3-4 wears or when soiled"
    },
    drying: {
      method: "Air dry in shade",
      avoid: "Direct sunlight, heat sources",
      position: "Lay flat or hang carefully"
    },
    ironing: {
      temperature: "Low to medium heat",
      method: "Iron on reverse side with pressing cloth",
      steam: "Use steam sparingly"
    },
    storage: {
      method: "Hang or fold with tissue paper",
      environment: "Cool, dry place",
      protection: "Breathable garment bags"
    },
    dosDonts: {
      dos: ["Test cleaning method on hidden area", "Store with lavender sachets", "Handle with clean hands"],
      donts: ["Use bleach or harsh chemicals", "Wring or twist when wet", "Store in plastic bags"]
    }
  },
  {
    id: 2,
    fabric: "Cotton",
    description: "Durable natural fiber, easy to maintain",
    washing: {
      method: "Machine wash or hand wash",
      temperature: "Warm water (30-40°C)",
      detergent: "Regular laundry detergent",
      frequency: "After each wear"
    },
    drying: {
      method: "Air dry or tumble dry low",
      avoid: "High heat to prevent shrinkage",
      position: "Hang or lay flat"
    },
    ironing: {
      temperature: "Medium to high heat",
      method: "Iron while slightly damp",
      steam: "Steam iron works well"
    },
    storage: {
      method: "Fold or hang",
      environment: "Well-ventilated area",
      protection: "Cedar blocks for moths"
    },
    dosDonts: {
      dos: ["Pre-treat stains immediately", "Wash similar colors together", "Check for colorfastness"],
      donts: ["Use hot water for colored cotton", "Over-dry in machine", "Iron over stains"]
    }
  },
  {
    id: 3,
    fabric: "Chiffon",
    description: "Lightweight, sheer fabric requiring delicate handling",
    washing: {
      method: "Hand wash or gentle machine cycle",
      temperature: "Cold water only",
      detergent: "Mild detergent for delicates",
      frequency: "After 2-3 wears"
    },
    drying: {
      method: "Air dry only",
      avoid: "Wringing, twisting, direct heat",
      position: "Lay flat on towel"
    },
    ironing: {
      temperature: "Low heat only",
      method: "Use pressing cloth, iron quickly",
      steam: "Minimal steam"
    },
    storage: {
      method: "Hang carefully or fold with tissue",
      environment: "Dry, cool place",
      protection: "Padded hangers"
    },
    dosDonts: {
      dos: ["Handle gently when wet", "Use fabric softener sparingly", "Store separately"],
      donts: ["Use high heat", "Rub or scrub stains", "Hang heavy items on top"]
    }
  },
  {
    id: 4,
    fabric: "Georgette",
    description: "Crepe-textured fabric with flowing drape",
    washing: {
      method: "Dry clean preferred, gentle hand wash",
      temperature: "Cold water",
      detergent: "Mild detergent",
      frequency: "After 3-4 wears"
    },
    drying: {
      method: "Air dry in shade",
      avoid: "Direct sunlight, heat",
      position: "Hang or lay flat"
    },
    ironing: {
      temperature: "Low to medium heat",
      method: "Iron on reverse with cloth",
      steam: "Light steam acceptable"
    },
    storage: {
      method: "Hang to maintain drape",
      environment: "Cool, dry area",
      protection: "Garment bags"
    },
    dosDonts: {
      dos: ["Test water temperature first", "Iron while slightly damp", "Store with shape retention"],
      donts: ["Use harsh chemicals", "Wring when washing", "Store folded for long periods"]
    }
  }
];

const CareInstructions = () => {
  const [selectedFabric, setSelectedFabric] = useState(fabricCareGuides[0]);
  const [activeTab, setActiveTab] = useState('washing');

  const tabs = [
    { id: 'washing', label: 'Washing', icon: '🧼' },
    { id: 'drying', label: 'Drying', icon: '🌬️' },
    { id: 'ironing', label: 'Ironing', icon: '👔' },
    { id: 'storage', label: 'Storage', icon: '👗' },
    { id: 'dosDonts', label: 'Dos & Don\'ts', icon: '⚠️' }
  ];

  return (
    <Container>
      <Header>
        <h1>Fabric Care Instructions</h1>
        <p>Professional care guides to maintain your sarees' beauty and longevity</p>
      </Header>

      <Content>
        <FabricSelector>
          <h3>Select Fabric Type</h3>
          <FabricGrid>
            {fabricCareGuides.map(fabric => (
              <FabricCard
                key={fabric.id}
                $active={selectedFabric.id === fabric.id}
                onClick={() => setSelectedFabric(fabric)}
              >
                <h4>{fabric.fabric}</h4>
                <p>{fabric.description}</p>
              </FabricCard>
            ))}
          </FabricGrid>
        </FabricSelector>

        <CareDetails>
          <FabricHeader>
            <h2>{selectedFabric.fabric} Care Guide</h2>
            <Description>{selectedFabric.description}</Description>
          </FabricHeader>

          <TabNavigation>
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                $active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </TabButton>
            ))}
          </TabNavigation>

          <TabContent>
            {activeTab === 'washing' && (
              <CareSection>
                <h4>Washing Instructions</h4>
                <InstructionGrid>
                  <InstructionItem>
                    <strong>Method:</strong>
                    <span>{selectedFabric.washing.method}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Temperature:</strong>
                    <span>{selectedFabric.washing.temperature}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Detergent:</strong>
                    <span>{selectedFabric.washing.detergent}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Frequency:</strong>
                    <span>{selectedFabric.washing.frequency}</span>
                  </InstructionItem>
                </InstructionGrid>
              </CareSection>
            )}

            {activeTab === 'drying' && (
              <CareSection>
                <h4>Drying Instructions</h4>
                <InstructionGrid>
                  <InstructionItem>
                    <strong>Method:</strong>
                    <span>{selectedFabric.drying.method}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Avoid:</strong>
                    <span>{selectedFabric.drying.avoid}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Position:</strong>
                    <span>{selectedFabric.drying.position}</span>
                  </InstructionItem>
                </InstructionGrid>
              </CareSection>
            )}

            {activeTab === 'ironing' && (
              <CareSection>
                <h4>Ironing Instructions</h4>
                <InstructionGrid>
                  <InstructionItem>
                    <strong>Temperature:</strong>
                    <span>{selectedFabric.ironing.temperature}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Method:</strong>
                    <span>{selectedFabric.ironing.method}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Steam:</strong>
                    <span>{selectedFabric.ironing.steam}</span>
                  </InstructionItem>
                </InstructionGrid>
              </CareSection>
            )}

            {activeTab === 'storage' && (
              <CareSection>
                <h4>Storage Instructions</h4>
                <InstructionGrid>
                  <InstructionItem>
                    <strong>Method:</strong>
                    <span>{selectedFabric.storage.method}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Environment:</strong>
                    <span>{selectedFabric.storage.environment}</span>
                  </InstructionItem>
                  <InstructionItem>
                    <strong>Protection:</strong>
                    <span>{selectedFabric.storage.protection}</span>
                  </InstructionItem>
                </InstructionGrid>
              </CareSection>
            )}

            {activeTab === 'dosDonts' && (
              <CareSection>
                <DosAndDonts>
                  <DosSection>
                    <h4>✅ Do's</h4>
                    <DosList>
                      {selectedFabric.dosDonts.dos.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </DosList>
                  </DosSection>
                  
                  <DontsSection>
                    <h4>❌ Don'ts</h4>
                    <DontsList>
                      {selectedFabric.dosDonts.donts.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </DontsList>
                  </DontsSection>
                </DosAndDonts>
              </CareSection>
            )}
          </TabContent>
        </CareDetails>
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

const FabricSelector = styled.div`
  h3 {
    color: #333;
    margin-bottom: 1rem;
  }
`;

const FabricGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FabricCard = styled.div`
  padding: 1rem;
  border: 2px solid ${props => props.$active ? '#8B4513' : '#eee'};
  border-radius: 12px;
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

const CareDetails = styled.div``;

const FabricHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    color: #8B4513;
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  color: #666;
  font-style: italic;
`;

const TabNavigation = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.$active ? '#8B4513' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  span {
    font-size: 1.2rem;
  }
  
  &:hover {
    background: ${props => props.$active ? '#8B4513' : '#f8f9fa'};
  }
`;

const TabContent = styled.div`
  min-height: 300px;
`;

const CareSection = styled.div`
  h4 {
    color: #333;
    margin-bottom: 1.5rem;
  }
`;

const InstructionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InstructionItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  
  strong {
    color: #8B4513;
  }
  
  span {
    color: #555;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const DosAndDonts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DosSection = styled.div`
  h4 {
    color: #28a745;
    margin-bottom: 1rem;
  }
`;

const DontsSection = styled.div`
  h4 {
    color: #dc3545;
    margin-bottom: 1rem;
  }
`;

const DosList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #d4edda;
    color: #155724;
    
    &:before {
      content: "✓";
      color: #28a745;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

const DontsList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f8d7da;
    color: #721c24;
    
    &:before {
      content: "✗";
      color: #dc3545;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

export default CareInstructions;