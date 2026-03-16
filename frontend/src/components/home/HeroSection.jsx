import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { respond } from "../../styles/mixins";

const slides = [
  {
    desktop: "/images/banners/hero1-desktop.png",
    tablet: "/images/banners/hero1-tablet.png",
    mobile: "/images/banners/hero1-mobile.png",
  },
  {
    desktop: "/images/banners/hero2-desktop.png",
    tablet: "/images/banners/hero2-tablet.png",
    mobile: "/images/banners/hero2-mobile.png",
  },
  {
    desktop: "/images/banners/hero3-desktop.png",
    tablet: "/images/banners/hero3-tablet.png",
    mobile: "/images/banners/hero3-mobile.png",
  },
  {
    desktop: "/images/banners/hero4-desktop.png",
    tablet: "/images/banners/hero4-tablet.png",
    mobile: "/images/banners/hero4-mobile.png",
  },
  {
    desktop: "/images/banners/hero5-desktop.png",
    tablet: "/images/banners/hero5-tablet.png",
    mobile: "/images/banners/hero5-mobile.png",
  },
  {
    desktop: "/images/banners/hero6-desktop.png",
    tablet: "/images/banners/hero6-tablet.png",
    mobile: "/images/banners/hero6-mobile.png",
  },
  {
    desktop: "/images/banners/hero7-desktop.png",
    tablet: "/images/banners/hero7-tablet.png",
    mobile: "/images/banners/hero7-mobile.png",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [device, setDevice] = useState("desktop");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setDevice("mobile");
      } else if (window.innerWidth <= 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Hero>
      {slides.map((slide, index) => (
        <Slide
          key={index}
          active={index === current}
          style={{ 
            backgroundImage: `url(${slide[device]})`,
            transform: index === current ? `translateY(${scrollY * 0.5}px) scale(1)` : 'scale(1.05)'
          }}
        />
      ))}

      <BottomBar>
        <NavTabs>
          {slides.map((_, index) => (
            <NavTab
              key={index}
              active={index === current}
              onClick={() => setCurrent(index)}
            >
              <TabLine active={index === current} />
            </NavTab>
          ))}
        </NavTabs>
      </BottomBar>
    </Hero>
  );
};

export default HeroSection;

const Hero = styled.section`
  position: relative;
  min-height: 85vh;
  overflow: hidden;

  ${respond("tablet")} {
    margin-top: 69px;
  }

  ${respond("mobile")} {
    min-height: 70vh;
    margin-top: 69px;
  }
`;

const Slide = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 1s ease;
  z-index: ${props => props.active ? 1 : 0};
  will-change: transform;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  padding: 2rem 0 1.5rem;
  z-index: 2;
  
  ${respond("mobile")} {
    padding: 1.5rem 0 1rem;
  }
`;

const NavTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0;
  max-width: 400px;
  margin: 0 auto;
`;

const NavTab = styled.button`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  ${respond("mobile")} {
    height: 3px;
  }
`;

const TabLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #d4af37, #a47148);
  width: ${props => props.active ? '100%' : '0%'};
  transition: width ${props => props.active ? '5s' : '0.3s'} linear;
`;
