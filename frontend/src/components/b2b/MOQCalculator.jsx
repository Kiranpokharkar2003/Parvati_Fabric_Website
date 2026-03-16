import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const moqRules = {
  sarees: {
    silk: { min: 50, priceRange: [1000, 2500], discount: [15, 25, 40] },
    cotton: { min: 100, priceRange: [500, 1200], discount: [10, 20, 35] },
    chiffon: { min: 75, priceRange: [800, 1800], discount: [12, 22, 38] },
    georgette: { min: 60, priceRange: [700, 1600], discount: [14, 24, 36] }
  },
  lehengas: {
    silk: { min: 25, priceRange: [2500, 8000], discount: [20, 30, 45] },
    cotton: { min: 50, priceRange: [1500, 4000], discount: [15, 25, 40] },
    georgette: { min: 30, priceRange: [2000, 6000], discount: [18, 28, 42] }
  },
  kurtis: {
    cotton: { min: 100, priceRange: [300, 800], discount: [10, 18, 30] },
    silk: { min: 75, priceRange: [600, 1500], discount: [12, 20, 35] },
    rayon: { min: 150, priceRange: [250, 600], discount: [8, 15, 28] }
  }
};

const MOQCalculator = () => {
  const [selectedCategory, setSelectedCategory] = useState('sarees');
  const [selectedFabric, setSelectedFabric] = useState('silk');
  const [quantity, setQuantity] = useState(50);
  const [calculation, setCalculation] = useState(null);

  useEffect(() => {
    calculateMOQ();
  }, [selectedCategory, selectedFabric, quantity]);

  const calculateMOQ = () => {
    const rules = moqRules[selectedCategory][selectedFabric];
    if (!rules) return;

    const { min, priceRange, discount } = rules;
    const [minPrice, maxPrice] = priceRange;
    const avgPrice = (minPrice + maxPrice) / 2;

    let discountPercent = 0;
    let tier = 'Below MOQ';

    if (quantity >= min && quantity < min * 2) {
      discountPercent = discount[0];
      tier = 'Tier 1';
    } else if (quantity >= min * 2 && quantity < min * 4) {
      discountPercent = discount[1];
      tier = 'Tier 2';
    } else if (quantity >= min * 4) {
      discountPercent = discount[2];
      tier = 'Tier 3';
    }

    const discountedPrice = avgPrice * (1 - discountPercent / 100);
    const totalValue = discountedPrice * quantity;
    const savings = (avgPrice - discountedPrice) * quantity;

    setCalculation({
      isValidMOQ: quantity >= min,
      minQuantity: min,
      tier,
      discountPercent,
      originalPrice: avgPrice,
      discountedPrice,
      totalValue,
      savings,
      priceRange: [
        minPrice * (1 - discountPercent / 100),
        maxPrice * (1 - discountPercent / 100)
      ]
    });
  };

  return (
    <Container>
      <Header>
        <h1>MOQ Calculator</h1>
        <p>Calculate minimum order quantities and bulk pricing</p>
      </Header>

      <CalculatorSection>
        <InputSection>
          <InputGroup>
            <label>Product Category</label>
            <Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedFabric(Object.keys(moqRules[e.target.value])[0]);
              }}
            >
              <option value="sarees">Sarees</option>
              <option value="lehengas">Lehengas</option>
              <option value="kurtis">Kurtis</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <label>Fabric Type</label>
            <Select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
            >
              {Object.keys(moqRules[selectedCategory]).map(fabric => (
                <option key={fabric} value={fabric}>
                  {fabric.charAt(0).toUpperCase() + fabric.slice(1)}
                </option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup>
            <label>Quantity</label>
            <QuantityInput>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                min="1"
              />
              <span>pieces</span>
            </QuantityInput>
          </InputGroup>

          <QuickQuantities>
            <span>Quick Select:</span>
            {[50, 100, 200, 500].map(qty => (
              <QuickButton
                key={qty}
                onClick={() => setQuantity(qty)}
                $active={quantity === qty}
              >
                {qty}
              </QuickButton>
            ))}
          </QuickQuantities>
        </InputSection>

        {calculation && (
          <ResultSection>
            <ResultHeader $valid={calculation.isValidMOQ}>
              <StatusIcon>
                {calculation.isValidMOQ ? '✅' : '❌'}
              </StatusIcon>
              <div>
                <h3>
                  {calculation.isValidMOQ ? 'Valid MOQ' : 'Below MOQ'}
                </h3>
                <p>
                  {calculation.isValidMOQ 
                    ? `${calculation.tier} - ${calculation.discountPercent}% discount`
                    : `Minimum ${calculation.minQuantity} pieces required`
                  }
                </p>
              </div>
            </ResultHeader>

            {calculation.isValidMOQ && (
              <ResultGrid>
                <ResultCard>
                  <h4>Price per Piece</h4>
                  <PriceDisplay>
                    <OriginalPrice>₹{calculation.originalPrice.toLocaleString()}</OriginalPrice>
                    <DiscountedPrice>₹{Math.round(calculation.discountedPrice).toLocaleString()}</DiscountedPrice>
                  </PriceDisplay>
                  <Savings>Save ₹{Math.round(calculation.originalPrice - calculation.discountedPrice)}</Savings>
                </ResultCard>

                <ResultCard>
                  <h4>Total Order Value</h4>
                  <TotalValue>₹{Math.round(calculation.totalValue).toLocaleString()}</TotalValue>
                  <TotalSavings>Total Savings: ₹{Math.round(calculation.savings).toLocaleString()}</TotalSavings>
                </ResultCard>

                <ResultCard>
                  <h4>Price Range</h4>
                  <PriceRange>
                    ₹{Math.round(calculation.priceRange[0]).toLocaleString()} - 
                    ₹{Math.round(calculation.priceRange[1]).toLocaleString()}
                  </PriceRange>
                  <p>Based on design complexity</p>
                </ResultCard>
              </ResultGrid>
            )}

            <TierTable>
              <h4>Discount Tiers</h4>
              <TierGrid>
                <TierHeader>
                  <span>Quantity Range</span>
                  <span>Discount</span>
                  <span>Status</span>
                </TierHeader>
                
                <TierRow $active={calculation.tier === 'Tier 1'}>
                  <span>{calculation.minQuantity} - {calculation.minQuantity * 2 - 1}</span>
                  <span>{moqRules[selectedCategory][selectedFabric].discount[0]}%</span>
                  <span>{calculation.tier === 'Tier 1' ? 'Current' : 'Available'}</span>
                </TierRow>
                
                <TierRow $active={calculation.tier === 'Tier 2'}>
                  <span>{calculation.minQuantity * 2} - {calculation.minQuantity * 4 - 1}</span>
                  <span>{moqRules[selectedCategory][selectedFabric].discount[1]}%</span>
                  <span>{calculation.tier === 'Tier 2' ? 'Current' : 'Available'}</span>
                </TierRow>
                
                <TierRow $active={calculation.tier === 'Tier 3'}>
                  <span>{calculation.minQuantity * 4}+</span>
                  <span>{moqRules[selectedCategory][selectedFabric].discount[2]}%</span>
                  <span>{calculation.tier === 'Tier 3' ? 'Current' : 'Available'}</span>
                </TierRow>
              </TierGrid>
            </TierTable>
          </ResultSection>
        )}
      </CalculatorSection>

      <InfoSection>
        <InfoCard>
          <h4>💡 MOQ Benefits</h4>
          <ul>
            <li>Guaranteed bulk pricing discounts</li>
            <li>Priority production scheduling</li>
            <li>Flexible payment terms</li>
            <li>Dedicated account manager</li>
          </ul>
        </InfoCard>

        <InfoCard>
          <h4>📋 Terms & Conditions</h4>
          <ul>
            <li>MOQ applies per fabric type</li>
            <li>Mixed orders allowed within category</li>
            <li>Prices subject to market fluctuations</li>
            <li>Advance payment required for new buyers</li>
          </ul>
        </InfoCard>
      </InfoSection>
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

const CalculatorSection = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  height: fit-content;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8B4513;
  }
`;

const QuantityInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #8B4513;
    }
  }
  
  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

const QuickQuantities = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

const QuickButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#8B4513' : '#ddd'};
  background: ${props => props.$active ? '#8B4513' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    border-color: #8B4513;
  }
`;

const ResultSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 12px;
  background: ${props => props.$valid ? '#d4edda' : '#f8d7da'};
  
  h3 {
    margin: 0;
    color: ${props => props.$valid ? '#155724' : '#721c24'};
  }
  
  p {
    margin: 0;
    color: ${props => props.$valid ? '#155724' : '#721c24'};
    font-size: 0.9rem;
  }
`;

const StatusIcon = styled.div`
  font-size: 2rem;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div`
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  text-align: center;
  
  h4 {
    margin: 0 0 1rem 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const PriceDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 1rem;
`;

const DiscountedPrice = styled.span`
  color: #8B4513;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Savings = styled.div`
  color: #28a745;
  font-size: 0.9rem;
  font-weight: 500;
`;

const TotalValue = styled.div`
  color: #8B4513;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TotalSavings = styled.div`
  color: #28a745;
  font-weight: 500;
`;

const PriceRange = styled.div`
  color: #8B4513;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TierTable = styled.div`
  h4 {
    color: #333;
    margin-bottom: 1rem;
  }
`;

const TierGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TierHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #8B4513;
  color: white;
  border-radius: 8px;
  font-weight: 600;
`;

const TierRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.$active ? '#fff3cd' : '#f8f9fa'};
  border: ${props => props.$active ? '2px solid #ffc107' : '1px solid #eee'};
  border-radius: 8px;
  color: #555;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  h4 {
    color: #8B4513;
    margin-bottom: 1rem;
  }
  
  ul {
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
  }
`;

export default MOQCalculator;