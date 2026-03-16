import React from "react";
import styled from "styled-components";
import Container from "../common/Container";
import { FiAward, FiShield, FiTruck, FiUsers } from "react-icons/fi";
import GradientText from "../common/GradientText";

const features = [
  {
    icon: <FiAward />,
    title: "Premium Quality",
    desc: "Crafted with the finest fabrics and unmatched attention to detail.",
  },
  {
    icon: <FiShield />,
    title: "Trusted Process",
    desc: "Transparent practices and commitment to customer satisfaction.",
  },
  {
    icon: <FiTruck />,
    title: "Global Reach",
    desc: "Delivering elegance to customers across 50+ countries worldwide.",
  },
  {
    icon: <FiUsers />,
    title: "Expert Team",
    desc: "10K+ happy clients served by experienced textile specialists.",
  },
];

const WhyChooseUs = () => {
  return (
    <Section>
      <Container>
        <HeaderWrapper>
          <DecorativeLine />
          <Subtitle>Excellence Defined</Subtitle>
          <MainTitle><GradientText>Why Choose Us</GradientText></MainTitle>
          <Description>Commitment to quality, tradition, and customer satisfaction</Description>
          <DecorativeLine />
        </HeaderWrapper>

        <Grid>
          {features.map((item, i) => (
            <Card key={i}>
              <IconWrap>{item.icon}</IconWrap>
              <CardTitle>{item.title}</CardTitle>
              <CardDesc>{item.desc}</CardDesc>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;

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
  margin-bottom: 1.5rem;
  position: relative;
  
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  @media (max-width: 400px) {
    gap: 0.6rem;
  }
`;

const Card = styled.div`
  background: white;
  padding: 1.8rem 1.5rem;
  border-radius: 0;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #f5f2ed;
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: 6px;
    bottom: 6px;
    border: 1px solid #d4af37;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(164, 113, 72, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem 0.8rem;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  @media (max-width: 400px) {
    padding: 1rem 0.6rem;
  }
`;

const IconWrap = styled.div`
  font-size: 2.2rem;
  color: #a47148;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    color: #d4af37;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 400px) {
    font-size: 1.4rem;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: #2b2b2b;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: #a47148;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }
  
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const CardDesc = styled.p`
  font-family: 'Lora', serif;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  font-style: italic;
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    color: #555;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.4;
  }
  
  @media (max-width: 400px) {
    font-size: 0.75rem;
  }
`;
