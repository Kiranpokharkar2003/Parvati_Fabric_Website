import React from "react";
import styled from "styled-components";
import Container from "../components/common/Container";
import Breadcrumb from "../components/common/Breadcrumb";
import ceoPhoto from "/images/showcase_products/vikash-pacheriwal.jpg";

const About = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "About Us" }
  ];

  return (
    <>
      {/* <AboutPoster>
        <PosterImage src="/images/showcase_products/about-poster.png" alt="About Us" />
      </AboutPoster> */}
      
      <Breadcrumb items={breadcrumbItems} />
      <MobileSpacer />

      <MainSection>
        <Container>
          <HeaderWrapper>
            <DecorativeLine />
            <Subtitle>Our Legacy</Subtitle>
            <MainTitle>About Parvati Fabrics</MainTitle>
            <Description>Four decades of excellence in textile craftsmanship</Description>
            <DecorativeLine />
          </HeaderWrapper>

          <ContentSection>
            <ContentGrid>
              <TextContent>
                <SectionTitle>Our Story</SectionTitle>
                <p>
                  Established in <strong>1984</strong>, Parvati Fabrics Limited has been a cornerstone 
                  in the textile industry for over four decades. Based in the textile hub of Surat, 
                  Gujarat, we have built our reputation on quality, craftsmanship, and innovation.
                </p>
                <p>
                  What started as a small family business has grown into a trusted name in premium 
                  sarees and fabrics, serving customers across India and internationally. Our journey 
                  reflects our commitment to preserving traditional Indian textile artistry while 
                  embracing modern manufacturing techniques.
                </p>
              </TextContent>
              <ImageContent>
                <CornerDecor />
                <img src="/public/images/factory.png" alt="Parvati Fabrics Manufacturing" />
                <GoldBorder />
              </ImageContent>
            </ContentGrid>
          </ContentSection>

          <MissionVision>
            <MissionCard>
              <CardIcon>✦</CardIcon>
              <h3>Our Mission</h3>
              <p>
                To create exceptional textiles that celebrate Indian heritage while meeting 
                contemporary fashion needs. We strive to deliver uncompromising quality and 
                innovative designs to our valued customers.
              </p>
            </MissionCard>
            <VisionCard>
              <CardIcon>✦</CardIcon>
              <h3>Our Vision</h3>
              <p>
                To be recognized globally as a leading manufacturer of premium Indian textiles, 
                known for our commitment to quality, sustainability, and customer satisfaction.
              </p>
            </VisionCard>
          </MissionVision>

          <LeadershipSection>
            <SectionHeader>
              <DecorativeLine />
              <SectionTitle>Leadership</SectionTitle>
            </SectionHeader>
            <LeadershipGrid>
              <LeaderImage>
                <CornerDecor />
                <img src={ceoPhoto} alt="Mr. Vikash Pacheriwal" />
                <GoldBorder />
              </LeaderImage>
              <LeaderInfo>
                <h3>Mr. Vikash Pacheriwal</h3>
                <p className="designation">Chief Executive Officer</p>
                <p>
                  With over two decades of experience in the textile industry, Mr. Vikash Pacheriwal 
                  leads Parvati Fabrics with a vision of excellence and innovation. His leadership 
                  has been instrumental in expanding our reach while maintaining our core values of 
                  quality and customer satisfaction.
                </p>
                <p>
                  Under his guidance, the company has embraced modern technology while preserving 
                  traditional craftsmanship, positioning Parvati Fabrics as a leader in the industry.
                </p>
              </LeaderInfo>
            </LeadershipGrid>
          </LeadershipSection>

          <FactorySection>
            <SectionHeader>
              <DecorativeLine />
              <SectionTitle>Our Manufacturing Excellence</SectionTitle>
            </SectionHeader>
            <FactoryContent>
              <FactoryImage>
                <CornerDecor />
                <img src="/images/manufacturing.png" alt="Manufacturing Facility" />
                <GoldBorder />
              </FactoryImage>
              <FactoryText>
                <h3>State-of-the-Art Production Facility</h3>
                <p>
                  Our modern manufacturing unit in Surat spans over <strong>50,000 sq. ft.</strong>, equipped 
                  with advanced machinery and traditional handlooms. We combine cutting-edge technology with 
                  time-honored craftsmanship to produce textiles of exceptional quality.
                </p>
                <FactoryStats>
                  <FactoryStat>
                    <strong>200+</strong>
                    <span>Power Looms</span>
                  </FactoryStat>
                  <FactoryStat>
                    <strong>50+</strong>
                    <span>Handlooms</span>
                  </FactoryStat>
                  <FactoryStat>
                    <strong>10,000+</strong>
                    <span>Pieces/Month</span>
                  </FactoryStat>
                </FactoryStats>
              </FactoryText>
            </FactoryContent>
          </FactorySection>

          <ManufacturingProcess>
            <SectionHeader>
              <DecorativeLine />
              <SectionTitle>Our Manufacturing Process</SectionTitle>
            </SectionHeader>
            <ProcessGrid>
              <ProcessStep>
                <StepNumber>01</StepNumber>
                <h4>Design & Planning</h4>
                <p>Expert designers create patterns combining traditional motifs with contemporary aesthetics.</p>
              </ProcessStep>
              <ProcessStep>
                <StepNumber>02</StepNumber>
                <h4>Yarn Selection</h4>
                <p>Premium quality yarns sourced from certified suppliers ensuring superior fabric quality.</p>
              </ProcessStep>
              <ProcessStep>
                <StepNumber>03</StepNumber>
                <h4>Weaving</h4>
                <p>Skilled weavers operate both power looms and handlooms to create intricate textile patterns.</p>
              </ProcessStep>
              <ProcessStep>
                <StepNumber>04</StepNumber>
                <h4>Dyeing & Printing</h4>
                <p>Advanced dyeing techniques ensure vibrant, long-lasting colors with eco-friendly processes.</p>
              </ProcessStep>
              <ProcessStep>
                <StepNumber>05</StepNumber>
                <h4>Quality Control</h4>
                <p>Multi-stage inspection ensures every piece meets our stringent quality standards.</p>
              </ProcessStep>
              <ProcessStep>
                <StepNumber>06</StepNumber>
                <h4>Finishing & Packaging</h4>
                <p>Professional finishing touches and premium packaging for safe delivery to customers.</p>
              </ProcessStep>
            </ProcessGrid>
          </ManufacturingProcess>

          <WhyChooseSection>
            <SectionHeader>
              <DecorativeLine />
              <SectionTitle>Why Choose Parvati Fabrics</SectionTitle>
            </SectionHeader>
            <FeaturesGrid>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <h4>Quality Assurance</h4>
                <p>Every fabric undergoes rigorous quality checks to ensure superior standards and durability.</p>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <h4>Expert Craftsmanship</h4>
                <p>Our skilled artisans bring decades of experience in traditional and modern weaving techniques.</p>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <h4>Diverse Collection</h4>
                <p>From traditional sarees to contemporary fabrics, we offer a wide range of premium textiles.</p>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <h4>Customer Service</h4>
                <p>Dedicated support team ensuring personalized service and complete customer satisfaction.</p>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <h4>Timely Delivery</h4>
                <p>Efficient logistics and production processes ensure on-time delivery of all orders.</p>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✦</FeatureIcon>
                <h4>Wholesale Pricing</h4>
                <p>Premium quality fabrics at competitive wholesale prices, offering excellent value for bulk orders.</p>
              </FeatureItem>
            </FeaturesGrid>
          </WhyChooseSection>

          <StatsContainer>
            <StatBox>
              <StatNumber>42+</StatNumber>
              <StatText>Years Experience</StatText>
            </StatBox>
            <StatBox>
              <StatNumber>10,000</StatNumber>
              <StatText>Clients Pan India</StatText>
            </StatBox>
            <StatBox>
              <StatNumber>200+</StatNumber>
              <StatText>Employees</StatText>
            </StatBox>
            <StatBox>
              <StatNumber>1000+</StatNumber>
              <StatText>Monthly Production</StatText>
            </StatBox>
          </StatsContainer>
        </Container>
      </MainSection>
    </>
  );
};

