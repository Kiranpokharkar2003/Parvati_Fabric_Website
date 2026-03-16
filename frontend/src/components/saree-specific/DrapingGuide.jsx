import React, { useState } from "react";
import styled from "styled-components";
import { FiPlay, FiBook, FiX } from "react-icons/fi";

const drapingStyles = [
  {
    name: "Nivi Style",
    description: "The most popular and versatile draping style from Andhra Pradesh",
    region: "Andhra Pradesh",
    difficulty: "Easy",
    videoUrl: "/videos/nivi-draping.mp4",
    steps: [
      "Start with the saree tucked at the waist",
      "Make pleats and tuck them in front",
      "Bring the pallu over the left shoulder",
      "Adjust the length and pleats"
    ]
  },
  {
    name: "Bengali Style",
    description: "Traditional Bengali draping with distinctive pallu style",
    region: "West Bengal",
    difficulty: "Medium",
    videoUrl: "/videos/bengali-draping.mp4",
    steps: [
      "Start from the right side, going around the waist",
      "Bring the pallu from back to front over right shoulder",
      "Create pleats and pin on the shoulder",
      "Adjust the front pleats"
    ]
  },
  {
    name: "Gujarati Style",
    description: "Unique front pallu style from Gujarat",
    region: "Gujarat",
    difficulty: "Medium",
    videoUrl: "/videos/gujarati-draping.mp4",
    steps: [
      "Tuck the saree at the back waist",
      "Bring the pallu to the front",
      "Create pleats and drape over right shoulder",
      "Secure with pins and adjust"
    ]
  },
  {
    name: "Tamil Style",
    description: "Traditional South Indian style with temple border display",
    region: "Tamil Nadu",
    difficulty: "Hard",
    videoUrl: "/videos/tamil-draping.mp4",
    steps: [
      "Start with a longer blouse",
      "Create multiple pleats at the waist",
      "Drape the pallu in a specific temple style",
      "Secure with traditional pins"
    ]
  }
];

const DrapingGuide = ({ selectedStyles = [] }) => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  const filteredStyles = selectedStyles.length > 0 
    ? drapingStyles.filter(style => selectedStyles.includes(style.name))
    : drapingStyles;

  const openStyleGuide = (style) => {
    setSelectedStyle(style);
    setShowVideo(false);
  };

  const closeGuide = () => {
    setSelectedStyle(null);
    setShowVideo(false);
  };

  return (
    <GuideContainer>
      <GuideHeader>
        <FiBook />
        <h3>Draping Style Guide</h3>
        <p>Learn how to drape your saree in different traditional styles</p>
      </GuideHeader>

      <StylesGrid>
        {filteredStyles.map((style, index) => (
          <StyleCard key={index} onClick={() => openStyleGuide(style)}>
            <StyleHeader>
              <StyleName>{style.name}</StyleName>
              <DifficultyBadge difficulty={style.difficulty}>
                {style.difficulty}
              </DifficultyBadge>
            </StyleHeader>
            <StyleRegion>{style.region}</StyleRegion>
            <StyleDescription>{style.description}</StyleDescription>
            <ViewGuideButton>
              <FiBook />
              View Guide
            </ViewGuideButton>
          </StyleCard>
        ))}
      </StylesGrid>

      {selectedStyle && (
        <Modal>
          <ModalOverlay onClick={closeGuide} />
          <ModalContent>
            <ModalHeader>
              <h2>{selectedStyle.name}</h2>
              <CloseButton onClick={closeGuide}>
                <FiX />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <StyleInfo>
                <InfoItem>
                  <strong>Region:</strong> {selectedStyle.region}
                </InfoItem>
                <InfoItem>
                  <strong>Difficulty:</strong> {selectedStyle.difficulty}
                </InfoItem>
                <InfoItem>
                  <strong>Description:</strong> {selectedStyle.description}
                </InfoItem>
              </StyleInfo>

              <VideoSection>
                {!showVideo ? (
                  <VideoPlaceholder onClick={() => setShowVideo(true)}>
                    <PlayButton>
                      <FiPlay />
                    </PlayButton>
                    <p>Click to watch draping tutorial</p>
                  </VideoPlaceholder>
                ) : (
                  <VideoPlayer>
                    <video controls autoPlay>
                      <source src={selectedStyle.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </VideoPlayer>
                )}
              </VideoSection>

              <StepsSection>
                <h3>Step-by-Step Instructions</h3>
                <StepsList>
                  {selectedStyle.steps.map((step, index) => (
                    <StepItem key={index}>
                      <StepNumber>{index + 1}</StepNumber>
                      <StepText>{step}</StepText>
                    </StepItem>
                  ))}
                </StepsList>
              </StepsSection>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </GuideContainer>
  );
};

export default DrapingGuide;

const GuideContainer = styled.div`
  margin: 2rem 0;
`;

const GuideHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  svg {
    font-size: 2rem;
    color: #a47148;
    margin-bottom: 0.5rem;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #2b2b2b;
    font-size: 1.5rem;
  }

  p {
    color: #666;
    margin: 0;
  }
`;

const StylesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const StyleCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StyleName = styled.h4`
  margin: 0;
  color: #2b2b2b;
  font-size: 1.1rem;
`;

const DifficultyBadge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  background: ${props => {
    switch(props.difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  }};
`;

const StyleRegion = styled.div`
  color: #a47148;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
`;

const StyleDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ViewGuideButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a47148;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  width: 90%;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;

  h2 {
    margin: 0;
    color: #2b2b2b;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.2rem;

  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const StyleInfo = styled.div`
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
  color: #666;

  strong {
    color: #2b2b2b;
  }
`;

const VideoSection = styled.div`
  margin-bottom: 2rem;
`;

const VideoPlaceholder = styled.div`
  background: #f8f9fa;
  border: 2px dashed #a47148;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }

  p {
    margin: 1rem 0 0 0;
    color: #666;
  }
`;

const PlayButton = styled.div`
  width: 60px;
  height: 60px;
  background: #a47148;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto;
`;

const VideoPlayer = styled.div`
  video {
    width: 100%;
    border-radius: 8px;
  }
`;

const StepsSection = styled.div`
  h3 {
    margin: 0 0 1rem 0;
    color: #2b2b2b;
  }
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StepItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  background: #a47148;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const StepText = styled.div`
  color: #666;
  line-height: 1.5;
  padding-top: 0.2rem;
`;