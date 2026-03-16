import React, { useState } from 'react';
import styled from 'styled-components';
import { PremiumSubheading, PremiumText, LuxuryCard, GoldAccent } from './PremiumTypography';

const artisans = [
  {
    id: 1,
    name: "Rajesh Kumar",
    specialty: "Banarasi Silk Weaving",
    experience: "35 years",
    location: "Varanasi, Uttar Pradesh",
    story: "Master weaver who learned the art from his grandfather. Specializes in intricate brocade work with gold and silver threads.",
    achievement: "National Award for Excellence in Handloom",
    image: "/images/artisans/rajesh-kumar.jpg",
    signature: "Intricate paisley motifs with metallic threads",
    techniques: ["Jacquard weaving", "Brocade work", "Gold thread embellishment"]
  },
  {
    id: 2,
    name: "Meera Devi",
    specialty: "Chanderi Weaving",
    experience: "28 years",
    location: "Chanderi, Madhya Pradesh",
    story: "Third-generation weaver known for her delicate touch in creating lightweight, translucent fabrics with traditional motifs.",
    achievement: "UNESCO Recognition for Cultural Heritage",
    image: "/images/artisans/meera-devi.jpg",
    signature: "Delicate coin motifs and sheer textures",
    techniques: ["Traditional handloom", "Coin motif weaving", "Silk-cotton blending"]
  },
  {
    id: 3,
    name: "Arjun Patel",
    specialty: "Bandhani Tie-Dye",
    experience: "22 years",
    location: "Bhuj, Gujarat",
    story: "Expert in the ancient art of Bandhani, creating thousands of tiny dots by hand to form beautiful patterns.",
    achievement: "Geographical Indication (GI) Tag Holder",
    image: "/images/artisans/arjun-patel.jpg",
    signature: "Vibrant colors with precise dot patterns",
    techniques: ["Traditional tie-dye", "Natural color extraction", "Pattern design"]
  },
  {
    id: 4,
    name: "Lakshmi Amma",
    specialty: "Kanjivaram Silk",
    experience: "40 years",
    location: "Kanchipuram, Tamil Nadu",
    story: "Renowned for her temple border designs and contrasting color combinations that define authentic Kanjivaram sarees.",
    achievement: "Padma Shri Nominee for Textile Arts",
    image: "/images/artisans/lakshmi-amma.jpg",
    signature: "Temple motifs with contrasting borders",
    techniques: ["Three-shuttle weaving", "Temple design creation", "Pure silk processing"]
  }
];