export default About;

const AboutPoster = styled.section`
  width: 100%;
  height: 0;
  padding-bottom: 23.44%;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 1200px) {
    padding-bottom: 28%;
  }
  
  @media (max-width: 768px) {
    padding-bottom: 40%;
    margin-top: 69px;
  }
  
  @media (max-width: 480px) {
    padding-bottom: 50%;
  }
`;

const PosterImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const MobileSpacer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    height: 60px;
  }
`;

const MainSection = styled.section`
  padding: 0rem 0;
  background: #ffffff;
  
  @media (max-width: 768px) {
    padding: 2.5rem 0;
  }
`;

const HeaderWrapper = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const DecorativeLine = styled.div`
  display: none;
`;

const Subtitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.primary.maroon};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const MainTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.neutral.dark};
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral.medium};
  font-size: 1rem;
  line-height: 1.7;
`;

const ContentSection = styled.div`
  margin-bottom: 4rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  p {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.neutral.medium};
    line-height: 1.7;
    margin-bottom: 1.2rem;
    font-size: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neutral.dark};
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ImageContent = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.elevated};
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    
    @media (max-width: 768px) {
      height: 300px;
    }
  }
`;

const CornerDecor = styled.div`
  display: none;
`;

const GoldBorder = styled.div`
  display: none;
`;

