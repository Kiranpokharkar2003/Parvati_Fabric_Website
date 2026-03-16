import React from "react";
import styled, { keyframes } from "styled-components";
import { respond } from "../../styles/mixins";
import Container from "../common/Container";

const goldShimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const AboutPreview = () => {
  return (
    <Section>
      <Container>
        <Inner>
          <ImageWrapper>
            <img
              src="/images/banners/aboutpreview.jpg"
              alt="Parvati Fabrics Limited"
            />
          </ImageWrapper>

          <Content>
            <SmallTitle>About Us</SmallTitle>
            <MainTitle>Parvati Fabrics Limited</MainTitle>
            <Description>
              Founded in <strong>1984</strong>, Parvati Fabrics Limited is a
              premium textile manufacturer based in Surat. We combine rich
              Indian heritage with modern designs to create exquisite sarees
              and fabrics that are loved nationwide.
            </Description>

            <Highlights>
              <Highlight>
                <strong>500+</strong>
                <span>Designs</span>
              </Highlight>
              <Highlight>
                <strong>35+</strong>
                <span>Years Experience</span>
              </Highlight>
              <Highlight>
                <strong>Pan-India</strong>
                <span>Distribution</span>
              </Highlight>
            </Highlights>

            <Action>Discover More</Action>
          </Content>
        </Inner>
      </Container>
    </Section>
  );
};

export default AboutPreview;

/* ================= STYLED COMPONENTS ================= */

const Section = styled.section`
  position: relative;
  padding: 6rem 0;
  background: linear-gradient(to bottom, #fdf8f3, #fff);
  overflow: hidden;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;

  ${respond("tablet")} {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.18);

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: 0.6s ease;

    &:hover {
      transform: scale(1.08);
    }
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: 480px;
  z-index: 2;
`;

const SmallTitle = styled.span`
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #a47148;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
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

const MainTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.7rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #a47148;
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-family: 'Lora', serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 2.5rem;
`;

const Highlights = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const Highlight = styled.div`
  background: #fff;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  text-align: center;
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
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(164, 113, 72, 0.15);
    
    &::before {
      left: 100%;
    }
  }

  strong {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: #a47148;
    margin-bottom: 0.3rem;
  }

  span {
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #666;
    font-weight: 500;
  }
`;

const Action = styled.button`
  background: linear-gradient(135deg, #a47148, #d4af37);
  border: none;
  color: #fff;
  padding: 0.8rem 2.4rem;
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
