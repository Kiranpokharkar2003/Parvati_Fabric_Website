import { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Bebas+Neue&family=Oswald:wght@400;500;600;700&display=swap');

  :root {
    --font-primary: 'Playfair Display', serif;
    --font-secondary: 'Cormorant Garamond', serif;
    --font-body: 'Lora', serif;
    --font-banner: 'Bebas Neue', 'Oswald', sans-serif;
  }

  * {
    font-family: var(--font-body);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .luxury-text {
    font-family: var(--font-secondary);
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .brand-text {
    font-family: var(--font-primary);
    font-weight: 700;
    letter-spacing: -0.01em;
  }
`;

export default GlobalFonts;