const MissionVision = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MissionCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary.gold};
  transition: ${({ theme }) => theme.transitions.smooth};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.elevated};
  }
  
  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.neutral.dark};
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: 700;
  }
  
  p {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.neutral.medium};
    line-height: 1.7;
    font-size: 1rem;
  }
`;

const VisionCard = styled(MissionCard)``;

const CardIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary.gold};
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

const LeadershipSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
`;

const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: start;
  background: white;
  padding: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem;
  }
`;

const LeaderImage = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    
    @media (max-width: 768px) {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      border-radius: ${({ theme }) => theme.borderRadius.lg};
    }
  }
`;

const LeaderInfo = styled.div`
  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.neutral.dark};
    font-size: 2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  .designation {
    color: ${({ theme }) => theme.colors.primary.maroon};
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    letter-spacing: 0.5px;
  }
  
  p {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.neutral.medium};
    line-height: 1.7;
    margin-bottom: 1.2rem;
    font-size: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const WhyChooseSection = styled.div`
  margin-bottom: 4rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  background: white;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  transition: ${({ theme }) => theme.transitions.smooth};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.elevated};
  }
  
  h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.neutral.dark};
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
    font-weight: 700;
  }
  
  p {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.neutral.medium};
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const FeatureIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary.gold};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  background: ${({ theme }) => theme.gradients.primary};
  padding: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.elevated};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem;
  }
`;

const StatBox = styled.div`
  text-align: center;
  color: white;
`;

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatText = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  opacity: 0.95;
`;

const FactorySection = styled.div`
  margin-bottom: 4rem;
`;

const FactoryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FactoryImage = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.elevated};
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    
    @media (max-width: 768px) {
      height: 300px;
    }
  }
`;

const FactoryText = styled.div`
  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.neutral.dark};
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
  
  p {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.neutral.medium};
    line-height: 1.7;
    margin-bottom: 2rem;
    font-size: 1rem;
  }
`;

const FactoryStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;

const FactoryStat = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary.gold};
  
  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary.maroon};
    margin-bottom: 0.5rem;
    font-weight: 800;
  }
  
  span {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.neutral.medium};
  }
`;

const ManufacturingProcess = styled.div`
  margin-bottom: 4rem;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled.div`
  background: white;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: relative;
  transition: ${({ theme }) => theme.transitions.smooth};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.elevated};
  }
  
  h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.neutral.dark};
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    font-weight: 700;
  }
  
  p {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.neutral.medium};
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const StepNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary.gold};
  opacity: 0.2;
  margin-bottom: 1rem;
`;
