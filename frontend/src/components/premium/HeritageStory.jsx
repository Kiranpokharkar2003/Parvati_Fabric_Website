import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PremiumHeading, PremiumSubheading, PremiumText, LuxuryCard } from './PremiumTypography';

const heritageStory = [
  {
    year: 1985,
    title: "The Beginning",
    description: "Founded with a vision to preserve traditional Indian textile craftsmanship",
    icon: "🌱",
    details: "Started as a small family business in the heart of textile district"
  },
  {
    year: 1995,
    title: "Artisan Network",
    description: "Built partnerships with master weavers across India",
    icon: "🤝",
    details: "Established direct relationships with 50+ skilled artisans"
  },
  {
    year: 2005,
    title: "Quality Recognition",
    description: "Received national awards for textile excellence",
    icon: "🏆",
    details: "Recognized by Ministry of Textiles for preserving traditional techniques"
  },
  {
    year: 2015,
    title: "Digital Transformation",
    description: "Embraced technology while maintaining traditional values",
    icon: "💻",
    details: "Launched online platform to reach global customers"
  },
  {
    year: 2024,
    title: "Sustainable Future",
    description: "Leading eco-friendly practices in textile industry",
    icon: "🌿",
    details: "100% sustainable sourcing and zero-waste production"
  }
];

const HeritageStory = () => {
  const [activeYear, setActiveYear] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveYear(prev => (prev + 1) % heritageStory.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <PremiumHeading>Our Heritage Story</PremiumHeading>
      <PremiumText>
        Four decades of preserving India's textile heritage while embracing innovation
      </PremiumText>

      <TimelineContainer>
        <TimelineLine />
        
        {heritageStory.map((story, index) => (
          <TimelineItem
            key={story.year}
            $active={activeYear === index}
            $visible={isVisible}
            $delay={index * 0.2}
            onClick={() => setActiveYear(index)}
          >
            <TimelineYear $active={activeYear === index}>
              {story.year}
            </TimelineYear>
            
            <TimelineContent $active={activeYear === index}>
              <StoryIcon>{story.icon}</StoryIcon>
              <StoryTitle>{story.title}</StoryTitle>
              <StoryDescription>{story.description}</StoryDescription>
              
              {activeYear === index && (
                <StoryDetails>
                  {story.details}
                </StoryDetails>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>

      <StoryHighlight>
        <LuxuryCard>
          <HighlightContent>
            <HighlightIcon>{heritageStory[activeYear].icon}</HighlightIcon>
            <HighlightYear>{heritageStory[activeYear].year}</HighlightYear>
            <HighlightTitle>{heritageStory[activeYear].title}</HighlightTitle>
            <HighlightDescription>{heritageStory[activeYear].description}</HighlightDescription>
            <HighlightDetails>{heritageStory[activeYear].details}</HighlightDetails>
          </HighlightContent>
        </LuxuryCard>
      </StoryHighlight>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #fefefe, #f9f9f9);
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 3rem auto;
  
  @media (max-width: 768px) {
    margin: 2rem auto;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #D4AF37, #FFD700, #B8860B);
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    left: 30px;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  cursor: pointer;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? 0 : 50}px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.$delay}s;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: 768px) {
      flex-direction: row;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const TimelineYear = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #D4AF37, #FFD700)' 
    : 'white'};
  border: 3px solid #D4AF37;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 1rem;
  color: ${props => props.$active ? 'white' : '#B8860B'};
  z-index: 2;
  position: relative;
  transition: all 0.4s ease;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 0.9rem;
  }
`;

const TimelineContent = styled.div`
  flex: 1;
  padding: 2rem;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 16px;
  margin: 0 2rem;
  box-shadow: ${props => props.$active 
    ? '0 10px 30px rgba(0, 0, 0, 0.15)' 
    : '0 5px 15px rgba(0, 0, 0, 0.1)'};
  transition: all 0.4s ease;
  border: ${props => props.$active ? '2px solid #D4AF37' : '1px solid #eee'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    margin: 0 0 0 1rem;
    padding: 1.5rem;
  }
`;

const StoryIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StoryTitle = styled.h3`
  font-family: var(--font-secondary);
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const StoryDescription = styled.p`
  font-family: var(--font-body);
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const StoryDetails = styled.div`
  font-family: var(--font-body);
  color: #B8860B;
  font-style: italic;
  font-size: 0.9rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const StoryHighlight = styled.div`
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const HighlightContent = styled.div`
  text-align: center;
  padding: 2rem;
`;

const HighlightIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const HighlightYear = styled.div`
  font-family: var(--font-primary);
  font-size: 2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #D4AF37, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const HighlightTitle = styled.h3`
  font-family: var(--font-secondary);
  color: #8B4513;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const HighlightDescription = styled.p`
  font-family: var(--font-body);
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const HighlightDetails = styled.div`
  font-family: var(--font-body);
  color: #B8860B;
  font-style: italic;
  font-size: 1rem;
`;

export default HeritageStory;