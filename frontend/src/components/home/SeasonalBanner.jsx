import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SeasonalBanner = () => {
  const navigate = useNavigate();

  const handleSeasonalClick = () => {
    navigate('/products/seasonal/diwali');
  };

  return (
    <Section>
      <Container>
        <HeaderWrapper>
          <DecorativeLine />
          <Subtitle>Festive Exclusive</Subtitle>
          <MainTitle>Diwali Special Collection</MainTitle>
          <Description>Handcrafted elegance for the festival of lights</Description>
          <DecorativeLine />
        </HeaderWrapper>

        <BannerContent>
          <ContentSide>
            <FeaturesList>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <FeatureText>
                  <FeatureLabel>Premium Fabric</FeatureLabel>
                  <FeatureValue>Banarasi Silk</FeatureValue>
                </FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <FeatureText>
                  <FeatureLabel>Craftsmanship</FeatureLabel>
                  <FeatureValue>24K Gold Zari</FeatureValue>
                </FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <FeatureText>
                  <FeatureLabel>Minimum Order</FeatureLabel>
                  <FeatureValue>10 Pieces Set</FeatureValue>
                </FeatureText>
              </FeatureItem>
            </FeaturesList>
            <CTAButton onClick={handleSeasonalClick}>
              <ButtonText>Explore Collection</ButtonText>
              <ButtonIcon>→</ButtonIcon>
            </CTAButton>
          </ContentSide>

          <ImageSide>
            <ImageWrapper>
              <CornerDecor />
              <BannerImage src="/images/banners/festive_collections.png" alt="Diwali Collection" />
              <GoldBorder />
            </ImageWrapper>
          </ImageSide>
        </BannerContent>
      </Container>
    </Section>
  );
};

export default SeasonalBanner;

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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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

const BannerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContentSide = styled.div`
  @media (max-width: 900px) {
    order: 2;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #f5f2ed;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(164, 113, 72, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    gap: 0.8rem;
  }
`;

const FeatureIcon = styled.div`
  color: #d4af37;
  font-size: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureLabel = styled.div`
  font-size: 0.7rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.2rem;
  
  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

const FeatureValue = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: #2b2b2b;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  border: none;
  padding: 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #8b5d3c, #a47148);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(164, 113, 72, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.85rem;
    font-size: 1rem;
  }
`;

const ButtonText = styled.span``;

const ButtonIcon = styled.span`
  transition: transform 0.3s ease;
  
  ${CTAButton}:hover & {
    transform: translateX(5px);
  }
`;

const ImageSide = styled.div`
  @media (max-width: 900px) {
    order: 1;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  background: #f5f2ed;
  
  @media (max-width: 900px) {
    height: 350px;
  }
  
  @media (max-width: 600px) {
    height: 300px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
`;

const CornerDecor = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  border-top: 2px solid #d4af37;
  border-left: 2px solid #d4af37;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    top: 10px;
    left: 10px;
  }
`;

const GoldBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  
  ${ImageWrapper}:hover & {
    transform: scale(1.05);
  }
`;