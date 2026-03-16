import styled from 'styled-components';

// CSS variables for consistent theming
const premiumStyles = `
  :root {
    --font-primary: 'Playfair Display', serif;
    --font-secondary: 'Cormorant Garamond', serif;
    --font-body: 'Lora', serif;
    --gold-accent: linear-gradient(135deg, #D4AF37, #FFD700, #B8860B);
    --gold-text: #B8860B;
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = premiumStyles;
  document.head.appendChild(styleSheet);
  
  // Add Google Fonts link
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Lora:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
}

export const PremiumHeading = styled.h1`
  font-family: var(--font-primary);
  font-weight: 600;
  background: var(--gold-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PremiumSubheading = styled.h2`
  font-family: var(--font-secondary);
  font-weight: 500;
  color: #8B4513;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: var(--gold-accent);
    margin: 1rem auto;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const PremiumText = styled.p`
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

export const GoldAccent = styled.span`
  background: var(--gold-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

export const LuxuryCard = styled.div`
  background: linear-gradient(135deg, #fefefe, #f8f8f8);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
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
    background: var(--gold-accent);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

export default premiumStyles;