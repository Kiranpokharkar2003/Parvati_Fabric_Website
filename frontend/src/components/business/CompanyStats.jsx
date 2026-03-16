import React from 'react';
import styled, { keyframes } from 'styled-components';
import { respond } from '../../styles/mixins';
import Container from '../common/Container';

const countUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const goldShimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const stats = [
  {
    number: "40+",
    label: "Years in Business",
    desc: "Since 1984"
  },
  {
    number: "50,000+",
    label: "Happy Customers",
    desc: "Across India"
  },
  {
    number: "500+",
    label: "Unique Designs",
    desc: "Every season"
  },
  {
    number: "25+",
    label: "States Covered",
    desc: "Pan-India delivery"
  }
];

const CompanyStats = () => {
  return (
    <Section>
      <Container>
        <Header>
          <SubHeading>OUR ACHIEVEMENTS</SubHeading>
          <Heading>Trusted by Thousands</Heading>
          <AccentLine />
        </Header>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
              <StatDesc>{stat.desc}</StatDesc>
            </StatCard>
          ))}
        </StatsGrid>

        <Testimonial>
          <TestimonialText>
            "Parvati Fabrics has been our trusted partner for premium textiles. 
            Their commitment to quality and customer satisfaction is unmatched."
          </TestimonialText>
          <TestimonialAuthor>- Leading Fashion Retailer</TestimonialAuthor>
        </Testimonial>
      </Container>
    </Section>
  );
};

export default CompanyStats;

const Section = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom, #fdf8f3, #fff);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SubHeading = styled.div`
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: #a47148;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(164, 113, 72, 0.3), transparent);
    animation: ${goldShimmer} 3s infinite;
  }
`;

const Heading = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.7rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #a47148;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AccentLine = styled.div`
  width: 70px;
  height: 2px;
  background: linear-gradient(90deg, #a47148, #d4af37, #a47148);
  margin: 0 auto;
  transition: all 0.4s ease;
  
  ${Header}:hover & {
    width: 120px;
    background: linear-gradient(90deg, #d4af37, #a47148, #d4af37);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(164, 113, 72, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(164, 113, 72, 0.05), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(164, 113, 72, 0.15);
    
    &::before {
      left: 100%;
    }
  }
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 700;
  color: #a47148;
  margin-bottom: 0.5rem;
  animation: ${countUp} 0.6s ease forwards;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
`;

const StatDesc = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #666;
`;

const Testimonial = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  border-left: 4px solid #a47148;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const TestimonialText = styled.p`
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  font-style: italic;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #a47148;
`;