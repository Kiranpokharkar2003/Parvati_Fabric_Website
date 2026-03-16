import React from "react";
import styled, { keyframes } from "styled-components";
import { respond } from "../../styles/mixins";
import Container from "../common/Container";

const goldShimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const Collections = () => {
  return (
    <Section>
      <Container>
        <Header>
          <SectionTitle>View Our Collections</SectionTitle>
        </Header>
        <Grid>
          <BigCard bg="/images/banners/festive_collections.png">
            <Overlay />
          </BigCard>

          <SideGrid>
            <Card bg="/images/banners/summer_collections.png">
              <Overlay />
            </Card>

            <Card bg="/images/banners/wedding_collections.png">
              <Overlay />
            </Card>
          </SideGrid>
        </Grid>
      </Container>
    </Section>
  );
};

export default Collections;

const Section = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom, #fdf8f3, #fff);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 2rem;

  ${respond("tablet")} {
    grid-template-columns: 1fr;
  }
`;

const BaseCard = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: url(${(p) => p.bg}) center/cover no-repeat;
  display: flex;
  align-items: flex-end;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 50px rgba(164, 113, 72, 0.15);
    
    &::before {
      left: 100%;
    }
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(56, 56, 56, 0.1) 0%,
    rgba(56, 56, 56, 0.1) 100%
  );
`;

const Info = styled.div`
  position: relative;
  z-index: 2;
  color: #fff;
  padding: ${(p) => (p.small ? "2rem" : "3rem")};
  max-width: 500px;

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    opacity: 0.9;
    margin-bottom: 1.6rem;
    line-height: 1.6;
  }
`;

const Btn = styled.button`
  background: linear-gradient(135deg, #a47148, #d4af37);
  border: none;
  color: #fff;
  padding: ${(p) => (p.small ? "0.6rem 1.8rem" : "0.8rem 2.4rem")};
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
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
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #d4af37, #a47148);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(164, 113, 72, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const BigCard = styled(BaseCard)`
  min-height: 480px;

  ${respond("tablet")} {
    min-height: 320px;
  }
`;

const SideGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const Card = styled(BaseCard)`
  min-height: 230px;
`;


