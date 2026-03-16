import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { respond } from "../../styles/mixins";
import Container from "../common/Container";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const goldShimmer = keyframes`
//   0% { background-position: -200px 0; }
//   100% { background-position: calc(200px + 100%) 0; }
// `;

const occasions = [
  { id: 1, title: "Wedding Wear", image: "/images/showcase_products/wedding_wear.jpg" },
  { id: 2, title: "Festive Edit", image: "/images/showcase_products/festive_edit.jpg" },
  { id: 3, title: "Party Wear", image: "/images/showcase_products/party_wear.jpg" },
  { id: 4, title: "Everyday Luxury", image: "/images/showcase_products/everyday_luxury.jpg" },
];

const ShopByOccasion = () => {
  const sliderRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let requestId;
    const speed = 0.4;

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

    slider.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  const allOccasions = [...occasions, ...occasions];

  return (
    <Section>
      <Container>
        <Header>
          <SectionTitle>Shop By Occasion</SectionTitle>
        </Header>

        <SliderWrapper
          ref={sliderRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {allOccasions.map((item, index) => (
            <Card key={index}>
              <Image src={item.image} alt={item.title} />
              <Overlay>
                <Title>{item.title}</Title>
              </Overlay>
            </Card>
          ))}
        </SliderWrapper>

        <ArrowLeft onClick={() => scrollByAmount(-300)}>
          <FiChevronLeft />
        </ArrowLeft>

        <ArrowRight onClick={() => scrollByAmount(300)}>
          <FiChevronRight />
        </ArrowRight>
      </Container>
    </Section>
  );
};

export default ShopByOccasion;

/* ================= STYLES ================= */

const Section = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom, #fdf8f3, #fff);
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.7rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 1.2rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #a47148;
    transform: scale(1.02);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 2px;
    background: linear-gradient(90deg, #a47148, #d4af37, #a47148);
    transition: all 0.4s ease;
  }
  
  &:hover::after {
    width: 120px;
    background: linear-gradient(90deg, #d4af37, #a47148, #d4af37);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 0 3rem;
  will-change: transform;

  ${respond("tablet")} {
    padding: 0 2rem;
  }

  ${respond("mobile")} {
    padding: 0 1rem;
  }
`;

const Card = styled.div`
  min-width: 240px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(164, 113, 72, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(164, 113, 72, 0.05), transparent);
    transition: left 0.6s ease;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 50px rgba(164, 113, 72, 0.15);
    
    &::before {
      left: 100%;
    }
  }

  ${respond("tablet")} {
    min-width: 210px;
  }

  ${respond("mobile")} {
    min-width: 180px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;

  ${respond("mobile")} {
    height: 220px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent 60%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1.5rem;
`;

const Title = styled.h3`
  color: #fff;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    transform: translateY(-2px);
    color: #d4af37;
  }

  ${respond("mobile")} {
    font-size: 1rem;
  }
`;

const ArrowBtn = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(164, 113, 72, 0.3);

  &:hover {
    background: linear-gradient(135deg, #d4af37, #a47148);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(164, 113, 72, 0.4);
  }

  svg {
    font-size: 1.8rem;
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


