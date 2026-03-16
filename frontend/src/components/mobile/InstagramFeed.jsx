import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Container from '../common/Container';
import { FiInstagram, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const instagramReels = [
  {
    id: 1,
    embedUrl: "https://www.instagram.com/reel/DQUSp5TgTKs/embed",
    postUrl: "https://www.instagram.com/reel/DQUSp5TgTKs/",
    fallbackVideo: "/videos/products/video-1.mp4",
    thumbnail: "/images/instagram/thumb-1.jpg"
  },
  {
    id: 2,
    embedUrl: "https://www.instagram.com/reel/DSAKGILjIrn/embed",
    postUrl: "https://www.instagram.com/reel/DSAKGILjIrn/",
    fallbackVideo: "/videos/products/video-2.mp4",
    thumbnail: "/images/instagram/thumb-2.jpg"
  },
  {
    id: 3,
    embedUrl: "https://www.instagram.com/reel/DSe_J1bjHMD/embed",
    postUrl: "https://www.instagram.com/reel/DSe_J1bjHMD/",
    fallbackVideo: "/videos/products/video-3.mp4",
    thumbnail: "/images/instagram/thumb-3.jpg"
  },
  {
    id: 4,
    embedUrl: "https://www.instagram.com/reel/DQwPwrgDFcu/embed",
    postUrl: "https://www.instagram.com/reel/DQwPwrgDFcu/",
    fallbackVideo: "/videos/products/video-4.mp4",
    thumbnail: "/images/instagram/thumb-4.jpg"
  },
  {
    id: 5,
    embedUrl: "https://www.instagram.com/reel/DTK0vxPjI-q/embed",
    postUrl: "https://www.instagram.com/reel/DTK0vxPjI-q/",
    fallbackVideo: "/videos/products/video-5.mp4",
    thumbnail: "/images/instagram/thumb-5.jpg"
  },
  {
    id: 6,
    embedUrl: "https://www.instagram.com/reel/DQrImJHjAtk/embed",
    postUrl: "https://www.instagram.com/reel/DQrImJHjAtk/",
    fallbackVideo: "/videos/products/video-6.mp4",
    thumbnail: "/images/instagram/thumb-6.jpg"
  },
  {
    id: 7,
    embedUrl: "https://www.instagram.com/reel/DQUSp5TgTKs/embed",
    postUrl: "https://www.instagram.com/reel/DQUSp5TgTKs/",
    fallbackVideo: "/videos/products/video-7.mp4",
    thumbnail: "/images/instagram/thumb-7.jpg"
  },
  {
    id: 8,
    embedUrl: "https://www.instagram.com/reel/DSAKGILjIrn/embed",
    postUrl: "https://www.instagram.com/reel/DSAKGILjIrn/",
    fallbackVideo: "/videos/products/video-8.mp4",
    thumbnail: "/images/instagram/thumb-8.jpg"
  }
];

const ReelItem = ({ reel, index, videoRef }) => {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleVideoLoad = (e) => {
    if (e.target) {
      e.target.play().catch(() => {});
    }
  };

  return (
    <ReelCard onClick={() => window.open(reel.postUrl, '_blank')}>
      <CornerDecor />
      {!videoError ? (
        <FallbackVideo
          ref={videoRef}
          src={reel.fallbackVideo}
          poster={reel.thumbnail}
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
        />
      ) : (
        <ThumbnailFallback src={reel.thumbnail} alt="Reel thumbnail" />
      )}
      <GoldBorder />
    </ReelCard>
  );
};

const InstagramFeed = () => {
  const videoRefs = useRef([]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => scrollElement.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
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
          <Subtitle>Connect With Us</Subtitle>
          <MainTitle>Instagram Reels</MainTitle>
          <Description>Experience our collection through captivating stories</Description>
          <SocialInfo>
            <HandleText>@parvatiethnics</HandleText>
            <Divider>•</Divider>
            <FollowButton onClick={() => window.open('https://www.instagram.com/parvatiethnics/', '_blank')}>
              <FiInstagram /> Follow Us
            </FollowButton>
          </SocialInfo>
        </HeaderWrapper>

        <ScrollContainer>
          <ScrollButton 
            className="left" 
            onClick={() => handleScroll('left')}
            $visible={canScrollLeft}
          >
            <FiChevronLeft />
          </ScrollButton>
          
          <ScrollWrapper ref={scrollRef}>
            {instagramReels.map((reel, index) => (
              <ReelItem 
                key={reel.id} 
                reel={reel} 
                index={index}
                videoRef={(el) => (videoRefs.current[index] = el)} 
              />
            ))}
          </ScrollWrapper>
          
          <ScrollButton 
            className="right" 
            onClick={() => handleScroll('right')}
            $visible={canScrollRight}
          >
            <FiChevronRight />
          </ScrollButton>
        </ScrollContainer>
      </Container>
    </Section>
  );
};

export default InstagramFeed;

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
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
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

const SocialInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.6rem;
  }
`;

const HandleText = styled.span`
  font-family: 'Cormorant Garamond', serif;
  color: #2b2b2b;
  font-size: 1rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Divider = styled.span`
  color: #d4af37;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const FollowButton = styled.button`
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #d4af37, #a47148);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 0.45rem 1rem;
    font-size: 0.85rem;
  }
`;

const ScrollContainer = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  
  @media (max-width: 768px) {
    padding: 0 2.5rem;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  border: 2px solid #d4af37;
  color: #a47148;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  opacity: ${({ $visible }) => ($visible ? '1' : '0.3')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  
  &.left {
    left: 0;
  }
  
  &.right {
    right: 0;
  }
  
  &:hover {
    background: linear-gradient(135deg, #a47148, #d4af37);
    color: white;
    border-color: transparent;
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0 1.5rem;
  scrollbar-width: thin;
  scrollbar-color: #d4af37 #f0f0f0;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #a47148, #d4af37);
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ReelCard = styled.div`
  aspect-ratio: 9/16;
  width: 260px;
  flex-shrink: 0;
  overflow: visible;
  position: relative;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
    transform: translateY(-8px);
  }
  
  @media (max-width: 768px) {
    width: 200px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  @media (max-width: 480px) {
    width: 170px;
  }
`;

const FallbackVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #f5f2ed;
`;

const CornerDecor = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-top: 2px solid #d4af37;
  border-left: 2px solid #d4af37;
  z-index: 10;
  
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

const ThumbnailFallback = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;