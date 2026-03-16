import { createGlobalStyle, keyframes } from 'styled-components';

// Keyframe animations
const goldShimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

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

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.neutral.dark};
    background: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1rem;
  }

  /* Premium Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.neutral.dark};
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  h4 {
    font-size: 1.3rem;
    font-weight: 700;
  }

  p {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.neutral.medium};
    margin-bottom: 1rem;
  }

  /* Premium Buttons */
  .btn-primary {
    background: ${({ theme }) => theme.gradients.primary};
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: 600;
    font-family: ${({ theme }) => theme.fonts.subheading};
    font-size: 0.95rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.smooth};
    position: relative;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadows.button};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.hover};
      background: ${({ theme }) => theme.gradients.luxury};
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  .btn-secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary.maroon};
    border: 2px solid ${({ theme }) => theme.colors.primary.gold};
    padding: 1rem 2.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: 600;
    font-family: ${({ theme }) => theme.fonts.subheading};
    font-size: 0.95rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.smooth};
    
    &:hover {
      background: ${({ theme }) => theme.gradients.primary};
      color: white;
      border-color: transparent;
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.hover};
    }
  }

  /* Premium Cards */
  .premium-card {
    background: #fff;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
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
    }
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(164, 113, 72, 0.15);
      
      &::before {
        left: 100%;
      }
    }
  }

  /* Premium Sections */
  .premium-section {
    padding: 6rem 0;
    background: linear-gradient(to bottom, #fdf8f3, #fff);
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    
    .sub-heading {
      font-size: 0.75rem;
      letter-spacing: 3px;
      color: #a47148;
      margin-bottom: 1rem;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      text-transform: uppercase;
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
    }
    
    .main-heading {
      font-size: 2.7rem;
      font-weight: 600;
      color: #2b2b2b;
      transition: all 0.3s ease;
      margin-bottom: 1.2rem;
      
      &:hover {
        color: #a47148;
        transform: scale(1.02);
      }
      
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
    
    .accent-line {
      width: 70px;
      height: 2px;
      background: linear-gradient(90deg, #a47148, #d4af37, #a47148);
      margin: 0 auto;
      transition: all 0.4s ease;
      
      &:hover {
        width: 120px;
        background: linear-gradient(90deg, #d4af37, #a47148, #d4af37);
      }
    }
  }

  /* Premium Inputs */
  .premium-input {
    width: 100%;
    padding: 0.9rem 1.2rem;
    border: 2px solid #e5e5e5;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.95rem;
    font-family: ${({ theme }) => theme.fonts.body};
    transition: ${({ theme }) => theme.transitions.normal};
    background: #fff;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.gold};
      background: #fff;
      box-shadow: 0 0 0 3px rgba(201, 169, 97, 0.1);
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.light};
    }
  }

  /* Premium Animations */
  .fade-in-up {
    animation: ${fadeInUp} 0.6s ease forwards;
  }

  .float-animation {
    animation: ${float} 3s ease-in-out infinite;
  }

  .pulse-animation {
    animation: ${pulse} 2s ease-in-out infinite;
  }

  /* Premium Colors */
  :root {
    --banner-height: 40px;
    --primary-maroon: #8B0000;
    --primary-gold: #C9A961;
    --deep-red: #A52A2A;
    --burgundy: #800020;
    --cream: #FFF8DC;
    --ivory: #FFFFF0;
    --bronze: #CD7F32;
    --emerald: #50C878;
    --royal: #4169E1;
    --rose: #FF007F;
    --amber: #FFBF00;
    --text-dark: #2b2b2b;
    --text-medium: #666;
    --text-light: #999;
    --background-cream: #FFF8DC;
    --border-light: rgba(201, 169, 97, 0.2);
    --shadow-light: rgba(139, 0, 0, 0.08);
    --shadow-medium: rgba(139, 0, 0, 0.15);
  }

  /* Smooth Scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Selection Styling */
  ::selection {
    background: rgba(164, 113, 72, 0.2);
    color: #2b2b2b;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #a47148, #d4af37);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #8b4513, #a47148);
  }

  /* Mobile/Tablet Page Spacing */
  .page-content {
    @media (max-width: 1024px) {
      padding-top: 140px; /* Increased gap for navbar */
    }
  }
  
  .product-page {
    @media (max-width: 1024px) {
      padding-top: 160px; /* Extra spacing for product pages */
    }
  }

  /* Premium Grid System */
  .premium-grid {
    display: grid;
    gap: 2rem;
    
    &.grid-2 {
      grid-template-columns: repeat(2, 1fr);
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
    
    &.grid-3 {
      grid-template-columns: repeat(3, 1fr);
      
      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }
    
    &.grid-4 {
      grid-template-columns: repeat(4, 1fr);
      
      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }
  }

  /* Premium Spacing */
  .spacing-xs { margin: 0.5rem 0; }
  .spacing-sm { margin: 1rem 0; }
  .spacing-md { margin: 2rem 0; }
  .spacing-lg { margin: 3rem 0; }
  .spacing-xl { margin: 4rem 0; }

  /* Premium Text Styles */
  .text-gold { color: var(--primary-gold); }
  .text-center { text-align: center; }
  .text-italic { font-style: italic; }
  .text-uppercase { text-transform: uppercase; }
  .text-gradient {
    background: linear-gradient(135deg, #a47148, #d4af37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export { goldShimmer, float, pulse, fadeInUp };