const ArtisanProfiles = () => {
  const [selectedArtisan, setSelectedArtisan] = useState(artisans[0]);

  return (
    <Container>
      <Header>
        <PremiumSubheading>Meet Our Master Artisans</PremiumSubheading>
        <PremiumText>
          The skilled hands and creative minds behind every <GoldAccent>exquisite saree</GoldAccent>
        </PremiumText>
      </Header>

      <ProfilesContainer>
        <ArtisanGrid>
          {artisans.map(artisan => (
            <ArtisanCard
              key={artisan.id}
              $active={selectedArtisan.id === artisan.id}
              onClick={() => setSelectedArtisan(artisan)}
            >
              <ArtisanImage>
                <img src={artisan.image} alt={artisan.name} />
                <ExperienceBadge>{artisan.experience}</ExperienceBadge>
              </ArtisanImage>
              
              <ArtisanInfo>
                <ArtisanName>{artisan.name}</ArtisanName>
                <ArtisanSpecialty>{artisan.specialty}</ArtisanSpecialty>
                <ArtisanLocation>📍 {artisan.location}</ArtisanLocation>
              </ArtisanInfo>
            </ArtisanCard>
          ))}
        </ArtisanGrid>

        <ArtisanDetails>
          <LuxuryCard>
            <DetailHeader>
              <DetailImage>
                <img src={selectedArtisan.image} alt={selectedArtisan.name} />
              </DetailImage>
              
              <DetailInfo>
                <DetailName>{selectedArtisan.name}</DetailName>
                <DetailSpecialty>{selectedArtisan.specialty}</DetailSpecialty>
                <DetailMeta>
                  <MetaItem>
                    <MetaLabel>Experience:</MetaLabel>
                    <MetaValue>{selectedArtisan.experience}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>Location:</MetaLabel>
                    <MetaValue>{selectedArtisan.location}</MetaValue>
                  </MetaItem>
                </DetailMeta>
              </DetailInfo>
            </DetailHeader>

            <DetailContent>
              <StorySection>
                <SectionTitle>Artisan's Story</SectionTitle>
                <StoryText>{selectedArtisan.story}</StoryText>
              </StorySection>

              <AchievementSection>
                <SectionTitle>Recognition</SectionTitle>
                <Achievement>🏆 {selectedArtisan.achievement}</Achievement>
              </AchievementSection>

              <SignatureSection>
                <SectionTitle>Signature Style</SectionTitle>
                <SignatureText>{selectedArtisan.signature}</SignatureText>
              </SignatureSection>

              <TechniquesSection>
                <SectionTitle>Specialized Techniques</SectionTitle>
                <TechniquesList>
                  {selectedArtisan.techniques.map((technique, index) => (
                    <TechniqueItem key={index}>
                      <TechniqueIcon>✨</TechniqueIcon>
                      {technique}
                    </TechniqueItem>
                  ))}
                </TechniquesList>
              </TechniquesSection>
            </DetailContent>
          </LuxuryCard>
        </ArtisanDetails>
      </ProfilesContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ProfilesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ArtisanGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ArtisanCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$active ? '#D4AF37' : 'transparent'};
  background: ${props => props.$active ? 'rgba(212, 175, 55, 0.1)' : 'white'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ArtisanImage = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #D4AF37;
  }
`;

const ExperienceBadge = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: linear-gradient(135deg, #D4AF37, #FFD700);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
`;

const ArtisanInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArtisanName = styled.h4`
  font-family: var(--font-secondary);
  color: #8B4513;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const ArtisanSpecialty = styled.p`
  font-family: var(--font-body);
  color: #666;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
`;

const ArtisanLocation = styled.p`
  font-family: var(--font-body);
  color: #999;
  margin: 0;
  font-size: 0.8rem;
`;

const ArtisanDetails = styled.div``;

const DetailHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const DetailImage = styled.div`
  width: 120px;
  height: 120px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #D4AF37;
  }
`;

const DetailInfo = styled.div`
  flex: 1;
`;

const DetailName = styled.h2`
  font-family: var(--font-primary);
  color: #8B4513;
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
`;

const DetailSpecialty = styled.h3`
  font-family: var(--font-secondary);
  background: linear-gradient(135deg, #D4AF37, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
`;

const DetailMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  gap: 1rem;
`;

const MetaLabel = styled.span`
  font-family: var(--font-body);
  font-weight: 600;
  color: #8B4513;
  min-width: 80px;
`;

const MetaValue = styled.span`
  font-family: var(--font-body);
  color: #666;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h4`
  font-family: var(--font-secondary);
  color: #8B4513;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;

const StorySection = styled.div``;

const StoryText = styled.p`
  font-family: var(--font-body);
  color: #555;
  line-height: 1.7;
  font-size: 1rem;
`;

const AchievementSection = styled.div``;

const Achievement = styled.div`
  background: rgba(212, 175, 55, 0.1);
  border-left: 4px solid #D4AF37;
  padding: 1rem;
  border-radius: 8px;
  font-family: var(--font-body);
  color: #8B4513;
  font-weight: 500;
`;

const SignatureSection = styled.div``;

const SignatureText = styled.p`
  font-family: var(--font-body);
  color: #B8860B;
  font-style: italic;
  font-size: 1rem;
  line-height: 1.6;
`;

const TechniquesSection = styled.div``;

const TechniquesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TechniqueItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  color: #666;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
`;

const TechniqueIcon = styled.span`
  color: #D4AF37;
`;

export default ArtisanProfiles;