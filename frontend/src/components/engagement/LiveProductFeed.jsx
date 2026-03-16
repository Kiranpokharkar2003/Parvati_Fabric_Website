import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { respond } from '../../styles/mixins';
import Container from '../common/Container';
import { FiTrendingUp, FiEye, FiShoppingBag } from 'react-icons/fi';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const liveUpdates = [
  { id: 1, action: "purchased", product: "Banarasi Silk Saree", customer: "Priya from Mumbai", time: "2 min ago" },
  { id: 2, action: "viewed", product: "Designer Lehenga", customer: "Anita from Delhi", time: "5 min ago" },
  { id: 3, action: "added to cart", product: "Cotton Saree Set", customer: "Meera from Bangalore", time: "8 min ago" },
  { id: 4, action: "purchased", product: "Wedding Collection", customer: "Kavya from Chennai", time: "12 min ago" },
  { id: 5, action: "viewed", product: "Festive Saree", customer: "Riya from Pune", time: "15 min ago" }
];

const LiveProductFeed = () => {
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentUpdate((prev) => (prev + 1) % liveUpdates.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (action) => {
    switch (action) {
      case 'purchased': return <FiShoppingBag />;
      case 'viewed': return <FiEye />;
      case 'added to cart': return <FiTrendingUp />;
      default: return <FiEye />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'purchased': return '#25d366';
      case 'viewed': return '#3b82f6';
      case 'added to cart': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <Section>
      <Container>
        <Header>
          <Title>🔥 Live Activity</Title>
          <Subtitle>See what others are buying right now</Subtitle>
        </Header>

        <FeedContainer>
          <LiveUpdate $visible={isVisible} $color={getActionColor(liveUpdates[currentUpdate].action)}>
            <UpdateIcon $color={getActionColor(liveUpdates[currentUpdate].action)}>
              {getIcon(liveUpdates[currentUpdate].action)}
            </UpdateIcon>
            <UpdateContent>
              <UpdateText>
                <Customer>{liveUpdates[currentUpdate].customer}</Customer>
                <Action>{liveUpdates[currentUpdate].action}</Action>
                <Product>{liveUpdates[currentUpdate].product}</Product>
              </UpdateText>
              <UpdateTime>{liveUpdates[currentUpdate].time}</UpdateTime>
            </UpdateContent>
            <LiveIndicator />
          </LiveUpdate>
        </FeedContainer>

        <Stats>
          <StatItem>
            <StatNumber>127</StatNumber>
            <StatLabel>People viewing now</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>23</StatNumber>
            <StatLabel>Orders today</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>8</StatNumber>
            <StatLabel>Items left in stock</StatLabel>
          </StatItem>
        </Stats>
      </Container>
    </Section>
  );
};

export default LiveProductFeed;

const Section = styled.section`
  padding: 4rem 0;
  background: #fff;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-family: 'Lora', serif;
  color: #666;
  font-size: 1rem;
`;

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const LiveUpdate = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border-left: 4px solid ${({ $color }) => $color};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transform: ${({ $visible }) => $visible ? 'translateX(0)' : 'translateX(-20px)'};
  transition: all 0.3s ease;
  animation: ${({ $visible }) => $visible ? slideIn : 'none'} 0.3s ease;
`;

const UpdateIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ $color }) => $color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const UpdateContent = styled.div`
  flex: 1;
`;

const UpdateText = styled.div`
  margin-bottom: 0.3rem;
`;

const Customer = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #2b2b2b;
  margin-right: 0.5rem;
`;

const Action = styled.span`
  font-family: 'Inter', sans-serif;
  color: #666;
  margin-right: 0.5rem;
`;

const Product = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #a47148;
`;

const UpdateTime = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #999;
`;

const LiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #ff4757;
  border-radius: 50%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    width: 16px;
    height: 16px;
    background: #ff4757;
    border-radius: 50%;
    opacity: 0.3;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.2); opacity: 0.1; }
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  padding: 1rem;
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #a47148;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #666;
`;