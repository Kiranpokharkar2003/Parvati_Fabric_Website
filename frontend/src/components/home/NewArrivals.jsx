import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../common/Container';
import allProductsData from '../../data/products';
import GradientText from '../common/GradientText';

const NewArrivals = () => {
  const [activeTab, setActiveTab] = useState('new');

  const tabs = [
    { id: 'new', label: 'New This Week' },
    { id: 'latest', label: 'Latest Collection' },
    { id: 'launched', label: 'Just Launched' },
    { id: 'trending', label: 'Trending' }
  ];

  // Get randomly selected products from different categories
  const getProducts = (tabId) => {
    const shuffled = [...allProductsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  };

  const currentProducts = getProducts(activeTab);

  return (
    <Section>
      <Container>
        <Header>
          <DecorativeLine />
          <Subtitle>Fresh from the Loom</Subtitle>
          <Title><GradientText>Discover What's New</GradientText></Title>
          <Description>Explore our latest collection of exquisite designs</Description>
          <DecorativeLine />
        </Header>

        <TabContainer>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabLabel>{tab.label}</TabLabel>
            </Tab>
          ))}
        </TabContainer>

        <ProductGrid key={activeTab}>
          {currentProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              to={`/products/${product.category}/${product.subcategory}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BadgeWrapper>
                {activeTab === 'new' && <NewBadge>NEW</NewBadge>}
                {activeTab === 'launched' && <LaunchedBadge>JUST IN</LaunchedBadge>}
                {activeTab === 'trending' && <TrendingBadge>TRENDING</TrendingBadge>}
                {activeTab === 'latest' && <LatestBadge>LATEST</LatestBadge>}
              </BadgeWrapper>
              <ImageWrapper>
                <img src={product.images[0]} alt={product.name} />
                <HoverOverlay>
                  <QuickViewButton>Quick View →</QuickViewButton>
                </HoverOverlay>
              </ImageWrapper>
              <ProductInfo>
                <CategoryTag>{product.category}</CategoryTag>
                <ProductName>{product.name}</ProductName>
                <GoldDivider>
                  <DividerDot />
                  <DividerLine />
                  <DividerDot />
                </GoldDivider>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>

        <ViewAllButton to="/products/sarees">
          Explore All Collections →
        </ViewAllButton>
      </Container>
    </Section>
  );
};

export default NewArrivals;

const Section = styled.section`
  padding: 1.5rem 0;
  background: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 30px;
    background: linear-gradient(to bottom, transparent, #d4af37, transparent);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const DecorativeLine = styled.div`
  width: 100px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
  margin: 0 auto 0.5rem;
  
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const Subtitle = styled.div`
  font-family: 'Cormorant Garamond', serif;
  color: #a47148;
  font-size: 0.85rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 2px;
  margin-bottom: 0.3rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  color: #2b2b2b;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Description = styled.p`
  font-family: 'Lora', serif;
  color: #666;
  font-size: 0.85rem;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  background: ${({ $active }) => $active ? 'linear-gradient(135deg, #a47148, #d4af37)' : 'white'};
  color: ${({ $active }) => $active ? 'white' : '#666'};
  border: 1px solid ${({ $active }) => $active ? 'transparent' : '#d4af37'};
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ $active }) => $active ? '0 2px 8px rgba(164, 113, 72, 0.3)' : 'none'};
  
  &:hover {
    background: ${({ $active }) => $active ? 'linear-gradient(135deg, #d4af37, #a47148)' : 'linear-gradient(135deg, #a47148, #d4af37)'};
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(164, 113, 72, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.7rem;
    font-size: 0.75rem;
  }
`;

const TabLabel = styled.span`
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    
    & > *:nth-child(n+5) {
      display: none;
    }
  }
`;

const ProductCard = styled(Link)`
  background: white;
  overflow: visible;
  position: relative;
  transition: all 0.3s ease;
  text-decoration: none;
  animation: slideUp 0.6s ease forwards;
  opacity: 0;
  
  @keyframes slideUp {
    to { opacity: 1; transform: translateY(0); }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: 8px;
    bottom: 8px;
    border: 1px solid #d4af37;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-8px);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  
  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
  }
`;

const Badge = styled.div`
  padding: 0.5rem 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: white;
  border-radius: 2px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 0.65rem;
    padding: 0.4rem 0.8rem;
  }
`;

const NewBadge = styled(Badge)`
  background: linear-gradient(135deg, #10b981, #059669);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const LaunchedBadge = styled(Badge)`
  background: linear-gradient(135deg, #f59e0b, #d97706);
`;

const TrendingBadge = styled(Badge)`
  background: linear-gradient(135deg, #ef4444, #dc2626);
  animation: glow 2s infinite;
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4); }
    50% { box-shadow: 0 4px 16px rgba(239, 68, 68, 0.6); }
  }
`;

const LatestBadge = styled(Badge)`
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 260px;
  overflow: hidden;
  background: #f5f2ed;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    border-top: 2px solid #d4af37;
    border-left: 2px solid #d4af37;
    z-index: 2;
    
    @media (max-width: 768px) {
      width: 25px;
      height: 25px;
      top: 8px;
      left: 8px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  ${ProductCard}:hover & img {
    transform: scale(1.08);
  }
  
  @media (max-width: 768px) {
    height: 200px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(164, 113, 72, 0.9), rgba(212, 175, 55, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  
  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const QuickViewButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.7rem 1.8rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #a47148;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.85rem;
  }
`;

const ProductInfo = styled.div`
  padding: 1.2rem 1rem;
  background: white;
  
  @media (max-width: 768px) {
    padding: 1rem 0.8rem;
  }
`;

const CategoryTag = styled.div`
  font-size: 0.75rem;
  color: #a47148;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: #2b2b2b;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.5px;
  margin-bottom: 0.8rem;
  min-height: 2.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GoldDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DividerLine = styled.div`
  width: 40px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
`;

const DividerDot = styled.div`
  width: 3px;
  height: 3px;
  background: #d4af37;
  border-radius: 50%;
`;

const ViewAllButton = styled(Link)`
  display: block;
  width: fit-content;
  margin: 1.5rem auto 0;
  padding: 0.6rem 1.8rem;
  background: transparent;
  color: #a47148;
  text-decoration: none;
  border: 2px solid #d4af37;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #a47148, #d4af37);
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(164, 113, 72, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1.3rem;
    font-size: 0.85rem;
    margin: 1rem auto 0;
  }
`;
