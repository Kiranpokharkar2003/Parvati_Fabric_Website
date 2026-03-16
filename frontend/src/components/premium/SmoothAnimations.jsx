import styled, { keyframes, css } from 'styled-components';

// Smooth entrance animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const goldGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Smooth transition components
export const SmoothFadeIn = styled.div`
  animation: ${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
`;

export const SmoothSlideLeft = styled.div`
  animation: ${fadeInLeft} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
`;

export const SmoothSlideRight = styled.div`
  animation: ${fadeInRight} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
`;

export const SmoothScale = styled.div`
  animation: ${scaleIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
`;

export const HoverLift = styled.div`
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const GoldShimmer = styled.div`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, 0.4),
      transparent
    );
    animation: ${shimmer} 2s infinite;
  }
`;

export const GoldGlow = styled.div`
  animation: ${goldGlow} 3s ease-in-out infinite;
  border-radius: 12px;
`;

export const FloatingElement = styled.div`
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
`;

export const SmoothButton = styled.button`
  background: linear-gradient(135deg, #8B4513, #A0522D);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(139, 69, 19, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const PremiumCard = styled.div`
  background: linear-gradient(135deg, #ffffff, #fafafa);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #D4AF37, #FFD700, #B8860B);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    border-color: rgba(212, 175, 55, 0.4);
  }
`;

export const StaggeredContainer = styled.div`
  ${props => props.$stagger && css`
    > * {
      animation: ${fadeInUp} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      opacity: 0;
    }
    
    ${Array.from({ length: 10 }, (_, i) => css`
      > *:nth-child(${i + 1}) {
        animation-delay: ${i * 0.1}s;
      }
    `)}
  `}
`;

export const SmoothImage = styled.img`
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(135deg, #D4AF37, #FFD700, #B8860B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

export const PulseAnimation = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 2px solid #D4AF37;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }
`;

export default {
  SmoothFadeIn,
  SmoothSlideLeft,
  SmoothSlideRight,
  SmoothScale,
  HoverLift,
  GoldShimmer,
  GoldGlow,
  FloatingElement,
  SmoothButton,
  PremiumCard,
  StaggeredContainer,
  SmoothImage,
  GradientText,
  PulseAnimation
};