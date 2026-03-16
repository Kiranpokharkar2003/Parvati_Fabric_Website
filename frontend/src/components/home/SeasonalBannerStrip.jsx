import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiX, FiGift, FiTruck, FiTag } from "react-icons/fi";

const SeasonalBannerStrip = () => {
  const [visible, setVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Update CSS variable for navbar positioning
    document.documentElement.style.setProperty(
      '--banner-height',
      visible ? '40px' : '0px'
    );
  }, [visible]);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  const messages = [
    { icon: <FiGift />, text: "Wedding Season Sale - Get 20% Off on Bulk Orders" },
    { icon: <FiTruck />, text: "Free Shipping Above ₹10,000" },
    { icon: <FiTag />, text: "Exclusive Wholesale Prices Available" },
    { icon: <FiGift />, text: "New Arrivals - Premium Saree Collection" }
  ];

  return (
    <Banner $isClosing={isClosing} data-seasonal-banner>
      <ScrollContainer>
        <ScrollContent>
          {messages.map((msg, i) => (
            <MessageItem key={i}>
              <Icon>{msg.icon}</Icon>
              <MessageText>{msg.text}</MessageText>
            </MessageItem>
          ))}
          {/* Duplicate for seamless loop */}
          {messages.map((msg, i) => (
            <MessageItem key={`dup-${i}`}>
              <Icon>{msg.icon}</Icon>
              <MessageText>{msg.text}</MessageText>
            </MessageItem>
          ))}
        </ScrollContent>
      </ScrollContainer>
      <CloseBtn onClick={handleClose}>
        <FiX />
      </CloseBtn>
    </Banner>
  );
};

export default SeasonalBannerStrip;

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const slideUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
`;

const Banner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #8B0000, #A52A2A, #DC143C);
  color: white;
  height: 40px;
  z-index: 10000;
  animation: ${({ $isClosing }) => $isClosing ? slideUp : slideDown} 0.3s ease;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const ScrollContent = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  animation: ${scroll} 40s linear infinite;
  will-change: transform;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const MessageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 3rem;
  font-family: 'Bebas Neue', 'Oswald', 'Roboto Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0 2rem;
    letter-spacing: 1px;
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #FFD700;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }
`;

const MessageText = styled.span`
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.3rem;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) rotate(90deg);
  }
`;
