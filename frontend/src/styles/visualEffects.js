import { keyframes } from 'styled-components';

// Shimmer Animation
export const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// Gold Shimmer Effect
export const goldShimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

// Fabric Texture Backgrounds
export const fabricTextures = {
  silk: `
    background-image: 
      repeating-linear-gradient(
        90deg,
        rgba(201, 169, 97, 0.03) 0px,
        transparent 1px,
        transparent 2px,
        rgba(201, 169, 97, 0.03) 3px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(201, 169, 97, 0.03) 0px,
        transparent 1px,
        transparent 2px,
        rgba(201, 169, 97, 0.03) 3px
      );
  `,
  
  cotton: `
    background-image: 
      radial-gradient(circle at 2px 2px, rgba(201, 169, 97, 0.05) 1px, transparent 0);
    background-size: 20px 20px;
  `,
  
  brocade: `
    background-image: 
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(201, 169, 97, 0.02) 10px,
        rgba(201, 169, 97, 0.02) 20px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 10px,
        rgba(201, 169, 97, 0.02) 10px,
        rgba(201, 169, 97, 0.02) 20px
      );
  `,
  
  luxury: `
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 0, 0, 0.02) 0%, transparent 50%);
  `,
};

// Decorative Border Patterns
export const decorativeBorders = {
  traditional: `
    background-image: 
      repeating-linear-gradient(
        0deg,
        ${({ theme }) => theme.colors.primary.gold},
        ${({ theme }) => theme.colors.primary.gold} 2px,
        transparent 2px,
        transparent 6px
      );
  `,
  
  elegant: `
    border-image: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary.gold},
      ${({ theme }) => theme.colors.primary.maroon},
      ${({ theme }) => theme.colors.primary.gold}
    ) 1;
  `,
};

// Shimmer Overlay Mixin
export const shimmerOverlay = `
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }
`;

// Gold Shimmer Text Effect
export const goldShimmerText = `
  background: linear-gradient(
    90deg,
    #C9A961 0%,
    #F4E4C1 25%,
    #C9A961 50%,
    #F4E4C1 75%,
    #C9A961 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${goldShimmer} 3s linear infinite;
`;

// Premium Card Shadow Levels
export const premiumShadows = {
  subtle: '0 2px 8px rgba(139, 0, 0, 0.06), 0 1px 3px rgba(201, 169, 97, 0.1)',
  medium: '0 4px 20px rgba(139, 0, 0, 0.1), 0 2px 8px rgba(201, 169, 97, 0.15)',
  elevated: '0 8px 30px rgba(139, 0, 0, 0.15), 0 4px 12px rgba(201, 169, 97, 0.2)',
  dramatic: '0 12px 40px rgba(139, 0, 0, 0.2), 0 6px 20px rgba(201, 169, 97, 0.25)',
  glow: '0 0 20px rgba(201, 169, 97, 0.4), 0 0 40px rgba(139, 0, 0, 0.2)',
};

// Gradient Overlays
export const gradientOverlays = {
  dark: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
  luxury: 'linear-gradient(135deg, rgba(139, 0, 0, 0.85) 0%, rgba(201, 169, 97, 0.85) 100%)',
  subtle: 'linear-gradient(180deg, rgba(139, 0, 0, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)',
  radial: 'radial-gradient(circle at center, rgba(201, 169, 97, 0.1) 0%, transparent 70%)',
};

export default {
  shimmer,
  goldShimmer,
  fabricTextures,
  decorativeBorders,
  shimmerOverlay,
  goldShimmerText,
  premiumShadows,
  gradientOverlays,
};
