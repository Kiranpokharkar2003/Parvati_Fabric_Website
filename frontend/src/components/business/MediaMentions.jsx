import React from 'react';
import styled from 'styled-components';
import { respond } from '../../styles/mixins';
import Container from '../common/Container';

const mentions = [
  {
    logo: "/images/media/economic-times.png",
    publication: "Economic Times",
    headline: "Leading Textile Manufacturer",
    year: "2023"
  },
  {
    logo: "/images/media/business-standard.png", 
    publication: "Business Standard",
    headline: "Quality Excellence Award",
    year: "2023"
  },
  {
    logo: "/images/media/textile-today.png",
    publication: "Textile Today",
    headline: "Innovation in Traditional Wear",
    year: "2022"
  },
  {
    logo: "/images/media/fashion-week.png",
    publication: "Fashion Week",
    headline: "Best Fabric Supplier",
    year: "2022"
  }
];

const MediaMentions = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>Featured In</Title>
          <Subtitle>Recognized by leading publications</Subtitle>
        </Header>

        <MentionsGrid>
          {mentions.map((mention, index) => (
            <MentionCard key={index}>
              <LogoWrapper>
                <Logo src={mention.logo} alt={mention.publication} />
              </LogoWrapper>
              <MentionContent>
                <Publication>{mention.publication}</Publication>
                <Headline>"{mention.headline}"</Headline>
                <Year>{mention.year}</Year>
              </MentionContent>
            </MentionCard>
          ))}
        </MentionsGrid>

        <Awards>
          <AwardItem>
            <AwardIcon>🏆</AwardIcon>
            <AwardText>Best Textile Manufacturer 2023</AwardText>
          </AwardItem>
          <AwardItem>
            <AwardIcon>⭐</AwardIcon>
            <AwardText>Quality Excellence Award</AwardText>
          </AwardItem>
          <AwardItem>
            <AwardIcon>🎖️</AwardIcon>
            <AwardText>Customer Choice Award</AwardText>
          </AwardItem>
        </Awards>
      </Container>
    </Section>
  );
};

export default MediaMentions;

const Section = styled.section`
  padding: 6rem 0;
  background: #fff;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-family: 'Lora', serif;
  color: #666;
  font-size: 1rem;
`;

const MentionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MentionCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: #fdf8f3;
  border-radius: 12px;
  border: 1px solid rgba(164, 113, 72, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(164, 113, 72, 0.1);
  }
`;

const LogoWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.img`
  max-width: 60px;
  max-height: 60px;
  object-fit: contain;
`;

const MentionContent = styled.div`
  flex: 1;
`;

const Publication = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #a47148;
  margin-bottom: 0.5rem;
`;

const Headline = styled.div`
  font-family: 'Lora', serif;
  font-size: 1rem;
  color: #2b2b2b;
  margin-bottom: 0.3rem;
  font-style: italic;
`;

const Year = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #999;
`;

const Awards = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
`;

const AwardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(164, 113, 72, 0.3);
  }
`;

const AwardIcon = styled.span`
  font-size: 1.2rem;
`;

const AwardText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
`;