import React, { useState } from 'react';
import styled from 'styled-components';
import { PremiumHeading, PremiumSubheading, PremiumText, LuxuryCard, GoldAccent } from './PremiumTypography';
import { SmoothFadeIn, HoverLift, FloatingElement } from './SmoothAnimations';

const sustainabilityPractices = [
  {
    id: 1,
    title: "Organic Cotton Sourcing",
    description: "100% certified organic cotton from sustainable farms",
    impact: "Reduces water usage by 91% compared to conventional cotton",
    icon: "🌱",
    stats: { percentage: 100, metric: "Organic Materials" },
    details: "We partner with certified organic cotton farmers who use natural farming methods without harmful pesticides or synthetic fertilizers."
  },
  {
    id: 2,
    title: "Natural Dye Process",
    description: "Traditional plant-based and mineral dyes",
    impact: "Zero chemical discharge into water bodies",
    icon: "🎨",
    stats: { percentage: 85, metric: "Natural Dyes" },
    details: "Our artisans use time-tested natural dyeing techniques with turmeric, indigo, madder root, and other botanical sources."
  },
  {
    id: 3,
    title: "Zero Waste Production",
    description: "Every fabric scrap is repurposed or recycled",
    impact: "Diverts 2.5 tons of textile waste from landfills annually",
    icon: "♻️",
    stats: { percentage: 95, metric: "Waste Reduction" },
    details: "Fabric scraps become accessories, smaller garments, or are composted as organic matter for our partner farms."
  },
  {
    id: 4,
    title: "Solar Powered Facilities",
    description: "Renewable energy for all production processes",
    impact: "Reduces carbon footprint by 70%",
    icon: "☀️",
    stats: { percentage: 70, metric: "Renewable Energy" },
    details: "Our weaving centers and processing facilities run on solar power, with battery storage for consistent operations."
  },
  {
    id: 5,
    title: "Water Conservation",
    description: "Rainwater harvesting and recycling systems",
    impact: "Saves 50,000 liters of water monthly",
    icon: "💧",
    stats: { percentage: 60, metric: "Water Saved" },
    details: "Advanced water treatment systems allow us to reuse water multiple times in our dyeing and finishing processes."
  },
  {
    id: 6,
    title: "Fair Trade Practices",
    description: "Ethical wages and working conditions for all artisans",
    impact: "Supports 200+ artisan families directly",
    icon: "🤝",
    stats: { percentage: 100, metric: "Fair Wages" },
    details: "We ensure all our partner artisans receive fair compensation, healthcare benefits, and skill development opportunities."
  }
];

