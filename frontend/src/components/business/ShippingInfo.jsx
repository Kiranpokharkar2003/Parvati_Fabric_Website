import React from 'react';
import styled from 'styled-components';
import { respond } from '../../styles/mixins';
import Container from '../common/Container';
import { FiTruck, FiClock, FiMapPin, FiPackage } from 'react-icons/fi';

const shippingFeatures = [
  {
    icon: <FiTruck />,
    title: "Free Shipping",
    desc: "On orders above ₹2,000",
    highlight: "Save ₹200+"
  },
  {
    icon: <FiClock />,
    title: "Express Delivery",
    desc: "2-3 business days",
    highlight: "Major cities"
  },
  {
    icon: <FiMapPin />,
    title: "Pan-India Coverage",
    desc: "25+ states covered",
    highlight: "Remote areas too"
  },
  {
    icon: <FiPackage />,
    title: "Secure Packaging",
    desc: "Premium gift wrapping",
    highlight: "Festival ready"
  }
];

const deliveryZones = [
  { zone: "Metro Cities", time: "1-2 days", cities: "Mumbai, Delhi, Bangalore, Chennai" },
  { zone: "Tier 1 Cities", time: "2-3 days", cities: "Pune, Hyderabad, Kolkata, Ahmedabad" },
  { zone: "Tier 2 Cities", time: "3-4 days", cities: "Surat, Indore, Jaipur, Lucknow" },
  { zone: "Remote Areas", time: "4-7 days", cities: "Hill stations, Rural areas" }
];

const ShippingInfo = () => {
  return (
    <Section>
      <Container>
        <HeaderWrapper>
          <DecorativeLine />
          <Subtitle>Nationwide Service</Subtitle>
          <MainTitle>Delivery Information</MainTitle>
          
          <Description>Fast, secure, and reliable shipping across India</Description>
          <DecorativeLine />
        </HeaderWrapper>

        <FeaturesGrid>
          {shippingFeatures.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDesc>{feature.desc}</FeatureDesc>
                <FeatureHighlight>{feature.highlight}</FeatureHighlight>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </Section>
  );
};

export default ShippingInfo;

const Section = styled.section`
  padding: 1.5rem 0;
  background: radial-gradient(circle at top, #faf8f5, #f5f2ed);
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

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const DecorativeLine = styled.div`
  width: 100px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
  margin: 0 auto 0.5rem;
  
  @media (max-width: 768px) {
    width: 80px;
    margin: 0 auto 0.4rem;
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
    letter-spacing: 1.5px;
  }
`;

const MainTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  color: #2b2b2b;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
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
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  
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
  
  &:hover {
    transform: translateY(-8px);
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #a47148, #d4af37);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  margin: 0 auto 0.8rem;
  transition: transform 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
    margin: 0 auto 0.6rem;
  }
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: #2b2b2b;
  margin-bottom: 0.4rem;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }
`;

const FeatureDesc = styled.p`
  font-family: 'Lora', serif;
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
  }
`;

const FeatureHighlight = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.75rem;
  color: #a47148;
  font-weight: 600;
  background: rgba(164, 113, 72, 0.1);
  padding: 0.25rem 0.7rem;
  display: inline-block;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
`;

const DeliveryZones = styled.div`
  margin-bottom: 3rem;
`;

const ZoneTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;
  margin-bottom: 2rem;
`;

const ZonesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ZoneCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #a47148;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const ZoneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const ZoneName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #2b2b2b;
`;

const ZoneTime = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #a47148;
  font-weight: 600;
  background: rgba(164, 113, 72, 0.1);
  padding: 0.2rem 0.8rem;
  border-radius: 12px;
`;

const ZoneCities = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

const ShippingNote = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(164, 113, 72, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const NoteIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
`;

const NoteText = styled.p`
  font-family: 'Lora', serif;
  color: #555;
  line-height: 1.6;
  margin: 0;
`;