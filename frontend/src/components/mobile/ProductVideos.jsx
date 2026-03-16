import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../common/Container';

const productVideos = [
  { id: 1, video: "/videos/products/video-1.mp4", height: 400 },
  { id: 2, video: "/videos/products/video-2.mp4", height: 320 },
  { id: 3, video: "/videos/products/video-3.mp4", height: 480 },
  { id: 4, video: "/videos/products/video-4.mp4", height: 360 },
  { id: 5, video: "/videos/products/video-5.mp4", height: 440 },
  { id: 6, video: "/videos/products/video-6.mp4", height: 300 },
  { id: 7, video: "/videos/products/video-7.mp4", height: 520 },
  { id: 8, video: "/videos/products/video-8.mp4", height: 380 }
];

const ProductVideos = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    // Auto-play videos with intersection observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          }
        });
      },
      { threshold: 0.3 }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <Section>
      <Container>
        <HeaderWrapper>
          <DecorativeLine />
          <Subtitle>Visual Stories</Subtitle>
          <MainTitle>Our Collection in Motion</MainTitle>
          <Description>Discover the beauty of our handcrafted textiles</Description>
          <DecorativeLine />
        </HeaderWrapper>
        
        {/* Desktop/Laptop 8-Video Grid */}
        <DesktopVideoGrid>
          {productVideos.map((item, index) => (
            <VideoCard key={item.id}>
              <Video
                ref={(el) => (videoRefs.current[index] = el)}
                src={item.video}
                muted
                loop
                playsInline
                preload="none"
                loading="lazy"
              />
            </VideoCard>
          ))}
        </DesktopVideoGrid>
        
        {/* Tablet Horizontal Scroll */}
        <TabletVideoScroll>
          {productVideos.map((item, index) => (
            <TabletVideoItem key={`tablet-${item.id}`}>
              <TabletVideo
                ref={(el) => (videoRefs.current[index + 8] = el)}
                src={item.video}
                muted
                loop
                playsInline
                autoPlay
              />
            </TabletVideoItem>
          ))}
        </TabletVideoScroll>
        
        {/* Mobile Horizontal Scroll */}
        <MobileVideoScroll>
          {productVideos.map((item, index) => (
            <MobileVideoItem key={`mobile-${item.id}`}>
              <MobileVideo
                ref={(el) => (videoRefs.current[index + 16] = el)}
                src={item.video}
                muted
                loop
                playsInline
                autoPlay
              />
            </MobileVideoItem>
          ))}
        </MobileVideoScroll>
      </Container>
    </Section>
  );
};

export default ProductVideos;

const Section = styled.section`
  padding: 2rem 0;
  background: radial-gradient(circle at top, #faf8f5, #f5f2ed);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, #d4af37, transparent);
  }
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
`;

const DecorativeLine = styled.div`
  width: 150px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
  margin: 0 auto 0.6rem;
`;

const Subtitle = styled.div`
  font-family: 'Cormorant Garamond', serif;
  color: #a47148;
  font-size: 0.95rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 3px;
  margin-bottom: 0.4rem;
`;

const MainTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  color: #2b2b2b;
  font-weight: 600;
  margin-bottom: 0.6rem;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-family: 'Lora', serif;
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 0.6rem;
`;

const DesktopVideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.8rem;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const VideoCard = styled.div`
  aspect-ratio: 9/16;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(164, 113, 72, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
  border: 1px solid #f5f2ed;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(164, 113, 72, 0.15);
  }
`;

const TabletVideoScroll = styled.div`
  display: none;
  
  @media (max-width: 1024px) and (min-width: 481px) {
    display: flex;
    gap: 0.8rem;
    overflow-x: auto;
    padding: 0 1rem;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
      height: 5px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f5f2ed;
      border-radius: 0;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #a47148;
      border-radius: 0;
    }
  }
`;

const MobileVideoScroll = styled.div`
  display: none;
  
  @media (max-width: 480px) {
    display: flex;
    gap: 0.8rem;
    overflow-x: auto;
    padding: 0 1rem;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
      height: 5px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f5f2ed;
      border-radius: 0;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #a47148;
      border-radius: 0;
    }
  }
`;

const TabletVideoItem = styled.div`
  flex: 0 0 220px;
  aspect-ratio: 9/16;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(164, 113, 72, 0.1);
  border: 1px solid #f5f2ed;
`;

const MobileVideoItem = styled.div`
  flex: 0 0 180px;
  aspect-ratio: 9/16;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(164, 113, 72, 0.1);
  border: 1px solid #f5f2ed;
`;

const Video = styled.video`
  width: 100%;
  aspect-ratio: 9/16;
  object-fit: cover;
`;

const TabletVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MobileVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;