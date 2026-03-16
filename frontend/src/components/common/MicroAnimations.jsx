import styled, { keyframes, css } from 'styled-components';

// Loading Animations
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Loading Skeleton Components
export const SkeletonCard = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 12px;
  height: ${({ height }) => height || '300px'};
  width: 100%;
`;

export const SkeletonText = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  height: ${({ height }) => height || '16px'};
  width: ${({ width }) => width || '100%'};
  border-radius: 4px;
  margin: ${({ margin }) => margin || '0.5rem 0'};
`;

// Animated Components
export const AnimatedCard = styled.div`
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${({ delay }) => delay || '0s'};
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-8px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const HoverButton = styled.button`
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

export const PulseLoader = styled.div`
  width: ${({ size }) => size || '20px'};
  height: ${({ size }) => size || '20px'};
  border-radius: 50%;
  background: ${({ color }) => color || '#a47148'};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const SlideUpContainer = styled.div`
  animation: ${slideUp} 0.5s ease-out;
`;

// Parallax Container
export const ParallaxSection = styled.div`
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${({ bgImage }) => `url(${bgImage})`};
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    transform: translateZ(-1px) scale(1.1);
    z-index: -1;
  }
`;

// Micro-interaction utilities
export const microAnimations = css`
  .fade-in {
    animation: ${fadeIn} 0.6s ease-out;
  }
  
  .slide-up {
    animation: ${slideUp} 0.5s ease-out;
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    transition: transform 0.3s ease;
  }
  
  .hover-scale:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

export default {
  SkeletonCard,
  SkeletonText,
  AnimatedCard,
  HoverButton,
  PulseLoader,
  SlideUpContainer,
  ParallaxSection,
  microAnimations
};