const SustainabilityStory = () => {
  const [selectedPractice, setSelectedPractice] = useState(sustainabilityPractices[0]);

  return (
    <Container>
      <SmoothFadeIn>
        <PremiumHeading>Our Sustainability Journey</PremiumHeading>
        <PremiumText>
          Weaving tradition with <GoldAccent>environmental responsibility</GoldAccent> for a sustainable future
        </PremiumText>
      </SmoothFadeIn>

      <ContentGrid>
        <PracticesGrid>
          {sustainabilityPractices.map((practice, index) => (
            <SmoothFadeIn key={practice.id} $delay={`${index * 0.1}s`}>
              <HoverLift>
                <PracticeCard
                  $active={selectedPractice.id === practice.id}
                  onClick={() => setSelectedPractice(practice)}
                >
                  <FloatingElement $delay={`${index * 0.5}s`}>
                    <PracticeIcon>{practice.icon}</PracticeIcon>
                  </FloatingElement>
                  
                  <PracticeContent>
                    <PracticeTitle>{practice.title}</PracticeTitle>
                    <PracticeDescription>{practice.description}</PracticeDescription>
                    
                    <StatBar>
                      <StatFill $percentage={practice.stats.percentage} />
                      <StatText>{practice.stats.percentage}% {practice.stats.metric}</StatText>
                    </StatBar>
                  </PracticeContent>
                </PracticeCard>
              </HoverLift>
            </SmoothFadeIn>
          ))}
        </PracticesGrid>

        <DetailSection>
          <LuxuryCard>
            <DetailHeader>
              <DetailIcon>{selectedPractice.icon}</DetailIcon>
              <DetailTitle>{selectedPractice.title}</DetailTitle>
            </DetailHeader>

            <DetailDescription>{selectedPractice.description}</DetailDescription>
            
            <ImpactSection>
              <ImpactLabel>Environmental Impact</ImpactLabel>
              <ImpactValue>{selectedPractice.impact}</ImpactValue>
            </ImpactSection>

            <DetailText>{selectedPractice.details}</DetailText>

            <StatDisplay>
              <StatCircle>
                <StatNumber>{selectedPractice.stats.percentage}%</StatNumber>
                <StatLabel>{selectedPractice.stats.metric}</StatLabel>
              </StatCircle>
            </StatDisplay>
          </LuxuryCard>

          <SustainabilityMetrics>
            <LuxuryCard>
              <MetricsTitle>Our Impact in Numbers</MetricsTitle>
              <MetricsGrid>
                <MetricItem>
                  <MetricNumber>2.5T</MetricNumber>
                  <MetricLabel>Waste Diverted</MetricLabel>
                </MetricItem>
                <MetricItem>
                  <MetricNumber>50K</MetricNumber>
                  <MetricLabel>Liters Water Saved</MetricLabel>
                </MetricItem>
                <MetricItem>
                  <MetricNumber>200+</MetricNumber>
                  <MetricLabel>Artisan Families</MetricLabel>
                </MetricItem>
                <MetricItem>
                  <MetricNumber>70%</MetricNumber>
                  <MetricLabel>Carbon Reduction</MetricLabel>
                </MetricItem>
              </MetricsGrid>
            </LuxuryCard>
          </SustainabilityMetrics>
        </DetailSection>
      </ContentGrid>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #fefefe, #f9f9f9);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const PracticesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PracticeCard = styled.div`
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  border: 2px solid ${props => props.$active ? '#D4AF37' : 'transparent'};
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$active 
    ? '0 15px 30px rgba(212, 175, 55, 0.2)' 
    : '0 5px 15px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const PracticeIcon = styled.div`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const PracticeContent = styled.div``;

const PracticeTitle = styled.h4`
  font-family: var(--font-secondary);
  color: #8B4513;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  text-align: center;
`;

const PracticeDescription = styled.p`
  font-family: var(--font-body);
  color: #666;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const StatBar = styled.div`
  position: relative;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const StatFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #D4AF37, #FFD700);
  width: ${props => props.$percentage}%;
  border-radius: 4px;
  transition: width 1s ease-out;
`;

const StatText = styled.div`
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: #B8860B;
  text-align: center;
  font-weight: 600;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailIcon = styled.div`
  font-size: 3rem;
`;

const DetailTitle = styled.h2`
  font-family: var(--font-primary);
  color: #8B4513;
  margin: 0;
  font-size: 1.8rem;
`;

const DetailDescription = styled.p`
  font-family: var(--font-body);
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ImpactSection = styled.div`
  background: rgba(212, 175, 55, 0.1);
  border-left: 4px solid #D4AF37;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const ImpactLabel = styled.div`
  font-family: var(--font-secondary);
  color: #8B4513;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ImpactValue = styled.div`
  font-family: var(--font-body);
  color: #B8860B;
  font-size: 1.1rem;
  font-weight: 500;
`;

const DetailText = styled.p`
  font-family: var(--font-body);
  color: #555;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const StatDisplay = styled.div`
  display: flex;
  justify-content: center;
`;

const StatCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4AF37, #FFD700);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StatNumber = styled.div`
  font-family: var(--font-primary);
  font-size: 2rem;
  font-weight: 600;
`;

const StatLabel = styled.div`
  font-family: var(--font-body);
  font-size: 0.9rem;
  text-align: center;
`;

const SustainabilityMetrics = styled.div``;

const MetricsTitle = styled.h3`
  font-family: var(--font-secondary);
  color: #8B4513;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const MetricItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 12px;
`;

const MetricNumber = styled.div`
  font-family: var(--font-primary);
  font-size: 1.8rem;
  font-weight: 600;
  color: #B8860B;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  font-family: var(--font-body);
  color: #666;
  font-size: 0.9rem;
`;

export default SustainabilityStory;