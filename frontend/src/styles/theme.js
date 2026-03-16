// Global Premium Theme for Parvati Fabrics
export const theme = {
  // Premium Color Palette
  colors: {
    // Primary Colors - Rich & Traditional
    primary: {
      maroon: '#8B0000',
      gold: '#C9A961',
      deepRed: '#A52A2A',
      burgundy: '#800020',
    },
    
    // Secondary Colors - Elegant Backgrounds
    secondary: {
      cream: '#FFF8DC',
      ivory: '#FFFFF0',
      bronze: '#CD7F32',
      champagne: '#F7E7CE',
    },
    
    // Accent Colors - Modern Touch
    accent: {
      emerald: '#50C878',
      royal: '#4169E1',
      rose: '#FF007F',
      amber: '#FFBF00',
    },
    
    // Neutral Colors
    neutral: {
      dark: '#2b2b2b',
      medium: '#666',
      light: '#999',
      white: '#ffffff',
      background: '#fafafa',
    },
  },

  // Typography
  fonts: {
    heading: "'Playfair Display', serif",
    subheading: "'Cinzel', serif",
    secondary: "'Cormorant Garamond', serif",
    body: "'Lora', serif",
    accent: "'Great Vibes', cursive",
  },

  fontSizes: {
    xs: '0.7rem',
    sm: '0.85rem',
    md: '1rem',
    lg: '1.15rem',
    xl: '1.4rem',
    xxl: '2rem',
    xxxl: '2.8rem',
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #8B0000, #A52A2A)',
    gold: 'linear-gradient(135deg, #C9A961, #CD7F32)',
    luxury: 'linear-gradient(135deg, #800020, #8B0000)',
    overlay: 'linear-gradient(135deg, rgba(139, 0, 0, 0.9), rgba(201, 169, 97, 0.9))',
    background: 'linear-gradient(to bottom, #ffffff, #FFF8DC)',
  },

  // Shadows
  shadows: {
    sm: '0 2px 8px rgba(139, 0, 0, 0.08)',
    md: '0 4px 20px rgba(139, 0, 0, 0.1)',
    lg: '0 8px 30px rgba(139, 0, 0, 0.15)',
    xl: '0 12px 40px rgba(139, 0, 0, 0.2)',
    button: '0 3px 12px rgba(201, 169, 97, 0.3)',
    hover: '0 6px 20px rgba(139, 0, 0, 0.3)',
  },

  // Border Radius
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    round: '50%',
  },

  // Transitions
  transitions: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.4s ease',
    smooth: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },

  // Z-index layers
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 100,
    fixed: 1000,
    modal: 10000,
    tooltip: 100000,
  },
};

export default theme;
