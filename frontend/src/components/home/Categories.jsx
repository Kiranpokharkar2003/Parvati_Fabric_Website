import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { respond } from "../../styles/mixins";
import Container from "../common/Container";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import GradientText from "../common/GradientText";

// Map Shop by Category items to navbar category/subcategory structure
const categoryRouteMap = {
  "Silk Sarees": "/products/sarees/silk",
  "Cotton Sarees": "/products/sarees/cotton",
  "Designer Sarees": "/products/sarees/designer",
  "Casual Sarees": "/products/sarees/casual",
  "Lehenga Collections": "/products/lehengas/bridal",
  "Wedding Wear": "/products/sarees/wedding",
  "Festive Edit": "/products/sarees/festive",
  "Party Wear": "/products/lehengas/party-wear",
  "Bridal Collection": "/products/lehengas/bridal",
  "Festival Collection": "/products/sarees/festive"
};

const categories = [
  { id: 1, title: "Silk Sarees", image: "/images/showcase_products/silk_saree.jpg", type: "category" },
  { id: 2, title: "Cotton Sarees", image: "/images/showcase_products/cotton_saree.jpg", type: "category" },
  { id: 3, title: "Designer Sarees", image: "/images/showcase_products/Designer_Sarees.jpg", type: "category" },
  { id: 4, title: "Lehenga Collections", image: "/images/showcase_products/Lehenga_Coolections.jpg", type: "category" },
  // Occasions merged in
  { id: 5, title: "Wedding Wear", image: "/images/showcase_products/wedding_wear.jpg", type: "occasion" },
  { id: 6, title: "Festive Edit", image: "/images/showcase_products/Festival_Collection.jpg", type: "occasion" },
  { id: 7, title: "Party Wear", image: "/images/showcase_products/party_wear.jpg", type: "occasion" },
  { id: 8, title: "Bridal Collection", image: "/images/showcase_products/Bridal_Collection.jpg", type: "occasion" },
  { id: 9, title: "Festival Collection", image: "/images/showcase_products/Festival_Collection.jpg", type: "occasion" },
  { id: 10, title: "Casual Sarees", image: "/images/showcase_products/Casual_Sarees.jpg", type: "category" },
];

const Categories = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleCategoryClick = (categoryTitle) => {
    const route = categoryRouteMap[categoryTitle];
    if (route) {
      navigate(route);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let requestId;
    const speed = 0.5; 

    const scrollLoop = () => {
      if (!isHovering) {
        slider.scrollLeft += speed;

        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      requestId = requestAnimationFrame(scrollLoop);
    };

    scrollLoop();
    return () => cancelAnimationFrame(requestId);
  }, [isHovering]);

  const scrollByAmount = (amount) => {
    const slider = sliderRef.current;
    if (!slider) return;

    setIsHovering(true);
    slider.scrollBy({
      left: amount,
      behavior: "smooth",
    });
    setTimeout(() => setIsHovering(false), 2000);
  };

  const allCategories = [...categories, ...categories];

  return (
    <Section>
      <Container>
        <HeaderWrapper>
          <DecorativeLine />
          <Subtitle>Curated Collections</Subtitle>
          <MainTitle><GradientText>Shop By Category</GradientText></MainTitle>
          <Description>Discover our handpicked selection of timeless elegance</Description>
          <DecorativeLine />
        </HeaderWrapper>

        <SliderContainer>
          <SliderWrapper
            ref={sliderRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {allCategories.map((cat, index) => (
              <Card key={index} onClick={() => handleCategoryClick(cat.title)}>
                <ImageWrapper>
                  <CornerDecor />
                  <Image src={cat.image} alt={cat.title} />
                  <GoldBorder />
                  <HoverOverlay>
                    <ViewButton>Explore →</ViewButton>
                  </HoverOverlay>
                </ImageWrapper>
                <CardInfo>
                  <Title>{cat.title}</Title>
                  <GoldDivider>
                    <DividerDot />
                    <DividerLine />
                    <DividerDot />
                  </GoldDivider>
                </CardInfo>
              </Card>
            ))}
          </SliderWrapper>

          <ArrowLeft onClick={() => scrollByAmount(-300)}>
            <FiChevronLeft />
          </ArrowLeft>
          <ArrowRight onClick={() => scrollByAmount(300)}>
            <FiChevronRight />
          </ArrowRight>
        </SliderContainer>
      </Container>
    </Section>
  );
};

export default Categories;

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

const SliderContainer = styled.div`
  position: relative;
`;

const SliderWrapper = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 0 3rem;
  will-change: transform;

  @media (max-width: 1024px) {
    padding: 0 2.5rem;
    gap: 0.8rem;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1.5rem;
    gap: 0.6rem;
  }
`;

const Card = styled.div`
  min-width: 240px;
  background: white;
  border-radius: 0;
  overflow: visible;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  transform-style: preserve-3d;
  
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
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-8px) rotateX(2deg) rotateY(2deg);
  }

  @media (max-width: 1024px) {
    min-width: 200px;
  }

  @media (max-width: 768px) {
    min-width: 170px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  @media (max-width: 480px) {
    min-width: 150px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 260px;
  overflow: hidden;
  background: #f5f2ed;
  
  @media (max-width: 768px) {
    height: 200px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
  }
`;

const CornerDecor = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-top: 2px solid #d4af37;
  border-left: 2px solid #d4af37;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    top: 8px;
    left: 8px;
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

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  
  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(164, 113, 72, 0.9), rgba(212, 175, 55, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const ViewButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.7rem 1.8rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #a47148;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.85rem;
  }
`;

const CardInfo = styled.div`
  padding: 1rem 0.8rem;
  background: white;
  
  @media (max-width: 768px) {
    padding: 0.8rem 0.6rem;
  }
`;

const Title = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: #2b2b2b;
  font-weight: 600;
  margin-bottom: 0.6rem;
  text-align: center;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const GoldDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DividerLine = styled.div`
  width: 40px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
  
  @media (max-width: 768px) {
    width: 35px;
  }
`;

const DividerDot = styled.div`
  width: 3px;
  height: 3px;
  background: #d4af37;
  border-radius: 50%;
`;

const ArrowBtn = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  padding: 0.5rem;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(164, 113, 72, 0.3);

  &:hover {
    background: linear-gradient(135deg, #d4af37, #a47148);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(164, 113, 72, 0.5);
  }

  svg {
    font-size: 1.3rem;
    display: block;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem;
    
    svg {
      font-size: 1.1rem;
    }
  }
`;

const ArrowLeft = styled(ArrowBtn)`
  left: 10px;

  ${respond("mobile")} {
    left: 5px;
  }
`;

const ArrowRight = styled(ArrowBtn)`
  right: 10px;

  ${respond("mobile")} {
    right: 5px;
  }
`;


