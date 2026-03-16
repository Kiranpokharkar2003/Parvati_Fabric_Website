import React from 'react';
import styled from 'styled-components';
import { respond } from '../../styles/mixins';
import Container from '../common/Container';
import { FiShield, FiTruck, FiAward, FiLock } from 'react-icons/fi';

const trustBadges = [
  {
    icon: <FiShield />,
    title: "SSL Secured",
    desc: "256-bit encryption"
  },
  {
    icon: <FiTruck />,
    title: "Free Shipping",
    desc: "Orders above ₹2000"
  },
  {
    icon: <FiAward />,
    title: "Quality Assured",
    desc: "Premium fabrics only"
  },
  {
    icon: <FiLock />,
    title: "Secure Payment",
    desc: "Multiple payment options"
  }
];

const TrustBadges = () => {
  return (
    <Section>
      <Container>
        <BadgesGrid>
          {trustBadges.map((badge, index) => (
            <Badge key={index}>
              <IconWrapper>{badge.icon}</IconWrapper>
              <BadgeContent>
                <BadgeTitle>{badge.title}</BadgeTitle>
                <BadgeDesc>{badge.desc}</BadgeDesc>
              </BadgeContent>
            </Badge>
          ))}
        </BadgesGrid>
      </Container>
    </Section>
  );
};

export default TrustBadges;

const Section = styled.section`
  padding: 3rem 0;
  background: #fff;
  border-top: 1px solid rgba(164, 113, 72, 0.1);
  border-bottom: 1px solid rgba(164, 113, 72, 0.1);
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #fdf8f3;
  border-radius: 12px;
  border: 1px solid rgba(164, 113, 72, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(164, 113, 72, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #a47148, #d4af37);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const BadgeContent = styled.div``;

const BadgeTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 0.2rem;
`;

const BadgeDesc = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #666;
`;